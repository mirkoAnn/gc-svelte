import { dbManager } from '$lib/db-manager.svelte';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type { Author } from '$lib/types/author';
import { basicQuery } from '$lib/query/basic-query';
import type { FAQType } from '$lib/types/faqs';

export type NewCasinosPageData = {
	seo: {
		title: string;
		description: string;
	};
	content: PageContent;
	faqs: FAQType[];
	author: Author;
	publishedAt: string;
	updatedAt: string;
};

export async function load() {
	const query = `
    query {
        page: newCasinosPage (locale: "es") {
            ${basicQuery}
        }
    }
  `;
	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: NewCasinosPageData } }) => {
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
