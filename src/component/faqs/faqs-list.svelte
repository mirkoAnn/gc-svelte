<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type { FAQ } from '$lib/types/faqs';
	import { m } from '../../paraglide/messages';
	import Faq from './faq.svelte';

	let { faqs } = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((faq: FAQ) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer
						? faq.answer
								.map((block: { children?: { text?: string }[] }) =>
									block.children
										? block.children.map((c) => ('text' in c ? c.text : '')).join('')
										: ''
								)
								.join(' ')
						: ''
				}
			}))
		})
	);
</script>

<svelte:head>
	<svelte:element this={'script'} type="application/ld+json">{jsonLd}</svelte:element>
</svelte:head>

<div class="content faqs-container">
	<h2 class="faqs-title">{m.faqs({}, { locale })}</h2>
	<div class="faqs-inner">
		{#each faqs as faq ('faq' + faq.id)}
			<Faq {faq} />
		{/each}
	</div>
</div>

<style>
	.faqs-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		.faqs-title {
			text-align: center;
		}
		.faqs-inner {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}
</style>
