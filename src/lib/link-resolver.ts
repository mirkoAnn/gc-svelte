import { CountryCodes } from '$lib/app-manager.svelte';
import type { RouteId } from '$app/types';

type LocaleRouteConfig = {
	casinosBase: string;
	casinosNewSegment: string;
	rouletteBase: string;
	rouletteDetailBase: string;
	rouletteNewSegment: string;
	roulettePopularSegment: string;
	rouletteEuropeanSegment: string;
	rouletteAmericanSegment: string;
	rouletteFrenchSegment: string;
	rouletteLiveSegment: string;
	slotMechanicsPrefix: string;
	slotNewSegment: string;
	slotPopularSegment: string;
};

const LOCALE_ROUTE_CONFIG: Record<CountryCodes, LocaleRouteConfig> = {
	[CountryCodes.it]: {
		casinosBase: 'casino-online',
		casinosNewSegment: 'casino-nuovi',
		rouletteBase: 'roulette-gratis',
		rouletteDetailBase: 'roulette-gratis',
		rouletteNewSegment: 'roulette-nuove',
		roulettePopularSegment: 'roulette-piu-giocate',
		rouletteEuropeanSegment: 'roulette-europea',
		rouletteAmericanSegment: 'roulette-americana',
		rouletteFrenchSegment: 'roulette-francese',
		rouletteLiveSegment: 'roulette-live',
		slotMechanicsPrefix: 'regole-',
		slotNewSegment: 'slot-nuove',
		slotPopularSegment: 'slot-piu-giocate'
	},
	[CountryCodes.es]: {
		casinosBase: 'casinos-online',
		casinosNewSegment: 'casinos-nuevos',
		rouletteBase: 'ruletas-gratis',
		rouletteDetailBase: 'ruletas-gratis',
		rouletteNewSegment: 'ruletas-nuevas',
		roulettePopularSegment: 'ruletas-mas-jugadas',
		rouletteEuropeanSegment: 'ruletas-europea',
		rouletteAmericanSegment: 'ruletas-americana',
		rouletteFrenchSegment: 'ruletas-francesa',
		rouletteLiveSegment: 'ruletas-en-vivo',
		slotMechanicsPrefix: 'reglas-',
		slotNewSegment: 'slot-nuevas',
		slotPopularSegment: 'slot-mas-jugadas'
	}
};

type RouletteCategory = 'new' | 'european' | 'american' | 'french';

export const getLocaleRouteConfig = (locale: CountryCodes): LocaleRouteConfig => {
	return LOCALE_ROUTE_CONFIG[locale];
};

export const resolveCasinoIndexPath = (locale: CountryCodes): RouteId => {
	const { casinosBase } = getLocaleRouteConfig(locale);
	return `/${locale}/${casinosBase}` as RouteId;
};

export const resolveNewCasinoPath = (locale: CountryCodes): RouteId => {
	const { casinosNewSegment } = getLocaleRouteConfig(locale);
	return `${resolveCasinoIndexPath(locale)}/${casinosNewSegment}` as RouteId;
};

export const resolveCasinoDetailPath = (locale: CountryCodes, slug: string): string => {
	return `${resolveCasinoIndexPath(locale)}/${slug}`;
};

export const resolveCasinoDetailRouteId = (locale: CountryCodes): RouteId => {
	return `${resolveCasinoIndexPath(locale)}/[slug]` as RouteId;
};

export const resolveRouletteIndexPath = (locale: CountryCodes): RouteId => {
	const { rouletteBase } = getLocaleRouteConfig(locale);
	return `/${locale}/${rouletteBase}` as RouteId;
};

export const resolveRouletteDetailRouteId = (locale: CountryCodes): RouteId => {
	const { rouletteDetailBase } = getLocaleRouteConfig(locale);
	return `/${locale}/${rouletteDetailBase}/[slug]` as RouteId;
};

export const resolveRouletteDetailPath = (locale: CountryCodes, slug: string): string => {
	const { rouletteDetailBase } = getLocaleRouteConfig(locale);
	return `/${locale}/${rouletteDetailBase}/${slug}`;
};

export const resolveRouletteNewPath = (locale: CountryCodes): RouteId => {
	const { rouletteNewSegment } = getLocaleRouteConfig(locale);
	return `${resolveRouletteIndexPath(locale)}/${rouletteNewSegment}` as RouteId;
};

export const resolveRoulettePopularPath = (locale: CountryCodes): RouteId => {
	const { roulettePopularSegment } = getLocaleRouteConfig(locale);
	return `${resolveRouletteIndexPath(locale)}/${roulettePopularSegment}` as RouteId;
};

export const resolveRouletteLivePath = (locale: CountryCodes): RouteId => {
	const { rouletteLiveSegment } = getLocaleRouteConfig(locale);
	return `${resolveRouletteIndexPath(locale)}/${rouletteLiveSegment}` as RouteId;
};

export const resolveProvidersIndexPath = (locale: CountryCodes): RouteId => {
	return `/${locale}/providers` as RouteId;
};

export const resolveProviderDetailRouteId = (locale: CountryCodes): RouteId => {
	return `${resolveProvidersIndexPath(locale)}/[slug]` as RouteId;
};

export const resolveSlotGratisIndexPath = (locale: CountryCodes): RouteId => {
	return `/${locale}/slot-gratis` as RouteId;
};

export const resolveSlotDetailRouteId = (locale: CountryCodes): RouteId => {
	return `/${locale}/slot-gratis/[slug]` as RouteId;
};

export const resolveSlotThemeDetailRouteId = (locale: CountryCodes): RouteId => {
	return `${resolveSlotGratisIndexPath(locale)}/slot-[slug]` as RouteId;
};

export const resolveSlotMechanicsDetailRouteId = (locale: CountryCodes): RouteId => {
	return resolveSlotMechanicsDetailPath(locale, '[slug]') as RouteId;
};

export const resolveSlotNewPath = (locale: CountryCodes): RouteId => {
	const { slotNewSegment } = getLocaleRouteConfig(locale);
	return `${resolveSlotGratisIndexPath(locale)}/${slotNewSegment}` as RouteId;
};

export const resolveSlotPopularPath = (locale: CountryCodes): RouteId => {
	const { slotPopularSegment } = getLocaleRouteConfig(locale);
	return `${resolveSlotGratisIndexPath(locale)}/${slotPopularSegment}` as RouteId;
};

export const resolveRouletteCategoryPath = (
	locale: CountryCodes,
	category: RouletteCategory
): string => {
	const {
		rouletteNewSegment,
		rouletteEuropeanSegment,
		rouletteAmericanSegment,
		rouletteFrenchSegment
	} = getLocaleRouteConfig(locale);

	const segmentByCategory: Record<RouletteCategory, string> = {
		new: rouletteNewSegment,
		european: rouletteEuropeanSegment,
		american: rouletteAmericanSegment,
		french: rouletteFrenchSegment
	};

	return `${resolveRouletteIndexPath(locale)}/${segmentByCategory[category]}`;
};

export const resolveSlotMechanicsDetailPath = (locale: CountryCodes, slug: string): string => {
	const { slotMechanicsPrefix } = getLocaleRouteConfig(locale);
	return `/${locale}/slot-gratis/${slotMechanicsPrefix}${slug}`;
};

export const resolveGameHref = (
	locale: CountryCodes,
	gameSlug: string,
	gameType: 'roulette' | 'slot'
): string => {
	switch (gameType) {
		case 'roulette':
			return resolveSlotMechanicsDetailRouteId(locale);
		case 'slot':
			return resolveSlotDetailRouteId(locale);
		default:
			return '#';
	}
};
