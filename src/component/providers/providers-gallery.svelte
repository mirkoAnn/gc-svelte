<script lang="ts">
  let { providers }: { providers: any } = $props();
</script>

<div class="providers-gallery">
  {#each providers as provider}
    <a
      href={`/providers/${provider.slug}`}
      class="provider-card"
      style="--bg-color:{provider.colors.background}"
    >
      <img src={provider.logo.url} alt={provider.title} class="provider-logo" />
    </a>
  {/each}
</div>

<style>
  .providers-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    .provider-card {
      width: 100px;
      text-align: center;
      background-color: var(--bg-color);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      .provider-logo {
        max-width: 100%;
        height: auto;
      }
    }
  }
</style>
