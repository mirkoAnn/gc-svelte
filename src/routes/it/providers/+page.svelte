<script lang="ts">
  import PageMetadata from "../../../component/metadata/page-metadata.svelte";
  import Breadcrumbs from "../../../component/breadcrumbs/breadcrumbs.svelte";
  import ProvidersGallery from "../../../component/providers/providers-gallery.svelte";

  let { data }: { data: any } = $props();
</script>

<PageMetadata
  title={data.page.seo.title}
  description={data.page.seo.description}
/>

<Breadcrumbs
  breadcrumbs={[
    {
      url: `/providers`,
      title: "I migliori providers di giochi da casinò online",
      label: "Providers",
    },
  ]}
/>

<h1 class="page-title">I migliori providers di giochi da casinò online</h1>

<ProvidersGallery providers={data.providers} />
