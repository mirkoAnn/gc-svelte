import { dbManager } from '$lib/db-manager.svelte';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type Faq from '../../../component/faqs/faq.svelte';

export type CasinoOnlinePageData = {
	seo: {
		title: string;
		description: string;
	};
	content: PageContent;
	faqs: Faq[];
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
