<script lang="ts">
  let { casino, casinoGlobalData }: { casino: any; casinoGlobalData: any } =
    $props();
</script>

<div class="casino-info-utils-container">
  <h2 class="casino-info-subtitle">Info Utili su {casino.title}</h2>
  <div class="casino-info-utils-inner">
    <!-- Contact Info -->
    <ul class="casino-info-utils-list">
      <li class="casino-info-utils-item">
        <span class="casino-info-utils-item-label">
          <svg class="casino-info-utils-item-icon" width="16" height="16"
            ><use href="/icons/casino-set.svg#web"></use></svg
          >
          Sito Web:</span
        >
        <a
          class="casino-info-utils-item-value casino-info-utils-link"
          href={casinoGlobalData.affiliationUrl}
          target="_blank"
          rel="noopener noreferrer">{casino.brand.homepageUrl}</a
        >
      </li>
      <li class="casino-info-utils-item">
        <span class="casino-info-utils-item-label">
          <svg class="casino-info-utils-item-icon" width="16" height="16"
            ><use href="/icons/casino-set.svg#email"></use></svg
          >
          Assistenza Clienti:</span
        >
        <a
          class="casino-info-utils-item-value casino-info-utils-link"
          href={"mailto:" + casino.brand.email}>{casino.brand.email}</a
        >
      </li>
      <li class="casino-info-utils-item">
        <span class="casino-info-utils-item-label">
          <svg class="casino-info-utils-item-icon" width="16" height="16"
            ><use href="/icons/casino-set.svg#phone"></use></svg
          >
          Telefono:</span
        >
        <a
          class="casino-info-utils-item-value casino-info-utils-link"
          href={"tel:" + casino.brand.telephone}>{casino.brand.telephone}</a
        >
      </li>
    </ul>

    <ul class="casino-info-utils-list">
      <li class="casino-info-utils-item">
        <span class="casino-info-utils-item-label">
          <svg class="casino-info-utils-item-icon" width="16" height="16"
            ><use href="/icons/casino-set.svg#money"></use></svg
          >
          Deposito Minimo:</span
        >
        <span class="casino-info-utils-item-value">
          {casino.brand.depositMin} €
        </span>
      </li>
      <li class="casino-info-utils-item">
        <span class="casino-info-utils-item-label">
          <svg class="casino-info-utils-item-icon" width="16" height="16"
            ><use href="/icons/casino-set.svg#money"></use></svg
          >
          Prelievo Minimo:</span
        >
        <span class="casino-info-utils-item-value">
          {casino.brand.withdrawalMin} €
        </span>
      </li>
      <li class="casino-info-utils-item">
        <span class="casino-info-utils-item-label">
          <svg class="casino-info-utils-item-icon" width="16" height="16"
            ><use href="/icons/casino-set.svg#clock"></use></svg
          >
          Tempo di Prelievo:</span
        >
        <span class="casino-info-utils-item-value">
          {casino.brand.withdrawalTime} h
        </span>
      </li>
    </ul>
  </div>
</div>

<style>
  .casino-info-utils-container {
    flex: 1;
    .casino-info-utils-inner {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .casino-info-utils-list {
        width: fit-content;
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 0.8rem;
        .casino-info-utils-item {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;
          .casino-info-utils-item-label {
            width: 150px;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .casino-info-utils-item-value {
            flex: 1;
            font-weight: bold;
            color: var(--blu-600);
          }
          .casino-info-utils-link {
            color: var(--blu-600);
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    @media (min-width: 768px) {
      .casino-info-utils-inner {
        max-width: 90%;
      }
    }
  }
</style>
