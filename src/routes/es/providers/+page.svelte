<script lang="ts">
	import PageMetadata from '../../../component/metadata/page-metadata.svelte';
	import Breadcrumbs from '../../../component/breadcrumbs/breadcrumbs.svelte';
	import ProvidersGallery from '../../../component/providers/providers-gallery.svelte';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import FaqsList from '../../../component/faqs/faqs-list.svelte';
	import AuthorBox from '../../../component/author/author-box.svelte';
	import type { ProvidersPageData } from './+page.server';

	let { data }: { data: ProvidersPageData } = $props();
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: `/es/providers` },
			title: `Los providers de juegos de casino online en España ${new Date().getFullYear()}`,
			label: 'Providers'
		}
	]}
/>

<h1 class="page-title">
	Los providers de juegos de casino online en España {new Date().getFullYear()}
</h1>

<ProvidersGallery providers={data.providers} />

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
