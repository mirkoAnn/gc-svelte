<script lang="ts">
	import gsap from 'gsap/dist/gsap';
	import { onMount } from 'svelte';
	import { m } from '../../../paraglide/messages';
	import { appManager } from '$lib/app-manager.svelte';
	import type { Game } from '$lib/types/games';

	let { games }: { games: Game[] } = $props();

	const locale = $derived(appManager.getCountryCode());

	let currentSlide = 0; // Start with the last slide to create a seamless loop,
	let slidingAnimation = $state<GSAPTimeline | null>(null); // Store the current sliding animation to prevent overlapping animations
	const slideWidth = 300; // Width of each slide including the gap, used to calculate the translation distance for the sliding animation
	const slideInterval = 3000; // Time in milliseconds between each slide transition

	const slideItem = () => {
		if (slidingAnimation && slidingAnimation.isActive()) return; // Prevent starting a new animation if one is already running

		currentSlide = (currentSlide + 1) % games.length; // Move to the next slide, loop back to the first slide after the last one
		slidingAnimation = gsap
			.timeline({
				defaults: { duration: 1 }
			})
			.to(`.games-slider-item`, {
				minWidth: slideWidth,
				x: currentSlide * -(slideWidth + 32) // Move all slides to the left by the width of one slide plus the gap, multiplied by the current slide index
			})
			.to(
				'.games-slider-item .game-image',
				{
					x: 0
				},
				'<'
			)
			.to(
				`.games-slider-item .game-title`,
				{
					scale: 0.5
				},
				'<'
			)
			.to(
				`.games-slider-item-${currentSlide}`,
				{
					minWidth: 800
				},
				'<'
			)
			.to(
				`.games-slider-item-${currentSlide} .game-image`,
				{
					x: -200
				},
				'<'
			)
			.to(
				`.games-slider-item-${currentSlide} .game-title`,
				{
					scale: 1
				},
				'<'
			);
		setTimeout(() => {
			slideItem();
		}, slideInterval); // Add a small delay to allow the scroll event to finish before starting the animation
	};

	onMount(async () => {
		slideItem();
	});
</script>

<div class="games-slider" style="--slide-width: {slideWidth}px">
	{#each games as game, i (game.id)}
		<div class="games-slider-item games-slider-item-{i}" style="--bg-image: url({game.logo.url})">
			<img
				loading="eager"
				decoding="async"
				class="game-image"
				src={game.logo.url}
				alt={m.logo_description({ title: game.title }, { locale })}
				width="1000"
				height="500"
			/>
			<h3 class="game-title">{game.title}</h3>
		</div>
	{/each}
</div>

<style>
	.games-slider {
		display: flex;
		gap: 32px;
		overflow-x: hidden;
		padding: 0 64px;
		.games-slider-item {
			position: relative;
			min-width: var(--slide-width);
			height: 500px;
			overflow: hidden;
			border-radius: 16px;
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: var(--light-brown-900);
				opacity: 0.2;
			}
			&:first-child {
				min-width: 800px;
			}
			.game-image {
				position: absolute;
				top: 0;
				left: 0;
				min-width: 1000px;
				height: 100%;
			}
			.game-title {
				position: absolute;
				top: 30%;
				left: 10%;
				width: 100px;
				color: var(--light-brown-900);
				font-size: 3rem;
				margin: 0;
				transform: scale(0.5);
			}
		}
	}
</style>
