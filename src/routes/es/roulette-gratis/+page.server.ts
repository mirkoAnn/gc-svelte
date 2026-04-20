import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte';
import type { PageContent } from '$lib/types/content';
import { error, redirect } from '@sveltejs/kit';
import type Faq from '../../../component/faqs/faq.svelte';
import type { Roulette } from '$lib/types/games';
import type { Author } from '$lib/types/author';
import { basicQuery } from '$lib/query/basic-query';

export type RouletteGratisPageData = {
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

export async function load({ request }) {
	const redirectPath = appManager.getCountryRedirectPath(request, CountryCodes.es);
	if (redirectPath) {
		throw redirect(307, redirectPath);
	}

	const query = `         
    query {
        page: roulettePage (locale: "es"){
            ${basicQuery} 
        }
        newRoulette: roulettes(locale: "es",
            sort: "createdAt:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
        }
        rouletteEuropea: roulettes(locale: "es",
            filters: { rouletteMechanic: { slug: { eq: "europea" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
        }
        rouletteAmericana: roulettes(
            filters: { rouletteMechanic: { slug: { eq: "americana" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
        }
        rouletteFrancese: roulettes(locale: "es",
            filters: { rouletteMechanic: { slug: { eq: "francese" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
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
					rouletteEuropea: Roulette[];
					rouletteAmericana: Roulette[];
					rouletteFrancese: Roulette[];
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
