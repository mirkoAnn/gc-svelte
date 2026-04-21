<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type { Game } from '$lib/types/games';
	import { m } from '../../../paraglide/messages';
	import { gameManager } from './game-manager.svelte';

	let { game, category }: { game: Game; category: string } = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<div class="game-intro-container">
	<h1 class="page-title">{game.title}</h1>
	<p class="choose-mode-message">{m.choose_mode_message({}, { locale })}</p>
	<div class="buttons-container">
		<button
			class="demo-button"
			onclick={() => {
				gameManager.toggleGame(game.id, game.sessions + 1, category, locale || 'it');
			}}
		>
			{m.demo_button_text({}, { locale })}
		</button>
		{#if gameManager.getRelatedCasinos()[0]?.affiliationUrl}
			<a
				href={gameManager.getRelatedCasinos()[0].affiliationUrl}
				rel="noopener noreferrer nofollow external"
				class="real-money-button"
				title={m.real_money_title({ gameTitle: game.title }, { locale })}
				>{m.real_money_text({}, { locale })}</a
			>
		{/if}
	</div>
	<p class="disclaimer">
		<span class="disclaimer-phrase">{m.responsible_gambling_title_small({}, { locale })}</span>
		<span class="disclaimer-phrase">{m.game_play_legal_message({}, { locale })}</span>
	</p>
</div>

<style>
	.game-intro-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		color: var(--light-brown-900);
		.buttons-container {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 20px;
			.demo-button,
			.real-money-button {
				padding: 15px 30px;
				font-size: 1rem;
				font-weight: bold;
				text-align: center;
				border: none;
				border-radius: 24px;
				cursor: pointer;
				transition: background-color 0.3s ease;
			}
			.demo-button {
				background-color: var(--light-brown-800);
				color: var(--blu-800);
				&:hover {
					background-color: var(--light-brown-900);
				}
			}
			.real-money-button {
				background-color: var(--orange-900);
				color: var(--blu-800);
				&:hover {
					background-color: var(--orange-800);
				}
			}
		}
		.disclaimer {
			font-size: 0.6rem;
			max-width: 600px;
			display: flex;
			flex-direction: column;
			gap: 4px;
			margin-top: 16px;
			text-align: center;
			color: var(--light-brown-800);
		}
		@media (max-width: 767px) {
			.buttons-container {
				flex-direction: column;
				.demo-button,
				.real-money-button {
					width: 80%;
				}
			}
		}
	}
</style>
