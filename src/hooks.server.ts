import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { redirect, type Handle } from '@sveltejs/kit';

const ROUTABLE_COUNTRIES = Object.values(CountryCodes).filter((code) =>
	appManager.canRouteToCountry(code)
);

const LOCALE_PREFIX_PATTERN = new RegExp(`^/(${ROUTABLE_COUNTRIES.join('|')})(?=/|$)`);

const STATIC_FILE_PATTERN = /\.[a-z0-9]+$/i;

const BYPASS_PREFIXES = ['/_app/', '/api/'];
const BYPASS_PATHS = ['/robots.txt', '/manifest.json'];

const parseCookieValue = (cookieHeader: string | null, cookieName: string): string | undefined => {
	if (!cookieHeader) {
		return undefined;
	}

	for (const cookie of cookieHeader.split(';')) {
		const [rawKey, ...rawValueParts] = cookie.trim().split('=');
		if (rawKey !== cookieName || rawValueParts.length === 0) {
			continue;
		}

		const rawValue = rawValueParts.join('=');
		try {
			return decodeURIComponent(rawValue).toLowerCase();
		} catch {
			return rawValue.toLowerCase();
		}
	}

	return undefined;
};

const toCountryCode = (value: string | undefined): CountryCodes | undefined => {
	if (!value) {
		return undefined;
	}

	const baseValue = value.toLowerCase().split('-')[0] as CountryCodes;
	if (!ROUTABLE_COUNTRIES.includes(baseValue)) {
		return undefined;
	}

	return baseValue;
};

const extractPreferredCountryFromAcceptLanguage = (
	header: string | null
): CountryCodes | undefined => {
	if (!header) {
		return undefined;
	}

	const candidates = header
		.split(',')
		.map((entry) => {
			const [tag, q = '1'] = entry.trim().split(';q=');
			return {
				tag,
				q: Number(q)
			};
		})
		.sort((a, b) => b.q - a.q);

	for (const candidate of candidates) {
		const parsed = toCountryCode(candidate.tag);
		if (parsed) {
			return parsed;
		}
	}

	return undefined;
};

const isBypassedPath = (pathname: string): boolean => {
	if (BYPASS_PATHS.includes(pathname)) {
		return true;
	}

	if (BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return true;
	}

	if (pathname.startsWith('/sitemap.xml') || pathname.startsWith('/favicon')) {
		return true;
	}

	return STATIC_FILE_PATTERN.test(pathname);
};

const getGeoCountryCode = (request: Request): CountryCodes | undefined => {
	const cookieHeader = request.headers.get('cookie');
	const cookieLocale =
		toCountryCode(parseCookieValue(cookieHeader, 'locale')) ??
		toCountryCode(parseCookieValue(cookieHeader, 'PARAGLIDE_LOCALE'));
	if (cookieLocale) {
		return cookieLocale;
	}

	const countryFromHeader =
		toCountryCode(request.headers.get('x-vercel-ip-country') ?? undefined) ??
		toCountryCode(request.headers.get('cf-ipcountry') ?? undefined);
	if (countryFromHeader) {
		return countryFromHeader;
	}

	return extractPreferredCountryFromAcceptLanguage(request.headers.get('accept-language'));
};

const redirectToCountryPath = (
	pathname: string,
	search: string,
	targetCountry: CountryCodes
): string => {
	const withLocale = LOCALE_PREFIX_PATTERN.test(pathname)
		? pathname.replace(LOCALE_PREFIX_PATTERN, `/${targetCountry}`)
		: pathname === '/'
			? `/${targetCountry}`
			: `/${targetCountry}${pathname}`;

	return `${withLocale}${search}`;
};

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname, search } = event.url;

	if (isBypassedPath(pathname)) {
		return resolve(event);
	}

	const geoCountry = getGeoCountryCode(event.request);
	if (!geoCountry) {
		return resolve(event);
	}

	const localeInPath = pathname.match(LOCALE_PREFIX_PATTERN)?.[1] as CountryCodes | undefined;
	if (localeInPath === geoCountry) {
		return resolve(event);
	}

	const redirectPath = redirectToCountryPath(pathname, search, geoCountry);
	if (redirectPath !== `${pathname}${search}`) {
		throw redirect(307, redirectPath);
	}

	return resolve(event);
};
