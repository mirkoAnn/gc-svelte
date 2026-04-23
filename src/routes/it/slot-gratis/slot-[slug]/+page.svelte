<script lang="ts">
	import FaqsList from './../../../../component/faqs/faqs-list.svelte';
	import PageMetadata from './../../../../component/metadata/page-metadata.svelte';
	import Breadcrumbs from './../../../../component/breadcrumbs/breadcrumbs.svelte';
	import Gallery from './../../../../component/games/gallery/games-gallery.svelte';
	import { gamesGalleryManager } from './../../../../component/games/gallery/games-gallery-manager.svelte';
	import { afterNavigate } from '$app/navigation';
	import { m } from './../../../../paraglide/messages';
	import { getSlotOrderByOptions } from '../../../../component/games/gallery/game-gallery-filters-helper';
	import AuthorBox from '../../../../component/author/author-box.svelte';
	import ContentContainer from '../../../../component/content/content-container.svelte';
	import type { Slot } from '$lib/types/games';
	import type { SlotThemePageData } from './+page.server';

	let {
		data
	}: {
		data: {
			page: SlotThemePageData;
			slots: Slot[];
			slotThemes: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	const refreshGallery = () => {
		gamesGalleryManager.initTypedGalleryData({
			gameType: 'slot',
			initialGamesData: data.slots,
			categories: [
				{
					name: 'slotThemes',
					label: m.game_filter_theme({}, { locale: 'it' }),
					source: data.slotThemes,
					initialFilters: [{ title: data.page.title, value: data.page.slug }]
				},
				{
					name: 'providers',
					label: m.providers({}, { locale: 'it' }),
					source: data.providers,
					initialFilters: []
				},
				{
					name: 'orderBy',
					label: m.gallery_filter_order_title({}, { locale: 'it' }),
					source: getSlotOrderByOptions('it'),
					initialFilters: [
						{
							title: m.game_filter_release_date_new_old({}, { locale: 'it' }),
							value: 'createdAt:desc'
						}
					]
				}
			]
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
			route: { id: '/it/slot-gratis' },
			title: 'Gioca gratis alle Slot Online',
			label: 'Slot Gratis'
		},
		{
			route: { id: `/it/slot-gratis/slot-[slug]`, params: { slug: data.page.slug } },
			title: `Gioca Gratis alle Slot ${data.page.title}`,
			label: data.page.title
		}
	]}
/>

<h1 class="page-title">
	Slot machine {data.page.title}
</h1>
<div class="slot-category">
	<Gallery category="slot" type="grid" hasFilters={true} />
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
