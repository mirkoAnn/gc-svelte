<script lang="ts">
	import FaqsList from './../../../component/faqs/faqs-list.svelte';
	import Breadcrumbs from './../../../component/breadcrumbs/breadcrumbs.svelte';
	import CasinoTable from './../../../component/casino/casino-table.svelte';
	import { casinosDataManager } from './../../../component/casino/casinos-data-manager.svelte';
	import PageMetadata from './../../../component/metadata/page-metadata.svelte';
	import { appManager } from '$lib/app-manager.svelte';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import type { CasinoOnlinePageData } from './+page.server';
	import AuthorBox from '../../../component/author/author-box.svelte';

	let { data }: { data: { page: CasinoOnlinePageData } } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

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

<ContentContainer content={data.page.content.firstContent} />

<ContentContainer content={data.page.content.secondContent} />

<ContentContainer content={data.page.content.thirdContent} />

<ContentContainer content={data.page.content.fourthContent} />

<ContentContainer content={data.page.content.fifthContent} />

<ContentContainer content={data.page.content.sixthContent} />

<ContentContainer content={data.page.content.seventhContent} />

<ContentContainer content={data.page.content.eighthContent} />

<ContentContainer content={data.page.content.ninethContent} />

<ContentContainer content={data.page.content.tenthContent} />

<FaqsList faqs={data.page.faqs} />

<AuthorBox author={data.page.author} />
