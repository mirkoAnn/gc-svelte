<script lang="ts">
	import { appManager } from '$lib/app-manager.svelte';
	import type { Casino } from '$lib/types/casino';
	import { m } from '../../../paraglide/messages';

	let { casinoGlobalData }: { casinoGlobalData: Casino } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

<a
	class="casino-info-cta-button"
	href={casinoGlobalData.affiliationUrl}
	target="_blank"
	rel="external noopener noreferrer"
	title={m.casino_cta_title({ casinoTitle: casinoGlobalData.title }, { locale })}
	>{m.casino_cta_text({ locale })}
	<svg class="casino-info-cta-button-icon">
		<use href="/icons/icon-set.svg#arrow" />
	</svg></a
>
<a
	href={casinoGlobalData.welcomeBonus.tcUrl}
	class="casino-info-legal"
	target="_blank"
	rel="external noopener noreferrer"
	title={m.tc_title({ casinoTitle: casinoGlobalData.title }, { locale })}
>
	{m.responsible_gambling_title({ locale })}{m.tc_text({ locale })}</a
>

<style>
	.casino-info-cta-button {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		width: 80%;
		margin: auto 10% 0;
		padding: 12px 24px;
		background-color: var(--orange-900);
		color: var(--light-brown-900);
		border-radius: 8px;
		font-weight: bold;
		text-align: center;
		overflow: hidden;
		z-index: 1;
		transition: all 0.5s ease;
		.casino-info-cta-button-icon {
			width: 0.7rem;
			height: 0.7rem;
			stroke: currentColor;
			stroke-width: 26;
			transition: all 0.5s ease;
		}
		&:hover {
			background-color: var(--orange-800);
			.casino-info-cta-button-icon {
				transform: translateX(8px);
			}
		}
	}
	.casino-info-legal {
		font-size: 0.6rem;
		text-align: center;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
