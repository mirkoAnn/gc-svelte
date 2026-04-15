export type Rating = {
	up: number;
	down: number;
	trend: {
		value: number;
		month: string;
	}[];
};

export type RatingData = {
	id: string;
	rating: Rating;
};
