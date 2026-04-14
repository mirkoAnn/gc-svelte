import type { Author } from './author';
import type { ContentItem } from './content';
import type { Provider } from './provider';
import type { Rating } from './rating';

export type Game = {
	id: string;
	seo: {
		title: string;
		description: string;
	};
	title: string;
	slug: string;
	gameUrl: string;
	logo: {
		url: string;
	};
	images: {
		image: {
			url: string;
		};
		description: string;
	}[];
	provider: Provider;
	sessions: number;
	rating: Rating;
	author: Author;
	publishedAt: string;
	updatedAt: string;
};

export type Slot = Game & {
	info: {
		releaseYear: string;
		rtp: string;
		volatility: string;
		reels: string;
		paylines: string;
		betMin: string;
		betMax: string;
		winMax: string;
		hasBonusGame: boolean;
		hasFreeSpins: boolean;
		hasJackpot: boolean;
	};
	introContent: ContentItem;
	rulesContent: ContentItem;
	bonusContent: ContentItem;
	opinionContent: ContentItem;
	slotThemes: {
		slug: string;
		slots: Slot[];
	}[];
};

export type Roulette = Game;
