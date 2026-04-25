<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import { resolve } from '$app/paths';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type { Casino } from '$lib/types/casino';
	import { m } from '../../paraglide/messages';

	let {
		casinos
	}: {
		casinos: Casino[];
	} = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	onMount(async () => {
		const { default: ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const scrollerEl = document.querySelector<HTMLElement>('.main-inner');
		const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;

		ScrollTrigger.defaults({ scroller: scrollerEl ?? undefined });

		const tableRows = document.querySelectorAll<Element>(
			'.casino-table-header, .casino-table-body .casino-table-row'
		);

		tableRows.forEach((row) => {
			const scrollerBottom = scrollerEl?.getBoundingClientRect().bottom ?? window.innerHeight;

			// Already visible — show immediately without animation
			if (row.getBoundingClientRect().top < scrollerBottom) {
				gsap.set(row, { y: 0, autoAlpha: 1 });
				return;
			}

			if (isMobileViewport) {
				// Mobile: simple fade+slide, plays once on enter
				gsap.fromTo(
					row,
					{ y: 18, autoAlpha: 0 },
					{
						y: 0,
						autoAlpha: 1,
						duration: 0.45,
						ease: 'power2.out',
						overwrite: 'auto',
						scrollTrigger: {
							trigger: row,
							start: 'top 92%',
							toggleActions: 'play none none none'
						}
					}
				);
			} else {
				// Desktop: scrub-based parallax
				gsap
					.timeline({
						defaults: {
							scrollTrigger: {
								trigger: row,
								start: 'top 70%',
								end: 'top 40%',
								scrub: true
							}
						}
					})
					.from(row, { y: 50, autoAlpha: 0, duration: 1, ease: 'back.inOut(1.7)' });
			}
		});

		requestAnimationFrame(() => ScrollTrigger.refresh());
		if (isMobileViewport) setTimeout(() => ScrollTrigger.refresh(), 400);
	});

	const toggleBonusRequirements = (id: string) => {
		const disclaimerContainer = document.getElementById(id);
		if (!disclaimerContainer) return;
		const isCollapsed = disclaimerContainer.clientHeight === 10;
		gsap
			.timeline()
			.to(disclaimerContainer.querySelector('.disclaimer-button-icon'), {
				rotate: isCollapsed ? 270 : 90,
				duration: 0.35,
				ease: 'power2.out'
			})
			.to(
				disclaimerContainer,
				{
					height: isCollapsed ? 'auto' : '10px',
					duration: 0.35,
					ease: 'power2.out'
				},
				'<'
			);
	};
</script>

<span class="casino-info-legal">{m.responsible_gambling_title({}, { locale })}</span>
<table class="casino-table">
	<thead class="casino-table-header">
		<tr class="casino-table-row">
			<th class="casino-table-th">{m.casino({}, { locale })}</th>
			<th class="casino-table-th">{m.bonus_no_deposit_title({}, { locale })}</th>
			<th class="casino-table-th">{m.bonus_with_deposit_title({}, { locale })}</th>
			<th class="casino-table-th"></th>
		</tr>
	</thead>
	<tbody class="casino-table-body">
		{#each casinos as casino (casino.id)}
			<tr class="casino-table-row">
				<td class="casino-table-td">
					<img
						loading="lazy"
						decoding="async"
						class="casino-table-logo"
						src={casino.logo.url}
						alt={m.logo_description({ title: casino.title }, { locale })}
						title={m.logo_description({ title: casino.title }, { locale })}
						width={200}
						height={40}
						style="--bg-color: {casino.colors.background}"
					/>
				</td>
				<td class="casino-table-td casino-table-bonus-td">
					<div class="bonus-container">
						<a
							class="casino-table-cta-link"
							title={m.casino_cta_title({ casinoTitle: casino.title }, { locale })}
							target="_blank"
							rel="noopener noreferrer external"
							href={casino.affiliationUrl}
						>
							<span class="mobile-bonus-label">{m.bonus_no_deposit_title({}, { locale })}</span>
							<span class="mobile-bonus-value">{casino.welcomeBonus.noDeposit}</span>
						</a>
					</div>
					<div id="disclaimer-no-deposit-{casino.id}" class="disclaimer-container">
						<button
							onclick={() => toggleBonusRequirements(`disclaimer-no-deposit-${casino.id}`)}
							type="button"
							class="disclaimer-button"
							aria-expanded="false"
							aria-controls={`disclaimer-no-deposit-text-${casino.id}`}
							title={m.bonus_no_deposit_requirements_title(
								{ casinoTitle: casino.title },
								{ locale }
							)}
						>
							{m.bonus_no_deposit_requirements_title({ casinoTitle: casino.title }, { locale })}
							<svg class="disclaimer-button-icon"><use href="/icons/icon-set.svg#arrow" /></svg>
						</button>
						<p id="disclaimer-no-deposit-text-{casino.id}" class="disclaimer-text">
							{casino.welcomeBonus.noDepositRequirements}
						</p>
					</div>
				</td>
				<td class="casino-table-td casino-table-bonus-td">
					<div class="bonus-container">
						<a
							class="casino-table-cta-link"
							title={m.casino_cta_title({ casinoTitle: casino.title }, { locale })}
							target="_blank"
							rel="noopener noreferrer external"
							href={casino.affiliationUrl}
						>
							<span class="mobile-bonus-label">{m.bonus_with_deposit_title({}, { locale })}</span>
							<span class="mobile-bonus-value">{casino.welcomeBonus.withDeposit}</span>
						</a>
					</div>
					<div id="disclaimer-with-deposit-{casino.id}" class="disclaimer-container">
						<button
							onclick={() => toggleBonusRequirements(`disclaimer-with-deposit-${casino.id}`)}
							type="button"
							class="disclaimer-button"
							aria-expanded="false"
							aria-controls={`disclaimer-with-deposit-text-${casino.id}`}
							title={m.bonus_with_deposit_requirements_title(
								{ casinoTitle: casino.title },
								{ locale }
							)}
						>
							{m.bonus_with_deposit_requirements_title({ casinoTitle: casino.title }, { locale })}
							<svg class="disclaimer-button-icon"><use href="/icons/icon-set.svg#arrow" /></svg>
						</button>
						<p id="disclaimer-with-deposit-text-{casino.id}" class="disclaimer-text">
							{casino.welcomeBonus.withDepositRequirements}
						</p>
					</div>
				</td>
				<td class="casino-table-td casino-table-cta-td">
					<div class="casino-table-actions">
						<a
							class="casino-table-button casino-table-review-button"
							title={m.casino_review_link_title({ casinoTitle: casino.title }, { locale })}
							href={resolve(`/${locale}/casino-online/[slug]`, {
								slug: casino.slug
							})}
							>{m.casino_review_link_text({}, { locale })}
							<svg class="casino-table-icon"><use href="/icons/icon-set.svg#arrow" /></svg></a
						>
						<a
							class="casino-table-button casino-table-cta-button"
							title={m.casino_cta_title({ casinoTitle: casino.title }, { locale })}
							target="_blank"
							rel="noopener noreferrer external"
							href={casino.affiliationUrl}
							>{m.casino_cta_text({}, { locale })}
							<svg class="casino-table-icon"><use href="/icons/icon-set.svg#arrow" /></svg></a
						>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.casino-info-legal {
		display: block;
		width: 100%;
		max-width: 1200px;
		font-size: 0.6rem;
		text-align: right;
		margin: 8px auto;
		opacity: 0.7;
		letter-spacing: 0.02em;
	}
	.casino-table {
		width: 100%;
		max-width: 1200px;
		border-collapse: collapse;
		border-radius: 10px;
		overflow: hidden;
		margin: 0 auto 100px auto;
		box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
		.casino-table-header {
			background-color: var(--blu-700);
			color: var(--light-brown-900);
		}
		.casino-table-th {
			padding: 12px 10px;
			text-align: center;
			font-size: 0.8rem;
			font-family: 'Funnel Display', sans-serif;
			letter-spacing: 0.04em;
			font-weight: 600;
		}
		.casino-table-td {
			vertical-align: middle;
			text-align: center;
			padding: 10px 8px;
			font-size: 0.9rem;
		}
		.casino-table-row:nth-child(even) {
			background-color: var(--light-brown-800);
		}
		.casino-table-logo {
			max-width: 125px;
			height: auto;
			background-color: var(--bg-color);
			padding: 8px 16px;
			border-radius: 8px;
		}
		.casino-table-bonus-td {
			.casino-table-cta-link {
				color: inherit;
			}
			.mobile-bonus-label {
				display: none;
			}
			.mobile-bonus-value {
				font-weight: 700;
				letter-spacing: 0.01em;
			}
			.disclaimer-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 4px;
				overflow: hidden;
				height: 10px;
				margin-top: 4px;
				.disclaimer-button {
					font-size: 0.5rem;
					opacity: 0.65;
					transition: opacity 0.15s ease;
					&:hover {
						opacity: 1;
					}
					.disclaimer-button-icon {
						width: 6px;
						height: 6px;
						stroke-width: 75px;
						transform: rotate(90deg);
					}
				}
				.disclaimer-text {
					font-size: 0.75rem;
					padding: 8px 10px;
					border-radius: 6px;
					background-color: white;
					line-height: 1.5;
				}
			}
		}
		.casino-table-cta-td {
			width: max-content;
			display: flex;
			gap: 8px;
			align-items: center;
			justify-content: center;
			.casino-table-actions {
				display: flex;
				gap: 8px;
			}
		}
		.casino-table-button {
			width: fit-content;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 5px;
			padding: 8px 16px;
			text-decoration: none;
			border-radius: 6px;
			font-weight: 700;
			font-size: 0.82rem;
			letter-spacing: 0.03em;
			transition:
				background-color 0.2s ease,
				box-shadow 0.2s ease,
				transform 0.15s ease;
			.casino-table-icon {
				width: 8px;
				height: 8px;
				stroke-width: 75px;
			}
			&:focus-visible {
				outline: 2px solid var(--orange-900);
				outline-offset: 2px;
			}
		}
		.casino-table-review-button {
			background-color: var(--green-300);
			color: var(--light-brown-900);
			&:hover {
				background-color: var(--green-400);
				box-shadow: 0 2px 8px rgba(90, 196, 142, 0.35);
				transform: translateY(-1px);
			}
		}
		.casino-table-cta-button {
			background-color: var(--orange-900);
			color: var(--light-brown-900);
			&:hover {
				background-color: var(--orange-800);
				box-shadow: 0 2px 10px rgba(255, 111, 0, 0.35);
				transform: translateY(-1px);
			}
		}
		@media (max-width: 767px) {
			width: calc(100% - 64px);
			box-shadow: none;
			.casino-table-header {
				display: none;
			}
			.casino-table-row {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				margin-bottom: 16px;
				border: 1px solid var(--light-brown-700);
				border-radius: 10px;
				padding: 16px;
				box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
				transition: box-shadow 0.2s ease;
				&:hover {
					box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
					background-color: unset;
				}
			}
			.casino-table-td {
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.casino-table-bonus-td {
				flex-direction: column;
				align-items: center;
				.mobile-bonus-label {
					display: block;
					font-weight: 700;
					margin-bottom: 4px;
					font-size: 0.75rem;
					letter-spacing: 0.04em;
					opacity: 0.7;
				}
			}
			.casino-table-button {
				width: 100%;
				justify-content: center;
			}
		}
	}
</style>
