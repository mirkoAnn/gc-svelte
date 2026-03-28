<script lang="ts">
  import SlotMetadata from "./../../../../component/metadata/slot-metadata.svelte";
  import SlotFaqs from "./../../../../component/faqs/slot-faqs.svelte";
  import CasinoCards from "./../../../../component/casino/casino-cards.svelte";
  import Breadcrumbs from "./../../../../component/breadcrumbs/breadcrumbs.svelte";
  import Author from "./../../../../component/author/author.svelte";
  import PageMetadata from "./../../../../component/metadata/page-metadata.svelte";
  import GameWrapper from "./../../../../component/games/iframe/game-wrapper.svelte";
  import GameInfo from "./../../../../component/games/info-panel/game-info.svelte";
  import { afterNavigate } from "$app/navigation";
  import { gameManager } from "./../../../../component/games/iframe/game-manager.svelte";
  import Content from "./../../../../component/content/content.svelte";
  import { onMount } from "svelte";
  import Gallery from "./../../../../component/games/gallery/games-gallery.svelte";

  let { data }: { data: any } = $props();

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
    "Slot Gratis",
    "Slot Online",
    "Slot Machine",
    "Slot Machine Gratis",
    "Slot Machine Gratis Online Senza Registrazione",
    data.page.seo.metaTitle,
  ]}
  publishedAt={data.page.publishedAt}
  updatedAt={data.page.updatedAt}
/>

<Breadcrumbs
  breadcrumbs={[
    {
      url: `/slot-gratis`,
      title: "Gioca gratis alle Slot Online",
      label: "Slot Gratis",
    },
    {
      url: `/slot/${data.page.slug}`,
      title: `Gioca Gratis alla Slot Machine ${data.page.title} Online`,
      label: data.page.title,
    },
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

<div id="introContent" class="content">
  <h2 class="content-title">{data.page.title} Slot Machine</h2>
  <Content content={data.page.introContent} />
</div>
<div id="rulesContent" class="content">
  <h2 class="content-title">Le Regole</h2>
  <Content content={data.page.rulesContent} />
</div>
<div id="bonusContent" class="content content-columns">
  <div class="content-text">
    <h2 class="content-title">I Bonus della Slot {data.page.title}</h2>
    <Content content={data.page.bonusContent} />
  </div>
  <img
    class="img medium-img"
    src={data.page.gameplay.url.replace("/upload/", "/upload/f_avif/w_700/")}
    alt={`Logo della slot ${data.page.title}`}
    title={`Logo della slot ${data.page.title}`}
    width="600"
    height="400"
  />
</div>
<div id="opinionContent" class="content">
  <h2 class="content-title">Le nostre Opinioni</h2>
  <Content content={data.page.opinionContent} />
</div>

<SlotFaqs {data} />

<Author author={data.page.author} />

<SlotMetadata {data} />

<style>
  .casinos-provider-container {
    width: 90%;
    max-width: 1200px;
    margin: 100px auto;
  }
</style>
