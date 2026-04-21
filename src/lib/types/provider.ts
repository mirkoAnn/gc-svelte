import type Faq from '../../component/faqs/faq.svelte';
import type { Author } from './author';
import type { PageContent } from './content';
import type { Slot } from './games';

export type Provider = {
	seo: {
		title: string;
		description: string;
	};
	title: string;
	slug: string;
	logo: {
		url: string;
	};
	slots: Slot[];
	content: PageContent;
	faqs: Faq[];
	author: Author;
	publishedAt: string;
	updatedAt: string;
	colors: { background: string; text: string };
};
