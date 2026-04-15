import type { Author } from './author';
import type { Colors } from './colors';
import type { PageContent } from './content';
import type { FAQ } from './faqs';
import type { PaymentMethod } from './payment-method';
import type { Provider } from './provider';
import type { Rating } from './rating';

export type Casino = {
	id: string;
	title: string;
	slug: string;
	seo: {
		title: string;
		description: string;
	};
	rank: number;
	logo: { url: string };
	images: Array<{ id: string; url: string }>;
	imagesMobile: Array<{ id: string; url: string }>;
	affiliationUrl: string;
	welcomeBonus: {
		noDeposit: number;
		noDepositRequirements: string;
		withDeposit: number;
		withDepositRequirements: string;
		tcUrl: string;
	};
	info: {
		homepageUrl: string;
		email: string;
		telephone: string;
		depositMin: number;
		withdrawalMin: number;
		withdrawalTimes: string;
		hasApp: boolean;
		hasGreatDesign: boolean;
		hasRoulette: boolean;
		hasBlackjack: boolean;
		hasPoker: boolean;
		hasLiveGames: boolean;
		hasSportBetting: boolean;
		bonusRating: number;
		designRating: number;
		mobileRating: number;
		gamesRating: number;
		supportRating: number;
	};
	content: PageContent;
	rating: Rating;
	colors: Colors;
	providers: Provider[];
	paymentMethods: PaymentMethod[];
	faqs: FAQ[];
	author: Author;
	publishedAt: string;
	updatedAt: string;
};
