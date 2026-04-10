<script lang="ts">
	import Content from './../../../component/content/content.svelte';
	import FaqsList from './../../../component/faqs/faqs-list.svelte';
	import Breadcrumbs from './../../../component/breadcrumbs/breadcrumbs.svelte';
	import CasinoTable from './../../../component/casino/casino-table.svelte';
	import { casinosDataManager } from './../../../component/casino/casinos-data-manager.svelte';
	import PageMetadata from './../../../component/metadata/page-metadata.svelte';
	import type { CasinoOnlinePageData } from './+page.server';
	import { appManager } from '$lib/app-manager.svelte';

	let { data }: { data: CasinoOnlinePageData } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

<PageMetadata title={data.seo.title} description={data.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: `/${locale}/casino-online` },
			title: 'Gioca nei migliori Casino Online in Italia',
			label: 'Casino Online'
		}
	]}
/>

<h1 class="page-title">I migliori casino online in Italia: recensioni, bonus e giochi</h1>
<CasinoTable casinos={casinosDataManager.getCasinos()} />

<div class="content first-content">
	<Content content={data.content.firstContent} />
</div>
<div class="content">
	<Content content={data.content.secondContent} />
</div>
<div class="content">
	<Content content={data.content.thirdContent} />
</div>
<div class="content">
	<Content content={data.content.fourthContent} />
</div>
<div class="content">
	<Content content={data.content.fifthContent} />
</div>
<div class="content">
	<Content content={data.content.sixthContent} />
</div>
<div class="content">
	<Content content={data.content.seventhContent} />
</div>
<div class="content">
	<Content content={data.content.eighthContent} />
</div>
<div class="content">
	<Content content={data.content.ninethContent} />
</div>
<div class="content">
	<Content content={data.content.tenthContent} />
</div>

<FaqsList faqs={data.faqs} />
