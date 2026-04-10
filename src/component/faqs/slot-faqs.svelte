<script lang="ts">
	import type { FAQ } from '$lib/types/faqs';
	import type { TextContent } from '$lib/types/content';
	import FaqsList from './faqs-list.svelte';

	let {
		data
	}: {
		data: {
			page: {
				title: string;
				info: {
					rtp?: number;
					hasFreeSpins?: boolean;
					hasBonusGame?: boolean;
					hasJackpot?: boolean;
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

	let faqs: FAQ[] = $derived.by(() => {
		const formattedFaqs: { id: string; question: string; answer: string }[] = [
			{
				id: `${data.page.slug}-faq-0`,
				question: `Qual è l'RTP della slot machine ${data.page.title}?`,
				answer: data.page.info.rtp
					? `La slot ${data.page.title} ha un RTP del ${data.page.info.rtp}%`
					: "Attualmente non abbiamo informazioni sull'RTP per questo gioco."
			},
			{
				id: `${data.page.slug}-faq-1`,
				question: `Posso giocare alla slot machine ${data.page.title} gratis senza scaricare?`,
				answer: `Sì, la slot machine ${data.page.title} è disponibile in una versione demo che puoi giocare gratis e senza dover scaricare alcun software`
			},
			{
				id: `${data.page.slug}-faq-2`,
				question: `Posso giocare alla slot machine ${data.page.title} senza dovermi registrare?`,
				answer:
					'Sì, puoi giocare a tutte le slot machine su Betragaperras.es senza doverti registrare o creare un account.'
			},
			{
				id: `${data.page.slug}-faq-3`,
				question: `Posso giocare alla slot machine ${data.page.title} sul mio dispositivo mobile?`,
				answer: `Sì, puoi giocare alla slot machine ${data.page.title} dal tuo smartphone o qualsiasi altro dispositivo mobile, sia su dispositivi iOS che Android.`
			},
			{
				id: `${data.page.slug}-faq-4`,
				question: `Chi è il fornitore della slot machine ${data.page.title}?`,
				answer: `Il fornitore della slot machine ${data.page.title} è ${data.page.provider.title}`
			},
			{
				id: `${data.page.slug}-faq-5`,
				question: `Quali sono i bonus forniti dalla ${data.page.title}?`,
				answer:
					!data.page.info.hasFreeSpins && !data.page.info.hasBonusGame && !data.page.info.hasJackpot
						? 'Il gioco non ha funzioni bonus'
						: `La slot machine ${data.page.title} ha le seguenti funzioni bonus: ${data.page.info.hasFreeSpins ? 'un bonus di giri gratuiti, ' : ''}${data.page.info.hasBonusGame ? 'un gioco bonus, ' : ''}${data.page.info.hasJackpot ? 'premi jackpot.' : ''}`
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
