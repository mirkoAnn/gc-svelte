import gsap from 'gsap/dist/gsap';

export enum CountryCodes {
	it = 'it',
	es = 'es'
}

const ROUTABLE_COUNTRIES: CountryCodes[] = [CountryCodes.it];

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
	return baseValue in CountryCodes
		? CountryCodes[baseValue as keyof typeof CountryCodes]
		: undefined;
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

const replaceCountryPrefix = (
	pathname: string,
	currentCountry: CountryCodes,
	targetCountry: CountryCodes
): string | undefined => {
	const currentPrefix = `/${currentCountry}`;
	if (!pathname.startsWith(currentPrefix)) {
		return undefined;
	}

	const nextCharacter = pathname.charAt(currentPrefix.length);
	if (nextCharacter && nextCharacter !== '/') {
		return undefined;
	}

	const suffix = pathname.slice(currentPrefix.length);
	return `/${targetCountry}${suffix}`;
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

		return CountryCodes.it;
	},
	canRouteToCountry: (code: CountryCodes) => {
		return ROUTABLE_COUNTRIES.includes(code);
	},
	getCountryRedirectPath: (request: Request, currentCountry: CountryCodes) => {
		const targetCountry = appManager.fetchCountryCode(request);
		if (targetCountry === currentCountry || !appManager.canRouteToCountry(targetCountry)) {
			return undefined;
		}

		return replaceCountryPrefix(extractPathname(request.url), currentCountry, targetCountry);
	},
	getCountryCode: () => {
		return countryCode;
	},
	getCountryName: () => {
		switch (countryCode) {
			case CountryCodes.it:
				return 'Italia';
			case CountryCodes.es:
				return 'España';
			default:
				return '';
		}
	},
	getCountryLangCode: (country?: CountryCodes) => {
		switch (country ?? countryCode) {
			case CountryCodes.it:
				return 'it-IT';
			case CountryCodes.es:
				return 'es-ES';
			default:
				return '';
		}
	},
	getCurrencyCode: (country?: CountryCodes) => {
		switch (country ?? countryCode) {
			case CountryCodes.it:
			case CountryCodes.es:
				return 'EUR';
			default:
				return '';
		}
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
