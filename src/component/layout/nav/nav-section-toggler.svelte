<script lang="ts">
  import { capitalizeFirstLetter } from "./../../../lib/utils.svelte";
  import { navManager } from "./nav-manager.svelte";

  const initialSection = navManager.getCurrentSection();
</script>

<div
  class="nav-section-toggler"
  style="
  --toggler-bg-color: var(--navbar-section-toggler-bg-color-{initialSection});
  --toggler-mobile-bg-color: var(--navbar-section-toggler-mobile-bg-color-{initialSection});
  --sections-count: {navManager.getMenuSections().length};"
>
  <div class="nav-section-selector"></div>
  {#each navManager.getMenuSections() as section}
    <button
      class="nav-section-toggler-button nav-section-toggler-button-{section.toLowerCase()} {section ===
      initialSection
        ? 'initial'
        : ''}"
      onclick={() => navManager.changeSection(section)}
    >
      <svg
        class="nav-section-toggler-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <use
          href="/icons/{section.toLowerCase()}-set.svg#{section.toLowerCase()}"
        ></use>
      </svg>
      <span class="nav-section-toggler-label">
        {capitalizeFirstLetter(section)}
      </span>
    </button>
  {/each}
</div>

<style>
  .nav-section-toggler {
    position: fixed;
    display: flex;
    background-color: var(--toggler-bg-color);
    border-radius: 50px;
    padding: 10px;
    z-index: 1002;
    .nav-section-selector {
      position: absolute;
      top: 4px;
      left: 10px;
      width: 90px;
      height: calc(100% - 8px);
      background-color: var(--navbar-text-color);
      border-radius: 50px;
    }
    .nav-section-toggler-button {
      width: 90px;
      color: var(--navbar-text-color);
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      z-index: 1;
      display: flex;
      align-items: center;
      &.initial {
        color: var(--toggler-bg-color);
      }
      .nav-section-toggler-icon {
        width: 20px;
        height: 20px;
      }
    }
    @media (min-width: 768px) {
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    @media (max-width: 767px) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 16px;
      border-radius: 0;
      background-color: var(--toggler-mobile-bg-color);
      .nav-section-selector {
        width: calc(100% / var(--sections-count) - 32px);
        left: 16px;
        border-radius: 8px;
      }
      .nav-section-toggler-button {
        flex: 1;
        flex-direction: column;
        font-size: 8px;
        .nav-section-toggler-icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
