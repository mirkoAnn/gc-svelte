let bookmakers: any = $state([]);

export const bookmakersDataManager = {
	getBookmakers: () => {
		return bookmakers;
	},
	init: (fetchedBookmakers: any) => {
		bookmakers = fetchedBookmakers;
	},
	getTopBookmakers: (maxRank: number) => {
		return bookmakers.filter((bookmaker: any) => {
			return bookmaker.attributes.rank < maxRank + 1;
		});
	},
	getBookmakersByIds: (bookmakersIds: any) => {
		if (!bookmakersIds || !Array.isArray(bookmakersIds) || bookmakersIds.length === 0) {
			return [];
		}
		return bookmakers.filter((bookmaker: any) => {
			return bookmakersIds.includes(bookmaker.id);
		});
	}
};
