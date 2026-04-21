import { dbManager } from "./db-manager.svelte";
// This worker is responsible for handling search queries and updating search analytics in the background,
// allowing the main thread to remain responsive while performing potentially time-consuming operations related to searching and analytics updates.
// It listens for messages containing search queries, executes the search against the database, and then sends the results back to the main thread.
// Additionally, it updates the search analytics by either creating a new entry for a new search query or updating the relevance of an existing query.

const executeSearchAnalyticsQuery = (searchValue: string) => {
  // First, we check if the search query already exists in the database to determine whether we need to create a new entry or update an existing one
  let searchAnalyticsQuery = `
    query {
      searchQueries (filters:{ query:  { eqi: "${searchValue}" } }) {
        id: documentId
        relevance
      }
    }
  `;
  dbManager
    .executeQuery(searchAnalyticsQuery)
    .then((response: any) => {
      if (response.data.searchQueries.length > 0) {
        // If the search query already exists, update its relevance
        let searchQueryId = response.data.searchQueries[0].id;
        let currentRelevance = response.data.searchQueries[0].relevance;
        searchAnalyticsQuery = `
          mutation {
            updateSearchQuery(documentId: "${searchQueryId}", data: { relevance: ${currentRelevance + 1} }) {
              id: documentId
            }
          }
        `;
      } else {
        // If the search query does not exist, create a new entry
        searchAnalyticsQuery = `
          mutation {
            createSearchQuery(data: { query: "${searchValue}", relevance: 1 }) {
              query
              relevance
            }
          }
        `;
      }
      dbManager.executeQuery(searchAnalyticsQuery).catch((error: any) => {
        console.error("Error updating search analytics:", error);
      });
    })
    .catch((error: any) => {
      console.error("Error searching for search analytics:", error);
    });
};

onmessage = ({ data: { searchValue } }) => {
  const searchQuery = `
      query {
        slots(
          filters: { slug: { containsi: "${searchValue}" } }
          sort: "sessions:desc"
          pagination: { page: 1, pageSize: 10 }
        ) {
          id: documentId
          title
          slug
          logo {
            url
          }
          provider {
            title
          }
          slotThemes {
            slug
            iconId
          }
        }
        casinos (filters: { slug: { containsi: "${searchValue}" } }, pagination: { page: 1, pageSize: 10 }) {
          id: documentId
        }
        providers (filters: { slug: { containsi: "${searchValue}" } }, pagination: { page: 1, pageSize: 10 }) {
          title
          slug
          logo {
            url
          }
          colors {
            background
          }
        }
      }
    `;

  dbManager
    .executeQuery(searchQuery)
    .then((response: any) => {
      // Check if the response structure is valid
      if (!response || !response.data) {
        // If the response structure is invalid, send an error message back to the main thread
        postMessage({
          type: "searchError",
          error: "Invalid response structure from search query.",
        });
        return;
      }
      executeSearchAnalyticsQuery(searchValue); // Update search analytics after successfully fetching search results
      postMessage({ type: "searchResults", data: response.data }); // Send the search results back to the main thread, including a type to identify the message
    })
    .catch((error: any) => {
      console.error("Error executing search query:", error);
      // If there is an error executing the search query, send an error message back to the main thread with the error details
      postMessage({
        type: "searchError",
        error: error.message || "An error occurred while searching.",
      });
    });
};

export {};
