<script>
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { m } from '../../paraglide/messages';
	import Gallery from '../games/gallery/games-gallery.svelte';
	import { favouritesManager } from './favourites-manager.svelte';

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	const slotList = $derived(favouritesManager.getListByCategory('slot'));
	const rouletteList = $derived(favouritesManager.getListByCategory('roulette'));
	const isEmpty = $derived(slotList.length === 0 && rouletteList.length === 0);
</script>

<div class="favourites-results">
	{#if isEmpty}
		<div class="favourites-empty-message">
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
				/>
			</svg>
			<span class="favourites-empty-title">{m.favourites_empty_title({}, { locale })}</span>
			<span class="favourites-empty-hint">{m.favourites_empty_hint({}, { locale })}</span>
		</div>
	{:else}
		<div class="favourites-results-container">
			{#if slotList.length > 0}
				<div class="favourites-category-container">
					<h2 class="favourites-category-title">{m.favourites_slots_title({}, { locale })}</h2>
					<Gallery games={slotList} category="slot" type="carousel" isOnFavouritesList={true} />
				</div>
			{/if}
			{#if rouletteList.length > 0}
				<div class="favourites-category-container">
					<h2 class="favourites-category-title">{m.favourites_roulettes_title({}, { locale })}</h2>
					<Gallery
						games={rouletteList}
						category="roulette"
						type="carousel"
						isOnFavouritesList={true}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.favourites-results {
		position: relative;
		width: 100%;
		height: 100%;
		flex: 1;
		padding-bottom: 30px;

		.favourites-empty-message {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
			padding: 48px 24px;
			text-align: center;

			svg {
				width: 36px;
				height: 36px;
				opacity: 0.25;
				color: var(--light-brown-600);
			}

			.favourites-empty-title {
				font-size: 15px;
				font-weight: 600;
				color: var(--light-brown-800);
			}

			.favourites-empty-hint {
				font-size: 12px;
				color: var(--light-brown-600);
				opacity: 0.7;
			}
		}

		.favourites-results-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 24px;
			overflow-y: auto;
			scrollbar-width: thin;
			scrollbar-color: rgba(255, 255, 255, 0.1) transparent;

			.favourites-category-container {
				width: 100%;
				padding: 0 16px 16px;

				.favourites-category-title {
					font-size: 10px;
					font-weight: 700;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					color: var(--light-brown-600);
					margin: 0 0 12px;
					padding-bottom: 8px;
					border-bottom: 1px solid rgba(255, 255, 255, 0.06);
				}
			}
		}

		&::before {
			content: '';
			position: absolute;
			top: -25px;
			left: 0;
			width: 100%;
			height: 50px;
			pointer-events: none;
			background: linear-gradient(to top, transparent 0%, var(--navbar-bg-color) 50%);
			z-index: 10;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			pointer-events: none;
			background: linear-gradient(to bottom, transparent 0%, var(--navbar-bg-color) 90%);
			z-index: 10;
		}
	}
</style>
