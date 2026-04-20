import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte';
import type { PageContent } from '$lib/types/content';
import type { Provider } from '$lib/types/provider';
import { error, redirect } from '@sveltejs/kit';
import type Faq from '../../../component/faqs/faq.svelte';
import type { Author } from '$lib/types/author';
import { basicQuery } from '$lib/query/basic-query';

export type ProvidersPageData = {
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
      page: providersPage(locale: "es") {
        ${basicQuery}        
      }
      providers(locale: "es", pagination: { page: 1, pageSize: 500 }) {
        title
        slug
        logo {
          url 
        }
        colors {
          background
          text}
      }
    }
  `;
	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: ProvidersPageData; providers: Provider[] } }) => {
			return response.data;
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
