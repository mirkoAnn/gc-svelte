import { dbManager } from "$lib/db-manager.svelte";
import { error } from "@sveltejs/kit";

export async function load() {
  const query = `
    query {
      page: homepage {
        seo {
          title
          description
        }
        introContent
        whyChooseSGOContent
        howToPlaySlotsContent
        jackpotContent
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
    .then((response: any) => {
      return response.data;
    })
    .catch(() => {
      throw error(404, {
        message: "Error loading page",
      });
    });
}
