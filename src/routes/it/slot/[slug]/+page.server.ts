import { dbManager } from "$lib/db-manager.svelte.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const query = `
    query {
      page: slots(filters: { slug: { eq: "${params.slug}" } }) {
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
          gameplay {
              url
          }
          gameUrl
          info {
              rtp
              volatility
              reels
              paylines
              betMin
              betMax
              winMin
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
            slots(pagination: { page: 1, pageSize: 10 }) {
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
    .then((response: any) => {
      response.data.page = response.data.page[0]; // Get the first item from the array response for a single slot page request
      return response.data;
    })
    .catch(() => {
      throw error(404, {
        message: "Error loading page",
      });
    });
}
