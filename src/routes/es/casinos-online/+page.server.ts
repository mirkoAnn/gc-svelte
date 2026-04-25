import { dbManager } from '$lib/db-manager.svelte';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type Faq from '../../../component/faqs/faq.svelte';
import type { Author } from '$lib/types/author';
import { basicQuery } from '$lib/query/basic-query';

export type CasinoOnlinePageData = {
	seo: {
		title: string;
		description: string;
	};
	content: PageContent;
	faqs: Faq[];
	author: Author;
	publishedAt: string;
	updatedAt: string;
};

export async function load() {
	const query = `
    query {
        page: casinosPage (locale: "es") {
            ${basicQuery}
        }
    }
  `;
	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: CasinoOnlinePageData } }) => {
			return {
				page: response.data.page
			};
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
