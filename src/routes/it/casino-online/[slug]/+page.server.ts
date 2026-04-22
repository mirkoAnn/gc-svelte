import { dbManager } from '$lib/db-manager.svelte.js';
import { basicQuery } from '$lib/query/basic-query';
import type { Casino } from '$lib/types/casino.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const query = `
    query {
      page: casinos(filters: { slug: { eq: "${params.slug}" }, locale: { eq: "it" } }) {
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
        providers (filters: { locale: { eq: "it" } }) {
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
