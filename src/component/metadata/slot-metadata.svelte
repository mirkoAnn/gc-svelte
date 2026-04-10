<script lang="ts">
	import { appManager } from '$lib/app-manager.svelte';
	import { SITE_URL } from './sitedata-manager.svelte';

	let { data }: { data: any } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

{@html `
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "type": "WebPage",
      "id": "https://${SITE_URL}/${locale}/slot/${data.page.slug}/#webpage",
      "inLanguage": "${locale}_${locale.toUpperCase()}",
      "datePublished": "${data.page.publishedAt}",
      "dateModified": "${data.page.updatedAt}",
      "isPartOf": {
        "id": "https://${SITE_URL}/#website"
      },
      "name": "${data.page.seo.title}",
      "description": "${data.page.seo.description}"
    }
  </script>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "type": "WebApplication",
      "id": "https://${SITE_URL}/${locale}/slot/${data.page.slug}",
      "browserRequirements": "HTML5",
      "applicationCategory": "Game",
      "applicationSubCategory": "Slot Machine",
      "inLanguage": "${locale}_${locale.toUpperCase()}",
      "name": "${data.page.title}",
      "image": {
        "type": "ImageObject",
        "url": "${data.page.gameplay.url}",
        "width": 1000,
        "height": 562
      },
      "thumbnailUrl": "${data.page.logo.url}",
      "description": "${data.page.seo.description}",
      "isAccessibleForFree": true,
      "creator": {
        "type": "Organization",
        "name": "${data.page.provider.title}"
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
        "id": "https://${SITE_URL}/${locale}/slot/${data.page.slug}/#webpage"
      },
      "potentialAction": {
        "type": "PlayAction",
        "target": "${data.page.gameUrl}"
      },
      "aggregateRating": {
        "type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "${data.page.rating.up}",
        "bestRating": "5",
        "worstRating": "0"
      },
      "datePublished": "${data.page.publishedAt}",
      "review": {
        "type": "Review",
        "name": "${data.page.seo.title}",
        "dateCreated": "${data.page.publishedAt}",
        "dateModified": "${data.page.updatedAt}",
        "author": {
          "type": "Person",
          "id": "https://${SITE_URL}/${locale}/author/${data.page.author.slug}",
          "name": "${data.page.author.name}",
          "url": "https://${SITE_URL}/${locale}/author/${data.page.author.slug}",
          "sameAs": [
            "${data.page.author.facebookProfile}",
            "${data.page.author.linkedinProfile}"
          ],
          "image": {
            "type": "ImageObject",
            "url": "${data.page.author.image.url}"
          }
        }
      }
    }
    </script>
`}
