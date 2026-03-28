import { dbManager } from "$lib/db-manager.svelte.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  let query = "";

  // Determine query based on slug parameter
  // "nuove" and "piu-giocate" are special cases for new and most played slots respectively
  // they're not actual slot themes in the database so we need to handle them differently
  query = `
    query {
      page: slotMechanics(filters: { slug: { eq: "${params.slug}" } }) {
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
      slots(filters: {slotMechanic: { slug: { eq: "${params.slug}" } }}, pagination: { page: 1, pageSize: 20 }) {
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
