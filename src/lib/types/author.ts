import type { ContentItem } from './content';

export type Author = {
	name: string;
	description: ContentItem;
	image: {
		url: string;
	};
	facebookProfile?: string;
	linkedinProfile?: string;
};
