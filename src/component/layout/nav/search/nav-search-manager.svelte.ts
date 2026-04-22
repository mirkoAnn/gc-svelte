import { workersManager } from '$lib/workers-manager.svelte';
import { m } from '../../../../paraglide/messages';
import { page } from '$app/state';
import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import type { SearchHints, SearchResults } from '$lib/types/search';

const locale = $derived.by(
	() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
);

const searchInputPlaceholder = $derived(m.search_input_placeholder({}, { locale }));

const isResultsListEmpty = $derived.by(() => {
	return (
		(!searchResults.casinosIds || searchResults.casinosIds.length === 0) && // Check if casinosIds is empty
		(!searchResults.slots || searchResults.slots.length === 0) && // Check if slots is empty
		(!searchResults.roulettes || searchResults.roulettes.length === 0) && // Check if roulettes is empty
		(!searchResults.providers || searchResults.providers.length === 0) // Check if providers is empty
	);
});

let searchHints: SearchHints = $state([]),
	searchInput: string = $state(''),
	searchResults: SearchResults = $state({
		casinosIds: [], // Initialize with an empty array for casinos,
		slots: [], // Initialize with an empty array for slots
		roulettes: [], // Initialize with an empty array for roulette
		providers: [] // Initialize with an empty array for providers
	}),
	isSearchInputLoading: boolean = $state(false);

const normalizeString = (inputString: string) => {
	// Process the search input to create a search value
	// This includes removing specific keywords, special characters,
	// normalizing the string, and formatting it for the search query
	return inputString
		.replace('casino', '') // Remove specific keywords
		.replace('slot', '') // Remove specific keywords
		.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
		.trim() // Trim leading and trailing spaces
		.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
		.replaceAll(' ', '-') // Replace spaces with hyphens for better search matching
		.normalize('NFD') // Normalize the string to remove diacritics
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
		.replace('¿', '') // Remove special characters
		.replace('?', '') // Remove special characters
		.toLowerCase();
};

const resetSearchData = () => {
	// Reset search input and results
	searchInput = '';
	searchResults = {
		casinosIds: [], // Initialize with an empty array for casinos
		slots: [], // Initialize with an empty array for slots
		roulettes: [], // Initialize with an empty array for roulettes
		providers: [] // Initialize with an empty array for providers
	};
	searchHints = [];
	isSearchInputLoading = false;
};

// const updateSearchHints = () => {
// 	// Logic to update search hints based on the current input
// 	if (isResultsListEmpty) {
// 		// If there are no search results, clear the hints
// 		searchHints = [];
// 	} else {
// 		// If there are search results, populate hints based on the results
// 		const hintsSet = new Set<any>();

// 		// Add casino hints
// 		if (searchResults.casinosIds && searchResults.casinosIds.length > 0) {
// 			casinosDataManager.getCasinosByIds(searchResults.casinosIds).forEach((casino: any) => {
// 				hintsSet.add({ title: casino.attributes.title, category: 'casino' });
// 			});
// 		}

// 		// Add slot hints
// 		if (searchResults.slots && searchResults.slots.length > 0) {
// 			searchResults.slots.forEach((slot: any) => {
// 				hintsSet.add({ title: slot.title, category: 'slot' });
// 			});
// 		}

// 		// Add bingo hints
// 		if (searchResults.bingo && searchResults.bingo.length > 0) {
// 			searchResults.bingo.forEach((bingo: any) => {
// 				hintsSet.add({ title: bingo.title, category: 'bingo' });
// 			});
// 		}

// 		// Add crash hints
// 		if (searchResults.crash && searchResults.crash.length > 0) {
// 			searchResults.crash.forEach((crash: any) => {
// 				hintsSet.add({ title: crash.title, category: 'crash' });
// 			});
// 		}

// 		// Add roulette hints
// 		if (searchResults.roulettes && searchResults.roulettes.length > 0) {
// 			searchResults.roulettes.forEach((roulette: any) => {
// 				hintsSet.add({ title: roulette.title, category: 'roulette' });
// 			});
// 		}

// 		// Add provider hints
// 		if (searchResults.providers && searchResults.providers.length > 0) {
// 			searchResults.providers.forEach((provider: any) => {
// 				hintsSet.add({ title: provider.title, category: 'provider' });
// 			});
// 		}
// 		// Remove any hint that exactly matches the current search input (case-insensitive)
// 		// This prevents showing a hint that is identical to what the user has typed
// 		// Convert the Set back to an array and filter out the matching hint
// 		searchHints = Array.from(hintsSet).filter(
// 			(hint: any) => hint.title.toLowerCase() !== searchInput.toLowerCase()
// 		);
// 	}
// };

// Function to handle the search logic
const search = (countryCode: string) => {
	// If search is already in progress, do not initiate another search
	if (isSearchInputLoading) {
		return;
	}

	// Logic to handle search queries
	if (searchInput.trim() === '' || searchInput.length < 3) {
		return;
	}

	// Set loading state
	isSearchInputLoading = true;

	// 	// Process the search input to create a search value
	// 	// This includes removing specific keywords, special characters,
	// 	// normalizing the string, and formatting it for the search query
	const searchValue = normalizeString(searchInput);

	// Initiate the search using the workers manager, this will offload the search processing to a web worker, keeping the UI responsive
	// The search results will be handled in the onmessage callback of the worker taht will call the uploadSearchResults Function to update the search results in the UI
	workersManager.search(searchValue, countryCode);
};

export const navSearchManager = {
	/**
	 * This function is used to manage the navbar search functionality.
	 * It handles the search input, results, and interactions.
	 */
	init: () => {
		// Initialization logic for the navbar search
	},
	isResultsListEmpty: () => {
		return isResultsListEmpty;
	},
	isLoading: () => {
		return isSearchInputLoading;
	},
	getPlaceholder: () => {
		// Logic to determine the placeholder text based on the current state
		return searchInputPlaceholder;
	},
	// This function is used to get the current search input value, which can be used to display the value in the search input field
	getSearchInput: () => {
		return searchInput;
	},
	// This function is called when the user types in the search input, it updates the search input state and triggers the search function to fetch new results based on the updated input
	handleInput: (value: string, countryCode: string) => {
		searchInput = value;
		search(countryCode);
	},
	// This function is called to update the search results in the UI after receiving the response from the search worker
	updateSearchResults: (response: SearchResults) => {
		searchResults.slots = response.slots ? [...response.slots] : []; // Update slots with the fetched data for slots
		searchResults.roulettes = response.roulettes ? [...response.roulettes] : []; // Update roulettes with the fetched data for roulettes
		searchResults.casinosIds = response.casinosIds ? response.casinosIds : []; // Update casinosIds with the fetched data for casinosIds
		searchResults.providers = response.providers ? [...response.providers] : []; // Update providers with the fetched data for providers
		isSearchInputLoading = false;
	},
	getSearchHints: (maxResults: number = 10) => {
		// Return only the specified number of hints
		return searchHints.slice(0, maxResults);
	},
	// This function is used to get the current search results, which can be used to display the results in the UI
	getSearchResults: () => {
		return searchResults;
	},
	handleBlur: () => {
		// Logic to handle blur on the search input
		resetSearchData();
	},
	handleHints: (hint: string, countryCode: string) => {
		// Logic to handle search hints
		searchInput = hint;
		search(countryCode);
		searchHints = [];
	},
	clearSearch: () => {
		resetSearchData();
	}
};
