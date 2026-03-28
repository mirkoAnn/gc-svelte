import { dbManager } from "$lib/db-manager.svelte";
import { error } from "@sveltejs/kit";

export async function load() {
  const query = `         
    query {
        page: roulettePage {
            seo {
            title
            description
            }
            introContent
            providersContent
            howToPlayContent
            typesContent
            securityContent
            risksContent
            faqs {
            id
            question
            answer
            }
        }
        newRoulette: roulettes(
            sort: "createdAt:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
        }
        rouletteEuropea: roulettes(
            filters: { rouletteMechanic: { slug: { eq: "europea" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
        }
        rouletteAmericana: roulettes(
            filters: { rouletteMechanic: { slug: { eq: "americana" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
        }
        rouletteFrancese: roulettes(
            filters: { rouletteMechanic: { slug: { eq: "francese" } } }
            sort: "sessions:desc"
            pagination: { page: 1, pageSize: 20 }
        ) {
            id: documentId
            title
            slug
            logo {
            url
            }
            provider {
            title
            }
        }
        rouletteMechanics(pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
            title
            slug
        }
        providers(pagination: { page: 1, pageSize: 500 }, sort: "title:asc") {
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
