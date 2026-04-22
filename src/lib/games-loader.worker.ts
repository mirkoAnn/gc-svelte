import { dbManager } from './db-manager.svelte';
import { roulettesQuery, slotsQuery } from './query/basic-query';
import type { Roulette, Slot } from './types/games';

type FilterValue = {
	value: string;
};

type FilterCategory = {
	name: string;
	filters: FilterValue[];
};

type GalleryFilters = {
	type: 'slot' | 'roulette';
	categories: FilterCategory[];
};

type SlotsWorkerResponse = {
	data: {
		slotsByProviders?: Slot[];
		slotsByThemes?: Slot[];
		slots?: Slot[];
	};
};

type RouletteWorkerResponse = {
	data: {
		roulettesByProviders?: Roulette[];
		roulettesByRules?: Roulette[];
		roulettes?: Roulette[];
	};
};

const gamesNumberPerPage = 40; // This is used to keep track of how many games we want to load for each page, it will be used for pagination when loading the games in the gallery

// This function is used to build the query for loading the slots games based on the filters that are applied in the gallery, it will be called in the worker when we want to load the games for the gallery, it receives the filters as parameter and returns the query string that will be used to load the games from the database
const buildSlotsQuery = (filters: GalleryFilters, page: number, countryCode: string) => {
	let providersFilterQueryString = '';
	let categoriesFilterQueryString = '';

	// We start building the query string with the base query, which is to get the slots games, we will add the filters to this query string based on the filters that are applied in the gallery, for example if the user has selected some providers or some categories, we will add those filters to the query string to filter the games by those providers or categories, if the user has not selected any providers or categories, we will just return all the games sorted by creation date, so the base query string will be:
	// this function is called only when filters are in use, so we don't need to build a defualt query with no filters applied
	let query = `query {`;

	const sortingOption = filters.categories.find((c: FilterCategory) => c.name === 'orderBy')
		?.filters[0]?.value; // We check if there is a sorting option applied in the filters, if there is we get the value of that sorting option to use it in the query string to sort the games based on the user's selection in the sorting dropdown

	// We check if there are any providers filters applied, if there are we build the query string for filtering by providers,
	// we do this by finding the providers category in the filters and then building the query string based on the selected providers in that category,
	// we use the "or" operator to filter by multiple providers, so if the user has selected multiple providers we will return all games that match any of those providers,
	// if the user has selected only one provider we will return all games that match that provider,
	// if the user has not selected any providers we will not add any filters for providers to the query string
	const providersCategory = filters.categories.find((c: FilterCategory) => c.name === 'providers');
	if (providersCategory && providersCategory.filters.length > 0) {
		providersFilterQueryString = `provider: { or: [${providersCategory.filters
			.map((provider: FilterValue) => `{ slug: { eq: "${provider.value}" } }`)
			.join(', ')}] }`;

		query += `
      slotsByProviders: slots(
        filters: { ${providersFilterQueryString}, locale: { eq: "${countryCode}" } }
        sort: "${sortingOption}"
        pagination: { page: ${page}, pageSize: ${gamesNumberPerPage} }
      ) {
        ${slotsQuery}
      }
    `;
	}

	// We check if there are any categories filters applied, if there are we build the query string for filtering by categories,
	// we do this by finding the categories category in the filters and then building the query string based on the selected categories in that category,
	// we use the "or" operator to filter by multiple categories, so if the user has selected multiple categories we will return all games that match any of those categories,
	// if the user has selected only one category we will return all games that match that category,
	// if the user has not selected any categories we will not add any filters for categories to the query string
	const themesCategory = filters.categories.find((c: FilterCategory) => c.name === 'slotThemes');
	if (themesCategory && themesCategory.filters.length > 0) {
		categoriesFilterQueryString = `slotThemes: { or: [${themesCategory.filters
			.map((category: FilterValue) => `{ slug: { eq: "${category.value}" } }`)
			.join(', ')}] }`;

		query += `
      slotsByThemes: slots(
        filters: { ${categoriesFilterQueryString}, locale: { eq: "${countryCode}" } }
        sort: "${sortingOption}"
        pagination: { page: ${page}, pageSize: ${gamesNumberPerPage} }
      ) {
        ${slotsQuery}
      }
    `;
	}

	// Only sorting option applied, no filters, we return all games sorted by the selected sorting option in the sorting dropdown in the gallery
	if (providersFilterQueryString === '' && categoriesFilterQueryString === '') {
		query += `
      slots(
	  	locale: "${countryCode}" 
        sort: "${sortingOption}"
        pagination: { page: ${page}, pageSize: ${gamesNumberPerPage} }
      ) {
        ${slotsQuery}
      }
    `;
	}

	query += `}`;

	dbManager
		.executeQuery(query)
		.then((response: SlotsWorkerResponse) => {
			// We build the games array by combining the results from the providers and categories queries, if both filters are applied we will have two separate queries for providers and categories,
			// so we need to combine the results of those two queries to get the final games array that we will return to the main thread,
			let slots = response.data.slotsByProviders ? response.data.slotsByProviders : [];
			slots = response.data.slotsByThemes ? [...slots, ...response.data.slotsByThemes] : slots;
			slots = response.data.slots ? [...slots, ...response.data.slots] : slots;
			postMessage(slots); // We use postMessage to send the loaded games back to the main thread, where the gallery is rendered, so we can update the games in the gallery with the loaded games from the worker
		})
		.catch((error) => {
			postMessage({ error: 'Error loading games: ' + error.message }); // In case of error we send an error message back to the main thread, so we can show an error message to the user or handle the error accordingly
		});
};

// This function is used to build the query for loading the roulette games based on the filters that are applied in the gallery, it will be called in the worker when we want to load the games for the gallery, it receives the filters as parameter and returns the query string that will be used to load the games from the database
const buildRouletteQuery = (filters: GalleryFilters, page: number, countryCode: string) => {
	let providersFilterQueryString = '';
	let categoriesFilterQueryString = '';

	// We start building the query string with the base query, which is to get the slots games, we will add the filters to this query string based on the filters that are applied in the gallery, for example if the user has selected some providers or some categories, we will add those filters to the query string to filter the games by those providers or categories, if the user has not selected any providers or categories, we will just return all the games sorted by creation date, so the base query string will be:
	// this function is called only when filters are in use, so we don't need to build a defualt query with no filters applied
	let query = `query {`;

	const sortingOption = filters.categories.find((c: FilterCategory) => c.name === 'orderBy')
		?.filters[0]?.value; // We check if there is a sorting option applied in the filters, if there is we get the value of that sorting option to use it in the query string to sort the games based on the user's selection in the sorting dropdown

	// We check if there are any providers filters applied, if there are we build the query string for filtering by providers,
	// we do this by finding the providers category in the filters and then building the query string based on the selected providers in that category,
	// we use the "or" operator to filter by multiple providers, so if the user has selected multiple providers we will return all games that match any of those providers,
	// if the user has selected only one provider we will return all games that match that provider,
	// if the user has not selected any providers we will not add any filters for providers to the query string
	const providersCategory = filters.categories.find((c: FilterCategory) => c.name === 'providers');
	if (providersCategory && providersCategory.filters.length > 0) {
		providersFilterQueryString = `provider: { or: [${providersCategory.filters
			.map((provider: FilterValue) => `{ slug: { eq: "${provider.value}" } }`)
			.join(', ')}] }`;

		query += `
      roulettesByProviders: roulettes(
        filters: { ${providersFilterQueryString}, locale: { eq: "${countryCode}" } }
        sort: "${sortingOption}"
        pagination: { page: ${page}, pageSize: ${gamesNumberPerPage} }
      ) {
        ${roulettesQuery}
      }
    `;
	}

	// We check if there are any categories filters applied, if there are we build the query string for filtering by categories,
	// we do this by finding the categories category in the filters and then building the query string based on the selected categories in that category,
	// we use the "or" operator to filter by multiple categories, so if the user has selected multiple categories we will return all games that match any of those categories,
	// if the user has selected only one category we will return all games that match that category,
	// if the user has not selected any categories we will not add any filters for categories to the query string
	const themesCategory = filters.categories.find(
		(c: FilterCategory) => c.name === 'rouletteMechanics'
	);
	if (themesCategory && themesCategory.filters.length > 0) {
		categoriesFilterQueryString = `rouletteMechanics: { or: [${themesCategory.filters
			.map((category: FilterValue) => `{ slug: { eq: "${category.value}" } }`)
			.join(', ')}] }`;

		query += `
      roulettesByRules: roulettes(
        filters: { ${categoriesFilterQueryString}, locale: { eq: "${countryCode}" } }
        sort: "${sortingOption}"
        pagination: { page: ${page}, pageSize: ${gamesNumberPerPage} }
      ) {
        ${roulettesQuery}
      }
    `;
	}

	// Only sorting option applied, no filters, we return all games sorted by the selected sorting option in the sorting dropdown in the gallery
	if (providersFilterQueryString === '' && categoriesFilterQueryString === '') {
		query += `
      roulettes(
		locale: "${countryCode}"
        sort: "${sortingOption}"
        pagination: { page: ${page}, pageSize: ${gamesNumberPerPage} }
      ) {
        ${roulettesQuery}
      }
    `;
	}

	query += `}`;

	dbManager
		.executeQuery(query)
		.then((response: RouletteWorkerResponse) => {
			// We build the games array by combining the results from the providers and categories queries, if both filters are applied we will have two separate queries for providers and categories,
			// so we need to combine the results of those two queries to get the final games array that we will return to the main thread,
			let roulettes = response.data.roulettesByProviders ? response.data.roulettesByProviders : [];
			roulettes = response.data.roulettesByRules
				? [...roulettes, ...response.data.roulettesByRules]
				: roulettes;
			roulettes = response.data.roulettes ? [...roulettes, ...response.data.roulettes] : roulettes;
			postMessage(roulettes); // We use postMessage to send the loaded games back to the main thread, where the gallery is rendered, so we can update the games in the gallery with the loaded games from the worker
		})
		.catch((error) => {
			postMessage({ error: 'Error loading games: ' + error.message }); // In case of error we send an error message back to the main thread, so we can show an error message to the user or handle the error accordingly
		});
};

// This worker is used to load the games for the games gallery, it receives the provider, category and page number as parameters and returns the games that match the criteria
// Provider and category can be empty strings, in that case the worker will return all games sorted by creation date,
// if only provider is provided it will return all games of that provider,
// if only category is provided it will return all games of that category,
// if both are provided it will return all games of that provider and category
// page is used for pagination, it indicates the page number of the results to return, each page contains 25 games
onmessage = async ({
	data: { filtersJson, page, countryCode }
}: {
	data: { filtersJson: string; page: number; countryCode: string };
}) => {
	const filters = JSON.parse(filtersJson) as GalleryFilters;
	switch (filters.type) {
		case 'slot':
			buildSlotsQuery(filters, page, countryCode);
			break;
		case 'roulette':
			buildRouletteQuery(filters, page, countryCode);
			break;
		default:
			console.log('Unknown filters type: ', filters.type);
			return;
	}
};
