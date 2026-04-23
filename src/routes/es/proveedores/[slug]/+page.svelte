<script lang="ts">
	import CasinoCards from './../../../../component/casino/casino-cards.svelte';
	import Breadcrumbs from './../../../../component/breadcrumbs/breadcrumbs.svelte';
	import PageMetadata from './../../../../component/metadata/page-metadata.svelte';
	import Gallery from './../../../../component/games/gallery/games-gallery.svelte';
	import { casinosDataManager } from './../../../../component/casino/casinos-data-manager.svelte';
	import { gamesGalleryManager } from './../../../../component/games/gallery/games-gallery-manager.svelte';
	import { m } from './../../../../paraglide/messages';
	import { getSlotOrderByOptions } from '../../../../component/games/gallery/game-gallery-filters-helper';
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
		gamesGalleryManager.initTypedGalleryData({
			initialGamesData: data.page.slots,
			slotThemes: data.slotThemes,
			providers: data.providers,
			providerLabel: m.providers({}, { locale: 'es' }),
			orderByLabel: m.gallery_filter_order_title({}, { locale: 'es' }),
			orderByOptions: getSlotOrderByOptions('es'),
			defaultOrderByValue: data.page.slug
		});
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
			route: { id: '/es/proveedores' },
			title: 'Descubre los mejores Proveedores de juegos online en España',
			label: 'Proveedores'
		},
		{
			route: { id: `/es/proveedores/[slug]`, params: { slug: data.page.slug } },
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
