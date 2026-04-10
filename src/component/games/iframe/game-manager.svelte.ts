import { workersManager } from '$lib/workers-manager.svelte';
import gsap from 'gsap/dist/gsap';
import { casinosDataManager } from '../../casino/casinos-data-manager.svelte';
import type { Casino } from '$lib/types/casino';

let isVisible = $state(false),
	isOnFullscreen = $state(false),
	relatedCasinos: Casino[] = $state([]);

// Get related casinos from global casinos data based on the game provider title
const getRelatedCasinosFromCasinosManager = (providerTitle: string) => {
	relatedCasinos =
		casinosDataManager.getCasinosByProviderTitle(providerTitle).length > 0
			? casinosDataManager.getCasinosByProviderTitle(providerTitle)
			: casinosDataManager.getTopCasinos(3);
};

// Animate the fullscreen toggle
const animateFullscreen = () => {
	gsap
		.timeline()
		.to('.game-container .close-fullscreen-button', {
			autoAlpha: isOnFullscreen ? 1 : 0
		})
		.to(
			'.game-container .casino-buttons',
			{
				autoAlpha: isOnFullscreen ? 1 : 0,
				height: isOnFullscreen ? 'auto' : 0
			},
			0
		);
};

// Animate the toggling of the game visibility
const animateGameToggling = () => {
	gsap
		.timeline()
		.to('.game-container .game-intro-container', {
			autoAlpha: 0,
			onComplete: () => {
				isVisible = !isVisible;
			}
		})
		.to('.game-container .game-actions-container', {
			autoAlpha: 1,
			yPercent: 110,
			ease: 'back.out(1.7)'
		})
		.then(() => {
			if (window.innerWidth < 768) {
				isOnFullscreen = true;
				animateFullscreen();
			}
		});
};

const animateErrorButton = () => {
	workersManager.sendGameErrorReport(window.location.href);
	const errorButton = document.querySelector('.game-error-button');
	if (!errorButton) return;
	errorButton.innerHTML = `Segnalazione inviata!`;
};

export const gameManager = {
	// Initialize event listeners and fetch related casinos for the given provider
	init: (providerTitle: string) => {
		document.addEventListener('keyup', (event) => {
			if (event.key === 'Escape' && isOnFullscreen) {
				isOnFullscreen = false;
				animateFullscreen();
			}
		});
		getRelatedCasinosFromCasinosManager(providerTitle);
	},
	// Reset the game manager state and fetch related casinos for a new provider
	reset: (providerTitle: string) => {
		isVisible = false;
		isOnFullscreen = false;
		getRelatedCasinosFromCasinosManager(providerTitle);
	},
	checkIfVisible: () => {
		return isVisible;
	},
	getRelatedCasinos: () => {
		return relatedCasinos;
	},
	// Toggle the game visibility and update the game sessions using the workers manager
	toggleGame: (id: string, sessions: number, category: string) => {
		workersManager.updateGameSessionAsync(id, sessions, category);
		animateGameToggling();
	},
	checkIfOnFullscreen: () => {
		return isOnFullscreen;
	},
	// Toggle fullscreen mode and animate the transition
	toggleFullscreen: () => {
		isOnFullscreen = !isOnFullscreen;
		animateFullscreen();
	},
	toggleErrorPopup: () => {
		animateErrorButton();
	}
};
