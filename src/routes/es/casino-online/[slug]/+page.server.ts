import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte.js';
import { basicQuery } from '$lib/query/basic-query';
import type { Casino } from '$lib/types/casino.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ request, params }) {
	const redirectPath = appManager.getCountryRedirectPath(request, CountryCodes.es);
	if (redirectPath) {
		throw redirect(307, redirectPath);
	}

	const query = `
    query {
      page: casinos(filters: { slug: { eq: "${params.slug}" }, locale: { eq: "es" } }) {
        ${basicQuery} 
        title
        slug
        rank
        logo {
          url
        }
        colors {
          background
          text
        }
        images {
          id:documentId
          url
        }
        imagesMobile {
          id:documentId
          url
        }
        affiliationUrl
        welcomeBonus {
          noDeposit
          noDepositRequirements
          withDeposit
          withDepositRequirements
          tcUrl
        }
        rating {
          up
          down
          trend
        }
        info {
          homepageUrl
          email
          telephone
          depositMin
          withdrawalMin
          withdrawalTimes
          hasApp
          hasGreatDesign
          hasRoulette
          hasBlackjack
          hasPoker
          hasLiveGames
          hasSportBetting
        }
        paymentMethods {
          title
          slug
          logo {
            url
          }
        }
        providers (filters: { locale: { eq: "es" } }) {
          title
          slug
          logo {
            url
          }
          colors {
            background
          }
        }
      }
    }
  `;

	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: Casino[] } }) => {
			return {
				page: response.data.page[0]
			};
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
