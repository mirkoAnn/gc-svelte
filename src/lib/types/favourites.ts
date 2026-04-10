import type { Slot } from './games';

export type FavouritesList = {
	slots: Slot[];
};

export type Favourite = {
	id: string;
	data?: Slot;
};
