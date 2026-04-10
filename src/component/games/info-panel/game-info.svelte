<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { appManager } from '$lib/app-manager.svelte';
	import type { Game } from '$lib/types/games';
	import gsap from 'gsap/dist/gsap';
	import { m } from '../../../paraglide/messages';

	let { game }: { game: Game } = $props();

	const locale = $derived(appManager.getCountryCode());

	const formatCurrency = (value: string) => {
		return parseFloat(value).toLocaleString(appManager.getCountryLangCode(), {
			style: 'currency',
			currency: appManager.getCurrencyCode()
		});
	};

	afterNavigate(async () => {
		const scrollTrigger = await import('gsap/dist/ScrollTrigger');
		gsap.registerPlugin(scrollTrigger);

		gsap.to('.game-rtp-value', {
			scrollTrigger: {
				scroller: '.main-inner',
				trigger: '.game-info-rtp',
				start: 'top 80%'
			},
			innerText: game.info.rtp + '%' || 0,
			duration: 1,
			snap: {
				innerText: 0.01
			}
		});
	});
</script>

<div class="content game-info-panel">
	<h2 class="game-info-title">{m.usefull_info_title({ title: game.title }, { locale })}</h2>
	<div class="game-info-outer-container">
		<img class="game-info-logo" src={game.logo.url} alt={`${game.title} Logo`} />
		<div class="game-info-inner-container">
			<ul class="game-info-top-list">
				<li class="game-info">
					<span class="game-info-label game-info-rtp">{m.game_rtp({ locale })}</span>
					<span class="game-info-value game-rtp-value">0</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_volatility({ locale })}</span>
					<span class="game-info-value game-volatility-value">{game.info.volatility}</span>
				</li>
			</ul>
			<ul class="game-info-list">
				<li class="game-info">
					<span class="game-info-label">{m.game_reels({ locale })}: </span>
					<span class="game-info-value">{game.info.reels}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_paylines({ locale })}: </span>
					<span class="game-info-value">{game.info.paylines}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_bet_min({ locale })}: </span>
					<span class="game-info-value">{formatCurrency(game.info.betMin)}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_bet_max({ locale })}: </span>
					<span class="game-info-value">{formatCurrency(game.info.betMax)}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_win_min({ locale })}: </span>
					<span class="game-info-value">{formatCurrency(game.info.winMin)}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_win_max({ locale })}: </span>
					<span class="game-info-value">{formatCurrency(game.info.winMax)}</span>
				</li>
			</ul>
			<div class="game-bonus-list">
				<h3 class="game-info-subtitle">{m.game_bonus_section_title({ locale })}</h3>
				<div class="game-bonus-list-icons">
					<div class="game-bonus">
						<svg class="bonus-icon">
							<use href="/icons/icon-set.svg#bonus"></use>
						</svg>
						<svg class={game.info.hasBonusGame ? 'check-icon' : 'no-check-icon'}
							><use
								href={game.info.hasBonusGame
									? '/icons/icon-set.svg#check'
									: '/icons/icon-set.svg#no-check'}
							></use></svg
						>
						<span class="bonus-text">{m.game_has_bonus_game({ locale })}</span>
					</div>
					<div class="game-bonus">
						<svg class="bonus-icon" viewBox="0 0 64 64">
							<use href="/icons/icon-set.svg#freespins"></use>
						</svg>
						<svg class={game.info.hasFreeSpins ? 'check-icon' : 'no-check-icon'}
							><use
								href={game.info.hasFreeSpins
									? '/icons/icon-set.svg#check'
									: '/icons/icon-set.svg#no-check'}
							></use></svg
						>
						<span class="bonus-text">{m.game_has_free_spins({ locale })}</span>
					</div>
					<div class="game-bonus">
						<svg class="bonus-icon">
							<use href="/icons/icon-set.svg#jackpot"></use>
						</svg>
						<svg class={game.info.hasJackpot ? 'check-icon' : 'no-check-icon'}
							><use
								href={game.info.hasJackpot
									? '/icons/icon-set.svg#check'
									: '/icons/icon-set.svg#no-check'}
							></use></svg
						><span class="bonus-text">{m.game_has_jackpot({ locale })}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.game-info-panel {
		width: 100%;
		margin-top: 200px;
		color: var(--blu-800);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		.game-info-title {
			font-size: 2rem;
			text-align: center;
		}
		.game-info-outer-container {
			width: 80%;
			display: flex;
			align-items: center;
			gap: 100px;
			.game-info-logo {
				max-width: 400px;
				object-fit: contain;
				border-radius: 16px;
			}
			.game-info-inner-container {
				flex: 1;
				max-width: 500px;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 24px;
				.game-info-top-list {
					width: 100%;
					display: flex;
					justify-content: space-between;
					.game-info {
						display: flex;
						flex-direction: column;
						align-items: center;
						.game-info-label {
							color: var(--blu-800);
							font-weight: bold;
							font-size: 0.9rem;
						}
						.game-info-value {
							font-family: 'Funnel Display', sans-serif;
							font-size: 2rem;
							font-weight: bold;
							color: var(--blu-600);
						}
					}
				}
				.game-info-list {
					width: 100%;
					list-style: none;
					padding: 0;
					margin: 0;
					display: flex;
					flex-direction: column;
					gap: 8px;
					.game-info {
						display: flex;
						align-items: center;
						.game-info-label {
							color: var(--blu-800);
						}
						.game-info-value {
							font-family: 'Funnel Display', sans-serif;
							font-weight: bold;
							color: var(--blu-600);
							margin-left: auto;
						}
					}
				}
			}
			.game-bonus-list {
				width: 100%;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 8px;
				.game-bonus-list-icons {
					width: 100%;
					display: flex;
					justify-content: space-between;
					gap: 24px;
					margin-top: 12px;
					.game-bonus {
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 8px;
						.bonus-text {
							font-size: 1rem;
							font-weight: 500;
						}
					}
					.bonus-icon {
						width: 100px;
						height: 100px;
						fill: var(--blu-500);
					}
					.check-icon,
					.no-check-icon {
						width: 24px;
						height: 24px;
						position: absolute;
						bottom: 32px;
						right: 8px;
						border-radius: 50%;
						padding: 4px;
						fill: var(--light-brown-900);
					}
					.check-icon {
						background-color: var(--green-600);
					}
					.no-check-icon {
						background-color: var(--red-900);
					}
				}
			}
		}
		@media (max-width: 767px) {
			.game-info-outer-container {
				flex-direction: column;
			}
		}
	}
</style>
