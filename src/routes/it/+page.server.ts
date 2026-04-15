import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte';
import type { Author } from '$lib/types/author';
import type { PageContent } from '$lib/types/content';
import type { FAQ } from '$lib/types/faqs';
import type { Slot, Roulette } from '$lib/types/games';
import { error, redirect } from '@sveltejs/kit';
import { basicQuery } from '$lib/query/basic-query';

export type HomePageData = {
	seo: {
		title: string;
		description: string;
	};
	content: PageContent;
	faqs: FAQ[];
	author: Author;
	pusblishedAt: string;
	updatedAt: string;
};

export async function load({ request }) {
	const redirectPath = appManager.getCountryRedirectPath(request, CountryCodes.it);
	if (redirectPath) {
		throw redirect(307, redirectPath);
	}

	const query = `
    query {
      page: homePage (locale: "it") {
        ${basicQuery}
      }
      slots(locale:"it", sort: "createdAt:desc", pagination: { page: 1, pageSize: 10 }) {
        id:documentId
        title
        slug
        logo {
          url
        }
        images {
          image {
            url
          }
          description
        }
        provider {
          title
        }
        slotThemes {
          slug
        }
      }
      roulettes(locale:"it", sort: "createdAt:desc", pagination: { page: 1, pageSize: 10 }) {
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
