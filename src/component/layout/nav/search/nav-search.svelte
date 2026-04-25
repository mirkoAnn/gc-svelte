<script lang="ts">
	import NavbarSearchResults from './nav-search-results.svelte';
	import NavbarSearchHints from './nav-search-hints.svelte';
	import { onMount } from 'svelte';
	import { navSearchManager } from './nav-search-manager.svelte';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { page } from '$app/state';
	import { m } from '../../../../paraglide/messages';

	let inputEl: HTMLInputElement;

	onMount(() => {
		navSearchManager.init();
		inputEl?.focus();
	});

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	const hasInput = $derived(navSearchManager.getSearchInput().length > 0);
</script>

<div class="navbar-search-panel">
	<div class="navbar-search-and-hints-container">
		<div class="navbar-search-header">
			<p class="navbar-search-eyebrow">{m.search_title({}, { locale })}</p>
			<kbd class="navbar-search-esc-hint" aria-hidden="true">Esc</kbd>
			<button
				class="navbar-search-close-btn"
				aria-label="Close search"
				onclick={() => navSearchManager.handleBlur()}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					aria-hidden="true"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>
		<div class="navmenu-search-input-container" class:has-input={hasInput}>
			<svg
				class="navmenu-search-icon"
				aria-hidden="true"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				bind:this={inputEl}
				id="navmenu-search-input"
				name="navmenu-search"
				class="navbar-menu-search"
				aria-label={navSearchManager.getPlaceholder()}
				placeholder={navSearchManager.getPlaceholder()}
				oninput={(e: Event) => {
					navSearchManager.handleInput((e.target as HTMLInputElement).value, locale);
				}}
				value={navSearchManager.getSearchInput()}
				onkeydown={(e: KeyboardEvent) => {
					if (e.key === 'Escape') navSearchManager.handleBlur();
				}}
				autocomplete="off"
			/>
			{#if hasInput}
				<button
					class="navmenu-search-clear"
					aria-label="Clear search"
					onclick={() => {
						navSearchManager.handleInput('', locale);
						inputEl?.focus();
					}}
				>
					<svg
						class="close-icon"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			{/if}
		</div>
		{#if navSearchManager.getSearchHints().length > 0}
			<div class="navbar-search-hints-outer">
				<NavbarSearchHints />
			</div>
		{:else if !hasInput}
			<div class="navbar-search-empty-state">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
				<span>{navSearchManager.getPlaceholder()}</span>
			</div>
		{/if}
	</div>
	<div class="navbar-search-results-wrap">
		<NavbarSearchResults />
	</div>
</div>

<style>
	.navbar-search-panel {
		width: min(1200px, 100%);
		height: 100%;
		margin: 0 auto;
		padding: 8px 8px 16px;
		background-color: inherit;
		display: grid;
		grid-template-columns: 300px minmax(0, 1fr);
		align-items: stretch;
		gap: clamp(16px, 3vw, 32px);
		animation: searchPanelReveal 280ms cubic-bezier(0.22, 1, 0.36, 1);

		.navbar-search-and-hints-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			justify-content: flex-start;
			align-items: stretch;
			padding: 14px;
			background-color: var(--blu-700);
			border-radius: 20px;
			border: 1px solid var(--bt-blu-100-opacity-10);
			box-shadow: 0 24px 40px -20px rgba(0, 0, 0, 0.6);
			gap: 10px;
			min-height: 0;

			.navbar-search-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 8px;
			}

			.navbar-search-eyebrow {
				font-size: 10px;
				font-weight: 700;
				letter-spacing: 0.1em;
				text-transform: uppercase;
				color: var(--light-brown-600);
				margin: 0;
				padding: 0 2px;
			}

			.navbar-search-esc-hint {
				font-family: inherit;
				font-size: 10px;
				font-weight: 600;
				color: var(--light-brown-600);
				background: rgba(255, 255, 255, 0.06);
				border: 1px solid rgba(255, 255, 255, 0.1);
				border-radius: 5px;
				padding: 2px 6px;
				line-height: 1.4;
				flex-shrink: 0;
			}

			.navbar-search-close-btn {
				display: none; /* shown only on mobile via media query */
				align-items: center;
				justify-content: center;
				width: 32px;
				height: 32px;
				flex-shrink: 0;
				border: none;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.08);
				color: var(--light-brown-700);
				cursor: pointer;
				padding: 0;
				transition: background 150ms ease;

				svg {
					width: 14px;
					height: 14px;
					stroke-width: 2.5;
				}

				&:active {
					background: rgba(255, 255, 255, 0.16);
				}
			}

			.navmenu-search-input-container {
				width: 100%;
				position: relative;
				display: flex;
				align-items: center;
				border-radius: 12px;
				background: var(--bt-blu-600);
				border: 1px solid var(--bt-blu-100-opacity-10);
				padding: 0 10px;
				transition: border-color 180ms ease;

				&:focus-within {
					border-color: rgba(255, 255, 255, 0.18);
				}

				.navmenu-search-icon {
					width: 16px;
					height: 16px;
					flex-shrink: 0;
					color: var(--light-brown-600);
					pointer-events: none;
					stroke-width: 1;
				}

				.navbar-menu-search {
					flex: 1;
					height: 40px;
					border: none;
					background-color: transparent;
					color: var(--light-brown-900);
					font-size: 15px; /* bumped to 16px on mobile to prevent iOS auto-zoom */
					padding: 0 6px;

					&::placeholder {
						color: var(--light-brown-600);
					}

					&:focus {
						outline: none;
					}
				}

				.navmenu-search-clear {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 22px;
					height: 22px;
					flex-shrink: 0;
					border: none;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.1);
					color: var(--light-brown-700);
					cursor: pointer;
					padding: 0;
					transition:
						background 150ms ease,
						color 150ms ease;
					.close-icon {
						width: 12px;
						height: 12px;
						stroke-width: 2.5;
					}

					&:hover {
						background: rgba(255, 255, 255, 0.2);
						color: var(--light-brown-900);
					}
				}
			}

			.navbar-search-hints-outer {
				width: 100%;
				color: var(--light-brown-800);
				background: var(--bt-blu-600);
				border-radius: 12px;
				border: 1px solid var(--bt-blu-100-opacity-10);
				overflow: hidden;
				max-height: min(52vh, 380px);
				overflow-y: auto;
				scrollbar-width: thin;
				scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
			}

			.navbar-search-empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 10px;
				padding: 24px 16px;
				color: var(--light-brown-600);
				text-align: center;

				svg {
					width: 28px;
					height: 28px;
					opacity: 0.4;
				}

				span {
					font-size: 12px;
					opacity: 0.6;
				}
			}
		}

		.navbar-search-results-wrap {
			min-width: 0;
			height: 100%;
			border-radius: 18px;
			padding: 8px 8px 0;
			background: linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.04) 0%,
				rgba(255, 255, 255, 0) 100%
			);
			border-left: 1px solid rgba(255, 255, 255, 0.06);
		}

		@media (max-width: 1024px) {
			grid-template-columns: 260px minmax(0, 1fr);
			gap: 16px;
		}

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			padding: 0 0 16px;
			gap: 12px;

			.navbar-search-and-hints-container {
				padding: 12px;
				box-shadow: none;

				.navbar-search-esc-hint {
					display: none;
				}

				.navbar-search-close-btn {
					display: flex;
				}

				.navmenu-search-input-container {
					border-radius: 14px;

					.navbar-menu-search {
						height: 44px;
						font-size: 16px; /* prevent iOS auto-zoom */
					}

					.navmenu-search-clear {
						width: 28px;
						height: 28px;

						.close-icon {
							width: 14px;
							height: 14px;
						}
					}
				}

				.navbar-search-hints-outer {
					max-height: min(30vh, 220px);
				}

				.navbar-search-empty-state {
					padding: 12px 8px;
					gap: 6px;

					svg {
						width: 20px;
						height: 20px;
					}
				}
			}

			.navbar-search-results-wrap {
				padding: 0;
				background: none;
				border-left: none;
				border-top: 1px solid rgba(255, 255, 255, 0.06);
				padding-top: 4px;
			}
		}

		@media (max-width: 480px) {
			padding: 0 0 12px;

			.navbar-search-and-hints-container {
				padding: 10px;
				border-radius: 16px;
			}
		}
	}

	@keyframes searchPanelReveal {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
