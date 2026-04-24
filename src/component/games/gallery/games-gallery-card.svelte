<script lang="ts">
	import { page } from '$app/state';
	import type { Roulette, Slot } from '$lib/types/games';
	import { resolve } from '$app/paths';
	import { appManager, CountryCodes } from '../../../lib/app-manager.svelte';
	import { m } from '../../../paraglide/messages';
	import FavouritesToggler from '../../favourites/favourites-toggler.svelte';
	import { formatImageUrl } from '$lib/utils.svelte';

	let { game, category }: { game: Slot | Roulette; category: 'slot' | 'roulette' } = $props();

	let imageLoaded = $state(false);

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<div class="game-card">
	<div class="game-card-inner">
		<div class="game-img-container">
			{#if !imageLoaded}
				<div class="game-image-skeleton"></div>
			{/if}
			<a href={resolve(`/${locale}/${category}/[slug]`, { slug: game.slug })} class="game-link">
				<img
					src={formatImageUrl(game.logo.url, 200)}
					alt={m.play_game_free({ gameTitle: game.title }, { locale })}
					title={m.play_game_free({ gameTitle: game.title }, { locale })}
					class="game-image"
					class:loaded={imageLoaded}
					loading="lazy"
					width="300"
					height="300"
					decoding="async"
					onload={() => (imageLoaded = true)}
				/>
			</a>
			<div class="game-actions-container">
				<div class="game-actions-inner">
					<FavouritesToggler data={game} {category} />
				</div>
			</div>
		</div>
		{#if category === 'slot' && (game as Slot).slotThemes.length > 0}
			<div class="game-themes-container">
				<div class="game-themes-inner">
					{#each (game as Slot).slotThemes as theme (theme.slug)}
						<svg class="game-theme-icon">
							<use href="/icons/slot-set.svg#{theme.iconId}"></use>
						</svg>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<span class="game-title">{game.title}</span>
	{#if game.provider}
		<span class="game-provider">{game.provider.title}</span>
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
				bottom: -0;
				left: 0;
				.game-themes-inner {
					position: relative;
					background-color: var(--light-brown-900);
					color: var(--blu-900);
					border-radius: 0 0.6rem;
					padding: 4px;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 8px;
					.game-theme-icon {
						width: 16px;
						height: 16px;
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
		}
		.game-provider {
			font-size: 0.6rem;
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
