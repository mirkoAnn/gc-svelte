import { dbManager } from "$lib/db-manager.svelte";
import { error } from "@sveltejs/kit";

export async function load() {
  const query = `
    query {
      page: providersPage {
        seo {
          title
          description
        }
      }
      providers(pagination: { page: 1, pageSize: 500 }) {
        title
        slug
        logo {
          url 
        }
        colors {
          background
          text}
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
