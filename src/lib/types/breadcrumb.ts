import type { RouteId } from '$app/types';

export type Breadcrumb = {
	route: {
		id: RouteId;
		params?: Record<string, string>;
	};
	title: string;
	label: string;
};
