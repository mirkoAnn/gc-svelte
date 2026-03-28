<script>
  import Gallery from "../games/gallery/games-gallery.svelte";
  import { favouritesManager } from "./favourites-manager.svelte";
</script>

<div class="favourites">
  {#if favouritesManager.getListByCategory("slot").length > 0}
    <Gallery
      games={favouritesManager.getListByCategory("slot")}
      category="slot"
      title="Le Tue Slot Preferite"
      type="carousel"
    />
  {/if}
</div>

<style>
  .favourites {
    width: 90%;
  }
</style>
