import type { Provider } from './provider';
import type { Rating } from './rating';

export type Game = {
	id: string;
	title: string;
	slug: string;
	gameUrl: string;
	logo: {
		url: string;
	};
	gameplay: {
		url: string;
	};
	provider: Provider;
	slotThemes: {
		slug: string;
	}[];
	sessions: number;
	rating: Rating;
	info: {
		rtp: string;
		volatility: string;
		reels: string;
		paylines: string;
		betMin: string;
		betMax: string;
		winMin: string;
		winMax: string;
		hasBonusGame: boolean;
		hasFreeSpins: boolean;
		hasJackpot: boolean;
	};
};

export type Slot = Game;

export type Roulette = Game;
