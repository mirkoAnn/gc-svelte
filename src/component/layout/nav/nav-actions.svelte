<script lang="ts">
	import { appManager } from '$lib/app-manager.svelte';
	import { m } from '../../../paraglide/messages';
	import { navManager } from './nav-manager.svelte';

	const locale = $derived(appManager.getCountryCode());
</script>

<div class="nav-actions-container" role="tablist">
	<div class="nav-action-selector"></div>
	{#each navManager.getMenuActions() as action, i (action.category)}
		{#if action.category === 'menu'}
			<button
				id="nav-action-tab-{i}"
				class="nav-action nav-action-{i} mobile-nav-action"
				role="tab"
				aria-label="nav menu {action.label}"
				aria-controls="nav-sidemenu"
				aria-selected={navManager.getActiveActionIndex() === i}
				aria-expanded={navManager.getActiveActionIndex() === i}
				tabindex="0"
				onclick={() => navManager.toggleMenu(i)}
			>
				<svg class="nav-action-icon" aria-hidden="true">
					<use href={`/icons/icon-set.svg#${action.category}`}></use>
				</svg>
				<span class="nav-action-close">
					<svg class="nav-action-icon nav-action-close-icon" aria-hidden="true">
						<use href="/icons/icon-set.svg#close"></use>
					</svg>
					<span class="nav-action-close-label">{m.close({ locale })}</span>
				</span>
			</button>
		{:else}
			<button
				id="nav-action-tab-{i}"
				class="nav-action nav-action-{i}"
				role="tab"
				aria-label="nav menu {action.label}"
				aria-controls="nav-action-tabpanel-{i}"
				aria-selected={navManager.getActiveActionIndex() === i}
				aria-expanded={navManager.getActiveActionIndex() === i}
				tabindex="0"
				onclick={() => navManager.toggleMenu(i)}
			>
				<svg class="nav-action-icon" aria-hidden="true">
					<use href={`/icons/icon-set.svg#${action.category}`}></use>
				</svg>
				<span class="nav-action-close">
					<svg class="nav-action-icon nav-action-close-icon" aria-hidden="true">
						<use href="/icons/icon-set.svg#close"></use>
					</svg>
					<span class="nav-action-close-label">{m.close({ locale })}</span>
				</span>
			</button>
		{/if}
	{/each}
</div>

<style>
	.nav-actions-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		overflow: hidden;
		.nav-action-selector {
			position: absolute;
			top: 1px;
			left: 0;
			height: 28px;
			width: 100px;
			border-radius: 14px;
			background-color: var(--blu-900);
			opacity: 0;
			visibility: hidden;
		}
		.nav-action {
			position: relative;
			background: none;
			border: none;
			color: inherit;
			width: 30px;
			height: 30px;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.nav-action:hover,
		.nav-action:focus {
			outline: none;
		}
		.nav-action-icon {
			width: 20px;
			height: 20px;
		}
		.nav-action-close {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 4px;
			.nav-action-close-icon {
				transform: scale(0);
			}
			.nav-action-close-label {
				font-size: 0.75rem;
				white-space: nowrap;
				opacity: 0;
				visibility: hidden;
			}
		}
	}
	@media (min-width: 768px) {
		/* Show on small screens */
		.nav-actions-container {
			.mobile-nav-action {
				display: none;
			}
		}
	}
</style>
