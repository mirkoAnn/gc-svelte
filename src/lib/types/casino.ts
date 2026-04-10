import type { Colors } from './colors';
import type { PaymentMethod } from './payment-method';
import type { Provider } from './provider';
import type { Rating } from './rating';

export type Casino = {
	id: string;
	title: string;
	slug: string;
	rank: number;
	logo: { url: string };
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
		withdrawalTime: string;
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
	rating: Rating;
	colors: Colors;
	providers: Provider[];
	paymentMethods: PaymentMethod[];
};
