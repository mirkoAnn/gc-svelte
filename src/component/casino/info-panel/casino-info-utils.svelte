<script lang="ts">
	import { appManager } from '$lib/app-manager.svelte';
	import type { Casino } from '$lib/types/casino';
	import { m } from '../../../paraglide/messages';

	let { casinoGlobalData }: { casinoGlobalData: Casino } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

<div class="casino-info-utils-container">
	<h2 class="casino-info-subtitle">
		{m.usefull_info_title({ title: casinoGlobalData.title }, { locale })}
	</h2>
	<div class="casino-info-utils-inner">
		<!-- Contact Info -->
		<ul class="casino-info-utils-list">
			<li class="casino-info-utils-item">
				<span class="casino-info-utils-item-label">
					<svg class="casino-info-utils-item-icon" width="16" height="16"
						><use href="/icons/casino-set.svg#web"></use></svg
					>
					{m.web_site({}, { locale })}:</span
				>
				<a
					class="casino-info-utils-item-value casino-info-utils-link"
					href={casinoGlobalData.affiliationUrl}
					target="_blank"
					rel="external noopener noreferrer">{casinoGlobalData.affiliationUrl}</a
				>
			</li>
			<li class="casino-info-utils-item">
				<span class="casino-info-utils-item-label">
					<svg class="casino-info-utils-item-icon" width="16" height="16"
						><use href="/icons/casino-set.svg#email"></use></svg
					>
					{m.email({}, { locale })}:</span
				>
				<a
					class="casino-info-utils-item-value casino-info-utils-link"
					href={'mailto:' + casinoGlobalData.info.email}>{casinoGlobalData.info.email}</a
				>
			</li>
			<li class="casino-info-utils-item">
				<span class="casino-info-utils-item-label">
					<svg class="casino-info-utils-item-icon" width="16" height="16"
						><use href="/icons/casino-set.svg#phone"></use></svg
					>
					{m.telephone({}, { locale })}:</span
				>
				<a
					class="casino-info-utils-item-value casino-info-utils-link"
					href={'tel:' + casinoGlobalData.info.telephone}>{casinoGlobalData.info.telephone}</a
				>
			</li>
		</ul>

		<ul class="casino-info-utils-list">
			<li class="casino-info-utils-item">
				<span class="casino-info-utils-item-label">
					<svg class="casino-info-utils-item-icon" width="16" height="16"
						><use href="/icons/casino-set.svg#money"></use></svg
					>
					{m.casino_deposit_min({}, { locale })}:</span
				>
				<span class="casino-info-utils-item-value">
					{casinoGlobalData.info.depositMin} €
				</span>
			</li>
			<li class="casino-info-utils-item">
				<span class="casino-info-utils-item-label">
					<svg class="casino-info-utils-item-icon" width="16" height="16"
						><use href="/icons/casino-set.svg#money"></use></svg
					>
					{m.casino_withdrawal_min({}, { locale })}:</span
				>
				<span class="casino-info-utils-item-value">
					{casinoGlobalData.info.withdrawalMin} €
				</span>
			</li>
			<li class="casino-info-utils-item">
				<span class="casino-info-utils-item-label">
					<svg class="casino-info-utils-item-icon" width="16" height="16"
						><use href="/icons/casino-set.svg#clock"></use></svg
					>
					{m.casino_withdrawal_time({}, { locale })}:</span
				>
				<span class="casino-info-utils-item-value">
					{casinoGlobalData.info.withdrawalTimes} h
				</span>
			</li>
		</ul>
	</div>
</div>

<style>
	.casino-info-utils-container {
		flex: 1;
		.casino-info-utils-inner {
			display: flex;
			flex-direction: column;
			gap: 16px;
			.casino-info-utils-list {
				width: fit-content;
				list-style: none;
				padding: 0;
				margin: 0;
				font-size: 0.8rem;
				.casino-info-utils-item {
					display: flex;
					align-items: center;
					gap: 16px;
					margin-bottom: 8px;
					.casino-info-utils-item-label {
						width: 150px;
						display: flex;
						align-items: center;
						gap: 4px;
					}
					.casino-info-utils-item-value {
						flex: 1;
						font-weight: bold;
						color: var(--blu-600);
					}
					.casino-info-utils-link {
						color: var(--blu-600);
						text-decoration: none;
						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
		@media (min-width: 768px) {
			.casino-info-utils-inner {
				max-width: 90%;
			}
		}
	}
</style>
