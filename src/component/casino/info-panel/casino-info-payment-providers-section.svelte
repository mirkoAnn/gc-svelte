<script lang="ts">
  let { casino }: { casino: any } = $props();
</script>

<div class="casino-info-payments-and-providers">
  <div class="casino-info-list-container casino-info-payment-methods">
    <h2 class="casino-info-subtitle">Metodi di Pagamento</h2>
    <ul class="casino-info-list">
      {#each casino.paymentMethods as paymentMethod}
        <li>
          <svg class="casino-info-list-item-icon" width="48" height="48">
            <use href={"/icons/payment-methods.svg#" + paymentMethod.slug} />
          </svg>
        </li>
      {/each}
    </ul>
  </div>
  <div class="casino-info-list-container casino-info-providers">
    <h2 class="casino-info-subtitle">Provider di Giochi</h2>
    <ul class="casino-info-list">
      {#each casino.providers.slice(0, 10) as provider}
        <li>
          <img
            class="casino-info-list-item-icon casino-info-provider-logo"
            src={provider.logo.url}
            alt="il logo di {provider.title}"
            title="il logo di {provider.title}"
            width={200}
            height={100}
            style="--bg-color: {provider.colors.background};"
          />
        </li>
      {/each}
      <a href="#providersGallery" class="casino-info-list-item-more">
        +{casino.providers.length - 10} altri
      </a>
    </ul>
  </div>
</div>

<style>
  .casino-info-payments-and-providers {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-left: 16px;
    border-left: 1px solid var(--light-brown-800);
    .casino-info-list-container {
      flex: 1;
      .casino-info-list {
        list-style: none;
        padding: 0;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        .casino-info-list-item-icon {
          width: 48px;
        }
        .casino-info-provider-logo {
          width: 80px;
          background-color: var(--bg-color);
          border-radius: 4px;
        }
        .casino-info-list-item-more {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          border-radius: 4px;
          background-color: var(--light-brown-800);
          color: #fff;
          font-size: 14px;
          text-decoration: none;
        }
      }
    }
    /* Mobile screen */
    @media (max-width: 1023px) {
      padding-left: 0;
      border-left: none;
    }
  }
</style>
