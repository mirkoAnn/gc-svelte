import { dbManager } from '$lib/db-manager.svelte.js';
import { basicQuery, slotsQuery } from '$lib/query/basic-query';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type Faq from '../../../../component/faqs/faq.svelte';
import type { Author } from '$lib/types/author';
import type { Slot } from '$lib/types/games';

export type NewSlotsPageData = {
	id: string;
	title: string;
	slug: string;
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
	const slotsCount = 40; // Number of slots for the initial fetching

	const query = `
    query {
      page: newSlotsPage (locale: "es"){
       ${basicQuery}
      }
      slots(locale: "es", sort: "createdAt:desc", pagination: { page: 1, pageSize: ${slotsCount} }) {
         ${slotsQuery}
      }
      slotThemes (locale: "es", pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
        title
        slug
      }
      providers (locale: "es", pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
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
					page: NewSlotsPageData;
					slots: Slot[];
					slotThemes: { title: string; slug: string }[];
					providers: { title: string; slug: string }[];
				};
			}) => {
				return {
					page: response.data.page, // Assuming the query returns an array and we need the first item
					slots: response.data.slots,
					slotThemes: response.data.slotThemes,
					providers: response.data.providers
				};
			}
		)
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
