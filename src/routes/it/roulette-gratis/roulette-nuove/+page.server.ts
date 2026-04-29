import { dbManager } from '$lib/db-manager.svelte.js';
import { basicQuery, roulettesQuery } from '$lib/query/basic-query';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type Faq from '../../../../component/faqs/faq.svelte';
import type { Author } from '$lib/types/author';
import type { Slot } from '$lib/types/games';

export type NewRoulettePageData = {
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
	const roulettesCount = 40; // Number of roulettes for the initial fetching

	const query = `
    query {
      page: newRoulettePage (locale:"it"){
       ${basicQuery}
      }
      roulettes(locale: "it", sort: "createdAt:desc", pagination: { page: 1, pageSize: ${roulettesCount} }) {
        ${roulettesQuery}
      }
      rouletteMechanics (locale:"it", pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
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
					page: NewRoulettePageData;
					roulettes: Slot[];
					rouletteMechanics: { title: string; slug: string }[];
					providers: { title: string; slug: string }[];
				};
			}) => {
				return {
					page: response.data.page, // Assuming the query returns an array and we need the first item
					roulettes: response.data.roulettes,
					rouletteMechanics: response.data.rouletteMechanics,
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
