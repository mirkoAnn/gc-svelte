import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte.js';
import type { PageContent } from '$lib/types/content';
import { error, redirect } from '@sveltejs/kit';
import type Faq from '../../../../component/faqs/faq.svelte';
import type { Slot } from '$lib/types/games';
import type { Author } from '$lib/types/author';
import { basicQuery, slotsQuery } from '$lib/query/basic-query';

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

export async function load({ request }) {
	const redirectPath = appManager.getCountryRedirectPath(request, CountryCodes.es);
	if (redirectPath) {
		throw redirect(307, redirectPath);
	}

	const slotsCount = 40; // Number of slots for the initial fetching

	const query = `
    query {
      page: bestSlotsPage (locale: "es"){
        ${basicQuery}
      }
      slots(locale: "es", sort: "sessions:desc", pagination: { page: 1, pageSize: ${slotsCount} }) {
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
