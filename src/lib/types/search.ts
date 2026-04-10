import type { Provider } from './provider';
import type { Slot, Roulette } from './games';

export type SearchHints = string[];

export type SearchResults = {
	slots: Slot[]; // Define the type for slots based on your data structure
	roulettes: Roulette[]; // Define the type for roulettes based on your data structure
	casinosIds: number[]; // Assuming casino IDs are numbers
	providers: Provider[]; // Define the type for providers based on your data structure
};
