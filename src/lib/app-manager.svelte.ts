import gsap from 'gsap/dist/gsap';

export enum CountryCodes {
	it = 'it',
	es = 'es'
}

type CountryConfig = {
	name: string;
	languageTag: string;
	currencyCode: string;
	routeEnabled: boolean;
};

const DEFAULT_COUNTRY_CODE = CountryCodes.it;

const COUNTRY_CONFIG: Record<CountryCodes, CountryConfig> = {
	[CountryCodes.it]: {
		name: 'Italia',
		languageTag: 'it-IT',
		currencyCode: 'EUR',
		routeEnabled: true
	},
	[CountryCodes.es]: {
		name: 'España',
		languageTag: 'es-ES',
		currencyCode: 'EUR',
		routeEnabled: true
	}
};

const ALL_COUNTRY_CODES = Object.values(CountryCodes);

const ROUTABLE_COUNTRIES = ALL_COUNTRY_CODES.filter((code) => COUNTRY_CONFIG[code].routeEnabled);

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

	const baseValue = value.toLowerCase().split('-')[0];
	return ALL_COUNTRY_CODES.includes(baseValue as CountryCodes)
		? (baseValue as CountryCodes)
		: undefined;
};

const getCountryFromPathname = (pathname: string): CountryCodes | undefined => {
	const firstSegment = pathname.split('/').filter(Boolean)[0];
	return toCountryCode(firstSegment);
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

const extractPathname = (requestUrl: string): string => {
	const match = requestUrl.match(/^[a-z]+:\/\/[^/]+(\/.*)?$/i);
	return match?.[1] ?? '/';
};

let isMobile: boolean = $state(false),
	countryCode: CountryCodes | undefined = $state(undefined);

export const appManager = {
	setDeviceType: () => {
		isMobile = window.innerWidth < 768;
	},
	isMobile: () => {
		return isMobile;
	},
	setCountryCode: (code: CountryCodes) => {
		countryCode = code;
	},
	fetchCountryCode: (request: Request) => {
		const pathCountry = getCountryFromPathname(extractPathname(request.url));
		if (pathCountry && appManager.canRouteToCountry(pathCountry)) {
			return pathCountry;
		}

		const cookieHeader = request.headers.get('cookie');
		const cookieLocale =
			toCountryCode(parseCookieValue(cookieHeader, 'locale')) ??
			toCountryCode(parseCookieValue(cookieHeader, 'PARAGLIDE_LOCALE'));
		if (cookieLocale) {
			return cookieLocale;
		}

		const countryFromHeader = toCountryCode(
			request.headers.get('x-vercel-ip-country')?.toLowerCase()
		);
		if (countryFromHeader) {
			return countryFromHeader;
		}

		const countryFromAcceptLanguage = extractPreferredCountryFromAcceptLanguage(
			request.headers.get('accept-language')
		);
		if (countryFromAcceptLanguage) {
			return countryFromAcceptLanguage;
		}

		return DEFAULT_COUNTRY_CODE;
	},
	canRouteToCountry: (code: CountryCodes) => {
		return ROUTABLE_COUNTRIES.includes(code);
	},
	getRouteCountries: () => {
		return ROUTABLE_COUNTRIES;
	},
	getCountryCodeFromPathname: (pathname: string) => {
		return getCountryFromPathname(pathname);
	},
	getCountryCode: () => {
		return countryCode;
	},
	getCountryName: () => {
		return countryCode ? COUNTRY_CONFIG[countryCode].name : '';
	},
	getCountryLangCode: (country?: CountryCodes) => {
		const selectedCountry = country ?? countryCode;
		return selectedCountry ? COUNTRY_CONFIG[selectedCountry].languageTag : '';
	},
	getCurrencyCode: (country?: CountryCodes) => {
		const selectedCountry = country ?? countryCode;
		return selectedCountry ? COUNTRY_CONFIG[selectedCountry].currencyCode : '';
	},
	// Add content animation on scroll using GSAP and ScrollTrigger plugin in all pages
	addContentAnimation: async () => {
		const scrollTrigger = await import('gsap/dist/ScrollTrigger');
		gsap.registerPlugin(scrollTrigger);
		document.querySelectorAll('.content').forEach((section) => {
			gsap
				.timeline({
					scrollTrigger: {
						scroller: '.main-inner',
						trigger: section,
						start: 'top 80%',
						end: 'top 30%',
						scrub: true
					}
				})
				.fromTo(
					section,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0
					}
				);
		});
	},
	scrollToTop: () => {
		document.querySelector('.main-inner')!.scrollTo(0, 0);
	}
};
