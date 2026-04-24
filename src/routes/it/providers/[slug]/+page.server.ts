import { dbManager } from '$lib/db-manager.svelte.js';
import { error } from '@sveltejs/kit';
import { basicQuery, slotsQuery } from '$lib/query/basic-query';
import type { Provider } from '$lib/types/provider.js';

export async function load({ params }) {
	const query = `
    query {
      page: providers(filters: { slug: { eq: "${params.slug}" }, locale: { eq: "it" } }) {
        ${basicQuery}
        title
        slug
        logo {
          url
        }
        slots(filters: { locale: { eq: "it" } }, pagination: { page: 1, pageSize: 20 }) {
           ${slotsQuery}
        }
      }
      slotThemes (filters: { locale: { eq: "it" } }, pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
        title
        slug
      }
      providers (filters: { locale: { eq: "it" } }, pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
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
					page: Provider[];
					slotThemes: { title: string; slug: string }[];
					providers: { title: string; slug: string }[];
				};
			}) => {
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
