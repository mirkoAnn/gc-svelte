<script lang="ts">
  import NavSectionToggler from "./nav-section-toggler.svelte";
  import NavActions from "./nav-actions.svelte";
  import NavMenuPanel from "./nav-menu-panel.svelte";
  import { navManager } from "./nav-manager.svelte";
  import { beforeNavigate } from "$app/navigation";

  beforeNavigate(() => {
    navManager.toggleMenu(-1);
  });
  const initialSection = navManager.getCurrentSection();
</script>

<div
  class="nav"
  aria-label="Navigazione Principale"
  role="presentation"
  style="--nav-bg-color: var(--navbar-bg-color-{initialSection});"
>
  <div class="nav-inner">
    <NavActions />
  </div>
  <div class="nav-menu-panel">
    <NavMenuPanel />
  </div>
</div>
<NavSectionToggler />

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 300px;
    width: calc(100% - 300px);
    height: var(--navbar-height);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--nav-bg-color);
    color: var(--navbar-text-color);
    .nav-inner {
      position: relative;
      width: 100%;
      height: 100%;
      max-height: var(--navbar-height);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
      z-index: 950;
    }
    .nav-menu-panel {
      position: relative;
      flex: 1;
      width: 100%;
      z-index: 900;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
    }
    @media (max-width: 767px) {
      left: 0;
      width: 100%;
    }
  }
</style>
