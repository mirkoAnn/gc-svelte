<script lang="ts">
	import gsap from 'gsap/dist/gsap';
	import { gamesGalleryManager } from './games-gallery-manager.svelte';

	let { filter }: { filter: any } = $props();

	let filterOptionsTogglingAnimation = $state<GSAPTimeline | null>();

	const toggleFilterOptions = () => {
		// If there's an ongoing animation for toggling filter options, we don't do anything to prevent conflicts between multiple animations
		if (filterOptionsTogglingAnimation && filterOptionsTogglingAnimation.isActive()) return;

		// First, we create an animation that closes all filters and restores the rotation of all toggler icons
		filterOptionsTogglingAnimation = gsap
			.timeline({ defaults: { duration: 0.25 } })
			.to('.games-gallery-filters-backdrop', {
				autoAlpha: 0
			})
			// First, close all filters
			.to(
				`.games-gallery-filter-options`,
				{
					height: 0
				},
				'<'
			)
			// Restore the rotation of all toggler icons
			.to(
				`.games-gallery-filter .games-gallery-filter-select-toggler-icon`,
				{
					rotate: 180
				},
				'<'
			);

		// Since all the filters are now closed, we check if the filter we want to toggle is currently visible.
		// If it is, we set the current visible filter to null and we don't create any more animations, since the one we just created already closed it.
		if (gamesGalleryManager.getCurrentVisibleFilter() !== filter.name) {
			filterOptionsTogglingAnimation = gsap
				.timeline({ defaults: { duration: 0.25 } })
				.to('.games-gallery-filters-backdrop', {
					autoAlpha: 1
				})
				.to(
					`#games-gallery-filter-${filter.name} .games-gallery-filter-options`,
					{
						height: '300px'
					},
					'<'
				)
				.to(
					`#games-gallery-filter-${filter.name} .games-gallery-filter-select-toggler-icon`,
					{
						rotate: 0
					},
					'<'
				);
		}
		gamesGalleryManager.setCurrentVisibleFilter(filter.name);
	};
</script>

<div id="games-gallery-filter-{filter.name}" class="games-gallery-filter">
	<button
		class="games-gallery-filter-select-toggler"
		aria-label={'Seleziona filtro per ' + filter.label}
		onclick={toggleFilterOptions}
	>
		<span>{filter.label}</span>
		<svg class="games-gallery-filter-select-toggler-icon">
			<use href="/icons/icon-set.svg#fill-arrow" />
		</svg>
	</button>
	<div class="games-gallery-filter-options">
		{#each filter.filters as filterOption}
			<button
				class="games-gallery-filter-option {gamesGalleryManager.isThisFilterCurrentlyApplied(
					filter.name,
					filterOption.value
				)
					? 'selected'
					: ''}"
				value={filterOption.value}
				onclick={() =>
					gamesGalleryManager.applyFilter({
						category: filter.name,
						value: filterOption.value
					})}
			>
				<svg class="games-gallery-filter-option-icon">
					<use href="/icons/icon-set.svg#check" />
				</svg>
				{filterOption.title}</button
			>
		{/each}
	</div>
</div>

<style>
	.games-gallery-filter {
		width: 200px;
		height: fit-content;
		position: relative;
		display: flex;
		flex-direction: column;
		border-radius: 16px;
		background-color: #fff;
		cursor: pointer;
		font-size: 0.875rem;
		color: var(--blu-600);
		opacity: 0;
		visibility: hidden;
		overflow: hidden;
		.games-gallery-filter-select-toggler {
			width: 100%;
			min-height: 35px;
			display: flex;
			align-items: center;
			.games-gallery-filter-select-toggler-icon {
				width: 16px;
				height: 16px;
				transform: rotate(180deg);
			}
		}
		.games-gallery-filter-options {
			width: 100%;
			height: 0;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
			overflow-y: auto;
			padding: 0 16px;
			scrollbar-width: none; /* Firefox */
			-ms-overflow-style: none; /* Internet Explorer 10+ */
			&::-webkit-scrollbar {
				display: none; /* Chrome, Safari, Opera */
			}
			.games-gallery-filter-option {
				width: 100%;
				justify-content: flex-start;
				text-align: left;
				font-size: 0.75rem;
				padding: 8px;
				border-radius: 8px;
				background-color: var(--light-brown-800-opacity-500);
				color: var(--blu-600);
				transition: 0.5s all ease;
				.games-gallery-filter-option-icon {
					border: 1px solid;
					border-radius: 50%;
					padding: 2px;
					width: 16px;
					height: 16px;
					fill: none;
				}
				&:hover {
					background-color: var(--light-brown-800-opacity-500);
				}
				&.selected {
					background-color: var(--blu-600);
					color: var(--light-brown-900);
					.games-gallery-filter-option-icon {
						fill: currentColor;
					}
				}
				&:nth-child(1) {
					margin-top: 16px;
				}
				&:nth-last-child(1) {
					margin-bottom: 16px;
				}
			}
		}
		@media (max-width: 767px) {
			width: 100%;
			.games-gallery-filter-select-toggler {
				min-height: 45px;
			}
		}
	}
</style>
