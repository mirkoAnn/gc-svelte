<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { ageBannerManager } from './age-banner-manager.svelte';
	import { navManager } from '../nav/nav-manager.svelte';
	import { m } from '../../../paraglide/messages';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

{#if !page.data.isAgeVerified && !ageBannerManager.isAgeVerified()}
	<div class="age-banner-container" transition:fade>
		<div
			class="age-banner-content"
			style="--bg-color: var(--age-banner-bg-color-{navManager.getCurrentSection()})"
		>
			<div class="age-banner-header">
				<svg
					class="age-banner-icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 64 64"
					width="72"
					height="72"
					fill="#f39c12"
				>
					<use href="/icons/icon-set.svg#+18" />
				</svg>
				<p class="age-banner-text">
					{m.age_restriction_title({}, { locale })}
				</p>
			</div>
			<hr class="age-banner-divider" />
			<p class="age-banner-subtext">{m.age_restriction_subtext({}, { locale })}</p>
			<div class="age-banner-buttons">
				<button class="age-banner-button yes" onclick={ageBannerManager.verifyAge}
					>{m.age_restriction_button({}, { locale })}</button
				>
				<button class="age-banner-button no" onclick={ageBannerManager.denyAccess}
					>{m.age_restriction_error({}, { locale })}</button
				>
			</div>
			<p class="age-banner-cookies">{m.cookies_message({}, { locale })}</p>
		</div>
	</div>
{/if}

<style>
	.age-banner-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 1rem;
		background-color: var(--blu-900-opacity-500);
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1001;

		.age-banner-content {
			background-color: var(--bg-color);
			color: var(--age-banner-text-color);
			padding: 2rem 2.5rem;
			border-radius: 16px;
			text-align: center;
			max-width: 440px;
			width: 100%;
			box-shadow:
				0 8px 32px rgba(0, 0, 0, 0.4),
				0 2px 8px rgba(0, 0, 0, 0.2);
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.age-banner-header {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1rem;
			}

			.age-banner-icon {
				flex-shrink: 0;
			}

			.age-banner-text {
				font-size: 1.1rem;
				font-weight: 600;
				line-height: 1.5;
				margin: 0;
			}

			.age-banner-divider {
				border: none;
				border-top: 1px solid var(--white-900-opacity-100);
				margin: 0;
			}

			.age-banner-subtext {
				font-size: 1rem;
				opacity: 0.9;
				margin: 0;
			}

			.age-banner-buttons {
				display: flex;
				justify-content: center;
				gap: 1rem;
				flex-wrap: wrap;
			}

			.age-banner-button {
				padding: 0.75rem 2rem;
				border: none;
				border-radius: 24px;
				font-size: 1rem;
				font-weight: 600;
				cursor: pointer;
				transition:
					background-color 0.2s ease,
					transform 0.1s ease,
					opacity 0.2s ease;
			}

			.age-banner-button:hover {
				opacity: 0.85;
			}

			.age-banner-button:active {
				transform: scale(0.97);
			}

			.age-banner-button.yes {
				background-color: var(--green-500);
				color: var(--white-900);
			}

			.age-banner-button.no {
				background-color: var(--red-800);
				color: #fff;
			}

			.age-banner-cookies {
				font-size: 0.75rem;
				opacity: 0.55;
				line-height: 1.4;
				margin: 0;
			}
		}
	}
</style>
