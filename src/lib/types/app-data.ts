import type { Casino } from './casino';
import type { Slot } from './games';

export type AppData = {
	isAgeVerified: boolean;
	favouritesList: {
		slots: Slot[];
	};
	casinos: Casino[];
	countryCode: string;
};
