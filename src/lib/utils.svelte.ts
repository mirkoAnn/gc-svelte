import { appManager } from './app-manager.svelte';

export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCurrency = (value: string) => {
	const locale = appManager.getCountryLangCode() || 'it-IT';
	const currency = appManager.getCurrencyCode() || 'EUR';

	return parseFloat(value).toLocaleString(locale, {
		style: 'currency',
		currency
	});
};
