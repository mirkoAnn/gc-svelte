<script lang="ts">
  import Content from "./../../../component/content/content.svelte";
  import FaqsList from "./../../../component/faqs/faqs-list.svelte";
  import Breadcrumbs from "./../../../component/breadcrumbs/breadcrumbs.svelte";
  import CasinoTable from "./../../../component/casino/casino-table.svelte";
  import { casinosDataManager } from "./../../../component/casino/casinos-data-manager.svelte";
  import PageMetadata from "./../../../component/metadata/page-metadata.svelte";

  let { data }: { data: any } = $props();
</script>

<PageMetadata
  title={data.page.seo.title}
  description={data.page.seo.description}
/>

<Breadcrumbs
  breadcrumbs={[
    {
      url: `/casino-online`,
      title: "Gioca nei migliori Casino Online in Italia",
      label: "Casino Online",
    },
  ]}
/>

<h1 class="page-title">
  I migliori casino online in Italia: recensioni, bonus e giochi
</h1>
<CasinoTable casinos={casinosDataManager.getCasinos()} />

<div class="content first-content">
  <Content content={data.page.introContent} />
</div>
<div class="content">
  <Content content={data.page.legalsCasinosContent} />
</div>
<div class="content">
  <Content content={data.page.legalCasinosListContent} />
</div>
<div class="content">
  <Content content={data.page.howToChooseContent} />
</div>
<div class="content">
  <Content content={data.page.welcomeBonusContent} />
</div>
<div class="content">
  <Content content={data.page.slotContent} />
</div>
<div class="content">
  <Content content={data.page.liveContent} />
</div>
<div class="content">
  <Content content={data.page.hintsContent} />
</div>

<FaqsList faqs={data.page.faqs} />
