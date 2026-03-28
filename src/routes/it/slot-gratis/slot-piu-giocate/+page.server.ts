import { dbManager } from "$lib/db-manager.svelte.js";
import { error } from "@sveltejs/kit";

export async function load() {
  const slotsCount = 40; // Number of slots for the initial fetching

  const query = `
    query {
      page: slotsBest {
        id:documentId
        seo {
          title
          description
        }
        introContent
        bestSlotsContent
        gateOfOlympusContent
        bookOfRaContent
        bigBassContent
        characteristicsContent
        beyondClassicContent
        tryContent
        author {
          name
          image {
            url
          }
          description
          facebookProfile
          linkedinProfile
        }
        faqs {
          id
          question
          answer
        }
        publishedAt
        updatedAt
      }
      slots(sort: "sessions:desc", pagination: { page: 1, pageSize: ${slotsCount} }) {
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
    .then((response: any) => {
      return response.data;
    })
    .catch(() => {
      throw error(404, {
        message: "Error loading page",
      });
    });
}
