<script lang="ts">
  import FavouritesToggler from "../../favourites/favourites-toggler.svelte";
  import Rating from "../../rating/rating.svelte";
  import { gameManager } from "./game-manager.svelte";

  let { game, category }: { game: any; category: string } = $props();
</script>

<div class="game-actions-container">
  <div class="game-actions-inner">
    <button
      class="action-container game-error-button"
      onclick={gameManager.toggleErrorPopup}
      aria-label="Segnala un problema con questo gioco"
    >
      <svg class="action-icon help-icon">
        <use href="/icons/icon-set.svg#error" />
      </svg>
    </button>
    <div class="rating-container">
      <Rating entry={game} {category} />
    </div>
    <a
      href={gameManager.getRelatedCasinos()[0]?.affiliationUrl}
      class="real-money-button"
      title={`Gioca a ${game.title} con soldi reali`}
      >Soldi Reali
    </a>
    <div class="favourite-container">
      <FavouritesToggler data={game} {category} />
    </div>
    <button
      class="action-container fullscreen-button"
      onclick={gameManager.toggleFullscreen}
      aria-label="Gioca a tutto schermo"
    >
      <svg class="action-icon fullscreen-icon">
        <use href="/icons/icon-set.svg#fullscreen" />
      </svg>
    </button>
  </div>
</div>

<style>
  .game-actions-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 var(--mobile-padding);
    opacity: 0;
    visibility: hidden;
    .game-actions-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      background-color: var(--blu-700);
      color: var(--light-brown-900);
      border-radius: 16px;
      padding: 0 16px;
      .real-money-button {
        padding: 8px 50px;
        font-size: 0.8rem;
        border: none;
        border-radius: 24px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        background-color: var(--orange-900);
        color: var(--blu-900);
        font-weight: bold;
        margin: 0 auto;
        &:hover {
          background-color: var(--orange-800);
        }
      }
      .favourite-container {
        width: 20px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .action-icon {
        width: 18px;
        height: 18px;
      }
      @media (max-width: 767px) {
        .real-money-button {
          padding: 4px 24px;
        }
      }
    }
  }
</style>
