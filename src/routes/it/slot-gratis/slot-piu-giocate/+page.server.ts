import { dbManager } from '$lib/db-manager.svelte.js';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type Faq from '../../../../component/faqs/faq.svelte';
import type { Slot } from '$lib/types/games';
import type { Author } from '$lib/types/author';
import { basicQuery } from '$lib/query/basic-query';

export type BestSlotsPageData = {
	id: string;
	seo: {
		title: string;
		description: string;
	};
	content: PageContent;
	author: Author;
	faqs: Faq[];
	publishedAt: string;
	updatedAt: string;
};

export async function load() {
	const slotsCount = 40; // Number of slots for the initial fetching

	const query = `
    query {
      page: bestSlotsPage (locale:"it"){
        ${basicQuery}
      }
      slots(locale:"it", sort: "sessions:desc", pagination: { page: 1, pageSize: ${slotsCount} }) {
        id:documentId
        title
        slug
        logo {
          url
        }
        provider {
          title
        }
        slotThemes {
          slug
        }
      }
      slotThemes (locale:"it", pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
        title
        slug
      }
      providers (locale:"it", pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
        title
        slug
      }
    }
  `;

	return await dbManager
		.executeQuery(query)
		.then(
			(response: {
				data: {
					page: BestSlotsPageData;
					slots: Slot[];
					slotThemes: { title: string; slug: string }[];
					providers: { title: string; slug: string }[];
				};
			}) => {
				return response.data;
			}
		)
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
