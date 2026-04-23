<script lang="ts">
	import AuthorBox from './../../../component/author/author-box.svelte';
	import Breadcrumbs from '../../../component/breadcrumbs/breadcrumbs.svelte';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import FaqsList from '../../../component/faqs/faqs-list.svelte';
	import { gamesGalleryManager } from '../../../component/games/gallery/games-gallery-manager.svelte';
	import GamesGallery from '../../../component/games/gallery/games-gallery.svelte';
	import PageMetadata from '../../../component/metadata/page-metadata.svelte';
	import type { SlotsPageData } from './+page.server';
	import type { GalleryFilter, Slot } from '$lib/types/games';
	import { m } from '../../../paraglide/messages';
	import { getSlotOrderByOptions } from '../../../component/games/gallery/game-gallery-filters-helper';

	let {
		data
	}: {
		data: {
			page: SlotsPageData;
			newSlots: Slot[];
			bestSlots: Slot[];
			barSlots: Slot[];
			slotThemes: GalleryFilter[];
			providers: GalleryFilter[];
		};
	} = $props();

	const refreshGallery = () => {
		gamesGalleryManager.initTypedGalleryData({
			initialGamesData: [],
			slotThemes: data.slotThemes,
			providers: data.providers,
			providerLabel: m.providers({}, { locale: 'it' }),
			orderByLabel: m.gallery_filter_order_title({}, { locale: 'it' }),
			orderByOptions: getSlotOrderByOptions('it'),
			defaultOrderByValue: 'createdAt:desc',
			defaultOrderByTitle: m.game_filter_release_date_new_old({}, { locale: 'it' })
		});
	};

	refreshGallery();
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: {
				id: '/it/slot-gratis'
			},
			title: 'Gioca gratis alle Slot Online',
			label: 'Slot Gratis'
		}
	]}
/>

<!-- <GamesSlider games={data.newSlots} /> -->

<!-- Main gallery used to show filtered games -->
<div class="game-galleries-outer">
	<GamesGallery category="slot" type="grid" title="Slot Online" hasFilters={true} />
	<div class="game-categories">
		<GamesGallery
			games={data.newSlots}
			category="slot"
			title="Nuove Slot"
			type="carousel"
			categoryLink="/slot-gratis/slot-nuove"
		/>
		<GamesGallery
			games={data.bestSlots}
			category="slot"
			title="Slot Più Giocate"
			type="carousel"
			categoryLink="/slot-gratis/slot-piu-giocate"
		/>
		<GamesGallery
			games={data.barSlots}
			category="slot"
			title="Slot Bar"
			type="carousel"
			categoryLink="/slot-gratis/slot-bar"
		/>
	</div>
</div>
<h1 class="page-title">Gioca alle migliori slot machine gratis e senza registrazione</h1>
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
