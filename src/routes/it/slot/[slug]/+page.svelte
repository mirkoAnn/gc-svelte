<script lang="ts">
	import SlotMetadata from './../../../../component/metadata/slot-metadata.svelte';
	import SlotFaqs from './../../../../component/faqs/slot-faqs.svelte';
	import CasinoCards from './../../../../component/casino/casino-cards.svelte';
	import Breadcrumbs from './../../../../component/breadcrumbs/breadcrumbs.svelte';
	import PageMetadata from './../../../../component/metadata/page-metadata.svelte';
	import GameWrapper from './../../../../component/games/iframe/game-wrapper.svelte';
	import GameInfo from './../../../../component/games/info-panel/game-info.svelte';
	import { afterNavigate } from '$app/navigation';
	import { gameManager } from './../../../../component/games/iframe/game-manager.svelte';
	import Content from '../../../../component/content/content-element.svelte';
	import { onMount } from 'svelte';
	import Gallery from './../../../../component/games/gallery/games-gallery.svelte';
	import AuthorBox from '../../../../component/author/author-box.svelte';
	import type { Slot } from '$lib/types/games';
	import { CountryCodes } from '$lib/app-manager.svelte';

	let { data }: { data: { page: Slot } } = $props();

	const locale = CountryCodes.it;

	onMount(() => {
		// Initialize game manager state and get the Related Casinos from Casinos Global Manager for the current game provider.
		gameManager.init(data.page.provider.title);
	});

	// Reset game manager state on navigation away from the page to avoid game already loaded on page new visit and to reset the game's related casinos.
	afterNavigate(() => {
		gameManager.reset(data.page.provider.title);
	});
</script>

<PageMetadata
	title={data.page.seo.title}
	description={data.page.seo.description}
	imageAddress={data.page.logo.url}
	ogType="article"
	authorName={data.page.author?.name || ''}
	section="Slot"
	tags={[
		'Slot Gratis',
		'Slot Online',
		'Slot Machine',
		'Slot Machine Gratis',
		'Slot Machine Gratis Online Senza Registrazione',
		data.page.seo.title
	]}
	publishedAt={data.page.publishedAt}
	updatedAt={data.page.updatedAt}
/>

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: '/it/slot-gratis' },
			title: 'Gioca gratis alle Slot Online',
			label: 'Slot Gratis'
		},
		{
			route: { id: `/it/slot/[slug]`, params: { slug: data.page.slug } },
			title: `Gioca Gratis alla Slot Machine ${data.page.title} Online`,
			label: data.page.title
		}
	]}
/>

<GameWrapper game={data.page} category="slot" />

<div class="casinos-provider-container">
	<h2 class="casinos-provider-title">
		I Casinò in cui puoi Giocare a {data.page.title}
	</h2>
	<CasinoCards casinos={gameManager.getRelatedCasinos()} />
</div>

<div class="content similar-games-container">
	<Gallery
		games={data.page.slotThemes[0]?.slots}
		excludeId={data.page.id}
		category="slot"
		title="Slot Simili che Potrebbero Piacerti"
		type="carousel"
	/>
</div>
<GameInfo game={data.page} />

<div id="introContent" class="content content-columns">
	<img
		class="img medium-img"
		src={data.page.images[0]?.image.url.replace('/upload/', '/upload/w_1000,f_avif,q_auto/')}
		alt={data.page.images[0]?.description}
		title={data.page.images[0]?.description}
		width="600"
		height="400"
	/>
	<div class="content-text">
		<h2 class="content-title">{data.page.title} Slot Machine</h2>
		<Content content={data.page.introContent} />
	</div>
</div>
<div id="rulesContent" class="content content-columns">
	<div class="content-text">
		<h2 class="content-title">Come provare {data.page.title} gratuitamente e da dove iniziare</h2>
		<Content content={data.page.rulesContent} />
	</div>
	<img
		class="img medium-img"
		src={data.page.images[1]?.image.url.replace('/upload/', '/upload/w_1000,f_avif,q_auto/')}
		alt={data.page.images[1]?.description}
		title={data.page.images[1]?.description}
		width="600"
		height="400"
	/>
</div>
<div id="bonusContent" class="content">
	<h2 class="content-title">Funzioni Bonus della Slot {data.page.title}</h2>
	<Content content={data.page.bonusContent} />
	<img
		class="img full-width"
		src={data.page.images[2]?.image.url.replace('/upload/', '/upload/w_1000,f_avif,q_auto/')}
		alt={data.page.images[2]?.description}
		title={data.page.images[2]?.description}
		width="600"
		height="400"
	/>
</div>
<div id="opinionContent" class="content">
	<h2 class="content-title">Opinioni {data.page.title}</h2>
	<Content content={data.page.opinionContent} />
</div>

<SlotFaqs data={data.page} {locale} />

{#if data.page.author}
	<AuthorBox author={data.page.author} />
{/if}
<SlotMetadata data={data.page} />

<style>
	.casinos-provider-container {
		width: 90%;
		max-width: 1200px;
		margin: 100px auto;
	}
</style>
