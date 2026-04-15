<script lang="ts">
	import { appManager } from '$lib/app-manager.svelte';
	import type { Slot } from '$lib/types/games';
	import { SITE_URL } from './sitedata-manager.svelte';

	let { data }: { data: Slot } = $props();

	const locale = $derived(appManager.getCountryCode() ?? 'it');
	const localeTag = $derived(`${locale}_${locale.toUpperCase()}`);
	const authorSameAs = $derived(
		[data.author.facebookProfile, data.author.linkedinProfile].filter(
			(profile): profile is string => Boolean(profile)
		)
	);

	const webpageSchema = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			'@id': `${SITE_URL}/${locale}/slot/${data.slug}/#webpage`,
			inLanguage: localeTag,
			datePublished: data.publishedAt,
			dateModified: data.updatedAt,
			isPartOf: {
				'@id': `${SITE_URL}/#website`
			},
			name: data.seo.title,
			description: data.seo.description
		})
	);

	const webApplicationSchema = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			'@id': `${SITE_URL}/${locale}/slot/${data.slug}`,
			browserRequirements: 'HTML5',
			applicationCategory: 'Game',
			applicationSubCategory: 'Slot Machine',
			inLanguage: localeTag,
			name: data.title,
			image: {
				'@type': 'ImageObject',
				url: data.images[0]?.image.url,
				width: 1000,
				height: 562
			},
			thumbnailUrl: data.logo.url,
			description: data.seo.description,
			isAccessibleForFree: true,
			creator: {
				'@type': 'Organization',
				name: data.provider.title
			},
			operatingSystem: 'Windows, OSX, iOS, Android',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'EUR',
				description: 'Free'
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `${SITE_URL}/${locale}/slot/${data.slug}/#webpage`
			},
			potentialAction: {
				'@type': 'PlayAction',
				target: data.gameUrl
			},
			aggregateRating: {
				'@type': 'AggregateRating',
				ratingValue: '5',
				reviewCount: String(data.rating.up),
				bestRating: '5',
				worstRating: '0'
			},
			datePublished: data.publishedAt,
			review: {
				'@type': 'Review',
				name: data.seo.title,
				dateCreated: data.publishedAt,
				dateModified: data.updatedAt,
				author: {
					'@type': 'Person',
					name: data.author.name,
					...(authorSameAs.length > 0 ? { sameAs: authorSameAs } : {}),
					image: {
						'@type': 'ImageObject',
						url: data.author.image.url
					}
				}
			}
		})
	);
</script>

<svelte:head>
	<svelte:element this={'script'} type="application/ld+json">{webpageSchema}</svelte:element>
	<svelte:element this={'script'} type="application/ld+json">{webApplicationSchema}</svelte:element>
</svelte:head>
