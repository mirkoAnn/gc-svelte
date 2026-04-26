<script lang="ts">
	import NavBranding from './../nav-branding.svelte';
	import { navManager } from './../nav-manager.svelte';
	import SocialBar from '../../../social/social-bar.svelte';
	import NavLinks from './nav-links.svelte';

	const initialSection = navManager.getCurrentSection();
</script>

<nav
	id="nav-sidemenu"
	class="nav-submenu"
	style="--nav-sidemenu-bg-color: var(--nav-sidemenu-bg-color-{initialSection});"
>
	<NavBranding sidemenu={true} />
	<NavLinks />
	<SocialBar />
</nav>

<style>
	.nav-submenu {
		height: 100vh;
		width: 300px;
		padding: 24px 16px 24px 16px;
		display: flex;
		flex-direction: column;
		gap: 0;
		background-color: var(--nav-sidemenu-bg-color);
		color: var(--nav-sidemenu-text-color);
		z-index: 1002;
		box-shadow: 2px 0 16px rgba(0, 0, 0, 0.3);

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
			padding: 20px 20px 16px;
			box-shadow: none;
		}
	}
</style>
