<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { appManager } from '$lib/app-manager.svelte';
	import { SITE_LOGO_URL, SITE_NAME } from './sitedata-manager.svelte';

	let {
		title,
		description,
		imageAddress = SITE_LOGO_URL,
		authorName = 'Geremia Salerno',
		ogType,
		section,
		tags,
		publishedAt,
		updatedAt
	}: {
		title: string;
		description: string;
		imageAddress?: string;
		authorName?: string;
		ogType?: string;
		section?: string;
		tags?: string[];
		publishedAt?: string;
		updatedAt?: string;
	} = $props();

	let pageUrl = $state('');
	afterNavigate(() => {
		pageUrl = window.location.href.replace('/?', '');
	});

	const locale = $derived(appManager.getCountryCode());
</script>

<svelte:head>
	<title>{title.replace('{YEAR}', new Date().getFullYear().toString())}</title>
	<meta
		name="description"
		content={description.replace('{YEAR}', new Date().getFullYear().toString())}
	/>
	<link rel="canonical" href={pageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={`@${SITE_NAME}`} />
	<meta name="twitter:creator" content={`@${authorName}`} />
	<meta
		name="twitter:title"
		content={title.replace('{YEAR}', new Date().getFullYear().toString())}
	/>
	<meta
		name="twitter:description"
		content={description.replace('{YEAR}', new Date().getFullYear().toString())}
	/>
	<meta name="twitter:image" content={imageAddress} />
	<meta
		name="twitter:image:alt"
		content={title.replace('{YEAR}', new Date().getFullYear().toString())}
	/>
	<meta property="og:url" content={pageUrl} />
	{#if ogType}
		<meta property="og:type" content={ogType} />
		<meta property="article:published_time" content={publishedAt} />
		<meta property="article:modified_time" content={updatedAt} />
		<meta property="article:author" content={authorName} />
		<meta property="article:section" content={section} />
		<meta property="article:tag" content={tags?.join(', ')} />
	{/if}
	<meta
		property="og:title"
		content={title.replace('{YEAR}', new Date().getFullYear().toString())}
	/>
	<meta
		property="og:description"
		content={description.replace('{YEAR}', new Date().getFullYear().toString())}
	/>
	<meta property="og:image" content={imageAddress} />
	<meta property="og:image:width" content="400" />
	<meta property="og:image:height" content="80" />
	<meta property="og:locale" content={locale + '_' + locale.toUpperCase()} />
	<meta name="robots" content="index,follow" />
	<meta name="googlebot" content="index,follow" />
	<link rel="alternate" href="/feed.rss" />
	<link rel="alternate" href="/feed.atom" />
</svelte:head>
