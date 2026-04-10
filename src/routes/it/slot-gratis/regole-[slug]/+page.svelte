<script lang="ts">
	import Content from '../../../../component/content/content.svelte';
	import PageMetadata from '../../../../component/metadata/page-metadata.svelte';
	import Author from '../../../../component/author/author.svelte';
	import Breadcrumbs from '../../../../component/breadcrumbs/breadcrumbs.svelte';
	import Gallery from '../../../../component/games/gallery/games-gallery.svelte';
	import { gamesGalleryManager } from '../../../../component/games/gallery/games-gallery-manager.svelte';
	import { afterNavigate } from '$app/navigation';

	let { data }: { data: any } = $props();

	afterNavigate(() => {
		// Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
		// so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
		gamesGalleryManager.initGalleryData(
			data.slots,
			{
				type: 'slot',
				categories: [
					{
						name: 'slotThemes',
						label: 'Tema',
						filters: data.slotThemes
					},
					{
						name: 'providers',
						label: 'Provider',
						filters: data.providers
					},
					{
						name: 'orderBy',
						label: 'Ordina per',
						filters: [
							{ title: 'Nome (A-Z)', value: 'title:asc' },
							{ title: 'Nome (Z-A)', value: 'title:desc' },
							{ title: 'Recenti', value: 'createdAt:desc' },
							{ title: 'Più Giocate', value: 'sessions:desc' }
						] // we set the categories of the currently applied filters to the slugs of the features of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					}
				]
			},
			{
				type: 'slot',
				categories: [
					{
						name: 'slotThemes',
						label: 'Tema',
						filters: []
					},
					{
						name: 'providers',
						label: 'Provider',
						filters: []
					},
					{
						name: 'orderBy',
						label: 'Ordina per',
						filters: [{ title: 'Recenti', value: 'createdAt:desc' }] // we set the categories of the currently applied filters to the slugs of the features of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					}
				]
			}
		);
	});
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: '/slot-gratis' },
			title: 'Gioca gratis alle Slot Online',
			label: 'Slot Gratis'
		},
		{
			route: { id: `/slot-gratis/regole-[slug]`, params: { slug: data.page.slug } },
			title: `Gioca Gratis alle Slot ${data.page.title}`,
			label: data.page.title
		}
	]}
/>

<h1 class="page-title">
	Slot machine {data.page.title}
</h1>
<div class="slot-category">
	<Gallery category="slot" type="gallery" hasFilters={true} />
</div>

<div id="introContent" class="content first-content">
	<Content content={data.page.introContent} />
</div>
<div id="firstContent" class="content">
	<Content content={data.page.firstContent} />
</div>
<div id="secondContent" class="content">
	<Content content={data.page.secondContent} />
</div>

<Author author={data.page.author} />

<style>
	.first-content {
		margin-top: 500px;
	}
</style>
