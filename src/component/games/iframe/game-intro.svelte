<script lang="ts">
  import { gameManager } from "./game-manager.svelte";

  let { game, category }: { game: any; category: string } = $props();
</script>

<div class="game-intro-container">
  <h1 class="page-title">{game.title}</h1>
  <p class="choose-mode-message">Scegli la modalità di gioco</p>
  <div class="buttons-container">
    <button
      class="demo-button"
      onclick={() => {
        gameManager.toggleGame(game.id, game.sessions + 1, category);
      }}
    >
      Demo Gratis
    </button>
    <a
      href={gameManager.getRelatedCasinos()[0]?.affiliationUrl}
      class="real-money-button"
      title={`Gioca a ${game.title} con soldi reali`}>Soldi Reali</a
    >
  </div>
  <p class="disclaimer">
    <span class="disclaimer-phrase">Gioca Responsabilmente.</span>
    <span class="disclaimer-phrase"
      >Premendo i pulsanti "Demo Gratis" o "Soldi Reali" dichiari di essere
      maggiorenne.</span
    >
  </p>
</div>

<style>
  .game-intro-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    color: var(--light-brown-900);
    .buttons-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      .demo-button,
      .real-money-button {
        padding: 15px 30px;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        border: none;
        border-radius: 24px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .demo-button {
        background-color: var(--light-brown-800);
        color: var(--blu-800);
        &:hover {
          background-color: var(--light-brown-900);
        }
      }
      .real-money-button {
        background-color: var(--orange-900);
        color: var(--blu-800);
        &:hover {
          background-color: var(--orange-800);
        }
      }
    }
    .disclaimer {
      font-size: 0.6rem;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 16px;
      text-align: center;
      color: var(--light-brown-800);
    }
    @media (max-width: 767px) {
      .buttons-container {
        flex-direction: column;
        .demo-button,
        .real-money-button {
          width: 80%;
        }
      }
    }
  }
</style>
