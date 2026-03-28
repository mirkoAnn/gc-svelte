import { dbManager } from "$lib/db-manager.svelte.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const query = `
    query {
      page: casinos(filters: { slug: { eq: "${params.slug}" } }) {
        id: documentId
        title
        slug
        rank
        seo {
          title
          description
        }
        brand {
          homepageUrl
          email
          telephone
          depositMin
          withdrawalMin
          withdrawalTime
          hasApp
          hasGreatDesign
        }
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
        info {
          hasRoulette
          hasBlackjack
          hasPoker
          hasLiveGames
          hasSportBetting
        }
        paymentMethods {
          slug
        }
        providers {
          title
          slug
          logo {
            url
          }
          colors {
            background
          }
        }
        introContent
        siteDesignContent
        bonusContent
        slotsContent
        liveContent
        sportContent
        securityPaymentsContent
        opinionContent
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
