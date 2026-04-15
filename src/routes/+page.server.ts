import { appManager } from '$lib/app-manager.svelte';
import { redirect } from '@sveltejs/kit';

export async function load({ request }) {
	const countryCode = appManager.fetchCountryCode(request);
	if (appManager.canRouteToCountry(countryCode)) {
		throw redirect(307, `/${countryCode}`);
	}

	throw redirect(307, '/it'); // Redirect to Italian version of the site as default
}
