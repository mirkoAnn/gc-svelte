import { redirect } from '@sveltejs/kit';

export async function load({ request }) {
	const country = request.headers.get('x-vercel-ip-country')?.toLowerCase() || 'it'; // Fallback to "it" if header is not available

	switch (country) {
		case 'it':
			throw redirect(301, '/it'); // Redirect to Italian version of the site
		case 'es':
			throw redirect(301, '/es'); // Redirect to Spanish version of the site
		default:
			throw redirect(301, '/it'); // Redirect to Italian version of the site as default
	}
}
