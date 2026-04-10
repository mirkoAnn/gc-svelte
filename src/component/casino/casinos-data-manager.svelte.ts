import type { Casino } from '$lib/types/casino';
import type { Provider } from '$lib/types/provider';

let casinos: Casino[] = $state([]);

export const casinosDataManager = {
	getCasinos: () => {
		return casinos;
	},
	initialize: (fetchedCasinos: Casino[]) => {
		casinos = fetchedCasinos;
	},
	getTopCasinos: (maxRank: number, excludedId?: string) => {
		return casinos.filter((casino: Casino) => {
			if (excludedId && casino.id === excludedId) {
				return false;
			}
			return casino.rank < maxRank + 1;
		});
	},
	getCasinosByIds: (casinosIds: number[]) => {
		if (!casinosIds || !Array.isArray(casinosIds) || casinosIds.length === 0) {
			return [];
		}
		return casinos.filter((casino: Casino) => {
			return casinosIds.includes(Number(casino.id));
		});
	},
	getCasinosByProviderTitle: (providerTitle: string) => {
		return casinos.filter((casino: Casino) => {
			return casino.providers.some(
				(provider: Provider) => provider.title.toLowerCase() === providerTitle.toLowerCase()
			);
		});
	},
	getCasinoById: (id: string) => {
		return casinos.find((casino: Casino) => casino.id === id);
	}
};
