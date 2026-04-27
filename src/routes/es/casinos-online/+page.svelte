<script lang="ts">
	import FaqsList from './../../../component/faqs/faqs-list.svelte';
	import Breadcrumbs from './../../../component/breadcrumbs/breadcrumbs.svelte';
	import CasinoTable from './../../../component/casino/casino-table.svelte';
	import { casinosDataManager } from './../../../component/casino/casinos-data-manager.svelte';
	import PageMetadata from './../../../component/metadata/page-metadata.svelte';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import { CountryCodes } from '$lib/app-manager.svelte';
	import { resolveCasinoIndexPath } from '$lib/link-resolver';
	import type { RouteId } from '$app/types';
	import type { CasinoOnlinePageData } from './+page.server';
	import AuthorBox from '../../../component/author/author-box.svelte';

	let { data }: { data: { page: CasinoOnlinePageData } } = $props();
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: resolveCasinoIndexPath(CountryCodes.es) as RouteId },
			title: 'Juega en los mejores Casinos Online en España',
			label: 'Casino Online'
		}
	]}
/>

<h1 class="page-title">Los mejores casinos online en España: reseñas, bonos y juegos</h1>
<CasinoTable casinos={casinosDataManager.getCasinos()} />

{#if data.page.content.firstContent}
	<ContentContainer content={data.page.content.firstContent} />
{/if}
{#if data.page.content.secondContent}
	<ContentContainer content={data.page.content.secondContent} />
{/if}
{#if data.page.content.thirdContent}
	<ContentContainer content={data.page.content.thirdContent} />
{/if}
{#if data.page.content.fourthContent}
	<ContentContainer content={data.page.content.fourthContent} />
{/if}
{#if data.page.content.fifthContent}
	<ContentContainer content={data.page.content.fifthContent} />
{/if}
{#if data.page.content.sixthContent}
	<ContentContainer content={data.page.content.sixthContent} />
{/if}
{#if data.page.content.seventhContent}
	<ContentContainer content={data.page.content.seventhContent} />
{/if}
{#if data.page.content.eighthContent}
	<ContentContainer content={data.page.content.eighthContent} />
{/if}
{#if data.page.content.ninethContent}
	<ContentContainer content={data.page.content.ninethContent} />
{/if}
{#if data.page.content.tenthContent}
	<ContentContainer content={data.page.content.tenthContent} />
{/if}

{#if data.page.faqs.length > 0}
	<FaqsList faqs={data.page.faqs} />
{/if}

{#if data.page.author}
	<AuthorBox author={data.page.author} />
{/if}
