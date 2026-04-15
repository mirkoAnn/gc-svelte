import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte.js';
import type { Slot } from '$lib/types/games.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ request, params }) {
	const redirectPath = appManager.getCountryRedirectPath(request, CountryCodes.it);
	if (redirectPath) {
		throw redirect(307, redirectPath);
	}

	const query = `
    query {
      page: slots(locale: "it", filters: { slug: { eq: "${params.slug}" } }) {
          id:documentId
          seo {
              title
              description
          }
          title
          slug
          sessions
          logo {
              url
          }
          images {
            image {
              url
            }
            description
          }
          gameUrl
          info {
              releaseYear
              rtp
              volatility
              reels
              paylines
              betMin
              betMax
              winMax
              hasFreeSpins
              hasBonusGame
              hasJackpot
          }
          introContent
          rulesContent
          bonusContent
          opinionContent
          slotThemes {
            slug
            slots(filters:{locale:  {
               eq:"it"
            } } pagination: { page: 1, pageSize: 10 }) {
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
          }
          provider {
              title
              slug
          }
          rating {
              up
              down
          }
          author {
            name
            image {
              url
            }
            description
            facebookProfile
            linkedinProfile
          }
          publishedAt
          updatedAt
      }
    }
  `;

	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: Slot[] } }) => {
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
