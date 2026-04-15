<script lang="ts">
	import AuthorBox from './../../../component/author/author-box.svelte';
	import Breadcrumbs from '../../../component/breadcrumbs/breadcrumbs.svelte';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import FaqsList from '../../../component/faqs/faqs-list.svelte';
	import { gamesGalleryManager } from '../../../component/games/gallery/games-gallery-manager.svelte';
	import GamesGallery from '../../../component/games/gallery/games-gallery.svelte';
	import PageMetadata from '../../../component/metadata/page-metadata.svelte';
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
		// Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
		// so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
		gamesGalleryManager.initGalleryData(
			[],
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
						label: 'Provider',
						filters: data.providers.map((provider: { title: string; slug: string }) => ({
							title: provider.title,
							value: provider.slug
						})) // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
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
						filters: [] // we set the categories of the currently applied filters to the slugs of the slot themes of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					},
					{
						name: 'providers',
						label: 'Provider',
						filters: [] // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
					},
					{
						name: 'orderBy',
						label: 'Ordina per',
						filters: [{ title: 'Recenti', value: 'createdAt:desc' }] // we set the categories of the currently applied filters to the slugs of the features of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
					}
				]
			}
		);
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
