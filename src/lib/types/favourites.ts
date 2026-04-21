import type { Roulette, Slot } from './games';

export type FavouritesList = {
	slots: Slot[];
	roulettes: Roulette[];
};

export type Favourite = Slot | Roulette;
