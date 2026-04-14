<script lang="ts">
	import { appManager } from '$lib/app-manager.svelte';
	import type { Slot } from '$lib/types/games';
	import { SITE_URL } from './sitedata-manager.svelte';

	let { data }: { data: Slot } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

{@html `
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "type": "WebPage",
      "id": "https://${SITE_URL}/${locale}/slot/${data.slug}/#webpage",
      "inLanguage": "${locale}_${locale.toUpperCase()}",
      "datePublished": "${data.publishedAt}",
      "dateModified": "${data.updatedAt}",
      "isPartOf": {
        "id": "https://${SITE_URL}/#website"
      },
      "name": "${data.seo.title}",
      "description": "${data.seo.description}"
    }
  </script>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "type": "WebApplication",
      "id": "https://${SITE_URL}/${locale}/slot/${data.slug}",
      "browserRequirements": "HTML5",
      "applicationCategory": "Game",
      "applicationSubCategory": "Slot Machine",
      "inLanguage": "${locale}_${locale.toUpperCase()}",
      "name": "${data.title}",
      "image": {
        "type": "ImageObject",
        "url": "${data.images[0]?.image.url}",
        "width": 1000,
        "height": 562
      },
      "thumbnailUrl": "${data.logo.url}",
      "description": "${data.seo.description}",
      "isAccessibleForFree": true,
      "creator": {
        "type": "Organization",
        "name": "${data.provider.title}"
      },
      "operatingSystem": "Windows, OSX, iOS, Android",
      "offers": {
        "type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Free"
      },
      "mainEntityOfPage": {
        "type": "WebPage",
        "id": "https://${SITE_URL}/${locale}/slot/${data.slug}/#webpage"
      },
      "potentialAction": {
        "type": "PlayAction",
        "target": "${data.gameUrl}"
      },
      "aggregateRating": {
        "type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "${data.rating.up}",
        "bestRating": "5",
        "worstRating": "0"
      },
      "datePublished": "${data.publishedAt}",
      "review": {
        "type": "Review",
        "name": "${data.seo.title}",
        "dateCreated": "${data.publishedAt}",
        "dateModified": "${data.updatedAt}",
        "author": {
          "type": "Person",
          "id": "https://${SITE_URL}/${locale}/author/${data.author.slug}",
          "name": "${data.author.name}",
          "url": "https://${SITE_URL}/${locale}/author/${data.author.slug}",
          "sameAs": [
            "${data.author.facebookProfile}",
            "${data.author.linkedinProfile}"
          ],
          "image": {
            "type": "ImageObject",
            "url": "${data.author.image.url}"
          }
        }
      }
    }
    </script>
`}
