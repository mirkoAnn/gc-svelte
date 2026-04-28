<script lang="ts">
	import { page } from '$app/state';
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

	const pageUrl = $derived(page.url.href.replace('/?', '?'));
	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? 'it'
	);
	const currentYear = new Date().getFullYear().toString();
	const resolvedTitle = $derived(title.replace('{YEAR}', currentYear));
	const resolvedDescription = $derived(description.replace('{YEAR}', currentYear));
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDescription} />
	<meta name="author" content={authorName} />
	<link rel="canonical" href={pageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={`@${SITE_NAME}`} />
	<meta name="twitter:creator" content={`@${authorName}`} />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={imageAddress} />
	<meta name="twitter:image:alt" content={resolvedTitle} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:site_name" content={SITE_NAME} />
	{#if ogType}
		<meta property="og:type" content={ogType} />
		{#if publishedAt}
			<meta property="article:published_time" content={publishedAt} />
		{/if}
		{#if updatedAt}
			<meta property="article:modified_time" content={updatedAt} />
		{/if}
		<meta property="article:author" content={authorName} />
		{#if section}
			<meta property="article:section" content={section} />
		{/if}
		{#if tags && tags.length > 0}
			<meta property="article:tag" content={tags.join(', ')} />
		{/if}
	{/if}
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:image" content={imageAddress} />
	<meta property="og:image:alt" content={resolvedTitle} />
	<meta property="og:image:width" content="400" />
	<meta property="og:image:height" content="80" />
	<meta property="og:locale" content={locale + '_' + locale.toUpperCase()} />
	<meta name="robots" content="index,follow" />
	<meta name="googlebot" content="index,follow" />
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.rss" />
	<link rel="alternate" type="application/atom+xml" title="Atom" href="/feed.atom" />
</svelte:head>
