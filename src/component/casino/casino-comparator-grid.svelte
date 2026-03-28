<script lang="ts">
  import CasinoComparatorGridSection from "./casino-comparator-grid-section.svelte";
  import { casinosDataManager } from "./casinos-data-manager.svelte";

  let { currentId }: { currentId: string } = $props();

  const casinos = [
    casinosDataManager.getCasinoById(currentId), // Include the current casino as the first item
    ...casinosDataManager.getTopCasinos(3, currentId), // Get the top 4 casinos excluding the current one
  ];

  let currentIndex = $state(1);
</script>

<div class="casino-comparator-table-container">
  {#if casinos.length === 0}
    <span class="warning-messsage"
      >Non è possibile copnfrontare questo casino al momento.</span
    >
  {:else}
    <div class="casino-comparator-table">
      <div class="casino-comparator-section">
        <img
          class="casino-comparator-logo compared-casino"
          src={casinos[0].logo.url}
          alt="Logo del casino confrontato"
          title="Logo del casino confrontato"
          width="200"
          height="100"
          loading="lazy"
          decoding="async"
          style="--bg-color: {casinos[0].colors.background}"
        />
        <img
          class="casino-comparator-logo current-casino"
          src={casinos[currentIndex].logo.url}
          alt="Logo del casino attuale"
          title="Logo del casino attuale"
          width="200"
          height="100"
          loading="lazy"
          decoding="async"
          style="--bg-color: {casinos[currentIndex].colors.background}"
        />
      </div>
      <div class="casino-comparator-section">
        <CasinoComparatorGridSection
          title="Bonus"
          comparedCasinoValue={casinos[0].info.bonusRating}
          currentCasinoValue={casinos[currentIndex].info.bonusRating}
        />
      </div>
      <div class="casino-comparator-section">
        <CasinoComparatorGridSection
          title="Design"
          comparedCasinoValue={casinos[0].info.designRating}
          currentCasinoValue={casinos[currentIndex].info.designRating}
        />
      </div>
      <div class="casino-comparator-section">
        <CasinoComparatorGridSection
          title="Mobile"
          comparedCasinoValue={casinos[0].info.mobileRating}
          currentCasinoValue={casinos[currentIndex].info.mobileRating}
        />
      </div>
      <div class="casino-comparator-section">
        <CasinoComparatorGridSection
          title="Giochi"
          comparedCasinoValue={casinos[0].info.gamesRating}
          currentCasinoValue={casinos[currentIndex].info.gamesRating}
        />
      </div>
      <div class="casino-comparator-section">
        <CasinoComparatorGridSection
          title="Supporto"
          comparedCasinoValue={casinos[0].info.supportRating}
          currentCasinoValue={casinos[currentIndex].info.supportRating}
        />
      </div>
    </div>
    <div class="arrows-container">
      <button
        class="arrow left-arrow"
        aria-label="Mostra il casino precedente"
        onclick={() => (currentIndex = Math.max(currentIndex - 1, 1))}
        disabled={currentIndex === 1}
      >
        <svg class="arrow-icon">
          <use href="/icons/icon-set.svg#fill-arrow" />
        </svg>
      </button>
      <button
        class="arrow right-arrow"
        aria-label="Mostra il casino successivo"
        onclick={() =>
          (currentIndex = Math.min(currentIndex + 1, casinos.length - 1))}
        disabled={currentIndex === casinos.length - 1}
      >
        <svg class="arrow-icon">
          <use href="/icons/icon-set.svg#fill-arrow" />
        </svg>
      </button>
    </div>
  {/if}
</div>

<style>
  .casino-comparator-table-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 32px 0;
    .warning-messsage {
      font-size: 16px;
      color: var(--red-800);
      text-align: center;
    }
    .casino-comparator-table {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 100%;
      .casino-comparator-section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 32px;
        width: 100%;
        max-width: 400px;
        .casino-comparator-logo {
          width: calc(50% - 16px);
          height: auto;
          padding: 8px;
          background-color: var(--bg-color);
          border-radius: 8px;
          margin-bottom: 16px;
        }
      }
    }
    .arrows-container {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 16px;
      .arrow {
        color: inherit;
        .arrow-icon {
          width: 24px;
          height: 24px;
        }
        &:disabled {
          opacity: 0.2;
          cursor: default;
        }
      }
      .left-arrow {
        .arrow-icon {
          transform: rotate(270deg);
        }
      }
      .right-arrow {
        .arrow-icon {
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
