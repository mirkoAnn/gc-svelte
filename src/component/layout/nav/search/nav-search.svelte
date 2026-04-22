<script lang="ts">
	import NavbarSearchResults from './nav-search-results.svelte';
	import NavbarSearchHints from './nav-search-hints.svelte';
	import { onMount } from 'svelte';
	import { navSearchManager } from './nav-search-manager.svelte';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { page } from '$app/state';

	onMount(() => {
		navSearchManager.init();
	});

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<div class="navbar-search-panel">
	<div class="navbar-search-and-hints-container">
		<div class="navmenu-search-input-container">
			<input
				id="navmenu-search-input"
				name="navmenu-search"
				class="navbar-menu-search"
				placeholder={navSearchManager.getPlaceholder()}
				oninput={(e: Event) => {
					// Handle input changes
					navSearchManager.handleInput((e.target as HTMLInputElement).value, locale);
				}}
				value={navSearchManager.getSearchInput()}
				onkeydown={(e: KeyboardEvent) => {
					if (e.key === 'Escape') {
						navSearchManager.handleBlur();
					}
				}}
				onkeyup={(e: KeyboardEvent) => {
					// Handle keyup events
					if (e.key === 'Escape') {
						navSearchManager.handleBlur();
					}
				}}
				autocomplete="off"
			/>
		</div>
		{#if navSearchManager.getSearchHints().length > 0}
			<div class="navbar-search-hints-outer">
				<NavbarSearchHints />
			</div>
		{/if}
	</div>
	<NavbarSearchResults />
</div>

<style>
	.navbar-search-panel {
		width: 90%;
		height: 100%;
		background-color: inherit;
		display: flex;
		align-items: flex-start;
		gap: 32px;
		.navbar-search-and-hints-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 200px;
			justify-content: center;
			align-items: end;
			padding: 8px;
			background-color: var(--blu-700);
			border-radius: 24px;
			.navmenu-search-input-container {
				width: 100%;
				position: relative;
				.navbar-menu-search {
					width: 100%;
					padding: 4px;
					border: none;
					background-color: transparent;
					color: var(--light-brown-900);
					font-size: 16px;
					padding: 0 8px;
					&::placeholder {
						color: var(--light-brown-700);
					}
					&:focus {
						outline: none;
					}
				}
			}
			.navbar-search-hints-outer {
				width: 100%;
				color: var(--blu-700);
			}
		}
		@media (max-width: 768px) {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
