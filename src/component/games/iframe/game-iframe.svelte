<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type { Game } from '$lib/types/games';
	import { m } from '../../../paraglide/messages';
	import { gameManager } from './game-manager.svelte';

	let { game }: { game: Game } = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<div class="iframe-container {gameManager.checkIfOnFullscreen() ? 'fullscreen' : ''}">
	<iframe
		class="game-iframe"
		src={game.gameUrl}
		frameborder="0"
		allowfullscreen
		title={m.game_play({ gameTitle: game.title }, { locale })}
	></iframe>
	<button
		class="close-fullscreen-button"
		onclick={gameManager.toggleFullscreen}
		aria-label={m.fullscreen_close_button_text({}, { locale })}
	>
		<svg class="close-fullscreen-icon">
			<use href="/icons/icon-set.svg#close" />
		</svg>
	</button>
	<div class="casino-buttons">
		{m.bonus_for_title({ gameTitle: game.title }, { locale })}
	</div>
</div>

<style>
	.iframe-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		&.fullscreen {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: 1000;
		}
		.game-iframe {
			flex: 1;
			width: 100%;
			height: 100%;
			border: none;
		}
		.close-fullscreen-button {
			position: absolute;
			top: 16px;
			right: 16px;
			background: var(--blu-800);
			color: var(--light-brown-900);
			border: none;
			padding: 8px;
			border-radius: 50%;
			width: 40px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			z-index: 1001;
			opacity: 0;
			visibility: hidden;
		}
		.casino-buttons {
			width: 100%;
			background-color: var(--blu-800);
			color: var(--light-brown-900);
			text-align: center;
			opacity: 0;
			visibility: hidden;
			height: 0;
		}
	}
</style>
