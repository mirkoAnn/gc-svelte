<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { data }: { data: number[] } = $props();

	let ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		if (!canvas) return;
		if (!canvas.getContext) return;
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [''],
				datasets: [
					{
						data: data,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
						borderRadius: 100
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				indexAxis: 'y',
				scales: {
					x: {
						beginAtZero: true,
						max: 5,
						grid: {
							display: false
						},
						ticks: {
							display: false
						},
						border: {
							display: false
						}
					},
					y: {
						grid: {
							display: false
						},
						ticks: {
							display: false
						},
						border: {
							display: false
						}
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});
	});
</script>

<div class="graph-container">
	<canvas class="graph" bind:this={canvas} width={300} height={300}></canvas>
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
