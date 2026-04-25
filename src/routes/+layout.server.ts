import { AGE_VERIFICATION_COOKIE_NAME } from '../component/layout/age-banner/age-banner-manager.svelte';
import { FAVOURITES_LIST_COOKIE_NAME } from '../component/favourites/favourites-manager.svelte';
import { appManager } from '../lib/app-manager.svelte';
import { dbManager } from '../lib/db-manager.svelte';
import type { Roulette, Slot } from '$lib/types/games';
import type { Casino } from '$lib/types/casino';
import type { LayoutServerLoad } from './$types';

type FavouritesList = {
	slots: Slot[];
	roulettes: Roulette[];
};

const parseFavouritesList = (cookieValue: string | undefined): FavouritesList => {
	if (!cookieValue) {
		return { slots: [], roulettes: [] };
	}

	try {
		const parsed = JSON.parse(cookieValue) as Partial<FavouritesList>;
		return {
			slots: Array.isArray(parsed.slots) ? parsed.slots : [],
			roulettes: Array.isArray(parsed.roulettes) ? parsed.roulettes : []
		};
	} catch {
		return { slots: [], roulettes: [] };
	}
};

export const load: LayoutServerLoad = async ({ request, cookies, setHeaders }) => {
	const requestPath = new URL(request.url).pathname;
	const isAgeVerified = cookies.get(AGE_VERIFICATION_COOKIE_NAME) === 'true';

	// Initialize favourites manager with data from cookies
	const listSavedCookie = cookies.get(FAVOURITES_LIST_COOKIE_NAME);
	const favouritesList = parseFavouritesList(listSavedCookie);

	const countryCode = appManager.fetchCountryCode(request);

	// Fetching casinos data from the database that will be used in multiple parts of the site
	let casinos: Casino[];

	const query = `
    query {
      casinos (locale: "${countryCode}", sort: "rank:asc"){
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
          homepageUrl
          email
          telephone
          depositMin
          withdrawalMin
          withdrawalTimes
          hasApp
          hasGreatDesign
          hasRoulette
          hasBlackjack
          hasPoker
          hasLiveGames
          hasSportBetting
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

	try {
		const response = (await dbManager.executeQuery(query)) as { data?: { casinos?: Casino[] } };
		casinos = response.data?.casinos ?? [];
		// Cache the layout data at the CDN edge: fresh for 60s, serve stale for up to 5min while revalidating
		setHeaders({ 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' });
	} catch {
		casinos = [];
	}

	return {
		isAgeVerified,
		favouritesList,
		casinos,
		countryCode,
		requestPath
	};
};
