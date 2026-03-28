<script lang="ts">
  import Content from "./../../../../component/content/content.svelte";
  import PageMetadata from "./../../../../component/metadata/page-metadata.svelte";
  import Author from "./../../../../component/author/author.svelte";
  import Breadcrumbs from "./../../../../component/breadcrumbs/breadcrumbs.svelte";
  import Gallery from "./../../../../component/games/gallery/games-gallery.svelte";
  import { gamesGalleryManager } from "./../../../../component/games/gallery/games-gallery-manager.svelte";
  import FaqsList from "./../../../../component/faqs/faqs-list.svelte";

  let { data }: { data: any } = $props();

  const refreshGallery = () => {
    // Update the games in the gallery with the games of the current slot category, this is needed because the games gallery is shared between all the slot category pages,
    // so we need to update the games in the gallery when navigating to a new slot category page to avoid having the gallery showing the wrong games.
    gamesGalleryManager.initGalleryData(
      data.slots,
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
            filters: [{ title: "Più Giocate", value: "sessions:desc" }], // we set the categories of the currently applied filters to the slugs of the features of the current slot category, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters
          },
        ],
      },
    );
  };

  refreshGallery();
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
    {
      url: `/slot-gratis/slot-piu-giocate`,
      title: `Gioca Gratis alle Slot più giocate`,
      label: "Slot Più Giocate",
    },
  ]}
/>

<h1 class="page-title">Slot Online Più Giocate</h1>
<div class="slot-category">
  <Gallery category="slot" type="grid" hasFilters={true} />
</div>

<div id="introContent" class="content first-content">
  <Content content={data.page.introContent} />
</div>

<div id="bestSlotsContent" class="content">
  <Content content={data.page.bestSlotsContent} />
</div>
<div id="gateOfOlympusContent" class="content">
  <Content content={data.page.gateOfOlympusContent} />
</div>
<div id="bookOfRaContent" class="content">
  <Content content={data.page.bookOfRaContent} />
</div>
<div id="bigBassContent" class="content">
  <Content content={data.page.bigBassContent} />
</div>
<div id="characteristicsContent" class="content">
  <Content content={data.page.characteristicsContent} />
</div>
<div id="beyondClassicContent" class="content">
  <Content content={data.page.beyondClassicContent} />
</div>
<div id="tryContent" class="content">
  <Content content={data.page.tryContent} />
</div>

<FaqsList faqs={data.page.faqs} />

<Author author={data.page.author} />

<style>
  .first-content {
    margin-top: 500px;
  }
</style>
