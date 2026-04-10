export type PageContent = {
	introContent: string;
	secondContent: string;
	thirdContent: string;
	fourthContent: string;
	fifthContent: string;
	sixthContent: string;
	seventhContent: string;
	eighthContent: string;
	ninethContent: string;
	tenthContent: string;
};

export type TextChild = {
	type: string;
	text: string;
	url?: string;
	rel?: string;
	target?: string;
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
