import { dbManager } from "./db-manager.svelte";

onmessage = ({ data: { url } }) => {
  const query = `
    mutation {
        createGameErrorReport(
            data: {
                url: "${url}"
            }
        ) {
            documentId
        }
        }
    `;

  // Send the query to dbManager to execute the mutation
  dbManager.executeQuery(query).catch((error) => console.log(error));
};

export {};
