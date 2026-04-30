export type PageContent = {
	firstContent: ContentItem;
	secondContent: ContentItem;
	thirdContent: ContentItem;
	fourthContent: ContentItem;
	fifthContent: ContentItem;
	sixthContent: ContentItem;
	seventhContent: ContentItem;
	eighthContent: ContentItem;
	ninethContent: ContentItem;
	tenthContent: ContentItem;
};

export type TextChild = {
	type: string;
	text: string;
	url?: string;
	rel?: string;
	target?: string;
	italic?: boolean;
	children?: { text: string }[];
};

export type HeadingContent = {
	type: 'heading';
	level: number;
	children: { text: string }[];
};

export type TextContent = {
	type: 'paragraph';
	children: TextChild[];
};

export type ListItem = {
	type: string;
	text: string;
	format?: string;
	children: ListItem[];
};

export type ListContent = {
	type: 'list';
	format?: string;
	children: ListItem[];
};

export type ContentSection = HeadingContent | TextContent | ListContent;

export type ContentItem = ContentSection[];
