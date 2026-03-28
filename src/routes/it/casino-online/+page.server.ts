import { dbManager } from "$lib/db-manager.svelte";
import { error } from "@sveltejs/kit";

export async function load() {
  const query = `
    query {
        page: casinosPage {
            seo {
                title
                description
            }
            introContent
            legalsCasinosContent
            legalCasinosListContent
            howToChooseContent
            welcomeBonusContent
            slotContent
            liveContent
            hintsContent
            faqs {
                id
                question
                answer
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
