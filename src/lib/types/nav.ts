import type { CountryCodes } from '$lib/app-manager.svelte';

export type NavSubmenu = {
	href: string;
	title: string;
	label: string;
	category: string;
	onlyForCountries?: CountryCodes[];
};

export type NavMenu = {
	label: string;
	category: string;
	// Submenu items
	submenuItems: NavSubmenu[];
};

export type NavSection = {
	section: string;
	color: string;
	selectedColor: string;
	items: NavMenu[];
};
