<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { fly } from 'svelte/transition';
	import { navSearchManager } from './nav-search-manager.svelte';

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<ul class="navbar-searches-hints navbar-popular-searches-hints">
	{#each navSearchManager.getSearchHints(10) as searchHint, i (searchHint)}
		<li class="navbar-search-item" in:fly={{ y: 20, delay: i * 50, duration: 500 }}>
			<button
				class="navbar-search-item-button"
				onclick={() => navSearchManager.handleHints(searchHint, locale)}
			>
				<span class="navbar-search-item-button-text">{searchHint}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.navbar-searches-hints {
		list-style: none;
		display: flex;
		flex-direction: column;
		margin: 0;
		font-size: 0.7rem;
		color: inherit;
		overflow: hidden;
		.navbar-search-item {
			border-radius: 4px;
			&:not(:last-child) {
				border-bottom: 1px solid var(--bt-blu-100-opacity-10);
			}
			.navbar-search-item-button {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 24px;
				background: transparent;
				border: none;
				color: inherit;
				cursor: pointer;
				text-align: left;
				width: 100%;
				padding: 16px;
				.navbar-search-item-button-text {
					display: flex;
					align-items: center;
					gap: 8px;
					flex-grow: 1;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			&:hover {
				background-color: var(--bt-blu-600);
			}
		}
	}
</style>
