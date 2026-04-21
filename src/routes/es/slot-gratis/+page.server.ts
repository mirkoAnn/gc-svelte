import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte';
import type { Author } from '$lib/types/author';
import type { PageContent } from '$lib/types/content';
import type { FAQ } from '$lib/types/faqs';
import type { Slot } from '$lib/types/games';
import { error, redirect } from '@sveltejs/kit';
import { basicQuery, slotsQuery } from '$lib/query/basic-query';

export type SlotsPageData = {
	seo: {
		title: string;
		description: string;
	};
	content: PageContent;
	faqs: FAQ[];
	author: Author;
	publishedAt: string;
	updatedAt: string;
};

export async function load({ request }) {
	const redirectPath = appManager.getCountryRedirectPath(request, CountryCodes.es);
	if (redirectPath) {
		throw redirect(307, redirectPath);
	}

	const query = `         
    query {
      page: slotsPage (locale: "es"){
        ${basicQuery}
      }
      newSlots: slots(locale: "es", sort: "createdAt:desc", pagination: { page: 1, pageSize: 20 }) {
       ${slotsQuery}
      }
      bestSlots: slots(locale: "es", sort: "sessions:desc", pagination: { page: 1, pageSize: 20 }) {
         ${slotsQuery}
      }
      barSlots: slots(locale: "es", filters: { slotThemes: { slug: { eq: "bar" } } }, pagination: { page: 1, pageSize: 20 }) {
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
					page: SlotsPageData;
					newSlots: Slot[];
					bestSlots: Slot[];
					barSlots: Slot[];
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
