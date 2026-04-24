<script lang="ts">
	import { CountryCodes } from '$lib/app-manager.svelte';
	import NavSidemenu from '../component/layout/nav/sidemenu/nav-sidemenu.svelte';
	import Nav from '../component/layout/nav/nav.svelte';
	import Footer from '../component/layout/footer/footer.svelte';
	import AgeBanner from '../component/layout/age-banner/age-banner.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { appManager } from '../lib/app-manager.svelte';
	import { favouritesManager } from '../component/favourites/favourites-manager.svelte';
	import { casinosDataManager } from '../component/casino/casinos-data-manager.svelte';
	import { SITE_URL } from '../component/metadata/sitedata-manager.svelte.js';

	// Props passed from the server load function
	let { data, children } = $props();

	const initializeClientManagers = () => {
		if (!browser) {
			return;
		}
		favouritesManager.initialize(data.favouritesList);
		casinosDataManager.initialize(data.casinos);
		appManager.setCountryCode(data.countryCode);
	};

	initializeClientManagers();

	// Apply content animations and detect device type on initial load
	onMount(() => {
		appManager.addContentAnimation(); // Apply animations on initial load
		appManager.setDeviceType(); // Initialize app manager for country and device type with country code from server data
	});

	// Scroll to top and reapply animations after each navigation
	afterNavigate(() => {
		appManager.scrollToTop(); // Scroll to top after navigation
		appManager.addContentAnimation(); // Reapply animations after navigation
	});

	const normalizePath = (path: string) => {
		if (!path || path === '/') {
			return '';
		}

		return path.replace(/\/+$/, '');
	};

	const buildLocalePath = (targetLocale: string) => {
		const currentPath = normalizePath(data.requestPath);
		const currentPrefix = `/${data.countryCode}`;
		const targetPrefix = `/${targetLocale}`;

		if (currentPath === '') {
			return targetPrefix;
		}

		if (currentPath === currentPrefix) {
			return targetPrefix;
		}

		if (currentPath.startsWith(`${currentPrefix}/`)) {
			return `${targetPrefix}${currentPath.slice(currentPrefix.length)}`;
		}

		return `${targetPrefix}${currentPath}`;
	};

	const canonicalPath = $derived.by(() => buildLocalePath(data.countryCode));
	const alternateLocales = Object.keys(CountryCodes).filter((code) => code !== data.countryCode);
</script>

<svelte:head>
	{#each alternateLocales as locale (locale)}
		<link rel="alternate" hreflang={locale} href={`${SITE_URL}${buildLocalePath(locale)}`} />
	{/each}
	<link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
	<!-- Preconnect with Render Hosting Service removed — moved to app.html -->
	<!-- Google tag (gtag.js) -->
	<!-- GTM async loader moved to app.html; only the inline dataLayer init stays here -->
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-D3VHMJRPSQ', {
			// Mark cookies as SameSite=None;Secure so they survive cross-site contexts
			cookie_flags: 'SameSite=None;Secure',
			// Restrict the GA cookie to first-party (this domain only), preventing
			// it from being treated as a third-party cookie in embedded contexts
			cookie_domain: 'auto',
			// Allow measurement to continue when cookies are blocked (uses a
			// session-scoped identifier instead of a persistent cross-site cookie)
			cookie_expires: 0
		});
	</script>
</svelte:head>

<AgeBanner />
<NavSidemenu />
<div class="main-outer">
	<Nav />
	<div class="main-inner">
		<main>
			{@render children()}
		</main>
		<Footer />
	</div>
</div>

<style>
	.main-outer {
		position: fixed;
		top: 0;
		left: 300px;
		width: calc(100% - 300px);
		height: 100vh;
		display: flex;
		z-index: 1000;
		.main-inner {
			flex: 1;
			margin-top: var(--navbar-height);
			height: calc(100% - var(--navbar-height));
			overflow-y: auto;
			main {
				min-height: 100%;
			}
		}
		@media (max-width: 767px) {
			left: 0;
			width: 100%;
		}
	}
</style>
