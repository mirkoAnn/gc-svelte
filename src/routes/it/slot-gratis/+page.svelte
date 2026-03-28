<script lang="ts">
  import Content from "./../../../component/content/content.svelte";
  import FaqsList from "./../../../component/faqs/faqs-list.svelte";
  import PageMetadata from "../../../component/metadata/page-metadata.svelte";
  import Breadcrumbs from "../../../component/breadcrumbs/breadcrumbs.svelte";
  import { gamesGalleryManager } from "../../../component/games/gallery/games-gallery-manager.svelte";
  import GamesGallery from "../../../component/games/gallery/games-gallery.svelte";

  let { data }: { data: any } = $props();

  // Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
  // so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
  gamesGalleryManager.initGalleryData(
    [],
    {
      type: "slot",
      categories: [
        {
          name: "slotThemes",
          label: "Tema",
          filters: data.slotThemes.map((slotTheme: any) => ({
            title: slotTheme.title,
            value: slotTheme.slug,
          })), // we set the categories of the currently applied filters to the slugs of the slot themes of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
        },
        {
          name: "providers",
          label: "Provider",
          filters: data.providers.map((provider: any) => ({
            title: provider.title,
            value: provider.slug,
          })), // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
        },
        {
          name: "orderBy",
          label: "Ordina per",
          filters: [
            { title: "Nome (A-Z)", value: "title:asc" },
            { title: "Nome (Z-A)", value: "title:desc" },
            { title: "Recenti", value: "createdAt:desc" },
            { title: "Più Giocate", value: "sessions:desc" },
          ], // we set the categories of the currently applied filters to the slugs of the features of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
        },
      ],
    },
    {
      type: "slot",
      categories: [
        {
          name: "slotThemes",
          label: "Tema",
          filters: [], // we set the categories of the currently applied filters to the slugs of the slot themes of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
        },
        {
          name: "providers",
          label: "Provider",
          filters: [], // we set the categories of the currently applied filters to an empty array because when we navigate to a new slot category page we want to reset the applied provider filters, this will allow us to show all the providers in the filters options and let the user choose which provider filters they want to apply without having some of them already applied by default based on the previously visited slot category page
        },
        {
          name: "orderBy",
          label: "Ordina per",
          filters: [{ title: "Recenti", value: "createdAt:desc" }], // we set the categories of the currently applied filters to the slugs of the features of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
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
      url: `/slot-gratis`,
      title: "Gioca gratis alle Slot Online",
      label: "Slot Gratis",
    },
  ]}
/>

<!-- <GamesSlider games={data.newSlots} /> -->

<!-- Main gallery used to show filtered games -->
<div class="game-galleries-outer">
  <GamesGallery
    category="slot"
    type="grid"
    title="Slot Online"
    hasFilters={true}
  />
  <!-- Slot categories section showing slots by categories until a filter is applied and the main gallery is displayed -->
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
<h1 class="page-title">
  Gioca alle migliori slot machine gratis e senza registrazione
</h1>
<div id="introContent" class="content first-content">
  <Content content={data.page.introContent} />
</div>
<div id="whatAreSlotsContent" class="content">
  <Content content={data.page.whatAreSlotsContent} />
</div>
<div id="howToPlaySlotsContent" class="content">
  <Content content={data.page.howToPlaySlotsContent} />
</div>
<div id="slotsCategoryContent" class="content">
  <Content content={data.page.slotsCategoryContent} />
</div>
<div id="bestSlotsContent" class="content">
  <Content content={data.page.bestSlotsContent} />
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
