<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
	import { page } from '$app/state';
	import { appManager } from '../../../lib/app-manager.svelte';
	import { CountryCodes } from '$lib/app-manager.svelte';
	import SquaresLoader from './../../graphics/loader/squares-loader.svelte';
	import gsap from 'gsap/dist/gsap';
	import GameCard from './games-gallery-card.svelte';
	import { gamesGalleryManager } from './games-gallery-manager.svelte';
	import GamesGalleryFilters from './games-gallery-filters.svelte';
	import { m } from '../../../paraglide/messages';
	import type { Roulette, Slot } from '$lib/types/games';

	let {
		games, // Optional: if provided, it will use these games instead of the ones from the gamesGalleryManager, allowing to have multiple galleries with different games on the same page, like in the similar games section of the game page
		excludeId, // Optional: ID of a game to exclude from the games-gallery used in the similar games section of the game page
		category, // Required: category of the games to show (slot, live, casino, etc..), used for tracking and to apply category-specific logic if needed in the future
		title, // Optional: if provided, it will render the title of the games-gallery with the provided text and icon, if the title contains "slot" it will use the slot icon, if it contains "live" it will use the live casino icon, etc.. if no known category is found in the title, no icon will be rendered
		carouselIconName, // Optional: if provided, it will use the specified icon from the sprite instead of trying to infer it from the title, this allows to have more control over the icon used in the gallery, especially for cases where the title doesn't contain a known category or when we want to use a specific icon that doesn't match the category
		type = 'carousel', // Type of the games-gallery, it can be "carousel" or "grid", the default is "carousel". The carousel type will render the sliding buttons and the games in a single row with horizontal scroll, while the grid type will render the games in a responsive grid without sliding buttons
		categoryLink, // Optional: if provided a last card will be rendered linking to the category page with the provided URL and label "Vedi tutte le [category]"
		hasFilters = false, // Optional: if true, it will show a button to toggle the filters and the games will be filtered based on the selected filters in the gamesGalleryManager, used in the main games-gallery page to allow filtering the games by type, provider, etc..
		isOnFavouritesList = false // Optional: if true, it will indicate that the games are being displayed in the favourites list
	}: {
		games?: Slot[] | Roulette[];
		excludeId?: string;
		category: 'slot' | 'roulette';
		title?: string;
		carouselIconName?: string;
		categoryLink?: string;
		type: 'carousel' | 'grid';
		hasFilters?: boolean;
		isOnFavouritesList?: boolean;
	} = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
	type StaticRouteId = Exclude<RouteId, `${string}[${string}`>;

	// Above-the-fold threshold: cards whose images should load eagerly
	// Card dimensions (must match CSS): 200px wide, ~240px total height (image + text), 20px gap
	const CARD_WIDTH = 180;
	const CARD_TOTAL_HEIGHT = 240;
	const CARD_GAP = 16;

	let aboveTheFoldThreshold = $state(10);
	let resizeRafId: number | null = null;

	function computeThreshold(): number {
		const cols = Math.max(2, Math.floor((window.innerWidth + CARD_GAP) / (CARD_WIDTH + CARD_GAP)));
		if (type === 'carousel') return cols; // only 1 row visible in carousel
		const rows = Math.max(1, Math.ceil(window.innerHeight / (CARD_TOTAL_HEIGHT + CARD_GAP)));
		return cols * rows;
	}

	$effect(() => {
		aboveTheFoldThreshold = computeThreshold();
		const onResize = () => {
			if (resizeRafId !== null) return;
			resizeRafId = window.requestAnimationFrame(() => {
				aboveTheFoldThreshold = computeThreshold();
				resizeRafId = null;
			});
		};
		window.addEventListener('resize', onResize, { passive: true });
		return () => {
			window.removeEventListener('resize', onResize);
			if (resizeRafId !== null) {
				window.cancelAnimationFrame(resizeRafId);
				resizeRafId = null;
			}
		};
	});

	// Generate a unique ID for the carousel instance to avoid conflicts when multiple carousels are present on the same page
	const carouselID = `carousel-${Math.floor(Math.random() * 90000) + 10000}`;

	// Scroll management variables and function
	let scrollOffset = 0;
	// The width of a single card including margin, used to calculate the scroll amount, it should match the CSS width + margin of the .game-card class
	// Its used only for desktop size cards to calculate the scroll amount, on mobile the scroll is managed by the native scroll of the container, so this variable is not used for mobile scrolling
	const cardWidth: number = 196; // The width of a single card including margin, used to calculate the scroll amount, it should match the CSS width + margin of the .game-card class
	const scrollAmount = cardWidth; // The amount to scroll when clicking the arrows, currently set to the width of one card to scroll one card at a time, but it can be adjusted to scroll multiple cards if needed

	// State variable to keep track of the current scroll animation, allowing to prevent multiple simultaneous animations and to control the animation state
	let scrollAnimation: GSAPTimeline | null = $state(null);

	// Function to handle scrolling left or right in the carousel
	function scroll(direction: 'left' | 'right') {
		// Prevent starting a new scroll animation if one is already active
		if (scrollAnimation && scrollAnimation.isActive()) {
			return;
		}

		const carouselNode = document.querySelector(`#${carouselID}`);
		if (!carouselNode || carouselNode.children.length < 5) return; // No scrolling needed for less than 5 items

		// Calculate how many cards fit on the screen at once
		const cardsCountOnScreen = categoryLink
			? (carouselNode.clientWidth + cardWidth) / cardWidth
			: carouselNode.clientWidth / cardWidth; // If categoryLink is provided, we have an extra "see all" card of cardWidth, so we add that to the clientWidth for the calculation
		// Prevent scrolling beyond the available items
		if (direction === 'left' && scrollOffset === 0) return;
		// if scrolling right, ensure we don't exceed the number of items minus the cards that already are on screen
		if (
			direction === 'right' &&
			scrollOffset ===
				(categoryLink
					? carouselNode.children.length - Math.floor(cardsCountOnScreen) + 1
					: carouselNode.children.length - Math.floor(cardsCountOnScreen))
		)
			return;

		// Update the scroll offset based on the direction
		scrollOffset += direction === 'left' ? -1 : 1;

		// Create and start the scroll animation using GSAP
		scrollAnimation = gsap.timeline().to(carouselNode.children, {
			x: direction === 'left' ? `+=${scrollAmount}` : `-=${scrollAmount}`,
			ease: 'power2.out'
		});
	}
</script>

<div class="games-gallery {type} {isOnFavouritesList ? 'on-favourites-list' : ''}">
	{#if title || hasFilters}
		<div class="games-gallery-title-container">
			{#if title}
				<h2 class="games-gallery-title">
					<svg class="games-gallery-title-icon" aria-hidden="true">
						<use href="/icons/{category}-set.svg#{carouselIconName}" />
					</svg>{title}
				</h2>
			{/if}
			{#if hasFilters}
				<GamesGalleryFilters />
			{/if}
			<!-- Sliding buttons only for carousel type -->
			{#if type === 'carousel'}
				<div class="arrows-container">
					<button
						type="button"
						class="arrow left-arrow"
						aria-label={m.show_previous_games({}, { locale })}
						onclick={() => scroll('left')}
					>
						<svg class="arrow-icon" aria-hidden="true">
							<use href="/icons/icon-set.svg#fill-arrow" />
						</svg>
					</button>
					<button
						type="button"
						class="arrow right-arrow"
						aria-label={m.show_next_games({}, { locale })}
						onclick={() => scroll('right')}
					>
						<svg class="arrow-icon" aria-hidden="true">
							<use href="/icons/icon-set.svg#fill-arrow" />
						</svg>
					</button>
				</div>
			{/if}
		</div>
	{/if}
	{#if hasFilters && gamesGalleryManager.isLoadingGames()}
		<div class="loader-container" role="status" aria-live="polite" aria-label="Loading games">
			<SquaresLoader />
		</div>
	{/if}
	<div
		id={carouselID}
		class="games-gallery-inner"
		role="list"
		aria-busy={hasFilters && gamesGalleryManager.isLoadingGames()}
	>
		<!-- If provided use the games prop, otherwise use the games from the gamesGalleryManager -->
		{#each games ? games : gamesGalleryManager.getGames() as game, i (game.id)}
			<!-- Remove some ids to avoid duplicates in the similar games gallery -->
			{#if !excludeId || game.id !== excludeId}
				<GameCard
					{game}
					{category}
					index={i}
					eager={i < aboveTheFoldThreshold}
					{isOnFavouritesList}
				/>
			{/if}
		{/each}
		<!-- Link to the category for carousel type -->
		{#if categoryLink}
			{#if categoryLink.startsWith(`/${locale}/`)}
				<a
					href={resolve(categoryLink as StaticRouteId)}
					class="game-card more-games-card"
					title={m.show_all_by_category({ category }, { locale })}
					aria-label={m.show_all_by_category({ category }, { locale })}
				>
					<span>{m.show_all_by_category({ category }, { locale })}</span>
					<svg class="more-games-card-icon" aria-hidden="true">
						<use href="/icons/icon-set.svg#fill-arrow" />
					</svg>
				</a>
			{:else}
				<a
					href={resolve(`/${locale}${categoryLink}` as StaticRouteId)}
					class="game-card more-games-card"
					title={m.show_all_by_category({ category }, { locale })}
					aria-label={m.show_all_by_category({ category }, { locale })}
				>
					<span>{m.show_all_by_category({ category }, { locale })}</span>
					<svg class="more-games-card-icon" aria-hidden="true">
						<use href="/icons/icon-set.svg#fill-arrow" />
					</svg>
				</a>
			{/if}
		{:else if gamesGalleryManager.areMoreGamesAvailable()}
			<button
				type="button"
				class="game-card more-games-card load-more-button"
				onclick={() => gamesGalleryManager.loadMoreGames(locale)}
				disabled={!gamesGalleryManager.areMoreGamesAvailable()}
				aria-label={m.load_more_games({}, { locale })}
			>
				<svg
					class="more-games-card-icon"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M12 5V19M5 12H19"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}
	</div>
</div>

<style>
	.games-gallery {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: var(--mobile-padding);
		color: var(--blu-600);
		&.on-favourites-list {
			color: var(--light-brown-900);
		}
		.games-gallery-title-container {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.games-gallery-title {
				display: flex;
				align-items: center;
				gap: 8px;
				margin: 0;
				font-size: 1.25rem;
				font-weight: 700;
				color: var(--blu-600);

				.games-gallery-title-icon {
					width: 28px;
					height: 28px;
					flex-shrink: 0;
				}
			}

			.arrows-container {
				display: flex;
				justify-content: flex-end;
				gap: 8px;

				.arrow {
					display: flex;
					align-items: center;
					justify-content: center;
					background: none;
					border: none;
					cursor: pointer;
					color: inherit;
					width: 36px;
					height: 36px;
					border-radius: 50%;
					transition: background-color 0.15s ease;

					&:hover {
						background-color: var(--blu-700-opacity-100);
					}

					&:focus-visible {
						outline: 2px solid currentColor;
						outline-offset: 2px;
					}

					.arrow-icon {
						width: 22px;
						height: 22px;
					}
				}

				.left-arrow .arrow-icon {
					transform: rotate(270deg);
				}

				.right-arrow .arrow-icon {
					transform: rotate(90deg);
				}
			}
		}

		.loader-container {
			width: 100%;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;

			:global(.loader) {
				width: 80px;
				height: 80px;
			}
		}

		.games-gallery-inner {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			scroll-behavior: smooth;
		}

		&.carousel {
			.games-gallery-inner {
				flex-wrap: nowrap;
			}
		}

		.more-games-card {
			aspect-ratio: 1 / 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: var(--blu-600);
			border-radius: 10px;
			text-decoration: none;
			gap: 8px;
			font-size: 0.75rem;
			font-weight: 600;
			text-align: center;
			padding: 8px;
			background: none;
			border: none;
			cursor: pointer;

			.more-games-card-icon {
				background-color: var(--blu-600);
				color: var(--light-brown-900);
				padding: 14px;
				width: 52px;
				height: 52px;
				border-radius: 14px;
				transform: rotate(90deg);
				transition:
					transform 0.2s ease,
					background-color 0.15s ease;
			}

			&:hover .more-games-card-icon {
				background-color: var(--blu-500);
				transform: rotate(90deg) scale(1.08);
			}
		}

		@media (min-width: 768px) {
			margin: 0 5%;

			.games-gallery-inner {
				overflow: hidden;

				:global(.game-card) {
					flex: 0 0 180px;
				}
			}
		}

		@media (max-width: 767px) {
			.games-gallery-inner {
				overflow-x: auto;
				scrollbar-width: none;

				&::-webkit-scrollbar {
					display: none;
				}

				:global(.game-card) {
					flex: 0 0 calc(50% - 8px);
				}
			}

			&.carousel {
				.games-gallery-inner {
					scroll-snap-type: x mandatory;
					-webkit-overflow-scrolling: touch;

					:global(.game-card) {
						flex: 0 0 42%;
						scroll-snap-align: start;
					}
				}
			}

			.games-gallery-title-container {
				.arrows-container {
					display: none;
				}
			}
		}
	}
</style>
