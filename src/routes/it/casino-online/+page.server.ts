import { dbManager } from '$lib/db-manager.svelte';
import { error } from '@sveltejs/kit';

export type CasinoOnlinePageData = {
	seo: {
		title: string;
		description: string;
	};
	content: {
		firstContent: string;
		secondContent: string;
		thirdContent: string;
		fourthContent: string;
		fifthContent: string;
		sixthContent: string;
		seventhContent: string;
		eighthContent: string;
		ninethContent: string;
		tenthContent: string;
	};
	faqs: {
		id: number;
		question: string;
		answer: string;
	}[];
};

export async function load() {
	const query = `
    query {
        page: casinosPage (locale: "it") {
            seo {
                title
                description
            }
            content {
              firstContent
              secondContent
              thirdContent
              fourthContent
              fifthContent
              sixthContent
              seventhContent
              eighthContent
              ninethContent
              tenthContent
            }
            faqs {
                id
                question
                answer
            }
        }
    }
  `;
	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: CasinoOnlinePageData } }) => {
			return response.data.page;
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
