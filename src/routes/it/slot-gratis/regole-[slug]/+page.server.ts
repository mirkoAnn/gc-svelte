import { dbManager } from '$lib/db-manager.svelte.js';
import { basicQuery, slotsQuery } from '$lib/query/basic-query.js';
import type { PageContent } from '$lib/types/content.js';
import type { Slot } from '$lib/types/games.js';
import { error } from '@sveltejs/kit';
import type { FAQType } from '$lib/types/faqs';
import type { Author } from '$lib/types/author.js';

export type SlotMechanicPageData = {
	id: string;
	seo: {
		title: string;
		description: string;
	};
	title: string;
	slug: string;
	content: PageContent;
	faqs: FAQType[];
	author: Author;
	publishedAt: string;
	updatedAt: string;
};

export async function load({ params }) {
	// Determine query based on slug parameter
	// "nuove" and "piu-giocate" are special cases for new and most played slots respectively
	// they're not actual slot themes in the database so we need to handle them differently
	const query = `
    query {
      page: slotMechanics(locale:"it", filters: { slug: { eq: "${params.slug}" } }) {
        ${basicQuery}
        title
        slug
      }
      slots(filters: {locale: {eq: "it"}, slotMechanic: { slug: { eq: "${params.slug}" } }}, pagination: { page: 1, pageSize: 20 }) {
         ${slotsQuery}
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
					page: SlotMechanicPageData[];
					slots: Slot[];
					slotThemes: { title: string; slug: string }[];
					providers: { title: string; slug: string }[];
				};
			}) => {
				return {
					page: response.data.page[0],
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
