import type { Favourite, FavouritesList } from '$lib/types/favourites';
import type { Slot } from '$lib/types/games';

export const FAVOURITES_LIST_COOKIE_NAME = 'gc_favourites_list';

// Favourites list contains different categories; for now we only have "slots"
let favouritesList: FavouritesList = $state({
	slots: []
});

export const favouritesManager = {
	initialize: (newList: { slots: Slot[] }) => {
		// Initialize favourites list from cookie data if available
		// list is null when no cookie is present or cookie is invalid
		// so we keep the default empty list in that case
		if (newList) {
			favouritesList = newList;
		}
	},
	// Retrieve the list for a specific category
	getListByCategory: (category: string) => {
		switch (category) {
			case 'slot':
				return favouritesList.slots;
			default:
				return [];
		}
	},
	// Add or remove an item from the list for a specific category
	toggleFromList: (favourite: Favourite, category: string) => {
		switch (category) {
			case 'slot': {
				const index = favouritesList.slots.findIndex((slot: Slot) => {
					return slot.id === favourite.id;
				});
				if (index < 0 && favourite.data) {
					favouritesList.slots = [...favouritesList.slots, favourite.data];
				} else {
					favouritesList.slots = [
						...favouritesList.slots.slice(0, index),
						...favouritesList.slots.slice(index + 1)
					];
				}
				break;
			}
			default:
				break;
		}

		document.cookie =
			FAVOURITES_LIST_COOKIE_NAME +
			'=' +
			JSON.stringify(favouritesList) +
			';path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC';
	},
	// Check if an item is on the list for a specific category
	isOnFavouritesByCategory: (id: string, category: string) => {
		switch (category) {
			case 'slot': {
				const index = favouritesList.slots.findIndex((slot: Slot) => {
					return slot.id === id;
				});
				return index > -1;
			}
			default:
				return false;
		}
	},
	// Clear the list for a specific category
	clearListByCategory: (category: string) => {
		switch (category) {
			case 'slot':
				favouritesList.slots = [];
				break;
			default:
				break;
		}
		document.cookie =
			FAVOURITES_LIST_COOKIE_NAME +
			'=' +
			JSON.stringify(favouritesList) +
			';path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC';
	},
	clearAll: () => {
		favouritesList = {
			slots: []
		};
		document.cookie =
			FAVOURITES_LIST_COOKIE_NAME +
			'=' +
			JSON.stringify(favouritesList) +
			';path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC';
	}
};
