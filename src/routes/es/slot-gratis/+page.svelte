<script lang="ts">
	import AuthorBox from './../../../component/author/author-box.svelte';
	import Breadcrumbs from '../../../component/breadcrumbs/breadcrumbs.svelte';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import FaqsList from '../../../component/faqs/faqs-list.svelte';
	import { gamesGalleryManager } from '../../../component/games/gallery/games-gallery-manager.svelte';
	import GamesGallery from '../../../component/games/gallery/games-gallery.svelte';
	import PageMetadata from '../../../component/metadata/page-metadata.svelte';
	import { m } from '../../../paraglide/messages';
	import { getSlotOrderByOptions } from '../../../component/games/gallery/game-gallery-filters-helper';
	import type { SlotsPageData } from './+page.server';
	import type { Slot } from '$lib/types/games';

	let {
		data
	}: {
		data: {
			page: SlotsPageData;
			newSlots: Slot[];
			bestSlots: Slot[];
			barSlots: Slot[];
			slotThemes: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	const refreshGallery = () => {
		gamesGalleryManager.initTypedGalleryData({
			initialGamesData: [],
			slotThemes: data.slotThemes,
			slotThemesLabel: m.game_filter_theme({}, { locale: 'es' }),
			providers: data.providers,
			providerLabel: m.providers({}, { locale: 'es' }),
			orderByLabel: m.gallery_filter_order_title({}, { locale: 'es' }),
			orderByOptions: getSlotOrderByOptions('es'),
			defaultOrderByValue: 'createdAt:desc',
			defaultOrderByTitle: m.game_filter_release_date_new_old({}, { locale: 'es' })
		});
	};

	refreshGallery();
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: {
				id: '/es/slot-gratis'
			},
			title: 'Juega gratis a las Tragaperras Online',
			label: 'Tragaperras Gratis'
		}
	]}
/>

<!-- <GamesSlider games={data.newSlots} /> -->

<!-- Main gallery used to show filtered games -->
<div class="game-galleries-outer">
	<GamesGallery
		category="slot"
		type="grid"
		title="Slot Online"
		carouselIconName="slot"
		hasFilters={true}
	/>
	<div class="game-categories">
		<GamesGallery
			games={data.newSlots}
			category="slot"
			title="Nuevas Tragaperras"
			carouselIconName="new"
			type="carousel"
			categoryLink="/slot-gratis/slot-nuove"
		/>
		<GamesGallery
			games={data.bestSlots}
			category="slot"
			title="Tragaperras Más Jugadas"
			carouselIconName="hot"
			type="carousel"
			categoryLink="/slot-gratis/slot-piu-giocate"
		/>
		<GamesGallery
			games={data.barSlots}
			category="slot"
			title="Tragaperras Bar"
			carouselIconName="bar"
			type="carousel"
			categoryLink="/slot-gratis/slot-bar"
		/>
	</div>
</div>
<h1 class="page-title">Juega a las mejores tragaperras gratis y sin registro</h1>
{#if data.page.content.firstContent}
	<ContentContainer content={data.page.content.firstContent} />
{/if}
{#if data.page.content.secondContent}
	<ContentContainer content={data.page.content.secondContent} />
{/if}
{#if data.page.content.thirdContent}
	<ContentContainer content={data.page.content.thirdContent} />
	<table class="content content-table">
		<thead>
			<tr>
				<th>Slots gratis</th>
				<th>Slots con dinero real</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Acceso inmediato</td>
				<td>✔ Sí</td>
			</tr>
			<tr>
				<td>Dinero necesario</td>
				<td>❌ No</td>
			</tr>
			<tr>
				<td>Premios reales</td>
				<td>❌ No</td>
			</tr>
			<tr>
				<td>Registro</td>
				<td>❌ No necesario</td>
			</tr>
			<tr>
				<td>Riesgo</td>
				<td>❌ Ninguno</td>
			</tr>
			<tr>
				<td>Jackpots progresivos</td>
				<td>❌ No</td>
			</tr>
			<tr>
				<td>Funciones</td>
				<td>✔ Todas</td>
			</tr>
		</tbody>
	</table>
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
