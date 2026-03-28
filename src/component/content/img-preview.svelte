<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let {
		imgId, // Unique identifier for the image element to target with GSAP animations
		imgUrl,
		imgAlt,
		imgWidth,
		imgHeight,
		imgSize
	}: {
		imgId: string;
		imgUrl: string;
		imgAlt: string;
		imgWidth: string;
		imgHeight: string;
		imgSize: string;
	} = $props();

	let isExpanded = $state(false);

	const togglePreview = () => {
		isExpanded = !isExpanded;
		if (isExpanded) {
			gsap.to(`#img-${imgId}`, { autoAlpha: 1, scale: 1 });
		}
	};

	let scrollingAnimtion = $state<GSAPTimeline | null>(null);

	onMount(async () => {
		const scrollTrigger = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(scrollTrigger);

		scrollingAnimtion = gsap
			.timeline({
				scrollTrigger: {
					scroller: '.main-inner',
					trigger: `#img-${imgId}`,
					start: 'top 80%',
					end: 'top 30%',
					scrub: true
				}
			})
			.fromTo(
				`#img-${imgId}`,
				{ opacity: 0, scale: 0.95 },
				{
					opacity: 1,
					scale: 1
				}
			);
	});
</script>

<button
	id="img-{imgId}"
	class="img-button {imgSize}-img-button"
	onclick={togglePreview}
	class:expanded={isExpanded}
>
	<img
		class="img-preview"
		loading="lazy"
		decoding="async"
		src={imgUrl}
		alt="visualizza l'immagine {imgAlt} in anteprima ingrandita o ridotta"
		title="Visualizza l'immagine {imgAlt} in anteprima ingrandita o ridotta"
		width={imgWidth}
		height={imgHeight}
	/>
</button>

<style>
	.img-button {
		border: none;
		border-radius: 8px;
		background: none;
		padding: 0;
		cursor: zoom-in;
		width: 100%;
		margin: 32px auto;
		overflow: hidden;
		&.big-img-button {
			max-width: 800px;
		}
		&.expanded {
			background-color: rgba(0, 0, 0, 0.8);
			backdrop-filter: blur(4px);
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			max-width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10vh 10vw;
			cursor: zoom-out;
			z-index: 1000;
		}
		@media (max-width: 767px) {
			.img-preview {
				width: auto;
				max-height: 60vh;
			}
		}
	}
</style>
