<script lang="ts">
  import LineChart from "../../graphics/charts/line-chart.svelte";

  let { casinoGlobalData }: { casinoGlobalData: any } = $props();
</script>

<div class="casino-opinion-graph-container">
  <h2 class="casino-info-subtitle">Gradimento Utenti</h2>
  <LineChart
    data={casinoGlobalData.rating.trend.map((item: any) => item.value)}
    labels={casinoGlobalData.rating.trend.map((item: any) => item.month)}
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
