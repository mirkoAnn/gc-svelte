<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type { Slot } from '$lib/types/games';
	import gsap from 'gsap/dist/gsap';
	import { m } from '../../../paraglide/messages';
	import { formatCurrency, formatImageUrl } from '$lib/utils.svelte';

	let { game }: { game: Slot } = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	let hasAnimatedRtp = false;

	const setupRtpAnimation = async () => {
		await tick(); // Ensure DOM is updated before querying elements

		const { default: ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const rtpEl = document.querySelector<HTMLElement>('.game-rtp-value');
		const triggerEl = document.querySelector<HTMLElement>('.game-info-rtp');
		if (!rtpEl || !triggerEl) return;

		gsap.killTweensOf(rtpEl);
		ScrollTrigger.getAll().forEach((trigger) => {
			if (trigger.vars.trigger === triggerEl) trigger.kill();
		});

		rtpEl.textContent = '0%';
		const counter = { value: 0 };
		const target = Number(game.info.rtp) || 0;

		const scrollerEl = document.querySelector<HTMLElement>('.main-inner');
		const scrollerBottom = scrollerEl?.getBoundingClientRect().bottom ?? window.innerHeight;

		const rtpTween = gsap.to(counter, {
			value: target,
			duration: 1,
			ease: 'power2.out',
			paused: true,
			scrollTrigger: {
				scroller: scrollerEl ?? undefined,
				trigger: triggerEl,
				start: 'top 80%',
				toggleActions: 'play none none none',
				onEnter: () => {
					hasAnimatedRtp = true;
					rtpTween.play();
				}
			},
			onUpdate: () => {
				rtpEl.textContent = `${counter.value.toFixed(2)}%`;
			},
			onComplete: () => {
				rtpEl.textContent = `${target}%`;
			}
		});

		if (!hasAnimatedRtp) {
			if (triggerEl.getBoundingClientRect().top < scrollerBottom * 0.8) {
				hasAnimatedRtp = true;
				rtpTween.play();
			}
		}
	};

	onMount(() => {
		setupRtpAnimation();
	});

	afterNavigate(() => {
		hasAnimatedRtp = false;
		setupRtpAnimation();
	});
</script>

<div class="content game-info-panel">
	<h2 class="game-info-title">{m.usefull_info_title({ title: game.title }, { locale })}</h2>
	<div class="game-info-outer-container">
		<img
			class="game-info-logo"
			src={formatImageUrl(game.logo.url, 400)}
			alt={`${game.title} Logo`}
			loading="lazy"
			decoding="async"
			width="400"
			height="400"
			crossorigin="anonymous"
		/>
		<div class="game-info-inner-container">
			<ul class="game-info-top-list">
				<li class="game-info">
					<span class="game-info-label game-info-rtp">{m.game_rtp({}, { locale })}</span>
					<span class="game-info-value game-rtp-value">0</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_volatility({}, { locale })}</span>
					<span class="game-info-value game-volatility-value">{game.info.volatility}</span>
				</li>
			</ul>
			<ul class="game-info-list">
				<li class="game-info">
					<span class="game-info-label">{m.game_release_year({}, { locale })}: </span>
					<span class="game-info-value">{game.info.releaseYear}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_reels({}, { locale })}: </span>
					<span class="game-info-value">{game.info.reels}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_paylines({}, { locale })}: </span>
					<span class="game-info-value">{game.info.paylines}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_bet_min({}, { locale })}: </span>
					<span class="game-info-value">{formatCurrency(game.info.betMin, locale)}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_bet_max({}, { locale })}: </span>
					<span class="game-info-value">{formatCurrency(game.info.betMax, locale)}</span>
				</li>
				<li class="game-info">
					<span class="game-info-label">{m.game_win_max({}, { locale })}: </span>
					<span class="game-info-value">{formatCurrency(game.info.winMax, locale)}</span>
				</li>
			</ul>
			<div class="game-bonus-list">
				<h3 class="game-info-subtitle">{m.game_bonus_section_title({}, { locale })}</h3>
				<div class="game-bonus-list-icons">
					<div
						class="game-bonus"
						aria-label="{m.game_has_bonus_game({}, { locale })}: {game.info.hasBonusGame
							? m.yes({}, { locale })
							: m.no({}, { locale })}"
					>
						<svg class="bonus-icon" aria-hidden="true">
							<use href="/icons/icon-set.svg#bonus"></use>
						</svg>
						<svg class={game.info.hasBonusGame ? 'check-icon' : 'no-check-icon'} aria-hidden="true"
							><use
								href={game.info.hasBonusGame
									? '/icons/icon-set.svg#check'
									: '/icons/icon-set.svg#no-check'}
							></use></svg
						>
						<span class="bonus-text" aria-hidden="true"
							>{m.game_has_bonus_game({}, { locale })}</span
						>
					</div>
					<div
						class="game-bonus"
						aria-label="{m.game_has_free_spins({}, { locale })}: {game.info.hasFreeSpins
							? m.yes({}, { locale })
							: m.no({}, { locale })}"
					>
						<svg class="bonus-icon" viewBox="0 0 64 64" aria-hidden="true">
							<use href="/icons/icon-set.svg#freespins"></use>
						</svg>
						<svg class={game.info.hasFreeSpins ? 'check-icon' : 'no-check-icon'} aria-hidden="true"
							><use
								href={game.info.hasFreeSpins
									? '/icons/icon-set.svg#check'
									: '/icons/icon-set.svg#no-check'}
							></use></svg
						>
						<span class="bonus-text" aria-hidden="true"
							>{m.game_has_free_spins({}, { locale })}</span
						>
					</div>
					<div
						class="game-bonus"
						aria-label="{m.game_has_jackpot({}, { locale })}: {game.info.hasJackpot
							? m.yes({}, { locale })
							: m.no({}, { locale })}"
					>
						<svg class="bonus-icon" aria-hidden="true">
							<use href="/icons/icon-set.svg#jackpot"></use>
						</svg>
						<svg class={game.info.hasJackpot ? 'check-icon' : 'no-check-icon'} aria-hidden="true"
							><use
								href={game.info.hasJackpot
									? '/icons/icon-set.svg#check'
									: '/icons/icon-set.svg#no-check'}
							></use></svg
						><span class="bonus-text">{m.game_has_jackpot({}, { locale })}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.game-info-panel {
		width: 100%;
		max-width: 1100px;
		margin: 120px auto 0;
		color: var(--blu-800);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40px;
		.game-info-title {
			font-size: 2rem;
			text-align: center;
			line-height: 1.2;
		}
		.game-info-outer-container {
			width: 100%;
			display: flex;
			align-items: center;
			gap: 56px;
			.game-info-logo {
				width: 320px;
				flex-shrink: 0;
				object-fit: contain;
				border-radius: 16px;
				box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
			}
			.game-info-inner-container {
				flex: 1;
				min-width: 0;
				display: flex;
				flex-direction: column;
				gap: 28px;
				.game-info-top-list {
					width: 100%;
					display: flex;
					gap: 16px;
					.game-info {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 16px;
						background-color: var(--light-brown-800);
						border-radius: 12px;
						.game-info-label {
							color: var(--blu-800);
							font-weight: 700;
							font-size: 0.8rem;
							letter-spacing: 0.05em;
							text-transform: uppercase;
							opacity: 0.7;
						}
						.game-info-value {
							font-family: 'Funnel Display', sans-serif;
							font-size: 2.2rem;
							font-weight: 700;
							color: var(--blu-600);
							line-height: 1.1;
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
					border: 1px solid var(--light-brown-700);
					border-radius: 10px;
					overflow: hidden;
					.game-info {
						display: flex;
						align-items: center;
						padding: 10px 16px;
						border-bottom: 1px solid var(--light-brown-700);
						&:last-child {
							border-bottom: none;
						}
						&:nth-child(even) {
							background-color: var(--light-brown-800);
						}
						.game-info-label {
							color: var(--blu-800);
							font-size: 0.875rem;
							opacity: 0.8;
						}
						.game-info-value {
							font-family: 'Funnel Display', sans-serif;
							font-weight: 700;
							font-size: 0.95rem;
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
				gap: 12px;
				.game-bonus-list-icons {
					width: 100%;
					display: flex;
					justify-content: space-between;
					gap: 16px;
					.game-bonus {
						flex: 1;
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 8px;
						padding: 16px 8px;
						background-color: var(--light-brown-800);
						border-radius: 12px;
						.bonus-text {
							font-size: 0.8rem;
							font-weight: 600;
							letter-spacing: 0.02em;
						}
					}
					.bonus-icon {
						width: 80px;
						height: 80px;
						fill: var(--blu-500);
					}
					.check-icon,
					.no-check-icon {
						width: 22px;
						height: 22px;
						position: absolute;
						top: 10px;
						right: 10px;
						border-radius: 50%;
						padding: 3px;
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
		@media (max-width: 900px) {
			padding: 0 24px;
		}
		@media (max-width: 767px) {
			margin-top: 60px;
			gap: 28px;
			.game-info-outer-container {
				flex-direction: column;
				align-items: center;
				gap: 32px;
				.game-info-logo {
					width: 100%;
					max-width: 320px;
				}
				.game-info-inner-container {
					width: 100%;
				}
			}
		}
	}
</style>
