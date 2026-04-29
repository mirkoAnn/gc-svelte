import { CountryCodes } from '$lib/app-manager.svelte';
import { m } from '../../../paraglide/messages';

type AvailableLocale = `${CountryCodes}`;

/**
 * Extended 9-option order-by list used in the main slot-gratis gallery page.
 * Includes RTP, volatility, and release date (asc/desc) options.
 */
export const getSlotOrderByOptions = (locale: AvailableLocale) => [
	{ title: m.game_filter_name_az({}, { locale }), value: 'title:asc' },
	{ title: m.game_filter_name_za({}, { locale }), value: 'title:desc' },
	{ title: m.game_filter_release_date_new_old({}, { locale }), value: 'createdAt:desc' },
	{ title: m.game_filter_release_date_old_new({}, { locale }), value: 'createdAt:asc' },
	{ title: m.game_filter_rtp_high_low({}, { locale }), value: 'rtp:desc' },
	{ title: m.game_filter_rtp_low_high({}, { locale }), value: 'rtp:asc' },
	{ title: m.game_filter_volatility_low_high({}, { locale }), value: 'volatility:asc' },
	{ title: m.game_filter_volatility_high_low({}, { locale }), value: 'volatility:desc' },
	{ title: m.game_filter_most_played({}, { locale }), value: 'sessions:desc' }
];

export const getRouletteOrderByOptions = (locale: AvailableLocale) => [
	{ title: m.game_filter_name_az({}, { locale }), value: 'title:asc' },
	{ title: m.game_filter_name_za({}, { locale }), value: 'title:desc' },
	{ title: m.game_filter_release_date_new_old({}, { locale }), value: 'createdAt:desc' },
	{ title: m.game_filter_release_date_old_new({}, { locale }), value: 'createdAt:asc' },
	{ title: m.game_filter_rtp_high_low({}, { locale }), value: 'rtp:desc' },
	{ title: m.game_filter_rtp_low_high({}, { locale }), value: 'rtp:asc' },
	{ title: m.game_filter_most_played({}, { locale }), value: 'sessions:desc' }
];
