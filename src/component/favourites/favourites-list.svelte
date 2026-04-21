<script>
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { m } from '../../paraglide/messages';
	import Gallery from '../games/gallery/games-gallery.svelte';
	import { favouritesManager } from './favourites-manager.svelte';

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<div class="favourites">
	{#if favouritesManager.getListByCategory('slot').length > 0}
		<Gallery
			games={favouritesManager.getListByCategory('slot')}
			category="slot"
			title={m.favourites_slots_title({}, { locale })}
			type="carousel"
		/>
	{/if}
</div>

<style>
	.favourites {
		width: 90%;
	}
</style>
