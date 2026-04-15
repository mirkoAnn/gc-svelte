<script lang="ts">
	import ContentContainer from './../../../../component/content/content-container.svelte';
	import AuthorBox from '../../../../component/author/author-box.svelte';
	import Breadcrumbs from '../../../../component/breadcrumbs/breadcrumbs.svelte';
	import CasinoComparatorGrid from '../../../../component/casino/casino-comparator-grid.svelte';
	import CasinoInfoPanel from '../../../../component/casino/info-panel/casino-info-panel.svelte';
	import ImgPreview from '../../../../component/content/img-preview.svelte';
	import FaqsList from '../../../../component/faqs/faqs-list.svelte';
	import PageMetadata from '../../../../component/metadata/page-metadata.svelte';
	import ProvidersGallery from '../../../../component/providers/providers-gallery.svelte';
	import { appManager } from '../../../../lib/app-manager.svelte';
	import type { Casino } from '$lib/types/casino';

	let { data }: { data: { page: Casino } } = $props();
</script>

<PageMetadata
	title={data.page.seo.title}
	description={data.page.seo.description}
	imageAddress={data.page.logo.url}
	ogType="article"
	authorName={data.page.author.name}
	section="Casino Online"
	tags={['Casino online', 'Casino Italia', 'Casino con licencia ADM', data.page.title]}
	publishedAt={data.page.publishedAt}
	updatedAt={data.page.updatedAt}
/>

<Breadcrumbs
	breadcrumbs={[
		{
			route: { id: '/it/casino-online' },
			title: 'Gioca nei migliori Casino Online in Italia',
			label: 'Casino Online'
		},
		{
			route: { id: `/it/casino-online/[slug]`, params: { slug: data.page.slug } },
			title: 'Info, bonus e opinioni sul casino online di ' + data.page.title,
			label: data.page.title
		}
	]}
/>

<CasinoInfoPanel casino={data.page} />

<!-- Site design content section -->
{#if data.page.content.firstContent}
	<div id="siteDesignContent" class="section-content">
		<ContentContainer content={data.page.content.firstContent} />
		<ImgPreview
			imgId={appManager.isMobile() ? data.page.imagesMobile[0].id : data.page.images[0].id}
			imgUrl={appManager.isMobile()
				? data.page.imagesMobile[0].url
				: data.page.images[0].url.replace('/upload/', '/upload/f_avif/w_2000/')}
			imgAlt={'Immagine del casino online ' + data.page.title}
			imgWidth="100%"
			imgHeight="auto"
			imgSize="big"
		/>
	</div>
{/if}
<!-- Welcome Bonus section -->
{#if data.page.content.secondContent}
	<ContentContainer content={data.page.content.secondContent} />
	<div id="casinoComparatorContent" class="content casino-comparator-panel">
		<h2 class="casino-comparator-title">Confronta con altri casino online</h2>
		<!-- <CasinoComparator currentId={data.page.id} /> -->
		<CasinoComparatorGrid currentId={data.page.id} />
	</div>
{/if}
<!-- Slots content section -->
{#if data.page.content.thirdContent}
	<div id="slotsContent" class="section-content">
		<ContentContainer content={data.page.content.thirdContent} />
		<ImgPreview
			imgId={appManager.isMobile() ? data.page.imagesMobile[1].id : data.page.images[1].id}
			imgUrl={appManager.isMobile()
				? data.page.imagesMobile[1].url
				: data.page.images[1].url.replace('/upload/', '/upload/f_avif/w_2000/')}
			imgAlt={'La sezione slot del casino online ' + data.page.title}
			imgWidth="100%"
			imgHeight="auto"
			imgSize="big"
		/>
	</div>
{/if}
<!-- Providers gallery section -->
{#if data.page.content.fourthContent}
	<div id="providersGallery" class="section-content">
		<div class="content live-content">
			<h2 class="providers-gallery-title">
				I providers dei giochi disponibili nel casino di {data.page.title}
			</h2>
			<ProvidersGallery providers={data.page.providers} />
		</div>
	</div>
{/if}
<!-- Live content section -->
{#if data.page.content.fifthContent}
	<div id="liveContent" class="section-content">
		<ContentContainer content={data.page.content.fifthContent} />
		<ImgPreview
			imgId={appManager.isMobile() ? data.page.imagesMobile[2].id : data.page.images[2].id}
			imgUrl={appManager.isMobile()
				? data.page.imagesMobile[2].url
				: data.page.images[2].url.replace('/upload/', '/upload/f_avif/w_2000/')}
			imgAlt={'La sezione dei giochi live di ' + data.page.title}
			imgWidth="100%"
			imgHeight="auto"
			imgSize="big"
		/>
	</div>
{/if}
<!-- Sport content section -->
{#if data.page.content.sixthContent}
	<div id="sportContent" class="section-content">
		<ContentContainer content={data.page.content.sixthContent} />
		<ImgPreview
			imgId={appManager.isMobile() ? data.page.imagesMobile[3].id : data.page.images[3].id}
			imgUrl={appManager.isMobile()
				? data.page.imagesMobile[3].url
				: data.page.images[3].url.replace('/upload/', '/upload/f_avif/w_2000/')}
			imgAlt={'La sezione delle scommesse sportive di ' + data.page.title}
			imgWidth="100%"
			imgHeight="auto"
			imgSize="big"
		/>
	</div>
{/if}
<!-- Payment content section -->
{#if data.page.content.seventhContent}
	<div id="securityPaymentsContent" class="section-content">
		<ContentContainer content={data.page.content.seventhContent} />
		<ImgPreview
			imgId={appManager.isMobile() ? data.page.imagesMobile[4].id : data.page.images[4].id}
			imgUrl={appManager.isMobile()
				? data.page.imagesMobile[4].url
				: data.page.images[4].url.replace('/upload/', '/upload/f_avif/w_2000/')}
			imgAlt={'Sicurezza del casino ' + data.page.title}
			imgWidth="100%"
			imgHeight="auto"
			imgSize="big"
		/>
	</div>
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
