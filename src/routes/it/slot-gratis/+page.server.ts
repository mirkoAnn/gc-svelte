import { dbManager } from "$lib/db-manager.svelte";
import { error } from "@sveltejs/kit";

export async function load() {
  const query = `         
    query {
      page: slotsPage {
        seo {
          title
          description
        }
        introContent
        whatAreSlotsContent
        howToPlaySlotsContent
        slotsCategoryContent
        bestSlotsContent
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
    .then((response: any) => {
      return response.data;
    })
    .catch(() => {
      throw error(404, {
        message: "Error loading page",
      });
    });
}
