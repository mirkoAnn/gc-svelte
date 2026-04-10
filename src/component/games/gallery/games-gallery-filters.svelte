<script lang="ts">
	import { gamesGalleryManager } from './games-gallery-manager.svelte';
	import GamesGalleryFilter from './games-gallery-filter.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import { m } from '../../../paraglide/messages';
	import { appManager } from '$lib/app-manager.svelte';

	// We need to use a state variable to store the animation instance, otherwise it gets recreated on each toggle causing the animation to break
	// We also need to check if the animation is active before toggling it, to prevent multiple toggles while the animation is still running
	// This animation is used to toggle the filters panel, it changes the background color and width of the panel, and rotates the arrow icon
	let toggleFiltersAnimation = $state<GSAPTimeline | null>();

	const locale = $derived(appManager.getCountryCode());

	const toggleFiltersOptions = () => {
		if (toggleFiltersAnimation && toggleFiltersAnimation.isActive()) return;
		gsap
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
		gamesGalleryManager.setCurrentVisibleFilter('');
	};

	onMount(() => {
		// Initialize the toggle filters animation with GSAP, but keep it paused until the user toggles the filters for the first time to avoid unnecessary animations on page load
		gsap.matchMedia().add(
			{
				isDesktop: '(min-width: 768px)',
				isMobile: '(max-width: 767px)'
			},
			(context: gsap.MatchMediaContext) => {
				const { isDesktop } = context.conditions;

				toggleFiltersAnimation = gsap
					.timeline({ defaults: { ease: 'back.inOut(1.7)' }, paused: true })
					.fromTo(
						'.games-gallery-filters-backdrop',
						{
							autoAlpha: 0
						},
						{ autoAlpha: 1 }
					)
					.fromTo(
						'.games-gallery-filters-container',
						{
							backgroundColor: '#f6f3edff',
							color: '#3d6080ff'
						},
						{
							backgroundColor: '#3d6080ff',
							color: '#f6f3edff'
						},
						'<'
					)
					.fromTo(
						'.games-gallery-filters',
						{
							width: 0
						},
						{
							width: isDesktop
								? gamesGalleryManager.getFilters().categories.length * 216 + 120 + 'px' // 200px width + 16px gap for each filter + 120px for the reset button
								: '80vw',
							ease: 'power2.inOut'
						},
						'<'
					)
					.fromTo(
						'.games-filters-toggler-arrow-icon',
						{
							rotate: 180,
							margin: '0'
						},
						{
							rotate: 0,
							margin: '0 8px'
						},
						'<'
					)
					.fromTo(
						'.games-filters-toggler-icon',
						{
							scale: 1
						},
						{
							scale: 0
						},
						'<'
					)
					.fromTo(
						'.games-filters-toggler-icon-close',
						{
							scale: 0
						},
						{
							scale: 1
						},
						'<'
					)
					.fromTo(
						'.games-gallery-filters-reset',
						{
							autoAlpha: 0,
							y: 10
						},
						{
							autoAlpha: 1,
							y: 0
						}
					)
					.fromTo(
						'.games-gallery-filters .games-gallery-filter',
						{
							autoAlpha: 0,
							y: 10
						},
						{
							autoAlpha: 1,
							y: 0,
							stagger: {
								each: 0.1,
								from: 'end'
							}
						},
						'-=.25'
					);
			}
		);

		const backdropNode = document.querySelector('.games-gallery-filters-backdrop');
		backdropNode?.addEventListener('click', () => {
			toggleFilters(); // Close the filters options if the user clicks on the backdrop
		});
	});

	const toggleFilters = () => {
		if (toggleFiltersAnimation && toggleFiltersAnimation.isActive()) return;
		gamesGalleryManager.toggleFilters(); // Toggle the filters state in the manager. This will be used in other components to know if there are filters in use or not
		if (gamesGalleryManager.areFiltersVisible()) {
			toggleFiltersAnimation?.play(); // if there are filters in use, open the filters panel
		} else {
			toggleFiltersAnimation?.reverse(); // if there are no filters in use, close the filters panel
		}
	};

	const clearFilters = () => {
		gamesGalleryManager.clearCurrentlyAppliedFilters();
		toggleFiltersOptions(); // Close the filters options if they are open, since we just cleared the filters and there's no need to show them anymore
	};
</script>

<div class="games-gallery-filters-container">
	<div class="games-gallery-filters-backdrop"></div>
	<!-- Arrow icon -->
	<button
		class="games-filters-toggler-arrow"
		onclick={toggleFilters}
		aria-label={m.toggle_filters({ locale })}
	>
		<svg class="games-filters-toggler-arrow-icon" viewBox="0 0 200 200">
			<use href="/icons/icon-set.svg#arrow" />
		</svg>
	</button>
	<!-- Filters buttons -->
	<div class="games-gallery-filters">
		{#each gamesGalleryManager.getFilters().categories as filter (filter.name)}
			<GamesGalleryFilter {filter} />
		{/each}
		<button
			class="games-gallery-filters-reset"
			onclick={clearFilters}
			aria-label={m.clear_filters({ locale })}
		>
			<svg class="games-gallery-filters-reset-icon" viewBox="0 0 24 24"
				><use href="/icons/icon-set.svg#clear" />
			</svg>
			{m.clear_filters({ locale })}</button
		>
	</div>
	<!-- Filter Icon -->
	<button
		class="games-filters-toggler"
		onclick={toggleFilters}
		aria-label={m.toggle_filters({ locale })}
	>
		<svg class="games-filters-toggler-icon" viewBox="0 0 200 200">
			<use href="/icons/icon-set.svg#filter" />
		</svg>
		<svg class="games-filters-toggler-icon-close" viewBox="0 0 200 200">
			<use href="/icons/icon-set.svg#close" />
		</svg>
	</button>
</div>

<style>
	.games-gallery-filters-container {
		display: flex;
		align-items: center;
		margin-left: auto;
		border-radius: 40px;
		padding: 8px;
		line-height: 1;
		background-color: var(--light-brown-900);
		color: var(--blu-600);
		z-index: 10;
		.games-gallery-filters-backdrop {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.1);
			opacity: 0;
			visibility: hidden;
			z-index: -1;
		}
		.games-filters-toggler-arrow {
			.games-filters-toggler-arrow-icon {
				width: 10px;
				height: 10px;
				stroke-width: 50px;
				transform: rotate(180deg);
			}
		}
		.games-gallery-filters {
			width: 0;
			height: 35px;
			display: flex;
			justify-content: center;
			gap: 16px;
			.games-gallery-filters-reset {
				width: 120px;
				display: flex;
				align-items: center;
				gap: 8px;
				padding: 4px 12px;
				margin-right: 16px;
				border-radius: 20px;
				background-color: var(--red-900);
				color: var(--light-brown-900);
				font-size: 14px;
				opacity: 0;
				visibility: hidden;
				.games-gallery-filters-reset-icon {
					width: 24px;
					height: 24px;
					fill: none;
					stroke-width: 2px;
				}
			}
		}
		.games-filters-toggler {
			position: relative;
			margin-left: auto;
			gap: 0;
			.games-filters-toggler-icon {
				width: 24px;
				height: 24px;
			}
			.games-filters-toggler-icon-close {
				width: 24px;
				height: 24px;
				position: absolute;
				top: 0;
				left: 0;
				transform: scale(0);
			}
		}
		@media (max-width: 768px) {
			.games-filters-toggler-arrow {
				display: none;
			}
			.games-gallery-filters {
				position: fixed;
				top: 65px;
				right: 0;
				width: 0;
				height: calc(100vh - 135px);
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				padding: 60px 16px 16px;
				background-color: inherit;
				border-radius: 20px 0 0 20px;
			}
		}
	}
</style>
