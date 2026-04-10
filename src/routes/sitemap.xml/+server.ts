import { countryCodes } from '$lib/app-manager.svelte';
import { dbManager } from '$lib/db-manager.svelte';
import { capitalizeFirstLetter } from '$lib/utils.svelte';
import { error } from '@sveltejs/kit';

export async function GET() {
	// Build GraphQL query to fetch updatedAt for main pages and collections for all country codes
	let query = `query Sitemap {`;
	// Iterate over country codes to build query for each country's pages and collections
	Object.values(countryCodes).forEach((countryCode) => {
		const countrySuffix = capitalizeFirstLetter(countryCode);
		query += `
      homePage${countrySuffix}: homePage(locale: "${countryCode}") {
        updatedAt
      }
      slotsPage${countrySuffix}: slotsPage(locale: "${countryCode}") {
        updatedAt
      }
      slotThemes${countrySuffix}: slotThemes(locale: "${countryCode}",pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
      slotMechanics${countrySuffix}: slotMechanics(locale: "${countryCode}",pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
      slots${countrySuffix}: slots(locale: "${countryCode}",pagination: { page: 1, pageSize: 5000 }) {
        slug
        updatedAt
      }
      roulettePage${countrySuffix}: roulettePage(locale: "${countryCode}") {
        updatedAt
      }
      roulettes${countrySuffix}: roulettes(locale: "${countryCode}",pagination: { page: 1, pageSize: 5000 }) {
        slug
        updatedAt
      }
      rouletteMechanics${countrySuffix}: rouletteMechanics(locale: "${countryCode}",pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
       }
      providersPage${countrySuffix}: providersPage(locale: "${countryCode}") {
        updatedAt
      }
      casinosPage${countrySuffix}: casinosPage(locale: "${countryCode}") {
        updatedAt
      }
      casinos${countrySuffix}: casinos(locale: "${countryCode}",pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
      providers${countrySuffix}: providers(locale: "${countryCode}",pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
    `;
	});
	query += `}`;

	// Define TypeScript types for the expected GraphQL response structure
	type PageData = { updatedAt: string };
	type CollectionItem = { slug: string; updatedAt: string };

	type QueryResponse = {
		homePageIt: PageData;
		homePageEs: PageData;
		slotsPageIt: PageData;
		slotsPageEs: PageData;
		slotThemesIt: CollectionItem[];
		slotThemesEs: CollectionItem[];
		slotMechanicsIt: CollectionItem[];
		slotMechanicsEs: CollectionItem[];
		slotsIt: CollectionItem[];
		slotsEs: CollectionItem[];
		roulettePageIt: PageData;
		roulettePageEs: PageData;
		roulettesIt: CollectionItem[];
		roulettesEs: CollectionItem[];
		rouletteMechanicsIt: CollectionItem[];
		rouletteMechanicsEs: CollectionItem[];
		providersPageIt: PageData;
		providersPageEs: PageData;
		providersIt: CollectionItem[];
		providersEs: CollectionItem[];
		casinosPageIt: PageData;
		casinosPageEs: PageData;
		casinosIt: CollectionItem[];
		casinosEs: CollectionItem[];
	};

	// Define types for normalized response structure to separate pages and collections for easier processing
	type NormalizedResponse = {
		pages: Record<string, PageData>;
		collections: Record<string, CollectionItem[]>;
	};

	// Define type for URL set response that will be used to generate the sitemap entries
	type UrlSetResponse = {
		loc: string;
		freq: string;
		mod: string;
		priority: number;
	}[];
	const urlset: UrlSetResponse = [];
	const SITE_ADDRESS = 'https://gamlub.com';

	let response: { data: QueryResponse };
	try {
		response = await dbManager.executeQuery(query);
	} catch {
		throw error(404, {
			message: 'Error loading page'
		});
	}

	// Normalize response into pages and collections
	const normalized: NormalizedResponse = {
		pages: {
			homePageIt: response.data.homePageIt,
			homePageEs: response.data.homePageEs,
			slotsPageIt: response.data.slotsPageIt,
			slotsPageEs: response.data.slotsPageEs,
			roulettePageIt: response.data.roulettePageIt,
			roulettePageEs: response.data.roulettePageEs,
			providersPageIt: response.data.providersPageIt,
			providersPageEs: response.data.providersPageEs,
			casinosPageIt: response.data.casinosPageIt,
			casinosPageEs: response.data.casinosPageEs
		},
		collections: {
			casinosIt: response.data.casinosIt,
			casinosEs: response.data.casinosEs,
			slotThemesIt: response.data.slotThemesIt,
			slotThemesEs: response.data.slotThemesEs,
			slotMechanicsIt: response.data.slotMechanicsIt,
			slotMechanicsEs: response.data.slotMechanicsEs,
			slotsIt: response.data.slotsIt,
			slotsEs: response.data.slotsEs,
			roulettesIt: response.data.roulettesIt,
			roulettesEs: response.data.roulettesEs,
			rouletteMechanicsIt: response.data.rouletteMechanicsIt,
			rouletteMechanicsEs: response.data.rouletteMechanicsEs,
			providersIt: response.data.providersIt,
			providersEs: response.data.providersEs
		}
	};

	// Main Pages and collection entries
	Object.values(countryCodes).forEach((countryCode) => {
		const countrySuffix = capitalizeFirstLetter(countryCode);
		const homePageKey = `homePage${countrySuffix}` as keyof typeof normalized.pages;
		const slotsPageKey = `slotsPage${countrySuffix}` as keyof typeof normalized.pages;
		const roulettePageKey = `roulettePage${countrySuffix}` as keyof typeof normalized.pages;
		const providersPageKey = `providersPage${countrySuffix}` as keyof typeof normalized.pages;
		const casinosPageKey = `casinosPage${countrySuffix}` as keyof typeof normalized.pages;

		const casinosKey = `casinos${countrySuffix}` as keyof typeof normalized.collections;
		const slotThemesKey = `slotThemes${countrySuffix}` as keyof typeof normalized.collections;
		const slotMechanicsKey = `slotMechanics${countrySuffix}` as keyof typeof normalized.collections;
		const slotsKey = `slots${countrySuffix}` as keyof typeof normalized.collections;
		const roulettesKey = `roulettes${countrySuffix}` as keyof typeof normalized.collections;
		const rouletteMechanicsKey =
			`rouletteMechanics${countrySuffix}` as keyof typeof normalized.collections;
		const providersKey = `providers${countrySuffix}` as keyof typeof normalized.collections;

		urlset.push(
			{
				loc: SITE_ADDRESS + '/' + countryCode,
				freq: 'daily',
				mod: normalized.pages[homePageKey].updatedAt,
				priority: 1
			},
			{
				loc: SITE_ADDRESS + '/' + countryCode + '/slot-gratis',
				freq: 'daily',
				mod: normalized.pages[slotsPageKey].updatedAt,
				priority: 1
			},
			{
				loc: SITE_ADDRESS + '/' + countryCode + '/roulette-gratis',
				freq: 'daily',
				mod: normalized.pages[roulettePageKey].updatedAt,
				priority: 1
			},
			{
				loc: SITE_ADDRESS + '/' + countryCode + '/providers',
				freq: 'monthly',
				mod: normalized.pages[providersPageKey].updatedAt,
				priority: 1
			},
			{
				loc: SITE_ADDRESS + '/' + countryCode + '/casino-online',
				freq: 'weekly',
				mod: normalized.pages[casinosPageKey].updatedAt,
				priority: 0.9
			}
		);

		normalized.collections[casinosKey].forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/casino-online/' + entry.slug,
				freq: 'monthly',
				mod: entry.updatedAt,
				priority: 0.8
			});
		});

		normalized.collections[slotThemesKey].forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/slot-gratis/slot-' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		normalized.collections[slotMechanicsKey].forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/slot-gratis/regole-' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		normalized.collections[slotsKey].forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/slot/' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		normalized.collections[roulettesKey].forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/roulette/' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		normalized.collections[rouletteMechanicsKey].forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/roulette-gratis/regole-' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});

		normalized.collections[providersKey].forEach((entry) => {
			urlset.push({
				loc: SITE_ADDRESS + '/' + countryCode + '/providers/' + entry.slug,
				freq: 'yearly',
				mod: entry.updatedAt,
				priority: 0.5
			});
		});
	});

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
