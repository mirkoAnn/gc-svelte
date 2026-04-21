<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type { Casino } from '$lib/types/casino';
	import { m } from '../../../paraglide/messages';
	import LineChart from '../../graphics/charts/line-chart.svelte';

	let { casinoGlobalData }: { casinoGlobalData: Casino } = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<div class="casino-opinion-graph-container">
	<h2 class="casino-info-subtitle">
		{m.casino_opninion_graph_title({ locale })}
	</h2>
	<LineChart
		data={casinoGlobalData.rating.trend.map((item: { value: number; month: string }) => item.value)}
		labels={casinoGlobalData.rating.trend.map(
			(item: { value: number; month: string }) => item.month
		)}
	/>
</div>

<style>
	.casino-opinion-graph-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-left: 16px;
		border-left: 1px solid var(--light-brown-800);
	}
</style>
