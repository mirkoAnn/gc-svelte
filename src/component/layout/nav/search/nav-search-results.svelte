<script lang="ts">
	import SquaresLoader from './../../../graphics/loader/squares-loader.svelte';
	import CasinoCards from '../../../casino/casino-cards.svelte';
	import { casinosDataManager } from '../../../casino/casinos-data-manager.svelte';
	import GamesGallery from './../../../games/gallery/games-gallery.svelte';
	import { navSearchManager } from './nav-search-manager.svelte';
	import ProvidersGallery from '../../../providers/providers-gallery.svelte';
	import { m } from '../../../../paraglide/messages';
	import { appManager } from '$lib/app-manager.svelte';

	const locale = $derived(appManager.getCountryCode());
</script>

<div class="navbar-search-results">
	{#if navSearchManager.isResultsListEmpty()}
		<!-- No results found -->
		<p class="search-results-message">
			"{navSearchManager.getSearchInput()}"
		</p>
	{:else if navSearchManager.isLoading()}
		<!-- Loading results -->
		<div class="loader-container">
			<!-- <PointsLoader /> -->
			<SquaresLoader />
		</div>
	{:else}
		<!-- Results found -->
		<div class="navbar-search-results-container">
			{#if navSearchManager.getSearchResults().casinosIds.length > 0}
				<div class="results-category-container">
					<h3 class="results-category-title">{m.casinos({ locale })}</h3>
					<CasinoCards
						casinos={casinosDataManager.getCasinosByIds(
							navSearchManager.getSearchResults().casinosIds
						)}
					/>
				</div>
			{/if}
			{#if navSearchManager.getSearchResults().slots.length > 0}
				<div class="results-category-container">
					<h3 class="results-category-title">{m.slots({ locale })}</h3>
					<GamesGallery
						games={navSearchManager.getSearchResults().slots}
						category="slot"
						type="carousel"
					/>
				</div>
			{/if}
			{#if navSearchManager.getSearchResults().roulettes.length > 0}
				<div class="results-category-container">
					<h3 class="results-category-title">{m.roulettes({ locale })}</h3>
					<!-- <GamesCarousel
					games={navSearchManager.getSearchResults().roulettes}
					category="roulettes"
				/> -->
				</div>
			{/if}
			{#if navSearchManager.getSearchResults().providers.length > 0}
				<div class="results-category-container">
					<h3 class="results-category-title">{m.providers({ locale })}</h3>
					<ProvidersGallery providers={navSearchManager.getSearchResults().providers} />
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.navbar-search-results {
		position: relative;
		width: 100%;
		height: 100%;
		flex: 1;
		padding-bottom: 30px; /* Space for bottom gradient */
		.search-results-message {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 8px;
			font-size: 32px;
		}
		.loader-container {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			:global(.loader) {
				width: 80px;
				height: 80px;
			}
		}
		.navbar-search-results-container {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 32px;
			overflow-y: auto;
			scrollbar-width: thin;
			scrollbar-color: transparent;
			.results-category-container {
				width: 100%;
				padding: 16px;
				.results-category-title {
					font-size: 24px;
					font-weight: normal;
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
