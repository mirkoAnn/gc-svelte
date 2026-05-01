import { dbManager } from '$lib/db-manager.svelte';
import type { Author } from '$lib/types/author';
import type { PageContent } from '$lib/types/content';
import type { FAQType } from '$lib/types/faqs';
import type { Slot, Roulette } from '$lib/types/games';
import { error } from '@sveltejs/kit';
import { basicQuery, slotsQuery } from '$lib/query/basic-query';

export type HomePageData = {
	seo: {
		title: string;
		description: string;
	};
	content: PageContent;
	faqs: FAQType[];
	author: Author;
	pusblishedAt: string;
	updatedAt: string;
};

export async function load() {
	const query = `
    query {
      page: homePage (locale: "es") {
        ${basicQuery}
      }
      slots(locale:"es", sort: "createdAt:desc", pagination: { page: 1, pageSize: 10 }) {
        ${slotsQuery}
      }
      roulettes(locale:"es", sort: "createdAt:desc", pagination: { page: 1, pageSize: 10 }) {
        id:documentId
        title
        slug
        logo {
          url
        }
        gameplay {
          url
        }
        provider {
          title
        }
      }
    }
  `;
	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: HomePageData; slots: Slot[]; roulettes: Roulette[] } }) => {
			return response.data;
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
