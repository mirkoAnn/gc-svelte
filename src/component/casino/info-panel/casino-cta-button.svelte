<script lang="ts">
  let { casinoGlobalData }: { casinoGlobalData: any } = $props();
</script>

<a
  class="casino-info-cta-button"
  href={casinoGlobalData.affiliationUrl}
  target="_blank"
  rel="noopener noreferrer"
  title="Visita il sito web del casinò di {casinoGlobalData.title}"
  >Sito Web
  <svg class="casino-info-cta-button-icon">
    <use href="/icons/icon-set.svg#arrow" />
  </svg></a
>
<span class="casino-info-legal"
  >18+ | Si applicano
  <a
    href={casinoGlobalData.welcomeBonus.tcUrl}
    class="casino-info-legal-link"
    target="_blank"
    rel="noopener noreferrer"
    title="Termini e condizioni del bonus di {casinoGlobalData.title}">T&C</a
  > | Gioca Responsabilmente | ADM</span
>

<style>
  .casino-info-cta-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 80%;
    margin: auto 10% 0;
    padding: 12px 24px;
    background-color: var(--orange-900);
    color: var(--light-brown-900);
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    z-index: 1;
    transition: all 0.5s ease;
    .casino-info-cta-button-icon {
      width: 0.7rem;
      height: 0.7rem;
      stroke: currentColor;
      stroke-width: 26;
      transition: all 0.5s ease;
    }
    &:hover {
      background-color: var(--orange-800);
      .casino-info-cta-button-icon {
        transform: translateX(8px);
      }
    }
  }
  .casino-info-legal {
    font-size: 0.6rem;
    text-align: center;
    .casino-info-legal-link {
      color: var(--blu-500);
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
