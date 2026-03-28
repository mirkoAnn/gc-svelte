import { dbManager } from "$lib/db-manager.svelte.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const slotsCount = 40; // Number of slots for the initial fetching

  const query = `
    query {
      page: slotThemes(filters: { slug: { eq: "${params.slug}" } }) {
        id:documentId
        seo {
          title
          description
        }
        title
        slug
        introContent
        firstContent
        secondContent
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
      slots(filters: {slotThemes: { slug: { eq: "${params.slug}" } }}, pagination: { page: 1, pageSize: ${slotsCount} }) {
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
      response.data.page = response.data.page[0]; // Get the first item from the array response for a single slot page request
      return response.data;
    })
    .catch(() => {
      throw error(404, {
        message: "Error loading page",
      });
    });
}
