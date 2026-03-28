import { dbManager } from "$lib/db-manager.svelte";
import { capitalizeFirstLetter } from "$lib/utils.svelte";
import { casinosDataManager } from "../../../component/casino/casinos-data-manager.svelte";

const updateCasinoRatingTrend = async (casino: any) => {
  return new Promise((resolve, reject) => {
    const casinotrendData = casino.rating.trend
      ? casino.rating.trend.slice(-11)
      : [];
    casinotrendData.push({
      month: capitalizeFirstLetter(
        new Date().toLocaleString("it-IT", {
          month: "long",
        }),
      ),
      value: (
        (casino.rating.up * 100) /
        (casino.rating.up + casino.rating.down)
      ).toFixed(),
    });
    const query = `mutation {
      updateCasino(documentId: "${casino.id}",data:{
        rating:  {
        up: ${casino.rating.up},
        down: ${casino.rating.down},
        trend: [
        ${casinotrendData
          .map(
            (item: any) => `{ month: "${item.month}", value: ${item.value} }`,
          )
          .join(",")}
          ]
        }
      })
      {
        title
      }
    }
  `;
    // execute a single query to update each casino rating trend in the database
    dbManager
      .executeQuery(query)
      .then((response: any) => {
        console.log(`Casino ${casino.title} rating trend updated successfully`);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export async function GET() {
  await Promise.all(
    casinosDataManager
      .getCasinos()
      .map((casino: any) => updateCasinoRatingTrend(casino)),
  ).catch((error) => {
    return new Response(
      `Error updating casino rating trends: ${error.message}`,
      { status: 500 },
    );
  });

  // if all updates are successful, exit with a 200 code
  return new Response("Cron job executed", { status: 200 });
}
