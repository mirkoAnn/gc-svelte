<script lang="ts">
	import { SITE_NAME } from './../metadata/sitedata-manager.svelte.ts';
	import type { FAQ } from '$lib/types/faqs';
	import type { TextContent } from '$lib/types/content';
	import FaqsList from './faqs-list.svelte';
	import { casinosDataManager } from '../casino/casinos-data-manager.svelte';
	import { appManager } from '$lib/app-manager.svelte';
	import { m } from '../../paraglide/messages';

	let {
		data
	}: {
		data: {
			page: {
				title: string;
				info: {
					rtp?: number;
					volatility: string;
					hasFreeSpins?: boolean;
					hasBonusGame?: boolean;
					hasJackpot?: boolean;
					betMin?: number;
					winMax?: number;
				};
				provider: { title: string };
				slug: string;
			};
		};
	} = $props();
	// Helper function to create content structure from plain text answers
	// The content structure is an array of blocks, each block has a type and children, similar to content structure used by fetched rich text.
	const createContentFromText = (text: string): TextContent[] => {
		return [{ type: 'paragraph', children: [{ type: 'text', text }] }];
	};

	const locale = $derived(appManager.getCountryCode());

	const volatility = $derived(() => {
		switch (data.page.info.volatility.toLowerCase()) {
			case 'low':
				return m.slot_volatility_low({ locale });
			case 'medium-low':
				return m.slot_volatility_medium_low({ locale });
			case 'medium':
				return m.slot_volatility_medium({ locale });
			case 'medium-high':
				return m.slot_volatility_medium_high({ locale });
			case 'high':
				return m.slot_volatility_high({ locale });
			default:
				return '';
		}
	});

	let faqs: FAQ[] = $derived.by(() => {
		const formattedFaqs: { id: string; question: string; answer: string }[] = [
			{
				id: `${data.page.slug}-faq-0`,
				question: `${m.slot_faqs_casinos_question({ gameTitle: data.page.title }, { locale })}`,
				answer: `${m.slot_faqs_casinos_answer(
					{
						gameTitle: data.page.title,
						providerName: data.page.provider.title,
						casinosList: casinosDataManager
							.getCasinosByProviderTitle(data.page.provider.title)
							.map((casino) => casino.title)
							.join(', ')
					},
					{ locale }
				)}`
			},
			{
				id: `${data.page.slug}-faq-1`,
				question: `${m.slot_faqs_demo_question({ gameTitle: data.page.title }, { locale })}`,
				answer: `${m.slot_faqs_demo_answer({ gameTitle: data.page.title }, { locale })}`
			},
			{
				id: `${data.page.slug}-faq-2`,
				question: `${m.slot_faqs_no_registration_question({ gameTitle: data.page.title }, { locale })}`,
				answer: `${m.slot_faqs_no_registration_answer({ siteName: SITE_NAME }, { locale })}`
			},
			{
				id: `${data.page.slug}-faq-3`,
				question: `${m.slot_faqs_mobile_question({ gameTitle: data.page.title }, { locale })}`,
				answer: `${m.slot_faqs_mobile_answer({ gameTitle: data.page.title }, { locale })}`
			},
			{
				id: `${data.page.slug}-faq-4`,
				question: `${m.slot_faqs_provider_question({ gameTitle: data.page.title }, { locale })}`,
				answer: `${m.slot_faqs_provider_answer({ gameTitle: data.page.title, providerName: data.page.provider.title }, { locale })}`
			},
			{
				id: `${data.page.slug}-faq-5`,
				question: `${m.slot_faqs_bonus_question({ gameTitle: data.page.title }, { locale })}`,
				answer:
					!data.page.info.hasFreeSpins && !data.page.info.hasBonusGame && !data.page.info.hasJackpot
						? `${m.slot_faqs_bonus_no_answer({ gameTitle: data.page.title }, { locale })}`
						: `${m.slot_faqs_bonus_answer({ gameTitle: data.page.title }, { locale })}` +
							(data.page.info.hasFreeSpins ? `, ${m.slot_free_spins_bonus({ locale })}` : '') +
							(data.page.info.hasBonusGame ? `, ${m.slot_bonus_game({ locale })}` : '') +
							(data.page.info.hasJackpot ? `, ${m.slot_jackpot({ locale })}` : '')
			},
			{
				id: `${data.page.slug}-faq-6`,
				question: `${m.slot_faqs_rtp_question({ gameTitle: data.page.title }, { locale })}`,
				answer: data.page.info.rtp
					? `${m.slot_faqs_rtp_answer({ gameTitle: data.page.title, rtp: data.page.info.rtp }, { locale })}`
					: `${m.slot_faqs_rtp_no_answer({ gameTitle: data.page.title }, { locale })}`
			},
			{
				id: `${data.page.slug}-faq-7`,
				question: `${m.slot_faqs_volatility_question({ gameTitle: data.page.title }, { locale })}`,
				answer: `${m.slot_faqs_volatility_answer({ gameTitle: data.page.title, gameVolatility: volatility() }, { locale })}`
			},
			{
				id: `${data.page.slug}-faq-8`,
				question: `${m.slot_faqs_bet_min_question({ gameTitle: data.page.title }, { locale })}`,
				answer: data.page.info.betMin
					? `${m.slot_faqs_bet_min_answer({ gameTitle: data.page.title, betMin: data.page.info.betMin }, { locale })}`
					: `${m.slot_faqs_bet_min_no_answer({ gameTitle: data.page.title }, { locale })}`
			},
			{
				id: `${data.page.slug}-faq-9`,
				question: `${m.slot_faqs_win_max_question({ gameTitle: data.page.title }, { locale })}`,
				answer: data.page.info.winMax
					? `${m.slot_faqs_win_max_answer({ gameTitle: data.page.title, winMax: data.page.info.winMax }, { locale })}`
					: `${m.slot_faqs_win_max_no_answer({ gameTitle: data.page.title }, { locale })}`
			}
		];

		return formattedFaqs.map((faq, i) => {
			return {
				id: `${data.page.slug}-faq-${i}`,
				question: faq.question,
				answer: createContentFromText(faq.answer) as FAQ['answer']
			};
		});
	});
</script>

<FaqsList {faqs} />
