<script lang="ts">
  import { gameManager } from "./game-manager.svelte";
  let { game }: { game: any } = $props();
</script>

<div
  class="iframe-container {gameManager.checkIfOnFullscreen()
    ? 'fullscreen'
    : ''}"
>
  <iframe
    class="game-iframe"
    src={game.gameUrl}
    frameborder="0"
    allowfullscreen
    title="Gioca alla slot machine {game.title}"
  ></iframe>
  <button
    class="close-fullscreen-button"
    onclick={gameManager.toggleFullscreen}
    aria-label="Chiudi la modalità a tutto schermo"
  >
    <svg class="close-fullscreen-icon">
      <use href="/icons/icon-set.svg#close" />
    </svg>
  </button>
  <div class="casino-buttons">
    I Bonus per giocare alla {game.title}
  </div>
</div>

<style>
  .iframe-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1000;
    }
    .game-iframe {
      flex: 1;
      width: 100%;
      height: 100%;
      border: none;
    }
    .close-fullscreen-button {
      position: absolute;
      top: 16px;
      right: 16px;
      background: var(--blu-800);
      color: var(--light-brown-900);
      border: none;
      padding: 8px;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1001;
      opacity: 0;
      visibility: hidden;
    }
    .casino-buttons {
      width: 100%;
      background-color: var(--blu-800);
      color: var(--light-brown-900);
      text-align: center;
      opacity: 0;
      visibility: hidden;
      height: 0;
    }
  }
</style>
