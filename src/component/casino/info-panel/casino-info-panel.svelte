<script lang="ts">
  import { casinosDataManager } from "../casinos-data-manager.svelte";
  import CasinoInfoBonusSection from "./casino-info-bonus-section.svelte";
  import CasinoInfoPaymentProvidersSection from "./casino-info-payment-providers-section.svelte";
  import CasinoInfoRatingsGraphSection from "./casino-info-ratings-graph-section.svelte";
  import CasinoInfoUtils from "./casino-info-utils.svelte";
  import CasinoOpinionGraphSection from "./casino-opinion-graph-section.svelte";

  // Casino props doesn't contains all data we need, so we fetch some data globally.
  let { casino }: { casino: any } = $props();

  // Some casino data are fetched globally via casinosDataManager to ensure consistency across the site.
  // this variables holds the global data for the given casino.
  const casinoGlobalData = casinosDataManager.getCasinoById(casino.id);
</script>

<div class="casino-info-panel">
  {#if casinoGlobalData}
    <div class="casino-info-panel-inner">
      <div class="casino-info-section casino-info-header-section">
        <h1 class="page-title">
          {casinoGlobalData.title} - Bonus, Info e Opinioni sul Casinò
        </h1>
        <!-- Casino Logo -->
        <img
          loading="eager"
          class="casino-info-logo"
          src={casinoGlobalData.logo.url}
          width={400}
          height={100}
          alt="il logo di {casinoGlobalData.title}"
          title="il logo di {casinoGlobalData.title}"
          style="--bg-color:{casinoGlobalData.colors.background}"
        />
        <CasinoInfoBonusSection {casinoGlobalData} />
      </div>
      <div class="casino-main-container">
        <div class="casino-info-section">
          <!-- Casino Ratings Graph -->
          <CasinoInfoRatingsGraphSection {casinoGlobalData} />
          <!-- Casino Payments Methods and Providers -->
          <CasinoInfoPaymentProvidersSection {casino} />
        </div>
        <div class="casino-info-section">
          <!-- Contact and Usefull Info -->
          <CasinoInfoUtils {casino} {casinoGlobalData} />
          <!-- Casino Opinion Graph -->
          <CasinoOpinionGraphSection {casinoGlobalData} />
        </div>
      </div>
    </div>
  {:else}
    <p>Non ci sono informazioni su questo casinò al momento.</p>
  {/if}
</div>

<style>
  .casino-info-panel {
    width: 90%;
    margin: 0 auto 100px auto;
    .casino-info-panel-inner {
      display: flex;
      gap: 32px;
      .casino-info-section {
        display: flex;
      }
      :global(.casino-info-subtitle) {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: var(--blu-600);
      }
      .casino-info-header-section {
        flex: 1;
        font-size: 0.8rem;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .page-title {
          font-size: 1.5rem;
          margin-bottom: 0;
          color: var(--blu-600);
        }
        .casino-info-logo {
          max-width: 200px;
          margin: 16px auto;
          padding: 8px;
          border-radius: 8px;
          background-color: var(--bg-color);
        }
      }
      .casino-main-container {
        flex: 3;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
    @media (min-width: 1025px) {
      .casino-info-panel-inner {
        .casino-info-section {
          padding: 32px;
          border-radius: 8px;
          background-color: var(--white-900);
        }
      }
    }
    @media (max-width: 1023px) {
      .casino-info-panel-inner {
        flex-direction: column;
        gap: 64px;
        .casino-info-section {
          flex-direction: column;
          gap: 32px;
        }
      }
    }
  }
</style>
