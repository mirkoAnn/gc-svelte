<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { data, labels, textColor }: { data: number[]; labels: string[]; textColor?: string } =
		$props();

	let ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		if (!canvas) return;
		if (!canvas.getContext) return;
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		new Chart(ctx, {
			type: 'radar',
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
					r: {
						beginAtZero: true,
						max: 5,
						grid: {
							color: 'rgba(200, 200, 200, 0.5)'
						},
						pointLabels: {
							color: textColor || '#333',
							font: {
								size: 12
							}
						},
						ticks: {
							display: true,
							stepSize: 1,
							backdropColor: 'transparent',
							color: textColor || '#333'
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
						tension: 0.1,
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
		width={300}
		height={300}
		aria-label="Radar chart: {labels.join(', ')}"
	></canvas>
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
