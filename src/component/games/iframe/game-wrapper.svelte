<script lang="ts">
  import GameIframe from "./game-iframe.svelte";
  import GameIntro from "./game-intro.svelte";
  import { gameManager } from "./game-manager.svelte";
  import GameActionsBar from "./game-actions-bar.svelte";

  let { game, category }: { game: any; category: string } = $props();
</script>

<div class="game-container">
  <div class="game-wrapper">
    {#if gameManager.checkIfVisible()}
      <GameIframe {game} />
    {:else}
      <GameIntro {game} {category} />
    {/if}
  </div>
  <GameActionsBar {game} {category} />
</div>

<style>
  .game-container {
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--mobile-padding);
    .game-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: var(--blu-700);
      border-radius: 16px;
      overflow: hidden;
    }
    @media (max-width: 767px) {
      height: 50vh;
    }
    @media (min-width: 768px) {
      max-height: 60vh;
      aspect-ratio: 16/9;
    }
  }
</style>
