import type { Filter, FilterCategory, FilterList } from '$lib/types/filters';
import type { Roulette, Slot } from '$lib/types/games';
import { workersManager } from '$lib/workers-manager.svelte';
import gsap from 'gsap/dist/gsap';

const gamesBatchSize = 20;

// ─── Game lists ───────────────────────────────────────────────────────────────

let initialGames: Slot[] | Roulette[] = $state([]);
let games: Slot[] | Roulette[] = $state([]);
let preloadedGames: Slot[] | Roulette[] = $state([]);
let isLoadingGames: boolean = $state(false);

const areMoreGamesAvailable = $derived.by(() => preloadedGames.length > 0);

const dedupeGamesById = (source: Slot[] | Roulette[]) => {
	const seenIds: Record<string, true> = {};
	return source.filter((game: Slot | Roulette) => {
		if (seenIds[game.id]) return false;
		seenIds[game.id] = true;
		return true;
	});
};

// ─── Filters ──────────────────────────────────────────────────────────────────

// Available filter definitions for the current page (shown in the filter panel).
let filters: FilterList = $state({ type: '', categories: [] });

// The "default" filter state for the current page — restored on clear.
// Uses cloneFilterList so mutations to currentlyAppliedFilters never corrupt it.
let initialAppliedFilters: FilterList = $state({ type: '', categories: [] });

// The live filter state that drives worker queries and active-state highlights.
let currentlyAppliedFilters: FilterList = $state({ type: '', categories: [] });

// Derived: true when currentlyAppliedFilters differs from the page baseline.
const areFiltersInUse = $derived.by(() => {
	return currentlyAppliedFilters.categories.some((cat: FilterCategory) => {
		const initial = initialAppliedFilters.categories.find(
			(ic: FilterCategory) => ic.name === cat.name
		);
		if (!initial) return cat.filters.length > 0;
		if (cat.filters.length !== initial.filters.length) return true;
		return cat.filters.some(
			(f: Filter) => !initial.filters.some((iF: Filter) => iF.value === f.value)
		);
	});
});

// ─── UI state ─────────────────────────────────────────────────────────────────

let areFiltersVisible: boolean = $state(false);
let currentVisibleFilter: string = $state('');
let currentGamesPage: number = 2;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const setGamesBatch = (source: Slot[] | Roulette[]) => {
	const uniqueSource = dedupeGamesById(source);
	if (uniqueSource.length > gamesBatchSize) {
		games = uniqueSource.slice(0, gamesBatchSize);
		preloadedGames = uniqueSource.slice(gamesBatchSize);
	} else {
		games = uniqueSource;
		preloadedGames = [];
	}
};

const cloneFilterList = (filterList: FilterList): FilterList => ({
	type: filterList.type,
	categories: filterList.categories.map((category: FilterCategory) => ({
		name: category.name,
		label: category.label,
		filters: category.filters.map((filter: Filter) => ({
			title: filter.title,
			value: filter.value
		}))
	}))
});

type SlugFilterSource = { title: string; slug: string };
type ValueFilterSource = { title: string; value: string };

type GameCategoryConfig = {
	name: string;
	label: string;
	source: SlugFilterSource[] | ValueFilterSource[];
	initialLabel?: string;
	initialFilters?: Array<{ title?: string; value: string }>;
};

type TypedGalleryInitOptions = {
	gameType: string;
	initialGamesData: Slot[] | Roulette[];
	categories: GameCategoryConfig[];
};

type SlotGalleryInitOptions = {
	initialGamesData: Slot[] | Roulette[];
	slotThemes: SlugFilterSource[];
	providers: SlugFilterSource[];
	providerLabel: string;
	orderByLabel: string;
	orderByOptions: Array<{ title: string; value: string }>;
	defaultOrderByValue: string;
	defaultOrderByTitle?: string;
};

type RouletteGalleryInitOptions = {
	initialGamesData: Slot[] | Roulette[];
	rouletteMechanics: SlugFilterSource[];
	providers: SlugFilterSource[];
	rouletteMechanicsLabel: string;
	providerLabel: string;
	initialRouletteMechanicsLabel?: string;
	initialProviderLabel?: string;
};

type MultiGameGalleryInitOptions =
	| TypedGalleryInitOptions
	| (SlotGalleryInitOptions & { gameType?: 'slot' })
	| (RouletteGalleryInitOptions & { gameType?: 'roulette' });

const mapFiltersSource = (
	source: SlugFilterSource[] | ValueFilterSource[]
): Array<{ title: string; value: string }> => {
	return source.map((item: SlugFilterSource | ValueFilterSource) => {
		if ('slug' in item) {
			return { title: item.title, value: item.slug };
		}
		return { title: item.title, value: item.value };
	});
};

// ─── Normalization ─────────────────────────────────────────────────────────────
const normalizeTypedGalleryOptions = (
	options: MultiGameGalleryInitOptions
): TypedGalleryInitOptions => {
	if ('categories' in options) {
		return options;
	}
	// The presence of slotThemes is a bit of a hacky way to discriminate between the two types, but it works for now and keeps the public API simpler.
	if ('slotThemes' in options) {
		const slotOptions = options as SlotGalleryInitOptions;
		return {
			gameType: 'slot',
			initialGamesData: slotOptions.initialGamesData,
			categories: [
				{ name: 'slotThemes', label: 'Tema', source: slotOptions.slotThemes, initialFilters: [] },
				{
					name: 'providers',
					label: slotOptions.providerLabel,
					source: slotOptions.providers,
					initialFilters: []
				},
				{
					name: 'orderBy',
					label: slotOptions.orderByLabel,
					source: slotOptions.orderByOptions,
					initialFilters: [
						slotOptions.defaultOrderByTitle
							? {
									title: slotOptions.defaultOrderByTitle,
									value: slotOptions.defaultOrderByValue
								}
							: { value: slotOptions.defaultOrderByValue }
					]
				}
			]
		};
	}

	const rouletteOptions = options as RouletteGalleryInitOptions;
	return {
		gameType: 'roulette',
		initialGamesData: rouletteOptions.initialGamesData,
		categories: [
			{
				name: 'rouletteMechanics',
				label: rouletteOptions.rouletteMechanicsLabel,
				initialLabel: rouletteOptions.initialRouletteMechanicsLabel,
				source: rouletteOptions.rouletteMechanics,
				initialFilters: []
			},
			{
				name: 'providers',
				label: rouletteOptions.providerLabel,
				initialLabel: rouletteOptions.initialProviderLabel,
				source: rouletteOptions.providers,
				initialFilters: []
			}
		]
	};
};

const toggleSubGalleriesCategories = () => {
	const gamesCarousels = document.querySelector('.game-categories');
	if (gamesCarousels) {
		gsap.timeline().to(gamesCarousels, { autoAlpha: areFiltersInUse ? 0 : 1 });
	}
};

// ─── Public API ───────────────────────────────────────────────────────────────

export const gamesGalleryManager = {
	initTypedGalleryData: (rawOptions: MultiGameGalleryInitOptions) => {
		const { gameType, initialGamesData, categories } = normalizeTypedGalleryOptions(rawOptions);
		gamesGalleryManager.initGalleryData(
			initialGamesData,
			{
				type: gameType,
				categories: categories.map((category: GameCategoryConfig) => ({
					name: category.name,
					label: category.label,
					filters: mapFiltersSource(category.source)
				}))
			},
			{
				type: gameType,
				categories: categories.map((category: GameCategoryConfig) => ({
					name: category.name,
					label: category.initialLabel ?? category.label,
					filters: category.initialFilters ?? []
				}))
			}
		);
	},

	// Called on every page load / navigation. Resets all state so the freshly
	// mounted GSAP animation (always at position 0) stays in sync.
	initGalleryData: (
		initialGamesData: Slot[] | Roulette[],
		categoryFilters: FilterList,
		newInitialAppliedFilters: FilterList
	) => {
		// Reset transient UI state on every page transition.
		areFiltersVisible = false;
		currentVisibleFilter = '';
		currentGamesPage = 2;

		initialGames = dedupeGamesById(initialGamesData);
		setGamesBatch(initialGames);

		// Always overwrite — navigating between pages of the same type (e.g.
		// slot → slot-categoria) still needs fresh filter category definitions.
		filters = categoryFilters;

		initialAppliedFilters = cloneFilterList(newInitialAppliedFilters);
		currentlyAppliedFilters = cloneFilterList(initialAppliedFilters);
	},

	getGames: () => games,

	updatePreloadedGames: (newGames: Slot[] | Roulette[]) => {
		preloadedGames = dedupeGamesById(newGames);
		isLoadingGames = false;
	},

	updateGames: (newGames: Slot[] | Roulette[]) => {
		setGamesBatch(newGames);
		currentGamesPage = 2;
		isLoadingGames = false;
	},

	loadMoreGames: (countryCode: string) => {
		if (!areMoreGamesAvailable) return;
		games = dedupeGamesById([...games, ...preloadedGames]);
		preloadedGames = [];
		currentGamesPage++;
		workersManager.fetchGamesAsync(currentlyAppliedFilters, currentGamesPage, countryCode);
	},

	getFilters: () => filters,

	toggleFilters: () => {
		areFiltersVisible = !areFiltersVisible;
	},

	areFiltersVisible: () => areFiltersVisible,
	areFiltersInUse: () => areFiltersInUse,
	isLoadingGames: () => isLoadingGames,
	areMoreGamesAvailable: () => areMoreGamesAvailable,

	setCurrentVisibleFilter: (filterName: string) => {
		currentVisibleFilter = currentVisibleFilter === filterName ? '' : filterName;
	},

	getCurrentVisibleFilter: () => currentVisibleFilter,

	applyFilter: (filter: { category: string; value: string }, countryCode: string) => {
		const currentFilterCategory = currentlyAppliedFilters.categories.find(
			(c: FilterCategory) => c.name === filter.category
		);

		if (!currentFilterCategory) {
			console.error('Error applying filter, category not found in currently applied filters');
			return;
		}

		if (currentFilterCategory.name === 'orderBy') {
			// Only one sort option at a time — replace the previous value.
			currentFilterCategory.filters = [{ value: filter.value }];
		} else if (currentFilterCategory.filters.some((f: Filter) => f.value === filter.value)) {
			// Toggle off: remove if already applied.
			currentFilterCategory.filters = currentFilterCategory.filters.filter(
				(f: Filter) => f.value !== filter.value
			);
		} else {
			currentFilterCategory.filters = [...currentFilterCategory.filters, { value: filter.value }];
		}

		// areFiltersInUse is now $derived, so it reflects the new state immediately.
		if (!areFiltersInUse) {
			// All filters back to baseline — restore initial games without a round-trip.
			gamesGalleryManager.clearCurrentlyAppliedFilters();
		} else {
			games = []; // show loading indicator while filtered results arrive
			currentGamesPage = 1;
			isLoadingGames = true;
			workersManager.fetchGamesAsync(currentlyAppliedFilters, currentGamesPage, countryCode);
			toggleSubGalleriesCategories();
		}
	},

	getCurrentlyAppliedFilters: () => currentlyAppliedFilters,

	clearCurrentlyAppliedFilters: () => {
		currentlyAppliedFilters = cloneFilterList(initialAppliedFilters);
		setGamesBatch(initialGames);
		currentGamesPage = 2;
		// areFiltersInUse is now false (derived), so toggleSubGalleriesCategories
		// will correctly show the carousels again.
		toggleSubGalleriesCategories();
	},

	isThisFilterCurrentlyApplied: (category: string, value: string) => {
		return currentlyAppliedFilters.categories.some((c: FilterCategory) => {
			if (c.name === category) {
				return c.filters.some((f: Filter) => f.value === value);
			}
		});
	}
};
