<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	let { data, labels }: { data: number[]; labels: string[] } = $props();

	let ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		if (!canvas) return;
		if (!canvas.getContext) return;
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Valutazione Casinò',
						data: data
					}
				]
			},
			options: {
				scales: {
					x: {
						grid: {
							display: false,
							color: 'rgba(200, 200, 200, 0.5)'
						}
					},
					y: {
						beginAtZero: true,
						max: data.reduce((a, b) => (a > b ? a : b), 0) + 2,
						grid: {
							display: false,
							color: 'rgba(200, 200, 200, 0.5)'
						},
						ticks: {
							display: true
						}
					}
				},
				plugins: {
					legend: {
						display: false
					}
				},
				elements: {
					line: {
						borderWidth: 1,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						tension: 0.5,
						fill: true
					},
					point: {
						radius: 2,
						backgroundColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1
					}
				}
			}
		});
	});
</script>

<div class="graph-container">
	<canvas
		class="graph"
		bind:this={canvas}
		width="800"
		height="400"
		role="img"
		aria-label="Line chart: {labels.join(', ')}"
	></canvas>
</div>

<style>
	canvas {
		max-width: 100%;
		height: 100%;
	}
</style>
