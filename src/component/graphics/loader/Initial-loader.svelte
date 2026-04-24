<script lang="ts">
	import gsap from 'gsap/dist/gsap';
	import { onMount } from 'svelte';

	const letters = [
		['e', 'D', 'x', 'h', 'd', 't', 'z', 'w', 'b', 'l', 'm', 'r', 'S', 'r'],
		['D', 'x', 'h', 'd', 't', 'z', 'w', 'b', 'l', 'm', 'r', 't', 'G', 'r'],
		['h', 'd', 't', 'z', 'w', 'b', 'l', 'm', 'r', 't', 'f', 'v', 'O', 'r']
	];
	const hiddenspans = ['lot', 'ratis', 'line'];

	onMount(() => {
		document.querySelectorAll('.initial-loader .icon-row').forEach((row, i) => {
			gsap
				.timeline()
				.to(row, {
					y: 136 * (letters[0].length - 1) - 20,
					ease: 'back.inOut(1.1)',
					duration: 2,
					delay: i * 0.2
				})
				.to('.initial-loader .hidden-span', {
					maxWidth: '150px',
					marginRight: '10px',
					duration: 0.5,
					delay: 0.5
				})
				.to('.initial-loader .icons-container', {
					autoAlpha: 0,
					delay: 0.5
				})
				.to('.initial-loader .top', {
					y: '-100%'
				})
				.to(
					'.initial-loader .bottom',
					{
						y: '100%',
						onComplete: () => {
							const loader = document.querySelector('.initial-loader');
							if (loader) {
								loader.remove();
							}
						}
					},
					'<'
				);
		});
	});
</script>

<div class="initial-loader" role="status" aria-label="Loading">
	<div class="top"></div>
	<div class="bottom"></div>
	<div class="icons-container">
		{#each letters as letterRow, i (letterRow)}
			<div class="icon-row">
				{#each letterRow as letter (letter)}
					<div class="letter">{letter}</div>
				{/each}
			</div>
			<div class="hidden-span">{hiddenspans[i]}</div>
		{/each}
	</div>
</div>

<style>
	.initial-loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		z-index: 2000;
		/* pointer-events: none; */
		.top,
		.bottom {
			width: 100%;
			height: 50vh;
			background-color: var(--blu-800);
		}
		.icons-container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			align-items: flex-end;
			height: 6rem;
			overflow: hidden;
			.icon-row {
				position: relative;
				display: flex;
				flex-direction: column-reverse;
				align-items: flex-end;
				gap: 25px;
				font-size: 5rem;
				font-weight: bold;
				color: var(--light-brown-900);
				text-shadow: 0 0 8px var(--light-brown-900);
				.letter {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
			.hidden-span {
				font-size: 4rem;
				max-width: 0;
				overflow: hidden;
				color: var(--light-brown-900);
			}
		}
	}
</style>
