<script lang="ts">
	import CasinoCards from './../../../../component/casino/casino-cards.svelte';
	import Breadcrumbs from './../../../../component/breadcrumbs/breadcrumbs.svelte';
	import PageMetadata from './../../../../component/metadata/page-metadata.svelte';
	import Gallery from './../../../../component/games/gallery/games-gallery.svelte';
	import { casinosDataManager } from './../../../../component/casino/casinos-data-manager.svelte';
	import { gamesGalleryManager } from './../../../../component/games/gallery/games-gallery-manager.svelte';
	import { afterNavigate } from '$app/navigation';
	import AuthorBox from '../../../../component/author/author-box.svelte';
	import type { ProviderPageData } from './+page.server';
	import ContentContainer from '../../../../component/content/content-container.svelte';
	import FaqsList from '../../../../component/faqs/faqs-list.svelte';

	let {
		data
	}: {
		data: {
			page: ProviderPageData;
			slotThemes: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	const refreshGallery = () => {
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
						filters: data.slotThemes.map((slotTheme: { title: string; slug: string }) => ({
							title: slotTheme.title,
							value: slotTheme.slug
						})) // we set the categories of the currently applied filters to the slugs of the slot themes of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					},
					{
						name: 'providers',
						label: 'Proveedores',
						filters: data.providers.map((provider: { title: string; slug: string }) => ({
							title: provider.title,
							value: provider.slug
						})) // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
					},
					{
						name: 'orderBy',
						label: 'Ordenar por',
						filters: [
							{ title: 'Nombre (A-Z)', value: 'title:asc' },
							{ title: 'Nombre (Z-A)', value: 'title:desc' },
							{ title: 'Recientes', value: 'createdAt:desc' },
							{ title: 'Más Jugados', value: 'sessions:desc' }
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
						filters: [] // we set the categories of the currently applied filters to the slugs of the slot themes of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					},
					{
						name: 'providers',
						label: 'Proveedores',
						filters: [] // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
					},
					{
						name: 'orderBy',
						label: 'Ordenar por',
						filters: [{ value: data.page.slug }] // we set the categories of the currently applied filters to the slugs of the features of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					}
				]
			}
		);
	};

	afterNavigate(() => {
		refreshGallery();
	});

	refreshGallery();
</script>

<PageMetadata
	title={data.page.seo.title}
	description={data.page.seo.description}
	imageAddress={data.page.logo.url}
	ogType="article"
	authorName={data.page.author.name}
	section="Providers"
	tags={[
		'Proveedores slot online',
		'Proveedores juegos de casino online',
		'Proveedores España',
		data.page.title
	]}
	publishedAt={data.page.publishedAt}
	updatedAt={data.page.updatedAt}
/>

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: '/es/providers' },
			title: 'Descubre los mejores Proveedores de juegos online en España',
			label: 'Proveedores'
		},
		{
			route: { id: `/es/providers/[slug]`, params: { slug: data.page.slug } },
			title: 'Información, juegos y opiniones sobre el proveedor ' + data.page.title,
			label: data.page.title
		}
	]}
/>

<h1 class="page-title">{data.page.title}</h1>

<Gallery category="slot" type="grid" hasFilters={true} />

<div class="content">
	<h2>Los mejores casinos online con juegos de {data.page.title}</h2>
	<CasinoCards casinos={casinosDataManager.getCasinosByProviderTitle(data.page.title)} />
</div>

{#if data.page.content.firstContent}
	<ContentContainer content={data.page.content.firstContent} />
{/if}
{#if data.page.content.secondContent}
	<ContentContainer content={data.page.content.secondContent} />
{/if}
{#if data.page.content.thirdContent}
	<ContentContainer content={data.page.content.thirdContent} />
{/if}
{#if data.page.content.fourthContent}
	<ContentContainer content={data.page.content.fourthContent} />
{/if}
{#if data.page.content.fifthContent}
	<ContentContainer content={data.page.content.fifthContent} />
{/if}
{#if data.page.content.sixthContent}
	<ContentContainer content={data.page.content.sixthContent} />
{/if}
{#if data.page.content.seventhContent}
	<ContentContainer content={data.page.content.seventhContent} />
{/if}
{#if data.page.content.eighthContent}
	<ContentContainer content={data.page.content.eighthContent} />
{/if}
{#if data.page.content.ninethContent}
	<ContentContainer content={data.page.content.ninethContent} />
{/if}
{#if data.page.content.tenthContent}
	<ContentContainer content={data.page.content.tenthContent} />
{/if}

{#if data.page.faqs.length > 0}
	<FaqsList faqs={data.page.faqs} />
{/if}
{#if data.page.author}
	<AuthorBox author={data.page.author} />
{/if}
