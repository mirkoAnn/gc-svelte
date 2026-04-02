const GQL_SERVER_ADDRESS = "https://gc-strapi.onrender.com/graphql";

export const dbManager = {
  executeQuery: async (query: string) => {
    const response = await fetch(GQL_SERVER_ADDRESS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    return response.json();
  },
};