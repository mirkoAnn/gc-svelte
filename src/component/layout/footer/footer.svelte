<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { m } from '../../../paraglide/messages';
	import SiteMetadata from '../../metadata/site-metadata.svelte';
	import NavBranding from '../nav/nav-branding.svelte';
	import { navManager } from '../nav/nav-manager.svelte';

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	const policyPrivacyCodes = [{ it: '46494097' }, { es: '24631089' }];
</script>

<SiteMetadata />
<footer class="footer-outer">
	<div class="footer-inner">
		<div class="footer-column footer-column--brand">
			<NavBranding />
			<p class="footer-text">{m.footer_site_description({}, { locale })}</p>
			<p class="footer-text footer-text--disclaimer">
				{m.responsible_gambling_title({}, { locale })}
			</p>
		</div>
		<div class="footer-column">
			<p class="footer-heading">{navManager.getMenuItemByIndex(0).label}</p>
			{#each navManager.getMenuItemByIndex(0).submenuItems as item (item.label)}
				<a
					href={resolve(`/${locale}${item.href}` as Parameters<typeof resolve>[0])}
					class="footer-link">{item.label}</a
				>
			{/each}
		</div>
		<div class="footer-column">
			<p class="footer-heading">{navManager.getMenuItemByIndex(1).label}</p>
			{#each navManager.getMenuItemByIndex(1).submenuItems as item (item.label)}
				<a
					href={resolve(`/${locale}${item.href}` as Parameters<typeof resolve>[0])}
					class="footer-link">{item.label}</a
				>
			{/each}
		</div>
		<div class="footer-column footer-column--legal">
			<p class="footer-heading">Legal</p>
			<a
				href={`https://www.iubenda.com/privacy-policy/${policyPrivacyCodes.find((code) => code[locale])?.[locale] ?? '#'}`}
				class="footer-link"
				target="_blank"
				rel="external noopener noreferrer">Policy Privacy</a
			>
			<a
				href={`https://www.iubenda.com/privacy-policy/${policyPrivacyCodes.find((code) => code[locale])?.[locale] ?? '#'}/cookie-policy`}
				class="footer-link"
				target="_blank"
				rel="external noopener noreferrer">Cookie Policy</a
			>
		</div>
	</div>
	<div class="subfooter">
		{m.casino_legal_message({}, { locale })}
		<svg class="subfooter-small-icon" aria-hidden="true">
			<use href="/icons/icon-set.svg#+18"></use>
		</svg>
		<a
			href={m.casino_legal_message_link({}, { locale })}
			class="footer-link"
			target="_blank"
			rel="external noopener noreferrer"
			aria-label={m.casino_legal_message_link_text({}, { locale })}
		>
			<svg class="subfooter-big-icon" aria-hidden="true">
				<use href="/icons/icon-set.svg#adm"></use>
			</svg>
		</a>
	</div>
</footer>

<style>
	.footer-outer {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100px;
		font-size: 14px;
		z-index: 1000;
		color: var(--light-brown-900);
		background-color: var(--footer-bg-color);
		box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);

		.footer-inner {
			width: 100%;
			max-width: 1280px;
			display: flex;
			gap: 0;
			padding: 48px 40px;

			.footer-column {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 10px;
				padding: 0 28px;

				&.footer-column--brand {
					flex: 1.4;
					gap: 14px;
					padding-left: 0;
					padding-right: 40px;
					border-right: 1px solid var(--blu-600);

					:global(.desktop-nav-branding-link) {
						justify-content: flex-start;
					}
				}

				&.footer-column--legal {
					padding-right: 0;
				}

				.footer-heading {
					margin: 0 0 8px;
					font-size: 0.65rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.13em;
					color: var(--light-brown-600);
				}

				.footer-text {
					color: var(--light-brown-700);
					font-style: italic;
					margin: 0;
					line-height: 1.6;
					font-size: 0.85rem;
				}

				.footer-text--disclaimer {
					font-style: normal;
					font-size: 0.72rem;
					color: var(--light-brown-600);
				}

				.footer-link {
					color: var(--light-brown-800);
					text-decoration: none;
					font-size: 0.875rem;
					transition: color 0.15s ease;

					&:hover {
						color: var(--white-900);
						text-decoration: underline;
					}
				}
			}
		}

		.subfooter {
			width: 100%;
			background-color: var(--blu-900);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 8px 12px;
			padding: 10px 24px;
			font-size: 0.65rem;
			color: var(--light-brown-700);

			.footer-link {
				display: inline-flex;
				color: inherit;
				text-decoration: none;
			}

			.subfooter-small-icon {
				width: 30px;
				height: 30px;
			}

			.subfooter-big-icon {
				width: 75px;
				height: 30px;
			}
		}

		@media (max-width: 768px) {
			.footer-inner {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 0;
				padding: 0;

				.footer-column--brand {
					grid-column: 1 / -1;
					align-items: center;
					text-align: center;
					padding: 28px 24px;
					padding-right: 24px;
					border-right: none;
					border-bottom: 1px solid var(--blu-600);

					:global(.desktop-nav-branding-link) {
						max-width: 180px;
					}
				}

				.footer-column:nth-child(2) {
					border-right: 1px solid var(--blu-600);
				}

				.footer-column:not(.footer-column--brand):not(.footer-column--legal) {
					align-items: flex-start;
					text-align: left;
					padding: 20px 16px;

					.footer-link {
						padding: 4px 0;
					}
				}

				.footer-column--legal {
					grid-column: 1 / -1;
					flex-direction: row;
					flex-wrap: wrap;
					align-items: center;
					gap: 4px 20px;
					padding: 14px 20px;
					border-top: 1px solid var(--blu-600);

					.footer-heading {
						width: 100%;
						margin-bottom: 2px;
					}
				}
			}

			.subfooter {
				padding: 14px 20px;
				text-align: center;
			}
		}
	}
</style>
