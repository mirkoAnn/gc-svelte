import { appManager } from "./app-manager.svelte";

const GQL_SERVER_ADDRESS = [
  {
    country: "it",
    url: "https://sgo-strapi.onrender.com/graphql",
  },
];

export const dbManager = {
  executeQuery: (query: string, newCountryCode?: string) => {
    // new country code is optional, if it's not provided, it will be retrieved from the app manager
    // this is used by game manager when it needs to execute a query and the country code is not available yet
    const countryCode = newCountryCode || appManager.getCountryCode(); // Get the country code from the app manager if it's not provided as an argument
    const serverAddress = GQL_SERVER_ADDRESS.find(
      (server) => server.country === countryCode,
    )?.url;
    if (!serverAddress) {
      return Promise.reject(
        new Error("No server address found for the current country code."),
      );
    }
    return new Promise((resolve, reject) => {
      fetch(serverAddress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This header is necessary
        },
        body: JSON.stringify({
          query: query,
        }),
      })
        .then((response) => {
          response
            .json()
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
