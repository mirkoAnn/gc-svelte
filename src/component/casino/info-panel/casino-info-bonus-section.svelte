<script lang="ts">
  import CasinoCtaButton from "./casino-cta-button.svelte";
  let { casinoGlobalData }: { casinoGlobalData: any } = $props();
</script>

<!-- Welcome Bonus -->
<ul class="casino-info-bonus-list">
  <li class="casino-info-bonus-item">
    <h2 class="casino-info-subtitle casino-info-bonus-item-title">
      <svg class="casino-info-bonus-item-icon">
        <use href="/icons/icon-set.svg#gift" />
      </svg>Bonus Senza Deposito
    </h2>
    <h3 class="casino-info-bonus-item-subtitle">
      <a
        class="casino-info-bonus-item-link"
        href={casinoGlobalData.affiliationUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Visita il sito web del casinò"
      >
        {casinoGlobalData.welcomeBonus.noDeposit}</a
      >
    </h3>
    <p class="casino-info-bonus-item-requirements">
      <svg class="casino-info-requirements-icon">
        <use href="/icons/icon-set.svg#info" />
      </svg>{casinoGlobalData.welcomeBonus.noDepositRequirements}
    </p>
  </li>
  <li class="casino-info-bonus-item">
    <h2 class="casino-info-subtitle casino-info-bonus-item-title">
      <svg class="casino-info-bonus-item-icon">
        <use href="/icons/icon-set.svg#gift" />
      </svg>Bonus con Deposito
    </h2>
    <h3 class="casino-info-bonus-item-subtitle">
      <a
        class="casino-info-bonus-item-link"
        href={casinoGlobalData.affiliationUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Visita il sito web del casinò"
      >
        {casinoGlobalData.welcomeBonus.withDeposit}
      </a>
    </h3>
    <p class="casino-info-bonus-item-requirements">
      <svg class="casino-info-requirements-icon">
        <use href="/icons/icon-set.svg#info" />
      </svg>{casinoGlobalData.welcomeBonus.withDepositRequirements}
    </p>
  </li>
</ul>
<CasinoCtaButton {casinoGlobalData} />

<style>
  .casino-info-bonus-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
    text-align: center;
    .casino-info-bonus-item {
      flex: 1;
      .casino-info-bonus-item-link {
        color: var(--orange-900);
        text-decoration: none;
        &:hover {
          color: var(--orange-800);
        }
      }
      .casino-info-bonus-item-title {
        margin-bottom: 4px;
        .casino-info-bonus-item-icon {
          width: 1.2rem;
          height: 1.2rem;
          vertical-align: middle;
          margin-right: 4px;
        }
      }
      .casino-info-bonus-item-subtitle {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: var(--orange-900);
      }
      .casino-info-bonus-item-requirements {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        font-size: 0.6rem;
        .casino-info-requirements-icon {
          min-width: 10px;
          width: 10px;
          aspect-ratio: 1/1;
        }
      }
    }
  }
</style>
