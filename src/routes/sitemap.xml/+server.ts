import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte';
import { capitalizeFirstLetter } from '$lib/utils.svelte';
import { error } from '@sveltejs/kit';

type PageData = { updatedAt: string };
type CollectionItem = { slug: string; updatedAt: string };
type QueryValue = PageData | CollectionItem[] | null;
type QueryResponse = Record<string, QueryValue>;

type UrlSetResponse = {
	loc: string;
	freq: string;
	mod: string;
	priority: number;
}[];

const SITE_ADDRESS = 'https://gamlub.com';
const COLLECTION_PAGE_SIZE = 500;

type CollectionName =
	| 'slotThemes'
	| 'slotMechanics'
	| 'slots'
	| 'roulettes'
	| 'rouletteMechanics'
	| 'casinos'
	| 'providers';

const getPage = (data: QueryResponse, key: string): PageData | undefined => {
	const value = data[key];
	if (value && !Array.isArray(value) && typeof value.updatedAt === 'string') {
		return value;
	}

	return undefined;
};

const getCollection = (data: QueryResponse, key: string): CollectionItem[] => {
	const value = data[key];
	if (!Array.isArray(value)) {
		return [];
	}

	return value.filter(
		(entry): entry is CollectionItem =>
			typeof entry?.slug === 'string' && typeof entry?.updatedAt === 'string'
	);
};

const fetchCollectionEntries = async (
	collectionName: CollectionName,
	countryCode: CountryCodes
): Promise<CollectionItem[]> => {
	let page = 1;
	const items: CollectionItem[] = [];

	while (true) {
		const query = `query SitemapCollection {
      entries: ${collectionName}(locale: "${countryCode}", pagination: { page: ${page}, pageSize: ${COLLECTION_PAGE_SIZE} }) {
        slug
        updatedAt
      }
    }`;

		const response: { data: QueryResponse } = await dbManager.executeQuery(query);
		const pageItems = getCollection(response.data, 'entries');

		if (pageItems.length === 0) {
			break;
		}

		items.push(...pageItems);

		if (pageItems.length < COLLECTION_PAGE_SIZE) {
			break;
		}

		page += 1;
	}

	return items;
};

export async function GET() {
	const routableCountries = Object.values(CountryCodes).filter((countryCode) =>
		appManager.canRouteToCountry(countryCode)
	);

	// Build GraphQL query to fetch updatedAt for main pages and collections for all country codes
	let query = `query Sitemap {`;
	// Iterate over country codes to build query for each country's pages and collections
	routableCountries.forEach((countryCode) => {
		const countrySuffix = capitalizeFirstLetter(countryCode);
		query += `
      homePage${countrySuffix}: homePage(locale: "${countryCode}") {
        updatedAt
      }
      slotsPage${countrySuffix}: slotsPage(locale: "${countryCode}") {
        updatedAt
      }
      roulettePage${countrySuffix}: roulettePage(locale: "${countryCode}") {
        updatedAt
      }
      providersPage${countrySuffix}: providersPage(locale: "${countryCode}") {
        updatedAt
      }
      casinosPage${countrySuffix}: casinosPage(locale: "${countryCode}") {
        updatedAt
      }
    `;
	});
	query += `}`;
	const urlset: UrlSetResponse = [];

	let response: { data: QueryResponse };
	try {
		response = await dbManager.executeQuery(query);
	} catch {
		throw error(404, {
			message: 'Error loading page'
		});
	}

	// Main Pages and collection entries
	for (const countryCode of routableCountries) {
		const countrySuffix = capitalizeFirstLetter(countryCode);
		const homePage = getPage(response.data, `homePage${countrySuffix}`);
		const slotsPage = getPage(response.data, `slotsPage${countrySuffix}`);
		const roulettePage = getPage(response.data, `roulettePage${countrySuffix}`);
		const providersPage = getPage(response.data, `providersPage${countrySuffix}`);
		const casinosPage = getPage(response.data, `casinosPage${countrySuffix}`);

		const [casinos, slotThemes, slotMechanics, slots, roulettes, rouletteMechanics, providers] =
			await Promise.all([
				fetchCollectionEntries('casinos', countryCode),
				fetchCollectionEntries('slotThemes', countryCode),
				fetchCollectionEntries('slotMechanics', countryCode),
				fetchCollectionEntries('slots', countryCode),
				fetchCollectionEntries('roulettes', countryCode),
				fetchCollectionEntries('rouletteMechanics', countryCode),
				fetchCollectionEntries('providers', countryCode)
			]);

		if (homePage) {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode,
				freq: 'daily',
				mod: homePage.updatedAt,
				priority: 1
			});
		}

		if (slotsPage) {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/slot-gratis',
				freq: 'daily',
				mod: slotsPage.updatedAt,
				priority: 1
			});
		}

		if (roulettePage) {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/roulette-gratis',
				freq: 'daily',
				mod: roulettePage.updatedAt,
				priority: 1
			});
		}

		if (providersPage) {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/providers',
				freq: 'monthly',
				mod: providersPage.updatedAt,
				priority: 1
			});
		}

		if (casinosPage) {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/casino-online',
				freq: 'weekly',
				mod: casinosPage.updatedAt,
				priority: 0.9
			});
		}

		casinos.forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/casino-online/' + entry.slug,
				freq: 'monthly',
				mod: entry.updatedAt,
				priority: 0.8
			});
		});

		slotThemes.forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/slot-gratis/slot-' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		slotMechanics.forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/slot-gratis/regole-' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		slots.forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/slot/' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		roulettes.forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/roulette/' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		rouletteMechanics.forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/roulette-gratis/regole-' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		providers.forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/providers/' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});
	}

	const mappedUrlset = urlset
		.map(
			(url) => `<url>
      <loc>${url.loc}</loc>
      <changefreq>${url.freq}</changefreq>
      <lastmod>${url.mod}</lastmod>
      <priority>${url.priority}</priority>
    </url>`
		)
		.join('');

	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
        ${mappedUrlset}
        </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
