import { dbManager } from '$lib/db-manager.svelte';
import { error } from '@sveltejs/kit';
import { AGE_VERIFICATION_COOKIE_NAME } from '../component/layout/age-banner/age-banner-manager.svelte';
import { FAVOURITES_LIST_COOKIE_NAME } from '../component/favourites/favourites-manager.svelte';
import { appManager, countryCodes } from '../lib/app-manager.svelte';

export async function load({ request, cookies }) {
	const isAgeVerified = cookies.get(AGE_VERIFICATION_COOKIE_NAME) === 'true';

	// Initialize favourites manager with data from cookies
	const listSavedCookie = cookies.get(FAVOURITES_LIST_COOKIE_NAME);
	const favouritesList = listSavedCookie ? JSON.parse(listSavedCookie) : [];

	const countryCode =
		countryCodes[
			request.headers.get('x-vercel-ip-country')?.toLowerCase() as keyof typeof countryCodes
		] || countryCodes.it; // Fallback to "it" if header is not available

	// Set country code in app manager for use in other parts of the app, with fallback to "it"
	// this is necessary to ensure that the app manager has the correct country code before any database queries are made, allowing for proper server address selection based on the user's location.
	appManager.setCountryCode(countryCode);

	// Fetching casinos data from the database that will be used in multiple parts of the site
	interface Casino {
		id: string;
		title: string;
		slug: string;
		rank: number;
		logo: { url: string };
		affiliationUrl: string;
		welcomeBonus: {
			noDeposit: number;
			noDepositRequirements: string;
			withDeposit: number;
			withDepositRequirements: string;
			tcUrl: string;
		};
		info: {
			bonusRating: number;
			designRating: number;
			mobileRating: number;
			gamesRating: number;
			supportRating: number;
		};
		rating: {
			up: number;
			down: number;
			trend: string;
		};
		colors: {
			background: string;
			text: string;
		};
		providers: { title: string }[];
	}

	let casinos: Casino[] = [];

	const query = `
    query {
      casinos (sort: "rank:asc"){
        id: documentId
        title
        slug
        rank
        logo {
          url
        }
        affiliationUrl
        welcomeBonus {
          noDeposit
          noDepositRequirements
          withDeposit
          withDepositRequirements
          tcUrl
        }
        info {
          bonusRating
          designRating
          mobileRating
          gamesRating
          supportRating
        }
        rating {
          up
          down
          trend
        }
        colors {
          background
          text
        }
        providers {
          title
        }
      }
    }
  `;

	await dbManager
		.executeQuery(query)
		.then((response: unknown) => {
			const data = response as { data: { casinos: Casino[] } };
			casinos = data.data.casinos;
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});

	return {
		isAgeVerified,
		favouritesList,
		casinos,
		countryCode
	};
}
