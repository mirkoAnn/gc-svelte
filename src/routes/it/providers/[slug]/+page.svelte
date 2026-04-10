<script lang="ts">
	import Author from './../../../../component/author/author.svelte';
	import CasinoCards from './../../../../component/casino/casino-cards.svelte';
	import Breadcrumbs from './../../../../component/breadcrumbs/breadcrumbs.svelte';
	import PageMetadata from './../../../../component/metadata/page-metadata.svelte';
	import Gallery from './../../../../component/games/gallery/games-gallery.svelte';
	import { casinosDataManager } from './../../../../component/casino/casinos-data-manager.svelte';
	import { gamesGalleryManager } from './../../../../component/games/gallery/games-gallery-manager.svelte';
	import { afterNavigate } from '$app/navigation';

	let { data }: { data: any } = $props();

	afterNavigate(() => {
		gamesGalleryManager.clearCurrentlyAppliedFilters(); // we clear the currently applied filters to reset the gallery to the initial state with all games shown, this will allow us to show the initial games immediately without having to wait for them to be fetched from the server again, and it will also allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
		// Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
		// so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
		gamesGalleryManager.initGalleryData(
			data.page.slots,
			{
				type: 'slot',
				categories: [
					{
						name: 'slotThemes',
						label: 'Tema',
						filters: data.slotThemes.map((slotTheme: any) => ({
							title: slotTheme.title,
							value: slotTheme.slug
						})) // we set the categories of the currently applied filters to the slugs of the slot themes of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					},
					{
						name: 'providers',
						label: 'Provider',
						filters: data.providers.map((provider: any) => ({
							title: provider.title,
							value: provider.slug
						})) // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
					}
				]
			},
			{
				type: 'slot',
				categories: [
					{
						name: 'slotThemes',
						label: 'Tema',
						filters: [] // we set the categories of the currently applied filters to the slugs of the slot themes of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					},
					{
						name: 'providers',
						label: 'Provider',
						filters: [{ value: data.page.slug }] // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
					}
				]
			}
		);
	});
</script>

<PageMetadata
	title={data.page.seo.title}
	description={data.page.seo.description}
	imageAddress={data.page.logo.url}
	ogType="article"
	authorName={data.page.author.name}
	section="Providers"
	tags={[
		'Providers slot online',
		'Providers giochi casino online',
		'Providers Italia',
		data.page.title
	]}
	publishedAt={data.page.publishedAt}
	updatedAt={data.page.updatedAt}
/>

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: '/providers' },
			title: 'Scopri i migliori Providers di giochi online in Italia',
			label: 'Providers'
		},
		{
			route: { id: `/providers/[slug]`, params: { slug: data.page.slug } },
			title: 'Info, giochi e opinioni sul provider ' + data.page.title,
			label: data.page.title
		}
	]}
/>

<h1 class="page-title">{data.page.title}</h1>

<Gallery category="slot" type="grid" hasFilters={true} />

<div class="content">
	<h2>I migliori casinò online con giochi di {data.page.title}</h2>
	<CasinoCards casinos={casinosDataManager.getCasinosByProviderTitle(data.page.title)} />
</div>

<Author author={data.page.author} />
