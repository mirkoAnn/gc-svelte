<script lang="ts">
	import {
		resolveRouletteDetailRouteId,
		resolveSlotDetailRouteId
	} from './../../../lib/link-resolver.ts';
	import { page } from '$app/state';
	import type { Roulette, Slot } from '$lib/types/games';
	import { resolve } from '$app/paths';
	import { appManager, CountryCodes } from '../../../lib/app-manager.svelte';
	import { m } from '../../../paraglide/messages';
	import FavouritesToggler from '../../favourites/favourites-toggler.svelte';
	import { formatImageUrl } from '$lib/utils.svelte';

	let {
		game,
		category,
		index = 0,
		eager = false,
		isOnFavouritesList = false
	}: {
		game: Slot | Roulette;
		category: 'slot' | 'roulette';
		index?: number;
		eager?: boolean;
		isOnFavouritesList?: boolean;
	} = $props();

	let imageLoaded = $state(false);

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	const gameHref = $derived.by(() => {
		switch (category) {
			case 'slot':
				return resolveSlotDetailRouteId(locale) as
					| '/it/slot-gratis/[slug]'
					| '/es/slot-gratis/[slug]';
			case 'roulette':
				// There is no roulette detail route yet, so route to localized roulette index.
				return resolveRouletteDetailRouteId(locale) as
					| '/it/roulette-gratis/[slug]'
					| '/es/ruletas-gratis/[slug]';
			default:
				return '/it/slot-gratis/[slug]';
		}
	});

	// SEO: Game schema markup
	const gameSchema = $derived.by(() => ({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: game.title,
		description: game.seo?.description,
		image: formatImageUrl(game.logo.url, 300),
		applicationCategory: 'Game',
		operatingSystem: 'Web',
		offer: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'EUR'
		}
	}));

	const gameSchemaJson = $derived.by(() => JSON.stringify(gameSchema));

	// Theme name mapping for accessibility (slug to human-readable label)
	const themeLabels: Record<string, string> = {
		paytable: 'Paytable',
		scatter: 'Scatter Symbol',
		wild: 'Wild Symbol',
		bonus: 'Bonus Feature',
		free_spins: 'Free Spins',
		progressive: 'Progressive Jackpot'
	};

	const getThemeLabel = (slug: string) => themeLabels[slug] ?? slug;
</script>

<div class="game-card" role="listitem">
	<svelte:element this={'script'} type="application/ld+json">{gameSchemaJson}</svelte:element>
	<div class="game-card-inner">
		<div class="game-img-container">
			{#if !imageLoaded}
				<div class="game-image-skeleton" aria-hidden="true" role="status" aria-live="polite"></div>
			{/if}
			<a
				href={resolve(gameHref, { slug: game.slug })}
				class="game-link"
				aria-label={m.play_game_free({ gameTitle: game.title }, { locale })}
			>
				<img
					src={formatImageUrl(game.logo.url, 200)}
					alt={m.play_game_free({ gameTitle: game.title }, { locale })}
					title={m.play_game_free({ gameTitle: game.title }, { locale })}
					class="game-image"
					class:loaded={imageLoaded}
					fetchpriority={eager ? 'high' : 'low'}
					loading={eager ? 'eager' : 'lazy'}
					width="200"
					height="200"
					decoding={index === 0 ? 'sync' : 'async'}
					crossorigin="anonymous"
					onload={() => (imageLoaded = true)}
					onerror={() => (imageLoaded = true)}
				/>
			</a>
			<div class="game-actions-container">
				<div class="game-actions-inner {isOnFavouritesList ? 'on-favourites-list' : ''}">
					<FavouritesToggler data={game} {category} {isOnFavouritesList} />
				</div>
			</div>
		</div>
		{#if category === 'slot' && 'slotThemes' in game && game.slotThemes.length > 0}
			<div class="game-themes-container" aria-label="Game features">
				<div class="game-themes-inner {isOnFavouritesList ? 'on-favourites-list' : ''}">
					{#each game.slotThemes as theme (theme.slug)}
						<svg class="game-theme-icon" aria-label={getThemeLabel(theme.slug)} role="img">
							<use href="/icons/slot-set.svg#{theme.iconId}"></use>
						</svg>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<span class="game-title">{game.title}</span>
	{#if game.provider}
		<span class="game-provider"><strong>{game.provider.title}</strong></span>
	{/if}
</div>

<style>
	.game-card {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		.game-card-inner {
			position: relative;
			.game-img-container {
				position: relative;
				width: 100%;
				height: auto;
				aspect-ratio: 1;
				overflow: hidden;
				border-radius: 10%;
				.game-actions-container {
					position: absolute;
					top: -1px;
					right: 0;
					.game-actions-inner {
						position: relative;
						background-color: var(--light-brown-900);
						border-bottom-left-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						&.on-favourites-list {
							background-color: var(--blu-800);
						}
						& :global(.action-button) {
							width: 30px;
							height: 30px;
						}
						&::before,
						&::after {
							content: '';
							position: absolute;
							width: 20px;
							height: 20px;
							background-color: inherit;
							mask-image: url('/icons/rounded-corner.svg');
							transform: rotate(270deg);
						}
						&::before {
							top: 0;
							left: -20px;
						}
						&::after {
							bottom: -20px;
							right: 0;
						}
					}
				}
			}
			.game-link {
				color: inherit;
				display: block;
				.game-image {
					width: 100%;
					height: auto;
					opacity: 0;
					transition: opacity 0.3s ease;
					&.loaded {
						opacity: 1;
					}
				}
			}
			.game-image-skeleton {
				position: absolute;
				inset: 0;
				border-radius: 10%;
				background: linear-gradient(
					90deg,
					var(--light-brown-800) 25%,
					var(--light-brown-700) 50%,
					var(--light-brown-800) 75%
				);
				background-size: 200% 100%;
				animation: shimmer 1.4s infinite linear;
			}
			.game-themes-container {
				position: absolute;
				bottom: 0;
				left: 0;
				.game-themes-inner {
					position: relative;
					background-color: var(--light-brown-900);
					border-radius: 0 0.6rem;
					padding: 4px;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 8px;
					&.on-favourites-list {
						background-color: var(--blu-800);
					}
					.game-theme-icon {
						width: 16px;
						height: 16px;
						flex-shrink: 0;
					}
					&::before,
					&::after {
						content: '';
						position: absolute;
						width: 16px;
						height: 16px;
						background-color: inherit;
						mask-image: url('/icons/rounded-corner.svg');
						transform: rotate(90deg);
					}
					&::before {
						top: -16px;
						left: 0;
					}
					&::after {
						bottom: 0;
						right: -16px;
					}
				}
			}
		}
		.game-title {
			margin: 8px 0 0 0;
			font-size: 0.8rem;
			font-weight: 600;
			text-transform: capitalize;
			line-height: 1.2;
		}
		.game-provider {
			font-size: 0.6rem;
			opacity: 0.8;
		}
	}

	@keyframes shimmer {
		from {
			background-position: 200% 0;
		}
		to {
			background-position: -200% 0;
		}
	}
</style>
