import { dbManager } from '$lib/db-manager.svelte.js';
import type { Author } from '$lib/types/author.js';
import type { PageContent } from '$lib/types/content.js';
import type { Slot } from '$lib/types/games.js';
import { error } from '@sveltejs/kit';
import type Faq from '../../../../component/faqs/faq.svelte';
import { basicQuery, slotsQuery } from '$lib/query/basic-query';

export type ProviderPageData = {
	seo: {
		title: string;
		description: string;
	};
	title: string;
	slug: string;
	logo: {
		url: string;
	};
	slots: Slot[];
	content: PageContent;
	faqs: Faq[];
	author: Author;
	publishedAt: string;
	updatedAt: string;
};

export async function load({ params }) {
	const query = `
    query {
      page: providers(filters: { slug: { eq: "${params.slug}" }, locale: { eq: "es" } }) {
        ${basicQuery}
        title
        slug
        logo {
          url
        }
        slots(filters: { locale: { eq: "es" } }, pagination: { page: 1, pageSize: 20 }) {
        	${slotsQuery}
        }
      }
      slotThemes (filters: { locale: { eq: "es" } }, pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
        title
        slug
      }
      providers (filters: { locale: { eq: "es" } }, pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
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
					page: ProviderPageData[];
					slotThemes: { title: string; slug: string }[];
					providers: { title: string; slug: string }[];
				};
			}) => {
				console.log('Provider page data:', response);
				return {
					page: response.data.page[0], // since the query returns an array of providers that match the slug filter but we know that there will be only one provider that matches the slug filter because slugs are unique, we can safely take the first element of the array to get the provider data
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
