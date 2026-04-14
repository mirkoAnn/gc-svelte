<script lang="ts">
	import { SITE_NAME } from './../metadata/sitedata-manager.svelte.ts';
	import type { FAQ } from '$lib/types/faqs';
	import type { TextContent } from '$lib/types/content';
	import FaqsList from './faqs-list.svelte';
	import { casinosDataManager } from '../casino/casinos-data-manager.svelte';
	import { appManager } from '$lib/app-manager.svelte';
	import { m } from '../../paraglide/messages';
	import type { Slot } from '$lib/types/games';
	import { formatCurrency } from '$lib/utils.svelte.ts';

	let {
		data
	}: {
		data: Slot;
	} = $props();
	// Helper function to create content structure from plain text answers
	// The content structure is an array of blocks, each block has a type and children, similar to content structure used by fetched rich text.
	const createContentFromText = (text: string): TextContent[] => {
		return [{ type: 'paragraph', children: [{ type: 'text', text }] }];
	};

	const locale = $derived(appManager.getCountryCode());

	const volatility = $derived(() => {
		switch (data.info.volatility.toLowerCase()) {
			case 'low':
				return m.slot_volatility_low({}, { locale });
			case 'medium-low':
				return m.slot_volatility_medium_low({}, { locale });
			case 'medium':
				return m.slot_volatility_medium({}, { locale });
			case 'medium-high':
				return m.slot_volatility_medium_high({}, { locale });
			case 'high':
				return m.slot_volatility_high({}, { locale });
			default:
				return '';
		}
	});

	let faqs: FAQ[] = $derived.by(() => {
		const formattedFaqs: { id: string; question: string; answer: string }[] = [
			{
				id: `${data.slug}-faq-0`,
				question: `${m.slot_faqs_casinos_question({ gameTitle: data.title }, { locale })}`,
				answer: `${m.slot_faqs_casinos_answer(
					{
						gameTitle: data.title,
						providerName: data.provider.title,
						casinosList: casinosDataManager
							.getCasinosByProviderTitle(data.provider.title)
							.map((casino) => casino.title)
							.join(', ')
					},
					{ locale }
				)}`
			},
			{
				id: `${data.slug}-faq-1`,
				question: `${m.slot_faqs_demo_question({ gameTitle: data.title }, { locale })}`,
				answer: `${m.slot_faqs_demo_answer({ gameTitle: data.title }, { locale })}`
			},
			{
				id: `${data.slug}-faq-2`,
				question: `${m.slot_faqs_no_registration_question({ gameTitle: data.title }, { locale })}`,
				answer: `${m.slot_faqs_no_registration_answer({ siteName: SITE_NAME }, { locale })}`
			},
			{
				id: `${data.slug}-faq-3`,
				question: `${m.slot_faqs_mobile_question({ gameTitle: data.title }, { locale })}`,
				answer: `${m.slot_faqs_mobile_answer({ gameTitle: data.title }, { locale })}`
			},
			{
				id: `${data.slug}-faq-4`,
				question: `${m.slot_faqs_provider_question({ gameTitle: data.title }, { locale })}`,
				answer: `${m.slot_faqs_provider_answer({ gameTitle: data.title, providerName: data.provider.title }, { locale })}`
			},
			{
				id: `${data.slug}-faq-5`,
				question: `${m.slot_faqs_bonus_question({ gameTitle: data.title }, { locale })}`,
				answer:
					!data.info.hasFreeSpins && !data.info.hasBonusGame && !data.info.hasJackpot
						? `${m.slot_faqs_bonus_no_answer({ gameTitle: data.title }, { locale })}`
						: `${m.slot_faqs_bonus_answer({ gameTitle: data.title }, { locale })}` +
							(data.info.hasFreeSpins ? `, ${m.slot_free_spins_bonus({}, { locale })}` : '') +
							(data.info.hasBonusGame ? `, ${m.slot_bonus_game({}, { locale })}` : '') +
							(data.info.hasJackpot ? `, ${m.slot_jackpot({}, { locale })}` : '')
			},
			{
				id: `${data.slug}-faq-6`,
				question: `${m.slot_faqs_rtp_question({ gameTitle: data.title }, { locale })}`,
				answer: data.info.rtp
					? `${m.slot_faqs_rtp_answer({ gameTitle: data.title, rtp: data.info.rtp }, { locale })}`
					: `${m.slot_faqs_rtp_no_answer({ gameTitle: data.title }, { locale })}`
			},
			{
				id: `${data.slug}-faq-7`,
				question: `${m.slot_faqs_volatility_question({ gameTitle: data.title }, { locale })}`,
				answer: `${m.slot_faqs_volatility_answer({ gameTitle: data.title, gameVolatility: volatility() }, { locale })}`
			},
			{
				id: `${data.slug}-faq-8`,
				question: `${m.slot_faqs_bet_min_question({ gameTitle: data.title }, { locale })}`,
				answer: data.info.betMin
					? `${m.slot_faqs_bet_min_answer({ gameTitle: data.title, betMin: formatCurrency(data.info.betMin) }, { locale })}`
					: `${m.slot_faqs_bet_min_no_answer({ gameTitle: data.title }, { locale })}`
			},
			{
				id: `${data.slug}-faq-9`,
				question: `${m.slot_faqs_win_max_question({ gameTitle: data.title }, { locale })}`,
				answer: data.info.winMax
					? `${m.slot_faqs_win_max_answer({ gameTitle: data.title, winMax: formatCurrency(data.info.winMax) }, { locale })}`
					: `${m.slot_faqs_win_max_no_answer({ gameTitle: data.title }, { locale })}`
			}
		];

		return formattedFaqs.map((faq, i) => {
			return {
				id: `${data.slug}-faq-${i}`,
				question: faq.question,
				answer: createContentFromText(faq.answer) as FAQ['answer']
			};
		});
	});
</script>

<FaqsList {faqs} />
