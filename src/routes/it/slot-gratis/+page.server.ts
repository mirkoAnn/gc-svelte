import { dbManager } from '$lib/db-manager.svelte';
import type { Content } from '$lib/types/content';
import type { FAQ } from '$lib/types/faqs';
import type { Slot } from '$lib/types/games';
import { error } from '@sveltejs/kit';

export type SlotsPageData = {
	seo: {
		title: string;
		description: string;
	};
	content: Content;
	faqs: FAQ[];
	newSlots: Slot[];
	bestSlots: Slot[];
	barSlots: Slot[];
	slotThemes: {
		title: string;
		slug: string;
	}[];
	providers: {
		title: string;
		slug: string;
	}[];
};

export async function load() {
	const query = `         
    query {
      page: slotsPage (locale:"it"){
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
      newSlots: slots(sort: "createdAt:desc", pagination: { page: 1, pageSize: 20 }) {
        id:documentId
        title
        slug
        logo {
          url
        }
        provider {
          title
        }
        slotThemes {
          slug
        }
      }
      bestSlots: slots(sort: "sessions:desc", pagination: { page: 1, pageSize: 20 }) {
        id:documentId
        title
        slug
        logo {
          url
        }
        provider {
          title
        }
        slotThemes {
          slug
        }
      }
      barSlots: slots(filters: { slotThemes: { slug: { eq: "bar" } } }, pagination: { page: 1, pageSize: 20 }) {
        id:documentId
        title
        slug
        logo {
          url
        }
        provider {
          title
        }
        slotThemes {
          slug
        }
      }
      slotThemes (pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
        title
        slug
      }
      providers (pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
        title
        slug
      }
    }
  `;

	return await dbManager
		.executeQuery(query)
		.then((response: { data: SlotsPageData }) => {
			return response.data;
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
