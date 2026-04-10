export type Rating = {
	up: number;
	down: number;
	trend: string;
};

export type RatingData = {
	id: string;
	rating: Rating;
};
