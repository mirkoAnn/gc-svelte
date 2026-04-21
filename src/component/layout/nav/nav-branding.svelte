<script>
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { resolve } from '$app/paths';
	import { m } from '../../../paraglide/messages';

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<a
	class="desktop-nav-branding-link"
	href={resolve('/')}
	title={m.site_description({ year: new Date().getFullYear() }, { locale })}
	aria-label={m.site_description({ year: new Date().getFullYear() }, { locale })}
>
	<svg class="site-logo" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
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
	}
</style>
