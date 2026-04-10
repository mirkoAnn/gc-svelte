<script lang="ts">
	import Author from '../../../../component/author/author.svelte';
	import Breadcrumbs from '../../../../component/breadcrumbs/breadcrumbs.svelte';
	import CasinoComparatorGrid from '../../../../component/casino/casino-comparator-grid.svelte';
	import CasinoInfoPanel from '../../../../component/casino/info-panel/casino-info-panel.svelte';
	import Content from '../../../../component/content/content.svelte';
	import ImgPreview from '../../../../component/content/img-preview.svelte';
	import PageMetadata from '../../../../component/metadata/page-metadata.svelte';
	import ProvidersGallery from '../../../../component/providers/providers-gallery.svelte';
	import { appManager } from '../../../../lib/app-manager.svelte';
	import type { CasinoPageData } from './+page.server';

	let { data }: { data: { page: CasinoPageData } } = $props();
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
<div id="siteDesignContent" class="section-content">
	<div class="content site-design-content">
		<Content content={data.page.siteDesignContent} />
	</div>
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

<!-- Welcome Bonus section -->
<div id="bonusContent" class="content bonus-content">
	<Content content={data.page.bonusContent} />
</div>
<div id="casinoComparatorContent" class="content casino-comparator-panel">
	<h2 class="casino-comparator-title">Confronta con altri casino online</h2>
	<!-- <CasinoComparator currentId={data.page.id} /> -->
	<CasinoComparatorGrid currentId={data.page.id} />
</div>

<!-- Slots content section -->
<div id="slotsContent" class="section-content">
	<div class="content slots-content">
		<Content content={data.page.slotsContent} />
	</div>
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

<!-- Providers gallery section -->
<div id="providersGallery" class="section-content">
	<div class="content live-content">
		<h2 class="providers-gallery-title">
			I providers dei giochi disponibili nel casino di {data.page.title}
		</h2>
		<ProvidersGallery providers={data.page.providers} />
	</div>
</div>

<!-- Live content section -->
<div id="liveContent" class="section-content">
	<div class="content live-content">
		<Content content={data.page.liveContent} />
	</div>
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

<!-- Sport content section -->
<div id="sportContent" class="section-content">
	<div class="content sport-content">
		<Content content={data.page.sportContent} />
	</div>
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

<!-- Payment content section -->
<div id="securityPaymentsContent" class="section-content">
	<div class="content security-payments-content">
		<Content content={data.page.securityPaymentsContent} />
	</div>
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

<!-- Opinion content section -->
<div id="opinionContent" class="content opinion-content">
	<Content content={data.page.opinionContent} />
</div>

<Author author={data.page.author} />
