<script lang="ts">
	import PageMetadata from '../../../component/metadata/page-metadata.svelte';
	import Breadcrumbs from '../../../component/breadcrumbs/breadcrumbs.svelte';
	import ProvidersGallery from '../../../component/providers/providers-gallery.svelte';
	import type { Provider } from '$lib/types/provider';
	import ContentContainer from '../../../component/content/content-container.svelte';
	import FaqsList from '../../../component/faqs/faqs-list.svelte';
	import AuthorBox from '../../../component/author/author-box.svelte';
	import type { ProvidersPageData } from './+page.server';
	import type { AppData } from '$lib/types/app-data';

	let { data }: { data: { appData: AppData; page: ProvidersPageData; providers: Provider[] } } =
		$props();
</script>

<PageMetadata title={data.page.seo.title} description={data.page.seo.description} />

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: `/it/providers` },
			title: `I migliori providers di giochi da casinò online in Italia ${new Date().getFullYear()}`,
			label: 'Providers'
		}
	]}
/>

<h1 class="page-title">
	I migliori providers di giochi da casinò online in Italia {new Date().getFullYear()}
</h1>

<ProvidersGallery providers={data.providers} />

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
