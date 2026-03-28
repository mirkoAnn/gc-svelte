<script lang="ts">
  import Content from "./../../../component/content/content.svelte";
  import FaqsList from "./../../../component/faqs/faqs-list.svelte";
  import PageMetadata from "./../../../component/metadata/page-metadata.svelte";
  import Breadcrumbs from "./../../../component/breadcrumbs/breadcrumbs.svelte";
  import { gamesGalleryManager } from "./../../../component/games/gallery/games-gallery-manager.svelte";
  import GamesGallery from "./../../../component/games/gallery/games-gallery.svelte";

  let { data }: { data: any } = $props();

  // Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
  // so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
  gamesGalleryManager.initGalleryData(
    [],
    {
      type: "roulette",
      categories: [
        {
          name: "rouletteMechanics",
          label: "Regole",
          filters: data.rouletteMechanics.map((rouletteMechanic: any) => ({
            title: rouletteMechanic.title,
            value: rouletteMechanic.slug,
          })), // we set the categories of the currently applied filters to the slugs of the roulette mechanics of the current roulette category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
        },
        {
          name: "providers",
          label: "Provider",
          filters: data.providers.map((provider: any) => ({
            title: provider.title,
            value: provider.slug,
          })), // we set the categories of the currently applied filters to an empty array because when we navigate to a new roulette category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited roulette category page
        },
      ],
    },
    {
      type: "roulette",
      categories: [
        {
          name: "rouletteMechanics",
          label: "Regole",
          filters: [], // we set the categories of the currently applied filters to the slugs of the roulette mechanics of the current roulette category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
        },
        {
          name: "providers",
          label: "Provider",
          filters: [], // we set the categories of the currently applied filters to an empty array because when we navigate to a new roulette category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited roulette category page
        },
      ],
    },
  );
</script>

<PageMetadata
  title={data.page.seo.title}
  description={data.page.seo.description}
/>

<Breadcrumbs
  breadcrumbs={[
    {
      url: `/roulette-gratis`,
      title: "Gioca gratis alle Roulette Online",
      label: "Roulette Gratis",
    },
  ]}
/>

<!-- <GamesSlider games={data.newSlots} /> -->

<!-- Main gallery used to show filtered games -->
<div class="game-galleries-outer">
  <GamesGallery
    category="roulette"
    type="grid"
    title="Roulette Online"
    hasFilters={true}
  />
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
<h1 class="page-title">
  Gioca alle migliori Roulette gratis e senza registrazione
</h1>
<div id="introContent" class="content first-content">
  <Content content={data.page.introContent} />
</div>
<div id="providersContent" class="content">
  <Content content={data.page.providersContent} />
</div>
<div id="howToPlayContent" class="content">
  <Content content={data.page.howToPlayContent} />
</div>
<div id="typesContent" class="content">
  <Content content={data.page.typesContent} />
</div>
<div id="securityContent" class="content">
  <Content content={data.page.securityContent} />
</div>
<div id="risksContent" class="content">
  <Content content={data.page.risksContent} />
</div>

<FaqsList faqs={data.page.faqs} />

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
