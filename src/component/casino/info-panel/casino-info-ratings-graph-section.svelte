<script lang="ts">
  import RadialChart from "../../graphics/charts/radial-chart.svelte";

  let { casinoGlobalData }: { casinoGlobalData: any } = $props();
</script>

<div class="casino-ratings-graph-container">
  <h2 class="casino-info-subtitle">Cosa trovi su {casinoGlobalData.title}</h2>
  <div class="casino-info-graph-container">
    <!-- Radial Chart with ratings -->
    <RadialChart
      data={[
        casinoGlobalData.info.bonusRating,
        casinoGlobalData.info.designRating,
        casinoGlobalData.info.mobileRating,
        casinoGlobalData.info.gamesRating,
        casinoGlobalData.info.supportRating,
      ]}
      labels={["Bonus", "Design", "Mobile", "Giochi", "Supporto"]}
    />
    <div class="casino-graph-data">
      <ul class="casino-graph-data-list">
        <li class="casino-graph-data-item">
          Bonus: <span class="casino-graph-data-value"
            >{casinoGlobalData.info.bonusRating}</span
          >/5
        </li>
        <li class="casino-graph-data-item">
          Design: <span class="casino-graph-data-value"
            >{casinoGlobalData.info.designRating}</span
          >/5
        </li>
        <li class="casino-graph-data-item">
          Mobile: <span class="casino-graph-data-value"
            >{casinoGlobalData.info.mobileRating}</span
          >/5
        </li>
        <li class="casino-graph-data-item">
          Giochi: <span class="casino-graph-data-value"
            >{casinoGlobalData.info.gamesRating}</span
          >/5
        </li>
        <li class="casino-graph-data-item">
          Supporto: <span class="casino-graph-data-value"
            >{casinoGlobalData.info.supportRating}</span
          >/5
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
