<script lang="ts">
	import FaqsList from './../../../component/faqs/faqs-list.svelte';
	import PageMetadata from './../../../component/metadata/page-metadata.svelte';
	import Breadcrumbs from './../../../component/breadcrumbs/breadcrumbs.svelte';
	import { gamesGalleryManager } from './../../../component/games/gallery/games-gallery-manager.svelte';
	import GamesGallery from './../../../component/games/gallery/games-gallery.svelte';
	import type { RouletteGratisPageData } from './+page.server';
	import type { Roulette } from '$lib/types/games';
	import { m } from './../../../paraglide/messages';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import AuthorBox from '../../../component/author/author-box.svelte';
	import { CountryCodes } from '$lib/app-manager.svelte';
	import { resolveRouletteCategoryPath, resolveRouletteIndexPath } from '$lib/link-resolver';
	import { getRouletteOrderByOptions } from '../../../component/games/gallery/game-gallery-filters-helper';

	let {
		data
	}: {
		data: {
			page: RouletteGratisPageData;
			newRoulette: Roulette[];
			europeanRoulette: Roulette[];
			americanRoulette: Roulette[];
			frenchRoulette: Roulette[];
			rouletteMechanics: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	// Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
	// so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
	const refreshGallery = () => {
		gamesGalleryManager.initTypedGalleryData({
			initialGamesData: [],
			rouletteMechanics: data.rouletteMechanics,
			rouletteMechanicsLabel: m.game_filter_rules({}, { locale: 'it' }),
			providers: data.providers,
			providerLabel: m.providers({}, { locale: 'it' }),
			initialRouletteMechanicsLabel: m.game_filter_rules({}, { locale: 'it' }),
			initialProviderLabel: m.providers({}, { locale: 'it' }),
			orderByLabel: m.gallery_filter_order_title({}, { locale: 'it' }),
			orderByOptions: getRouletteOrderByOptions('it'),
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
			route: { id: resolveRouletteIndexPath(CountryCodes.it) },
			title: 'Gioca gratis alle Roulette Online',
			label: 'Roulette Gratis'
		}
	]}
/>

<!-- <GamesSlider games={data.newSlots} /> -->

<!-- Main gallery used to show filtered games -->
<div class="game-galleries-outer">
	<GamesGallery category="roulette" type="grid" title="Roulette Online" hasFilters={true} />
	<!-- Roulette categories section showing roulettes by categories until a filter is applied and the main gallery is displayed -->
	<div class="game-categories">
		<GamesGallery
			games={data.newRoulette}
			category="roulette"
			title="Nuove Roulette"
			type="carousel"
			categoryLink={resolveRouletteCategoryPath(CountryCodes.it, 'new')}
		/>
		<GamesGallery
			games={data.europeanRoulette}
			category="roulette"
			title="Roulette Europea"
			type="carousel"
			categoryLink={resolveRouletteCategoryPath(CountryCodes.it, 'european')}
		/>
		<GamesGallery
			games={data.americanRoulette}
			category="roulette"
			title="Roulette Americana"
			type="carousel"
			categoryLink={resolveRouletteCategoryPath(CountryCodes.it, 'american')}
		/>
		<GamesGallery
			games={data.frenchRoulette}
			category="roulette"
			title="Roulette Francese"
			type="carousel"
			categoryLink={resolveRouletteCategoryPath(CountryCodes.it, 'french')}
		/>
	</div>
</div>
<h1 class="page-title">Gioca alle migliori Roulette gratis e senza registrazione</h1>

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
