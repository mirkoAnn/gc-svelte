<script>
  import { appManager } from "$lib/app-manager.svelte";
</script>

<a
  class="desktop-nav-branding-link"
  href="/"
  title="Gambling Online Italia {new Date().getFullYear()} - Il portale del gioco in Italia"
  aria-label="Gambling Online Italia - Home"
>
  <svg
    class="site-logo"
    viewBox="0 0 600 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use href="/icons/logo.svg#{appManager.getCountryCode()}" />
  </svg></a
>

<style>
  .desktop-nav-branding-link {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
    .site-logo {
      width: 200px;
      height: auto;
    }
  }
</style>
