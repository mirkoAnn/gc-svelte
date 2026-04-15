<script lang="ts">
	import FaqsList from './../../../component/faqs/faqs-list.svelte';
	import PageMetadata from './../../../component/metadata/page-metadata.svelte';
	import Breadcrumbs from './../../../component/breadcrumbs/breadcrumbs.svelte';
	import { gamesGalleryManager } from './../../../component/games/gallery/games-gallery-manager.svelte';
	import GamesGallery from './../../../component/games/gallery/games-gallery.svelte';
	import type { RouletteGratisPageData } from './+page.server';
	import type { Roulette } from '$lib/types/games';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import AuthorBox from '../../../component/author/author-box.svelte';

	let {
		data
	}: {
		data: {
			page: RouletteGratisPageData;
			newRoulette: Roulette[];
			rouletteEuropea: Roulette[];
			rouletteAmericana: Roulette[];
			rouletteFrancese: Roulette[];
			rouletteMechanics: { title: string; slug: string }[];
			providers: { title: string; slug: string }[];
		};
	} = $props();

	// Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
	// so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
	gamesGalleryManager.initGalleryData(
		[],
		{
			type: 'roulette',
			categories: [
				{
					name: 'rouletteMechanics',
					label: 'Regole',
					filters: data.rouletteMechanics.map(
						(rouletteMechanic: { title: string; slug: string }) => ({
							title: rouletteMechanic.title,
							value: rouletteMechanic.slug
						})
					) // we set the categories of the currently applied filters to the slugs of the roulette mechanics of the current roulette category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
				},
				{
					name: 'providers',
					label: 'Provider',
					filters: data.providers.map((provider: { title: string; slug: string }) => ({
						title: provider.title,
						value: provider.slug
					})) // we set the categories of the currently applied filters to an empty array because when we navigate to a new roulette category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited roulette category page
				}
			]
		},
		{
			type: 'roulette',
			categories: [
				{
					name: 'rouletteMechanics',
					label: 'Regole',
					filters: [] // we set the categories of the currently applied filters to the slugs of the roulette mechanics of the current roulette category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
				},
				{
					name: 'providers',
					label: 'Provider',
					filters: [] // we set the categories of the currently applied filters to an empty array because when we navigate to a new roulette category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited roulette category page
				}
			]
		}
	);
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: '/it/roulette-gratis' },
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
			categoryLink="/roulette-gratis/roulette-nuove"
		/>
		<GamesGallery
			games={data.rouletteEuropea}
			category="roulette"
			title="Roulette Europea"
			type="carousel"
			categoryLink="/roulette-gratis/roulette-europea"
		/>
		<GamesGallery
			games={data.rouletteAmericana}
			category="roulette"
			title="Roulette Americana"
			type="carousel"
			categoryLink="/roulette-gratis/roulette-americana"
		/>
		<GamesGallery
			games={data.rouletteFrancese}
			category="roulette"
			title="Roulette Francese"
			type="carousel"
			categoryLink="/roulette-gratis/roulette-francese"
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

<style>
	.game-galleries-outer {
		min-height: 100vh;
		.game-categories {
			display: flex;
			flex-direction: column;
			gap: 48px;
		}
	}
</style>
