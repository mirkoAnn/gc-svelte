<script lang="ts">
	import type { HomePageData } from './+page.server';

	// import CasinoTable from '../../component/casino/casino-table.svelte';
	// import { casinosDataManager } from '../../component/casino/casinos-data-manager.svelte';
	// import Content from '../../component/content/content.svelte';
	// import FaqsList from '../../component/faqs/faqs-list.svelte';
	// import GamesGallery from '../../component/games/gallery/games-gallery.svelte';
	// import PageMetadata from '../../component/metadata/page-metadata.svelte';
	// import Faq from '../../component/faqs/faq.svelte';

	let { data }: { data: HomePageData } = $props();
</script>

<!-- 
<PageMetadata
  title={data.page.seo.title}
  description={data.page.seo.description}
/>

<div class="game-categories">
  <GamesGallery
    games={data.slots}
    category="slot"
    title="Nuove Slot"
    type="carousel"
    categoryLink="/slot-gratis"
  />
  <GamesGallery
    games={data.roulettes}
    category="roulette"
    title="Nuove Roulette"
    type="carousel"
    categoryLink="/roulette-gratis"
  />
</div>

<div id="introContent" class="content">
  <Content content={data.page.introContent} />
</div>
<div id="whyChooseSGOContent" class="content">
  <Content content={data.page.whyChooseSGOContent} />
</div>
<div id="howToPlaySlotsContent" class="content">
  <Content content={data.page.howToPlaySlotsContent} />
</div>
<div id="jackpotContent" class="content">
  <Content content={data.page.jackpotContent} />
</div>
<CasinoTable casinos={casinosDataManager.getTopCasinos(10)} />

<FaqsList faqs={data.page.faqs} /> -->
