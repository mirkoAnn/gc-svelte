<script>
	import { appManager } from '$lib/app-manager.svelte';
	import { m } from '../../../paraglide/messages';
	import SiteMetadata from '../../metadata/site-metadata.svelte';
	import NavBranding from '../nav/nav-branding.svelte';
	import { navManager } from '../nav/nav-manager.svelte';

	const locale = $derived(appManager.getCountryCode());
</script>

<SiteMetadata />
<footer class="footer-outer">
	<div class="footer-inner">
		<div class="footer-column">
			<NavBranding />
			<p class="footer-text">{m.footer_site_description({}, { locale })}</p>
			<p class="footer-text">{m.responsible_gambling_title({}, { locale })}</p>
		</div>
		<div class="footer-column">
			{#each navManager.getMenuItemByIndex(0).submenuItems as item (item.label)}
				<a href={`/${locale}${item.href}`} class="footer-link">{item.label}</a>
			{/each}
		</div>
		<div class="footer-column">
			{#each navManager.getMenuItemByIndex(1).submenuItems as item (item.label)}
				<a href={`/${locale}${item.href}`} class="footer-link">{item.label}</a>
			{/each}
		</div>
		<div class="footer-column">
			<a
				href="https://www.iubenda.com/privacy-policy/46494097"
				class="footer-link"
				target="_blank"
				rel="external noopener noreferrer">Policy Privacy</a
			>
			<a
				href="https://www.iubenda.com/privacy-policy/46494097/cookie-policy"
				class="footer-link"
				target="_blank"
				rel="external noopener noreferrer">Cookie Policy</a
			>
		</div>
	</div>
	<div class="subfooter">
		{m.casino_legal_message({}, { locale })}
		<svg class="subfooter-small-icon">
			<use href="/icons/icon-set.svg#+18"></use>
		</svg>
		<a
			href={m.casino_legal_message_link({}, { locale })}
			class="footer-link"
			target="_blank"
			rel="external noopener noreferrer"
			aria-label={m.casino_legal_message_link_text({}, { locale })}
		>
			<svg class="subfooter-big-icon">
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
		justify-content: center;
		align-items: center;
		margin-top: 100px;
		font-size: 14px;
		z-index: 1000;
		color: var(--light-brown-900);
		.footer-inner {
			width: 100%;
			display: flex;
			gap: 16px;
			background-color: var(--footer-bg-color);
			padding: 32px;
			.footer-column {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 8px;
				:global(.desktop-nav-branding-link) {
					justify-content: flex-start;
				}
				.footer-text {
					color: var(--light-brown-900);
					font-style: italic;
					margin: 0;
				}
				.footer-link {
					color: inherit;
					text-decoration: none;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
		.subfooter {
			width: 100%;
			background-color: var(--sub-footer-bg-color);
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 8px;
			padding: 8px 16px;
			font-size: 0.6rem;
			.footer-link {
				display: flex;
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
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: 64px;
				.footer-column {
					width: 100%;
					align-items: center;
					& :global(.desktop-nav-branding-link) {
						max-width: 200px;
					}
				}
			}
			.subfooter {
				flex-direction: column;
				gap: 16px;
				text-align: center;
				.footer-link {
					display: block;
				}
			}
		}
	}
</style>
