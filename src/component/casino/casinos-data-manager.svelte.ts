let casinos: any = $state([]);

export const casinosDataManager = {
  getCasinos: () => {
    return casinos;
  },
  initialize: (fetchedCasinos: any) => {
    casinos = fetchedCasinos;
  },
  getTopCasinos: (maxRank: number, excludedId?: string) => {
    return casinos.filter((casino: any) => {
      if (excludedId && casino.id === excludedId) {
        return false;
      }
      return casino.rank < maxRank + 1;
    });
  },
  getCasinosByIds: (casinosIds: any) => {
    if (!casinosIds || !Array.isArray(casinosIds) || casinosIds.length === 0) {
      return [];
    }
    return casinos.filter((casino: any) => {
      return casinosIds.includes(casino.id);
    });
  },
  getCasinosByProviderTitle: (providerTitle: string) => {
    return casinos.filter((casino: any) => {
      return casino.providers.some(
        (provider: any) =>
          provider.title.toLowerCase() === providerTitle.toLowerCase(),
      );
    });
  },
  getCasinoById: (id: string) => {
    return casinos.find((casino: any) => casino.id === id);
  },
};
