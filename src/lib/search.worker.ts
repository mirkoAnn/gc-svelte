import { dbManager } from './db-manager.svelte';
import { slotsQuery } from './query/basic-query';
import type { SearchResults } from './types/search';

type SearchAnalyticsEntry = {
	id: string;
	relevance: number;
};

type SearchAnalyticsResponse = {
	data: {
		searchQueries: SearchAnalyticsEntry[];
	};
};

type SearchResponse = {
	data: SearchResults;
};

const getErrorMessage = (error: unknown): string => {
	return error instanceof Error ? error.message : String(error);
};

const executeSearchAnalyticsQuery = (searchValue: string) => {
	const checkQuery = `
    query CheckAnalytics($query: String!) {
      searchQueries(filters: { query: { eqi: $query } }) {
        id: documentId
        relevance
      }
    }
  `;
	dbManager
		.executeQuery(checkQuery, { query: searchValue })
		.then((response: SearchAnalyticsResponse) => {
			if (response.data.searchQueries.length > 0) {
				const { id, relevance } = response.data.searchQueries[0];
				const updateQuery = `
          mutation UpdateAnalytics($id: ID!, $relevance: Int!) {
            updateSearchQuery(documentId: $id, data: { relevance: $relevance }) {
              id: documentId
            }
          }
        `;
				dbManager
					.executeQuery(updateQuery, { id, relevance: relevance + 1 })
					.catch((error: unknown) => console.error('Error updating search analytics:', error));
			} else {
				const createQuery = `
          mutation CreateAnalytics($query: String!) {
            createSearchQuery(data: { query: $query, relevance: 1 }) {
              query
              relevance
            }
          }
        `;
				dbManager
					.executeQuery(createQuery, { query: searchValue })
					.catch((error: unknown) => console.error('Error creating search analytics:', error));
			}
		})
		.catch((error: unknown) => console.error('Error fetching search analytics:', error));
};

onmessage = ({ data: { searchValue, countryCode } }) => {
	const searchQuery = `
    query Search($search: String!, $locale: String!) {
      slots(
        filters: { slug: { containsi: $search }, locale: { eq: $locale } }
        sort: "sessions:desc"
        pagination: { page: 1, pageSize: 10 }
      ) {
        ${slotsQuery}
      }
      casinos(
        filters: { slug: { containsi: $search }, locale: { eq: $locale } }
        pagination: { page: 1, pageSize: 10 }
      ) {
        id: documentId
      }
      providers(
        filters: { slug: { containsi: $search }, locale: { eq: $locale } }
        pagination: { page: 1, pageSize: 10 }
      ) {
        title
        slug
        logo { url }
        colors { background }
      }
    }
  `;

	dbManager
		.executeQuery(searchQuery, { search: searchValue, locale: countryCode })
		.then((response: SearchResponse) => {
			if (!response || !response.data) {
				postMessage({
					type: 'searchError',
					error: 'Invalid response structure from search query.'
				});
				return;
			}
			executeSearchAnalyticsQuery(searchValue);
			postMessage({ type: 'searchResults', data: response.data });
		})
		.catch((error: unknown) => {
			postMessage({
				type: 'searchError',
				error: getErrorMessage(error) || 'An error occurred while searching.'
			});
		});
};

export {};
