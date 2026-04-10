import { dbManager } from '$lib/db-manager.svelte';
import type { Content } from '$lib/types/content';
import type { FAQ } from '$lib/types/faqs';
import type { Slot, Roulette } from '$lib/types/games';
import { error } from '@sveltejs/kit';

export type HomePageData = {
	seo: {
		title: string;
		description: string;
	};
	content: Content;
	faqs: FAQ[];
	slots: Slot[];
	roulettes: Roulette[];
};

export async function load() {
	const query = `
    query {
      page: homePage (locale: "it") {
        seo {
          title
          description
        }
        content {
          firstContent
          secondContent
          thirdContent
          fourthContent
          fifthContent
          sixthContent
          seventhContent
          eighthContent
          ninethContent
          tenthContent
        }
        faqs {
          id
          question
          answer
        }
      }
      slots(sort: "createdAt:desc", pagination: { page: 1, pageSize: 10 }) {
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
        slotThemes {
          slug
        }
      }
      roulettes(sort: "createdAt:desc", pagination: { page: 1, pageSize: 10 }) {
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
