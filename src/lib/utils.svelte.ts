import { appManager } from './app-manager.svelte';

export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCurrency = (value: string) => {
	return parseFloat(value).toLocaleString(appManager.getCountryLangCode(), {
		style: 'currency',
		currency: appManager.getCurrencyCode()
	});
};
