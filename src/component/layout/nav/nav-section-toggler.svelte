<script lang="ts">
	import { capitalizeFirstLetter } from './../../../lib/utils.svelte';
	import { navManager } from './nav-manager.svelte';

	const initialSection = navManager.getCurrentSection();
</script>

<div
	class="nav-section-toggler"
	style="
  --toggler-bg-color: var(--navbar-section-toggler-bg-color-{initialSection});
  --toggler-mobile-bg-color: var(--navbar-section-toggler-mobile-bg-color-{initialSection});
  --sections-count: {navManager.getMenuSections().length};"
>
	<div class="nav-section-selector"></div>
	{#each navManager.getMenuSections() as section (section)}
		<button
			class="nav-section-toggler-button nav-section-toggler-button-{section.toLowerCase()} {section ===
			initialSection
				? 'initial'
				: ''}"
			onclick={() => navManager.changeSection(section)}
		>
			<svg
				class="nav-section-toggler-icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<use href="/icons/{section.toLowerCase()}-set.svg#{section.toLowerCase()}"></use>
			</svg>
			<span class="nav-section-toggler-label">
				{capitalizeFirstLetter(section)}
			</span>
		</button>
	{/each}
</div>

<style>
	.nav-section-toggler {
		position: fixed;
		display: flex;
		background-color: var(--toggler-bg-color);
		border-radius: 50px;
		padding: 6px;
		z-index: 1002;

		.nav-section-selector {
			position: absolute;
			top: 4px;
			left: 6px;
			width: 90px;
			height: calc(100% - 8px);
			background-color: var(--navbar-text-color);
			border-radius: 50px;
		}

		.nav-section-toggler-button {
			width: 90px;
			color: var(--navbar-text-color);
			cursor: pointer;
			font-size: 13px;
			font-weight: 600;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			padding: 6px 0;
			background: none;
			border: none;

			&.initial {
				color: var(--toggler-bg-color);
			}

			.nav-section-toggler-icon {
				width: 18px;
				height: 18px;
				flex-shrink: 0;
			}
		}

		@media (min-width: 768px) {
			top: 10px;
			left: 50%;
			transform: translateX(-50%);
		}

		@media (max-width: 767px) {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 10px 16px;
			padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
			border-radius: 0;
			background-color: var(--toggler-mobile-bg-color);
			box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.3);

			.nav-section-selector {
				width: calc(100% / var(--sections-count) - 32px);
				left: 16px;
				top: 8px;
				height: calc(100% - 16px - env(safe-area-inset-bottom, 0px));
				border-radius: 8px;
			}

			.nav-section-toggler-button {
				flex: 1;
				flex-direction: column;
				gap: 4px;
				font-size: 10px;
				padding: 4px 0;

				.nav-section-toggler-icon {
					width: 22px;
					height: 22px;
				}
			}
		}
	}
</style>
