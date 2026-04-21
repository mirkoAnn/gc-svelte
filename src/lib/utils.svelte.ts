import { appManager, CountryCodes } from './app-manager.svelte';

export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCurrency = (value: string, locale: CountryCodes) => {
	const currency = appManager.getCurrencyCode() || 'EUR';

	return parseFloat(value).toLocaleString(locale, {
		style: 'currency',
		currency
	});
};

export const formatImageUrl = (url: string, width: number) => {
	return url.replace('/upload/', `/upload/w_${width},f_auto,q_auto/`);
};
