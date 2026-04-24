<script lang="ts">
	import { resolve } from '$app/paths';
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
		hasFilters = false // Optional: if true, it will show a button to toggle the filters and the games will be filtered based on the selected filters in the gamesGalleryManager, used in the main games-gallery page to allow filtering the games by type, provider, etc..
	}: {
		games?: Slot[] | Roulette[];
		excludeId?: string;
		category: 'slot' | 'roulette';
		title?: string;
		carouselIconName?: string;
		categoryLink?: string;
		type: 'carousel' | 'grid';
		hasFilters?: boolean;
	} = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	// Generate a unique ID for the carousel instance to avoid conflicts when multiple carousels are present on the same page
	const carouselID = `carousel-${Math.floor(Math.random() * 90000) + 10000}`;

	// Scroll management variables and function
	let scrollOffset = 0;
	// The width of a single card including margin, used to calculate the scroll amount, it should match the CSS width + margin of the .game-card class
	// Its used only for desktop size cards to calculate the scroll amount, on mobile the scroll is managed by the native scroll of the container, so this variable is not used for mobile scrolling
	const cardWidth: number = 200; // The width of a single card including margin, used to calculate the scroll amount, it should match the CSS width + margin of the .game-card class
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
		const cardsCountonScreen = categoryLink
			? (carouselNode.clientWidth + cardWidth) / cardWidth
			: carouselNode.clientWidth / cardWidth; // If categoryLink is provided, we have an extra "see all" card of cardWidth, so we add that to the clientWidth for the calculation
		// Prevent scrolling beyond the available items
		if (direction === 'left' && scrollOffset == 0) return;
		// if scrolling right, ensure we don't exceed the number of items minus the cards that already are on screen
		if (
			direction === 'right' &&
			scrollOffset ===
				(categoryLink
					? carouselNode.children.length - Math.floor(cardsCountonScreen) + 1
					: carouselNode.children.length - Math.floor(cardsCountonScreen))
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

<div class="games-gallery {type}">
	{#if title || hasFilters}
		<div class="games-gallery-title-container">
			{#if title}
				<h2 class="games-gallery-title">
					<svg class="games-gallery-title-icon">
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
						class="arrow left-arrow"
						aria-label={m.show_previous_games({}, { locale })}
						onclick={() => scroll('left')}
					>
						<svg class="arrow-icon">
							<use href="/icons/icon-set.svg#fill-arrow" />
						</svg>
					</button>
					<button
						class="arrow right-arrow"
						aria-label={m.show_next_games({}, { locale })}
						onclick={() => scroll('right')}
					>
						<svg class="arrow-icon">
							<use href="/icons/icon-set.svg#fill-arrow" />
						</svg>
					</button>
				</div>
			{/if}
		</div>
	{/if}
	{#if hasFilters && gamesGalleryManager.isLoadingGames()}
		<div class="loader-container">
			<SquaresLoader />
		</div>
	{/if}
	<div id={carouselID} class="games-gallery-inner">
		<!-- If provided use the games prop, otherwise use the games from the gamesGalleryManager -->
		{#each games ? games : gamesGalleryManager.getGames() as game, i (game.id)}
			<!-- Remove some ids to avoid duplicates in the similar games gallery -->
			{#if !excludeId || game.id !== excludeId}
				<GameCard {game} {category} index={i} />
			{/if}
		{/each}
		<!-- Link to the category for carousel type -->
		{#if categoryLink}
			<a
				href={resolve(`/${locale}${categoryLink}` as Parameters<typeof resolve>[0])}
				class="game-card more-games-card"
				aria-label={m.show_all_by_category({ category }, { locale })}
				title={m.show_all_by_category({ category }, { locale })}
			>
				<span>{m.show_all_by_category({ category }, { locale })}</span>
				<svg class="more-games-card-icon">
					<use href="/icons/icon-set.svg#fill-arrow" />
				</svg>
			</a>
		{:else if gamesGalleryManager.areMoreGamesAvailable()}
			<button
				class="game-card more-games-card load-more-button"
				onclick={() => gamesGalleryManager.loadMoreGames(locale)}
				disabled={!gamesGalleryManager.areMoreGamesAvailable()}
				aria-label={m.load_more_games({}, { locale })}
			>
				<svg class="more-games-card-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
		.games-gallery-title-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.games-gallery-title {
				display: flex;
				align-items: center;
				gap: 8px;
				font-size: 1.5rem;
				font-weight: 600;
				color: var(--blu-600);
				.games-gallery-title-icon {
					width: 32px;
					height: 32px;
				}
			}
			.arrows-container {
				display: flex;
				justify-content: flex-end;
				gap: 16px;
				.arrow {
					color: inherit;
					.arrow-icon {
						width: 24px;
						height: 24px;
					}
				}
				.left-arrow {
					.arrow-icon {
						transform: rotate(270deg);
					}
				}
				.right-arrow {
					.arrow-icon {
						transform: rotate(90deg);
					}
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
			gap: 20px;
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
			font-weight: 600;
			.more-games-card-icon {
				background-color: var(--blu-600);
				color: var(--light-brown-900);
				padding: 16px;
				width: 60px;
				height: 60px;
				border-radius: 16px;
				transform: rotate(90deg);
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
				:global(.game-card) {
					flex: 0 0 calc(50% - 10px);
				}
			}
			&.carousel {
				.games-gallery-inner {
					:global(.game-card) {
						flex: 0 0 40%;
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
