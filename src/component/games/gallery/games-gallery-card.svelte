<script lang="ts">
	import type { Game } from '$lib/types/games';
	import { appManager } from '../../../lib/app-manager.svelte';
	import { m } from '../../../paraglide/messages';
	import FavouritesToggler from '../../favourites/favourites-toggler.svelte';

	let { game, category }: { game: Game; category: string } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

<div class="game-card">
	<div class="game-card-inner">
		<div class="game-img-container">
			<a href={`/${locale}/${category}/${game.slug}`} class="game-link">
				<img
					src={game.logo.url}
					alt={m.play_game_free({ gameTitle: game.title }, { locale })}
					title={m.play_game_free({ gameTitle: game.title }, { locale })}
					class="game-image"
					loading="lazy"
					width="300"
					height="300"
					onerror={(event: Event) => {
						const img = event.currentTarget;
						if (img instanceof HTMLImageElement) {
							img.onerror = null; // Prevent infinite loop if fallback image also fails
							img.src = '/icons/icon-set.svg#slot';
						}
					}}
				/>
			</a>
			<div class="game-actions-container">
				<div class="game-actions-inner">
					<FavouritesToggler data={game} {category} />
				</div>
			</div>
		</div>
		{#if game.slotThemes.length > 0}
			<div class="game-themes-container">
				<div class="game-themes-inner">
					{#each game.slotThemes as theme (theme.slug)}
						<svg class="game-theme-icon">
							<use href="/icons/slot-set.svg#{theme.slug}"></use>
						</svg>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<span class="game-title">{game.title}</span>
	<span class="game-provider">{game.provider.title}</span>
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
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: var(--light-brown-900-opacity-100);
					pointer-events: none;
				}
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
				}
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
</style>
