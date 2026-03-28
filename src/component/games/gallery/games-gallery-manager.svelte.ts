import { workersManager } from '$lib/workers-manager.svelte';
import gsap from 'gsap';

const gamesBatchSize = 20; // This is the number of games that we load in each batch when the user applies filters or when they click on the "Load More" button, you can adjust this number based on your needs and the performance of your server, but I recommend to keep it around 20 to 30 games per batch to avoid loading too many games at once and to improve the performance of the gallery

let initialGames = $state([]), // This is used to keep track of the initial games that are loaded in the gallery, so we can reset the gallery to its initial state when the user clears all filters, this will allow us to show the initial games immediately without having to wait for them to be fetched from the server again
	games: any = $state([]), // This is used to keep track of the games that are currently displayed in the gallery, so we can update the gallery when the user applies filters or when they navigate to a different page
	preloadedGames: any = $state([]), // This is used to keep track of the games that are preloaded in the background, so we can show them immediately when the user applies filters without having to wait for the games to be fetched from the server
	isLoadingGames: any = $state(false); // This is used ONLY to keep track of whether the NEW games are currently being loaded from the server (not with a load more action), so we can show a loading indicator in the gallery when the games are being loaded and hide it when the games are loaded

// This is a derived state that checks if there are more games available to load from the server based on the currently preloaded games, it will be used to determine whether to show the "Load More" button in the gallery and to prevent the user from trying to load more games when there are no more games to load
let areMoreGamesAvailable = $derived.by(() => {
	return preloadedGames.length > 0; // we check if there are more games available to load from the server based on the currently preloaded games, if there are preloaded games it means that there are more games available to load from the server, otherwise it means that there are no more games available to load from the server
}); // This is used to keep track of whether there are more games available to load from the server based on the currently applied filters, so we can disable the "Load More" button when there are no more games to load and prevent the user from trying to load more games when there are no more games to load

let filters: any = $state({
	type: '',
	categories: []
}); // This is used to keep track of the filters that are currently in use, so we can use different filters in different pages and for different type of games (e.g. in the slot gallery we want to use different filters than in the table games or roulette gallery)
// Filters will have the following structure:
// [
//   {
//     type: "slot", // the type of games that the filters belong to, for example "slot", "table", "roulette", etc...
//     categories: [ // the categories of filters, for example "provider", "gameType", etc...
//       {
//         name: "provider", // the name of the category, for example "provider"
//         filters: [ // the filters of the category, for example "NetEnt", "Microgaming", etc...
//           { title: "NetEnt", value: "net-ent" }, // the value of the filter, for example "NetEnt"
//           { title: "Microgaming", value: "microgaming" }, // the value of the filter, for example "Microgaming"
//         ],
//       },
//     ],
//   },
// ]

let areFiltersVisible: any = $state(false), // This is used to keep track of whether there are filters in use or not, so we can open or close the filters panel accordingly
	currentVisibleFilter: any = $state(''), // This is used to keep track of the currently visible filter, so we can close it when the user clicks on another filter or on the same filter again
	initialAppliedFilters: any = $state({
		type: '',
		categories: []
	}), // This is used to keep track of the filters that were initially applied when the gallery was first rendered, so we can reset the currently applied filters to the initial applied filters when the user clears all filters, this will allow us to show the initial games immediately without having to wait for them to be fetched from the server again
	currentlyAppliedFilters: any = $state({
		type: '',
		categories: []
	}); // This is used to keep track of the filters that are currently applied to the games, so we can update the gallery accordingly when the user applies or removes filters

// This is a derived state that checks if there are any filters currently applied,
// it will be used to determine whether to show the main gallery or the categories carousels in the main page (es. slots, roulette,...)
let areFiltersInUse: boolean = $state(false);

// This is used to keep track of the current page of games that are loaded in the gallery, so we can load the next page of games when the user clicks on the "Load More" button or when they scroll down to the bottom of the gallery, you can implement it to fetch the next page of games from the server based on the currently applied filters and update the games state variable accordingly
// Its initial value is 2 because when the gallery is first rendered we load the first page of games (the first 20 games) and we want to load the next page of games when the user clicks on the "Load More" button or when they scroll down to the bottom of the gallery, so the next page of games will be the second page of games (the next 20 games) and so on
let currentGamesPage: number = 2;

// This function is used to reload the games in the gallery, it can be called after applying filters or when navigating to a different page
// You can implement this function to fetch the games from the server based on the currently applied filters and update the games state variable accordingly
const toggleSubGalleriesCategories = async () => {
	// show or hide categories sub galleries carousels based on whether there are filters in use or not,
	// if there are filters in use we want to hide the carousels and show only the main gallery with the filtered games,
	// if there are no filters in use we want to show the carousels and hide the main gallery,
	// this will allow us to have a better user experience and make it easier for the users to find the games they are looking for
	const gamesCarousels = document.querySelector('.game-categories');
	if (gamesCarousels) {
		gsap.timeline().to(gamesCarousels, {
			autoAlpha: areFiltersInUse ? 0 : 1
		});
	}
};

export const gamesGalleryManager = {
	initGalleryData: (
		initialGamesData: any, // the initial games data that is loaded when the gallery is first rendered, it will be used to show the initial games immediately without having to wait for them to be fetched from the server again when filters cleared
		categoryFilters: any, // the filters of the current category that is being rendered, they'll be displayed int he filters panel
		newInitialAppliedFilters: any // the filters that were initially applied when the gallery was first rendered based on the current page, it will be used to also to reset the filter once filters are cleared
	) => {
		initialGames = initialGamesData; // we set the initial games to the initial games data that is loaded when the gallery is first rendered, this will allow us to show the initial games immediately without having to wait for them to be fetched from the server again when filters cleared
		// if the initial games data contains more than gamesBatchSize games we want to show only the first gamesBatchSize games in the gallery and keep the rest of the games in the preloaded games variable, so we can show them immediately when the user ask for more games without having to wait for them to be fetched from the server again, otherwise we show all the initial games in the gallery and we don't have any preloaded games
		if (initialGamesData.length > gamesBatchSize) {
			games = initialGamesData.slice(0, gamesBatchSize);
			preloadedGames = initialGamesData.slice(gamesBatchSize);
		} else {
			games = initialGamesData;
			preloadedGames = [];
		}
		if (filters.type !== categoryFilters.type) {
			filters = categoryFilters; // we set the filters to the filters of the current category, this will allow us to show the relevant filters for each category and to build the right query to fetch the games based on the applied filters
		}
		// finally we set the current applied filter based on the current page.
		// slot bar for example will have the filter bar activated since the page load and restore once gallery is cleared
		initialAppliedFilters = newInitialAppliedFilters; // we set the initial applied filters to the initial applied filters that are set when the gallery is first rendered, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters, and it will also allow us to show the initial games immediately without having to wait for them to be fetched from the server again when filters cleared
		currentlyAppliedFilters = { ...initialAppliedFilters }; // we set the currently applied filters to the initial applied filters that are set when the gallery is first rendered, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters, and it will also allow us to show the initial games immediately without having to wait for them to be fetched from the server again when filters cleared
	},
	getGames: () => {
		return games;
	},
	updatePreloadedGames: (newGames: any) => {
		preloadedGames = newGames; // we add the new loaded games from the server to the preloaded games variable, so we can show them immediately when the user applies filters without having to wait for them to be fetched from the server again
		isLoadingGames = false; // we set the loading state to false because the new games have been loaded
	},
	updateGames: (newGames: any) => {
		if (newGames.length > gamesBatchSize) {
			games = newGames.slice(0, gamesBatchSize); // we show only the first gamesBatchSize games in the gallery, this will allow us to show the games immediately without having to wait for all the games to be loaded, and it will also improve the performance of the gallery by not rendering too many games at once
			preloadedGames = newGames.slice(gamesBatchSize); // we keep the rest of the games in the preloaded games variable, so we can show them immediately when the user applies filters without having to wait for them to be fetched from the server again
		} else {
			games = newGames;
			preloadedGames = [];
		}
		currentGamesPage = 2; // we reset the current games page to 2 because when we update the games in the gallery it means that we have loaded the first page of games (the first 40 games) based on the currently applied filters, and we want to load the next page of games when the user clicks on the "Load More" button or when they scroll down to the bottom of the gallery, so the next page of games will be the second page of games (the next 20 games) and so on
		isLoadingGames = false; // we set the loading state to false because the new games have been loaded
	},
	loadMoreGames: () => {
		if (!areMoreGamesAvailable) return;
		// This function is used to load more games when the user scrolls down or when they click on the "Load More" button, you can implement it to fetch the next page of games from the server based on the currently applied filters and update the games state variable accordingly
		games = [...games, ...preloadedGames]; // we show the next gamesBatchSize preloaded games in the gallery, this will allow us to show the games immediately without having to wait for them to be fetched from the server again

		currentGamesPage++;
		workersManager.fetchGamesAsync(currentlyAppliedFilters, currentGamesPage);
	},
	getFilters: () => {
		return filters;
	},
	toggleFilters: () => {
		areFiltersVisible = !areFiltersVisible;
	},
	areFiltersVisible: () => {
		return areFiltersVisible;
	},
	areFiltersInUse: () => {
		return areFiltersInUse;
	},
	isLoadingGames: () => {
		return isLoadingGames;
	},
	areMoreGamesAvailable: () => {
		return areMoreGamesAvailable;
	},
	setCurrentVisibleFilter: (filter: any) => {
		currentVisibleFilter = currentVisibleFilter === filter ? '' : filter;
	},
	getCurrentVisibleFilter: () => {
		return currentVisibleFilter;
	},
	applyFilter: (filter: any) => {
		areFiltersInUse = true; // we set the filters in use state to true because when we apply a filter it means that there are filters in use, and we want to show the main gallery with the filtered games and hide the categories sub galleries carousels, this will allow us to have a better user experience and make it easier for the users to find the games they are looking for
		games = []; // we clear the games in the gallery immediately when the user applies a filter to show the loading indicator while the new filtered games are being loaded, this will also improve the performance of the gallery by not rendering too many games at once and it will also give a feedback to the user that something is happening after they apply a filter
		// This function is used to apply a filter to the games in the gallery, it will be called when the user clicks on a filter in the filters panel
		// The filter object will have the following structure:
		// {
		//   category: "providers", // the category of the filter, for example "providers", "gameTypes", etc...
		//   value: "NetEnt" // the value of the filter, for example "NetEnt", "Slot", etc...
		// }
		const currentFilterCategory = currentlyAppliedFilters.categories.find(
			(c: any) => c.name === filter.category
		);
		if (currentFilterCategory) {
			if (currentFilterCategory.name === 'orderBy') {
				// We can only have one sorting option at a time, so when we apply a new sorting option we want to replace the previous one with the new one, this will also be showed in the sorting dropdown since only currently applied filters are shown as active
				currentFilterCategory.filters = [{ value: filter.value }];
			} else if (
				// for the other filters categories we can have multiple filters applied at the same time, so when we apply a new filter we want to check if it's already applied or not, if it's already applied we want to remove it from the currently applied filters, otherwise we want to add it to the currently applied filters, this will also be showed in the filters panel since only currently applied filters are shown as active
				currentFilterCategory.filters.some((f: any) => f.value === filter.value)
			) {
				currentFilterCategory.filters = currentFilterCategory.filters.filter(
					(f: any) => f.value !== filter.value
				);
			} else {
				currentFilterCategory.filters = [...currentFilterCategory.filters, { value: filter.value }];
			}
		} else {
			console.error('Error applying filter, category not found in currently applied filters');
		}

		// if there are no filters applied restore the initial games in the gallery, otherwise apply the filters and update the games in the gallery based on the currently applied filters
		if (!areFiltersInUse) {
			games = initialGames.slice(0, 20); // when there are no filters applied we want to reset the games in the gallery to the initial games that were loaded when the gallery was first rendered, this will allow us to show the initial games immediately without having to wait for them to be fetched from the server again
			preloadedGames = initialGames.slice(20);
			currentlyAppliedFilters = { ...initialAppliedFilters }; // when we clear the filters we want to reset the currently applied filters to the initial applied filters that were set when the gallery was first rendered, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters, and it will also allow us to show the initial games immediately without having to wait for them to be fetched from the server again
		} else {
			// After applying the filter we want to reload the games in the gallery based on the currently applied filters, so we can show the filtered games to the user immediately after they apply a filter without having to wait for them to be fetched from the server again
			currentGamesPage = 1; // we reset the current games page to 1 because when we apply a new filter we want to load the first page of games that match the new applied filters, and the first page of games is already loaded in the gallery (the first 20 games that match the new applied filters), so the next page of games that we want to load when the user clicks on the "Load More" button or when they scroll down to the bottom of the gallery will be the second page of games (the next 20 games that match the new applied filters) and so on
			isLoadingGames = true;
			workersManager.fetchGamesAsync(currentlyAppliedFilters, currentGamesPage);
		}
		toggleSubGalleriesCategories();
	},
	getCurrentlyAppliedFilters: () => {
		return currentlyAppliedFilters;
	},
	clearCurrentlyAppliedFilters: () => {
		// we clear only the filters arrays but we keep the categories,
		// because we want to keep the information about which categories of filters are currently applied,
		// so when we apply a new filter we know which category it belongs to and we can update the currently applied filters accordingly
		currentlyAppliedFilters = { ...initialAppliedFilters }; // when we clear the filters we want to reset the currently applied filters to the initial applied filters that were set when the gallery was first rendered, this will allow us to keep track of which categories of filters are currently applied and to update the currently applied filters accordingly when the user applies or removes filters, and it will also allow us to show the initial games immediately without having to wait for them to be fetched from the server again
		if (initialGames.length > gamesBatchSize) {
			games = initialGames.slice(0, gamesBatchSize); // we show only the first gamesBatchSize games in the gallery, this will allow us to show the games immediately without having to wait for all the games to be loaded, and it will also improve the performance of the gallery by not rendering too many games at once
			preloadedGames = initialGames.slice(gamesBatchSize); // we keep the rest of the games in the preloaded games variable, so we can show them immediately when the user applies filters without having to wait for them to be fetched from the server again
		} else {
			games = initialGames;
			preloadedGames = [];
		}
		currentGamesPage = 3;
		areFiltersInUse = false; // we set the filters in use state to false because when we clear the filters it means that there are no filters in use, and we want to show the categories sub galleries carousels and hide the main gallery with the filtered games, this will allow us to have a better user experience and make it easier for the users to find the games they are looking for
		toggleSubGalleriesCategories();
	},
	isThisFilterCurrentlyApplied: (category: string, value: string) => {
		return currentlyAppliedFilters.categories.some((c: any) => {
			if (c.name === category) {
				return c.filters.some((f: any) => f.value === value);
			}
		});
	}
};
