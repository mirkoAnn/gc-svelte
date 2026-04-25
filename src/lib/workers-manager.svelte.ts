import { gamesGalleryManager } from '../component/games/gallery/games-gallery-manager.svelte';
import { navSearchManager } from '../component/layout/nav/search/nav-search-manager.svelte';
import { dbManager } from './db-manager.svelte';
import type { Roulette, Slot } from './types/games';
import type { SearchResults } from './types/search';

type LoadedGamesMessage = Slot[] | Roulette[];

type WorkerErrorMessage = {
	error: string;
};

type SearchWorkerMessage =
	| {
			type: 'searchError';
			error: string;
	  }
	| {
			type: 'searchResults';
			data: SearchResults;
	  };

export const workersManager = {
	updateGameSessionAsync: async (
		id: string,
		sessions: number,
		category: string,
		countryCode: string
	) => {
		let mutation = 'mutation { ';
		switch (category) {
			case 'slot':
				mutation += 'updateSlot';
				break;
			default:
				return;
		}
		mutation += `(documentId: "${id}", locale:"${countryCode}", data: { sessions: ${sessions} }) { documentId } }`;
		dbManager.executeQuery(mutation).catch(console.error);
	},
	updateRatingAsync: async (
		id: string,
		up: number,
		down: number,
		category: string,
		countryCode: string
	) => {
		let mutation = 'mutation { ';
		switch (category) {
			case 'slot':
				mutation += 'updateSlot';
				break;
			case 'casino':
				mutation += 'updateCasino';
				break;
			default:
				return;
		}
		mutation += `(documentId: "${id}", locale: "${countryCode}", data: { rating: { up: ${up}, down: ${down} } }) { documentId } }`;
		dbManager.executeQuery(mutation).catch(console.error);
	},
	sendGameErrorReport: (url: string) => {
		const mutation = `mutation { createGameErrorReport(data: { url: "${url}" }) { documentId } }`;
		dbManager.executeQuery(mutation).catch(console.error);
	},
	fetchGamesAsync: async (filters: unknown, page: number, countryCode: string) => {
		const SyncWorker = await import('$lib/games-loader.worker?worker');
		const syncWorker = new SyncWorker.default();
		syncWorker.postMessage({ filtersJson: JSON.stringify(filters), page, countryCode });
		syncWorker.onmessage = (event: MessageEvent<LoadedGamesMessage | WorkerErrorMessage>) => {
			if (typeof event.data === 'object' && event.data !== null && 'error' in event.data) {
				console.error(event.data.error);
				syncWorker.terminate();
				return;
			}
			const loadedGames = event.data as LoadedGamesMessage;
			if (page === 1) {
				gamesGalleryManager.updateGames(loadedGames);
			} else {
				gamesGalleryManager.updatePreloadedGames(loadedGames);
			}
			syncWorker.terminate();
		};
	},
	search: async (query: string, countryCode: string) => {
		const SyncWorker = await import('$lib/search.worker?worker');
		const syncWorker = new SyncWorker.default();
		syncWorker.postMessage({ searchValue: query, countryCode });
		syncWorker.onmessage = (event: MessageEvent<SearchWorkerMessage>) => {
			if (event.data.type === 'searchError') {
				console.error(event.data.error);
				syncWorker.terminate();
				return;
			}
			navSearchManager.updateSearchResults(event.data.data);
			syncWorker.terminate();
		};
	}
};
