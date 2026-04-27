<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Slot } from '$lib/types/games';
	import AuthorBox from '../../../../component/author/author-box.svelte';
	import Breadcrumbs from '../../../../component/breadcrumbs/breadcrumbs.svelte';
	import ContentContainer from '../../../../component/content/content-container.svelte';
	import { gamesGalleryManager } from '../../../../component/games/gallery/games-gallery-manager.svelte';
	import { m } from './../../../../paraglide/messages';
	import { getSlotOrderByOptions } from '../../../../component/games/gallery/game-gallery-filters-helper';
	import GamesGallery from '../../../../component/games/gallery/games-gallery.svelte';
	import PageMetadata from '../../../../component/metadata/page-metadata.svelte';
	import type { SlotMechanicPageData } from './+page.server';
	import FaqsList from './../../../../component/faqs/faqs-list.svelte';
	import { CountryCodes } from '$lib/app-manager.svelte';
	import {
		resolveSlotGratisIndexPath,
		resolveSlotMechanicsDetailRouteId
	} from '$lib/link-resolver';

	let {
		data
	}: {
		data: {
			page: SlotMechanicPageData;
			slots: Slot[];
			slotThemes: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	const refreshGallery = () => {
		gamesGalleryManager.initTypedGalleryData({
			initialGamesData: data.slots,
			slotThemes: data.slotThemes,
			providers: data.providers,
			providerLabel: m.providers({}, { locale: 'it' }),
			orderByLabel: m.gallery_filter_order_title({}, { locale: 'it' }),
			orderByOptions: getSlotOrderByOptions('it'),
			defaultOrderByValue: data.page.slug
		});
	};

	afterNavigate(() => {
		refreshGallery();
	});

	refreshGallery();
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: resolveSlotGratisIndexPath(CountryCodes.it) },
			title: 'Gioca gratis alle Slot Online',
			label: 'Slot Gratis'
		},
		{
			route: {
				id: resolveSlotMechanicsDetailRouteId(CountryCodes.it),
				params: { slug: data.page.slug }
			},
			title: `Gioca Gratis alle Slot ${data.page.title}`,
			label: data.page.title
		}
	]}
/>

<h1 class="page-title">
	Slot machine {data.page.title}
</h1>
<div class="slot-category">
	<GamesGallery category="slot" type="grid" hasFilters={true} />
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
