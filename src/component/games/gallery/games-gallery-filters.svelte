<script lang="ts">
	import { page } from '$app/state';
	import { gamesGalleryManager } from './games-gallery-manager.svelte';
	import GamesGalleryFilter from './games-gallery-filter.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import { m } from '../../../paraglide/messages';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';

	// Stored as state so GSAP timeline persists across re-renders; isActive() guards prevent re-triggering mid-animation
	let toggleFiltersAnimation = $state<GSAPTimeline | null>(null);

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	const filterCategories = $derived(gamesGalleryManager.getFilters().categories);
	const areFiltersVisible = $derived(gamesGalleryManager.areFiltersVisible());
	const filtersPanelId = 'games-gallery-filters-panel';

	const isReducedMotionEnabled = () =>
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const toggleFiltersOptions = () => {
		if (toggleFiltersAnimation && toggleFiltersAnimation.isActive()) return;
		if (isReducedMotionEnabled()) {
			gsap.set('.games-gallery-filters-backdrop', { autoAlpha: 0 });
			gsap.set('.games-gallery-filter-options', { height: 0 });
			gsap.set('.games-gallery-filter .games-gallery-filter-select-toggler-icon', { rotate: 180 });
			gamesGalleryManager.setCurrentVisibleFilter('');
			return;
		}
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
		const media = gsap.matchMedia();
		// Initialize the toggle filters animation with GSAP, but keep it paused until the user toggles the filters for the first time to avoid unnecessary animations on page load
		media.add(
			{
				isDesktop: '(min-width: 768px)',
				isMobile: '(max-width: 767px)',
				isReducedMotion: '(prefers-reduced-motion: reduce)'
			},
			(context) => {
				const isDesktop = Boolean(context.conditions?.isDesktop);
				const isReducedMotion = Boolean(context.conditions?.isReducedMotion);
				const duration = isReducedMotion ? 0 : 0.25;
				const easing = isReducedMotion ? 'none' : 'back.inOut(1.7)';

				toggleFiltersAnimation = gsap
					.timeline({ defaults: { ease: easing, duration }, paused: true })
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
							width: 0,
							x: 0
						},
						{
							width: isDesktop
								? gamesGalleryManager.getFilters().categories.length * 216 + 120 + 'px' // 216px per filter (200px width + 16px gap) + 120px for the reset button
								: '80vw',
							x: isDesktop ? 0 : -32,
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
							stagger: isReducedMotion
								? 0
								: {
										each: 0.1,
										from: 'end'
									}
						}
					);
			}
		);

		return () => {
			media.revert();
		};
	});

	const toggleFilters = () => {
		if (toggleFiltersAnimation && toggleFiltersAnimation.isActive()) return;
		gamesGalleryManager.toggleFilters(); // Toggle the filters state in the manager. This will be used in other components to know if there are filters in use or not
		if (isReducedMotionEnabled()) {
			const isOpen = gamesGalleryManager.areFiltersVisible();
			gsap.set('.games-gallery-filters-backdrop', { autoAlpha: isOpen ? 1 : 0 });
			gsap.set('.games-gallery-filters-container', {
				backgroundColor: isOpen ? '#3d6080ff' : '#f6f3edff',
				color: isOpen ? '#f6f3edff' : '#3d6080ff'
			});
			gsap.set('.games-gallery-filters', {
				width: isOpen
					? window.matchMedia('(min-width: 768px)').matches
						? gamesGalleryManager.getFilters().categories.length * 216 + 120 + 'px'
						: '80vw'
					: 0,
				x: isOpen && window.matchMedia('(max-width: 767px)').matches ? -32 : 0
			});
			gsap.set('.games-filters-toggler-arrow-icon', {
				rotate: isOpen ? 0 : 180,
				margin: isOpen ? '0 8px' : '0'
			});
			gsap.set('.games-filters-toggler-icon', { scale: isOpen ? 0 : 1 });
			gsap.set('.games-filters-toggler-icon-close', { scale: isOpen ? 1 : 0 });
			gsap.set('.games-gallery-filters-reset', { autoAlpha: isOpen ? 1 : 0, y: isOpen ? 0 : 10 });
			gsap.set('.games-gallery-filters .games-gallery-filter', {
				autoAlpha: isOpen ? 1 : 0,
				y: isOpen ? 0 : 10
			});
			if (!isOpen) {
				toggleFiltersOptions();
			}
			return;
		}
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
	<button
		type="button"
		class="games-gallery-filters-backdrop"
		onclick={toggleFilters}
		aria-label={m.close({}, { locale })}
		aria-hidden={!areFiltersVisible}
		tabindex={areFiltersVisible ? 0 : -1}
	></button>
	<!-- Arrow icon -->
	<button
		type="button"
		class="games-filters-toggler-arrow"
		onclick={toggleFilters}
		aria-label={m.toggle_filters({}, { locale })}
		aria-expanded={areFiltersVisible}
		aria-controls={filtersPanelId}
	>
		<svg class="games-filters-toggler-arrow-icon" viewBox="0 0 200 200" aria-hidden="true">
			<use href="/icons/icon-set.svg#arrow" />
		</svg>
	</button>
	<!-- Filters buttons -->
	<div id={filtersPanelId} class="games-gallery-filters" aria-hidden={!areFiltersVisible}>
		{#each filterCategories as filter (filter.name)}
			<GamesGalleryFilter {filter} />
		{/each}
		<div class="filters-button-container">
			<button
				type="button"
				class="games-gallery-filters-reset"
				onclick={clearFilters}
				aria-label={m.clear_filters({}, { locale })}
			>
				<svg class="games-gallery-filters-reset-icon" viewBox="0 0 24 24" aria-hidden="true"
					><use href="/icons/icon-set.svg#clear" />
				</svg>
				{m.clear_filters({}, { locale })}</button
			>
			<button
				type="button"
				class="games-apply-filters-button"
				onclick={toggleFilters}
				aria-label={m.toggle_filters({}, { locale })}
				aria-expanded={areFiltersVisible}
				aria-controls={filtersPanelId}
			>
				<svg class="games-apply-filters-icon" viewBox="0 0 200 200" aria-hidden="true">
					<use href="/icons/icon-set.svg#check" />
				</svg>
				{m.apply_filters({}, { locale })}
			</button>
		</div>
	</div>
	<!-- Filter Icon -->
	<button
		type="button"
		class="games-filters-toggler"
		onclick={toggleFilters}
		aria-label={m.toggle_filters({}, { locale })}
		aria-expanded={areFiltersVisible}
		aria-controls={filtersPanelId}
	>
		<svg class="games-filters-toggler-icon" viewBox="0 0 200 200" aria-hidden="true">
			<use href="/icons/icon-set.svg#filter" />
		</svg>
		<svg class="games-filters-toggler-icon-close" viewBox="0 0 200 200" aria-hidden="true">
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
			.filters-button-container {
				display: flex;
				align-items: center;
				gap: 8px;
				.games-apply-filters-button {
					width: 120px;
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 4px 12px;
					border-radius: 20px;
					background-color: var(--blu-600);
					color: var(--light-brown-900);
					font-size: 14px;
					.games-apply-filters-icon {
						width: 24px;
						height: 24px;
					}
				}
				.games-gallery-filters-reset {
					width: 120px;
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 4px 12px;
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
		@media (min-width: 768px) {
			.games-gallery-filters {
				.filters-button-container {
					.games-apply-filters-button {
						display: none;
					}
				}
			}
		}
		@media (max-width: 767px) {
			.games-filters-toggler-arrow {
				display: none;
			}
			.games-gallery-filters {
				position: fixed;
				top: 65px;
				right: -32px;
				width: 0;
				height: calc(100vh - 135px);
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				padding: 100px 16px 16px;
				background-color: inherit;
				border-radius: 20px 0 0 20px;
				.filters-button-container {
					margin: auto 0 16px 0;
				}
			}
		}
	}
</style>
