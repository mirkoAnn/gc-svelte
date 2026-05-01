import { dbManager } from '$lib/db-manager.svelte';
import type { PageContent } from '$lib/types/content';
import { error } from '@sveltejs/kit';
import type { FAQType } from '$lib/types/faqs';
import type { Roulette } from '$lib/types/games';
import type { Author } from '$lib/types/author';
import { basicQuery, roulettesQuery } from '$lib/query/basic-query';

export type RouletteGratisPageData = {
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

export async function load() {
	const query = `         
     query {
        page: roulettePage (locale: "es"){
            ${basicQuery} 
        }
        newRoulette: roulettes(
            locale: "es"
            sort: "createdAt:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            ${roulettesQuery}
        }
        europeanRoulette: roulettes(
            filters: { locale: {eq:"es"}, rouletteMechanic: { slug: { eq: "europea" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            
            ${roulettesQuery}
        }
        americanRoulette: roulettes(
            filters: { locale: {eq:"es"}, rouletteMechanic: { slug: { eq: "americana" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            ${roulettesQuery}
        }
        frenchRoulette: roulettes(
            filters: { locale: {eq:"es"}, rouletteMechanic: { slug: { eq: "francesa" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
           ${roulettesQuery}
        }
        rouletteMechanics(locale: "es", pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
            title
            slug
        }
        providers(locale: "es",pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
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
					page: RouletteGratisPageData;
					newRoulette: Roulette[];
					europeanRoulette: Roulette[];
					americanRoulette: Roulette[];
					frenchRoulette: Roulette[];
					rouletteMechanics: { title: string; slug: string }[];
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
