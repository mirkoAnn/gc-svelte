<script>
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { resolve } from '$app/paths';
	import { m } from '../../../paraglide/messages';

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	/** @type {{ sidemenu?: boolean }} */
	let { sidemenu = false } = $props();
</script>

<a
	class="desktop-nav-branding-link"
	class:sidemenu
	href={resolve('/')}
	aria-label={m.site_description({ year: new Date().getFullYear() }, { locale })}
>
	<svg
		class="site-logo"
		viewBox="0 0 600 300"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<use href="/icons/logo.svg#{locale}" />
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

		&.sidemenu {
			justify-content: flex-start;
			padding-bottom: 24px;
			margin-bottom: 24px;
			border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		}

		@media (max-width: 767px) {
			&.sidemenu {
				display: none;
			}
		}
	}
</style>
