<script lang="ts">
	import PageMetadata from './../../../../component/metadata/page-metadata.svelte';
	import Breadcrumbs from './../../../../component/breadcrumbs/breadcrumbs.svelte';
	import Gallery from './../../../../component/games/gallery/games-gallery.svelte';
	import { gamesGalleryManager } from './../../../../component/games/gallery/games-gallery-manager.svelte';
	import { m } from './../../../../paraglide/messages';
	import { getRouletteOrderByOptions } from '../../../../component/games/gallery/game-gallery-filters-helper';
	import FaqsList from './../../../../component/faqs/faqs-list.svelte';
	import AuthorBox from '../../../../component/author/author-box.svelte';
	import ContentContainer from '../../../../component/content/content-container.svelte';
	import type { LiveRoulettePageData } from './+page.server';
	import type { Roulette } from '$lib/types/games';
	import { CountryCodes } from '$lib/app-manager.svelte';
	import { resolveRouletteIndexPath, resolveRouletteLivePath } from '$lib/link-resolver';

	let {
		data
	}: {
		data: {
			page: LiveRoulettePageData;
			roulettes: Roulette[];
			rouletteMechanics: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	const refreshGallery = () => {
		gamesGalleryManager.initTypedGalleryData({
			initialGamesData: data.roulettes,
			rouletteMechanics: data.rouletteMechanics,
			rouletteMechanicsLabel: m.game_filter_rules({}, { locale: 'es' }),
			providers: data.providers,
			providerLabel: m.providers({}, { locale: 'es' }),
			orderByLabel: m.gallery_filter_order_title({}, { locale: 'es' }),
			orderByOptions: getRouletteOrderByOptions('es'),
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
			route: { id: resolveRouletteIndexPath(CountryCodes.es) },
			title: 'Juega gratis a las Ruletas Online',
			label: 'Ruletas Gratis'
		},
		{
			route: { id: resolveRouletteLivePath(CountryCodes.es) },
			title: `Juega Gratis a las Ruletas Online en Vivo`,
			label: 'Roulette en Vivo'
		}
	]}
/>

<h1 class="page-title">Roulette Online en Vivo</h1>
<div class="roulette-category">
	<Gallery category="roulette" type="grid" hasFilters={true} />
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
