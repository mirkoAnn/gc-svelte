import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte';
import type { Casino } from '$lib/types/casino';
import { capitalizeFirstLetter } from '$lib/utils.svelte';

const updateCasinoRatingTrend = async (casino: Casino, code: CountryCodes) => {
	const casinotrendData = casino.rating.trend ? casino.rating.trend.slice(-11) : [];
	casinotrendData.push({
		month: capitalizeFirstLetter(
			new Date().toLocaleString(appManager.getCountryLangCode(code), {
				month: 'long'
			})
		),
		value: Number(((casino.rating.up * 100) / (casino.rating.up + casino.rating.down)).toFixed())
	});
	const query = `mutation {
      updateCasino(documentId: "${casino.id}", locale: "${code}", data:{
        rating:  {
        up: ${casino.rating.up},
        down: ${casino.rating.down},
        trend: [
        ${casinotrendData
					.map(
						(item: { month: string; value: number }) =>
							`{ month: "${item.month}", value: ${item.value} }`
					)
					.join(',')}
          ]
        }
      })
      {
        title
      }
    }
  `;
	// execute a single query to update each casino rating trend in the database
	const response = (await dbManager.executeQuery(query)) as {
		data: { updateCasino: { title: string } };
	};
	console.log(`Casino ${casino.title} rating trend updated successfully`);
	return response;
};

export async function GET() {
	try {
		await Promise.all(
			Object.values(CountryCodes).map(async (code) => {
				const query = `query {
          casinos(locale: "${code}") {
            id:documentId
            title
            rating {
              up
              down
              trend 
            }
          }
        }`;
				const response = (await dbManager.executeQuery(query)) as { data: { casinos: Casino[] } };
				await Promise.all(
					response.data.casinos.map((casino: Casino) =>
						updateCasinoRatingTrend(casino, CountryCodes[code])
					)
				);
			})
		);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		return new Response(`Cron job failed: ${message}`, { status: 500 });
	}

	return new Response('Cron job executed', { status: 200 });
}
