<script lang="ts">
  import { fade } from "svelte/transition";
  import { ageBannerManager } from "./age-banner-manager.svelte";
  import { navManager } from "../nav/nav-manager.svelte";
</script>

{#if !ageBannerManager.isAgeVerified()}
  <div class="age-banner-container" transition:fade>
    <div
      class="age-banner-content"
      style="--bg-color: var(--age-banner-bg-color-{navManager.getCurrentSection()}"
    >
      <svg
        class="age-banner-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="64"
        height="64"
        fill="#f39c12"
      >
        <use href="/icons/icon-set.svg#+18" />
      </svg>
      <p class="age-banner-text">
        Devi avere almeno 18 anni per accedere a questo sito. Per favore
        conferma la tua età.
      </p>
      <p class="age-banner-subtext">Confermi di avere almeno 18 anni?</p>
      <div class="age-banner-buttons">
        <button
          class="age-banner-button yes"
          onclick={ageBannerManager.verifyAge}>Si, confermo</button
        >
        <button
          class="age-banner-button no"
          onclick={ageBannerManager.denyAccess}>No, vado via</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .age-banner-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--blu-900-opacity-500);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    .age-banner-content {
      background-color: var(--bg-color);
      color: var(--age-banner-text-color);
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      max-width: 400px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      .age-banner-icon {
        margin-bottom: 1rem;
      }
      .age-banner-text {
        font-size: 1.25rem;
        font-weight: bold;
      }
      .age-banner-subtext {
        margin-top: 3rem;
        font-size: 1rem;
      }
      .age-banner-buttons {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
      }
      .age-banner-button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 24px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .age-banner-button.yes {
        background-color: var(--green-500);
        color: var(--);
      }
      .age-banner-button.no {
        background-color: var(--red-800);
        color: #fff;
      }
    }
  }
</style>
