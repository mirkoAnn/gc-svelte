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

	let { data }: { data: { page: Slot } } = $props();

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
	authorName={data.page.author.name}
	section="Slot"
	tags={[
		'Tragaperras Gratis',
		'Tragaperras Online',
		'Maquina Tragamonedas',
		'Maquina Tragamonedas Gratis',
		'Maquina Tragamonedas Gratis Online Sin Registrarse',
		data.page.seo.title
	]}
	publishedAt={data.page.publishedAt}
	updatedAt={data.page.updatedAt}
/>

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: '/es/slot-gratis' },
			title: 'Juega gratis a las Tragaperras Online',
			label: 'Tragaperras Gratis'
		},
		{
			route: { id: `/es/slot/[slug]`, params: { slug: data.page.slug } },
			title: `Juega Gratis a la Maquina Tragamonedas ${data.page.title} Online`,
			label: data.page.title
		}
	]}
/>

<GameWrapper game={data.page} category="slot" />

<div class="casinos-provider-container">
	<h2 class="casinos-provider-title">
		Los Casinos en los que puedes Jugar a {data.page.title}
	</h2>
	<CasinoCards casinos={gameManager.getRelatedCasinos()} />
</div>

<div class="content similar-games-container">
	<Gallery
		games={data.page.slotThemes[0]?.slots}
		excludeId={data.page.id}
		category="slot"
		title="Tragaperras similares que te pueden gustar"
		type="carousel"
	/>
</div>
<GameInfo game={data.page} />

<div id="introContent" class="content content-columns">
	<img
		class="img medium-img"
		src={data.page.images[0]?.image.url}
		alt={data.page.images[0]?.description}
		title={data.page.images[0]?.description}
		width="600"
		height="400"
	/>
	<div class="content-text">
		<h2 class="content-title">{data.page.title} Maquina Tragamonedas</h2>
		<Content content={data.page.introContent} />
	</div>
</div>
<div id="rulesContent" class="content content-columns">
	<div class="content-text">
		<h2 class="content-title">Cómo probar {data.page.title} gratuitamente y por dónde empezar</h2>
		<Content content={data.page.rulesContent} />
	</div>
	<img
		class="img medium-img"
		src={data.page.images[1]?.image.url}
		alt={data.page.images[1]?.description}
		title={data.page.images[1]?.description}
		width="600"
		height="400"
	/>
</div>
<div id="bonusContent" class="content">
	<h2 class="content-title">Funciones Bonus de la Maquina Tragamonedas {data.page.title}</h2>
	<Content content={data.page.bonusContent} />
	<img
		class="img full-width"
		src={data.page.images[2]?.image.url.replace('/upload/', '/upload/f_avif/w_700/')}
		alt={data.page.images[2]?.description}
		title={data.page.images[2]?.description}
		width="600"
		height="400"
	/>
</div>
<div id="opinionContent" class="content">
	<h2 class="content-title">Opiniones de la Maquina Tragamonedas {data.page.title}</h2>
	<Content content={data.page.opinionContent} />
</div>

<SlotFaqs data={data.page} />

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
