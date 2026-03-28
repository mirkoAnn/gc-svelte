import { gamesGalleryManager } from "../component/games/gallery/games-gallery-manager.svelte";
import { navSearchManager } from "../component/layout/nav/search/nav-search-manager.svelte";
import { appManager } from "./app-manager.svelte";

export const workersManager = {
  updateGameSessionAsync: async (
    id: string,
    sessions: number,
    category: string,
  ) => {
    const SyncWorker = await import("$lib/game-sessions.worker?worker");
    const syncWorker = new SyncWorker.default();
    syncWorker.postMessage({ id, sessions, category });
  },
  updateRatingAsync: async (
    id: string,
    up: number,
    down: number,
    category: string,
  ) => {
    const SyncWorker = await import("$lib/entry-rating.worker?worker");
    const syncWorker = new SyncWorker.default();
    syncWorker.postMessage({ id, up, down, category });
  },
  sendGameErrorReport: async (url: string) => {
    const SyncWorker = await import("$lib/game-error-report.worker?worker");
    const syncWorker = new SyncWorker.default();
    syncWorker.postMessage({ url });
  },
  fetchGamesAsync: async (filters: any, page: number) => {
    const SyncWorker = await import("$lib/games-loader.worker?worker");
    const syncWorker = new SyncWorker.default();
    syncWorker.postMessage({
      filtersJson: JSON.stringify(filters),
      page,
      newCountryCode: appManager.getCountryCode(), // Pass the country code to the worker so that it can fetch the games from the correct server based on the user's location, this is necessary to ensure that the worker fetches the games from the correct server and that it can properly apply any country-specific filters or restrictions when fetching the games, allowing for a more accurate and relevant selection of games to be loaded in the gallery based on the user's location and preferences.
    });
    syncWorker.onmessage = (event: any) => {
      if (event.data.error) {
        console.error(event.data.error); // Handle the error accordingly, for example by showing an error message to the user
        return;
      }
      // Depending on the page number, we either update the games in the gallery manager with the loaded games from the worker (if it's the first page of games) or we add the loaded games from the worker to the preloaded games in the gallery manager (if it's a subsequent page of games), this will allow us to show the games in the gallery immediately without having to wait for them to be fetched from the server again when the user applies filters or when they load more games by clicking on the "Load More" button or by scrolling down to the bottom of the gallery
      if (page === 1) {
        gamesGalleryManager.updateGames(event.data); // Update the games in the gallery manager with the loaded games from the worker, this will trigger the gallery to re-render with the new games
      } else {
        gamesGalleryManager.updatePreloadedGames(event.data); // Update the preloaded games in the gallery manager with the loaded games from the worker, this will allow us to show the next page of games immediately when the user clicks on the "Load More" button or when they scroll down to the bottom of the gallery without having to wait for them to be fetched from the server again
      }
    };
  },
  search: async (query: string) => {
    const SyncWorker = await import("$lib/search.worker?worker");
    const syncWorker = new SyncWorker.default();
    syncWorker.postMessage({ searchValue: query });
    syncWorker.onmessage = (event: any) => {
      if (event.data.type === "searchError") {
        console.error(event.data.error); // Handle the error accordingly, for example by showing an error message to the user
        return;
      }
      navSearchManager.updateSearchResults(event.data.data); // Update the search results in the nav search manager with the results from the worker, this will trigger the search results to re-render with the new data
    };
  },
};
