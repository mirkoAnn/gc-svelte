<script lang="ts">
  import NavBranding from "./../nav-branding.svelte";
  import { navManager } from "./../nav-manager.svelte";
  import SocialBar from "../../../social/social-bar.svelte";
  import NavLinks from "./nav-links.svelte";

  const initialSection = navManager.getCurrentSection();
</script>

<nav
  id="nav-sidemenu"
  class="nav-submenu"
  style="--nav-sidemenu-bg-color: var(--nav-sidemenu-bg-color-{initialSection});"
>
  <NavBranding />
  <NavLinks />
  <SocialBar />
</nav>

<style>
  .nav-submenu {
    height: 100vh;
    width: 300px;
    padding: 16px 16px 32px 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    background-color: var(--nav-sidemenu-bg-color);
    color: var(--nav-sidemenu-text-color);
    z-index: 1002;
    @media (max-width: 767px) {
      position: fixed;
      top: var(--navbar-height);
      left: 0;
      width: 100vw;
      height: calc(
        100vh - var(--navbar-height) * 2
      ); /* navbar height accounted twice so we can show also bottom sections toggler */
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
