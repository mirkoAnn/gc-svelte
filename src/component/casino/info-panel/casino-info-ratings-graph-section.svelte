<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type { Casino } from '$lib/types/casino';
	import { m } from '../../../paraglide/messages';
	import RadialChart from '../../graphics/charts/radial-chart.svelte';

	let { casinoGlobalData }: { casinoGlobalData: Casino } = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<div class="casino-ratings-graph-container">
	<h2 class="casino-info-subtitle">
		{m.casino_graph_title({ casinoTitle: casinoGlobalData.title }, { locale })}
	</h2>
	<div class="casino-info-graph-container">
		<!-- Radial Chart with ratings -->
		<RadialChart
			data={[
				casinoGlobalData.info.bonusRating,
				casinoGlobalData.info.designRating,
				casinoGlobalData.info.mobileRating,
				casinoGlobalData.info.gamesRating,
				casinoGlobalData.info.supportRating
			]}
			labels={[
				m.bonus({}, { locale }),
				m.design({}, { locale }),
				m.mobile({}, { locale }),
				m.games({}, { locale }),
				m.support({}, { locale })
			]}
		/>
		<div class="casino-graph-data">
			<ul class="casino-graph-data-list">
				<li class="casino-graph-data-item">
					{m.bonus({}, { locale })}:
					<span class="casino-graph-data-value">{casinoGlobalData.info.bonusRating}</span>/5
				</li>
				<li class="casino-graph-data-item">
					{m.design({}, { locale })}:
					<span class="casino-graph-data-value">{casinoGlobalData.info.designRating}</span>/5
				</li>
				<li class="casino-graph-data-item">
					{m.mobile({}, { locale })}:
					<span class="casino-graph-data-value">{casinoGlobalData.info.mobileRating}</span>/5
				</li>
				<li class="casino-graph-data-item">
					{m.games({}, { locale })}:
					<span class="casino-graph-data-value">{casinoGlobalData.info.gamesRating}</span>/5
				</li>
				<li class="casino-graph-data-item">
					{m.support({}, { locale })}:
					<span class="casino-graph-data-value">{casinoGlobalData.info.supportRating}</span>/5
				</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.casino-ratings-graph-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		.casino-info-graph-container {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 32px;
			.casino-graph-data {
				.casino-graph-data-list {
					list-style: none;
					padding: 0;
					margin: 0;
					.casino-graph-data-item {
						font-size: 12px;
						margin-bottom: 8px;
						.casino-graph-data-value {
							font-weight: bold;
							font-size: 16px;
							color: var(--graph-color);
						}
					}
				}
			}
		}
		@media (min-width: 768px) {
			.casino-info-graph-container {
				:global(.graph-container) {
					flex: 1;
					max-width: 300px;
					max-height: 300px;
				}
			}
		}
		@media (max-width: 767px) {
			.casino-info-graph-container {
				flex-direction: column;
				gap: 16px;
				.casino-graph-data {
					.casino-graph-data-list {
						display: flex;
						flex-wrap: wrap;
						gap: 16px;
						justify-content: center;
						.casino-graph-data-item {
							font-size: 14px;
							min-width: calc(33% - 16px);
						}
					}
				}
			}
		}
	}
</style>
