import { dbManager } from '$lib/db-manager.svelte';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type { FAQType } from '$lib/types/faqs';
import type { Author } from '$lib/types/author';
import { basicQuery } from '$lib/query/basic-query';
import type { Provider } from '$lib/types/provider';

export type ProvidersPageData = {
	page: {
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
	providers: Provider[];
};

export async function load() {
	const query = `
    query {
      page: providersPage(locale: "es") {
        ${basicQuery}        
      }
      providers(locale: "es", pagination: { page: 1, pageSize: 500 }) {
        title
        slug
        logo {
          url 
        }
        colors {
          background
          text}
      }
    }
  `;
	return await dbManager
		.executeQuery(query)
		.then((response: { data: ProvidersPageData }) => {
			return response.data;
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
