<script lang="ts">
	import { favouritesManager } from './favourites-manager.svelte';
	import type { Favourite } from '$lib/types/favourites';

	let { data, category }: { data: Favourite; category: string } = $props();
</script>

<button
	class="action-button favourites-button favourites-button-{data.id} {favouritesManager.isOnFavouritesByCategory(
		data.id,
		category
	)
		? 'isActive'
		: ''}"
	aria-label="Aggiungi o rimuovi dai preferiti"
	onclick={() => favouritesManager.toggleFromList(data, category)}
>
	<svg class="favourites-icon" aria-hidden="true">
		<use href="/icons/icon-set.svg#favourites"></use>
	</svg>
</button>

<style>
	@keyframes favourite-button-activation-animation {
		0% {
			transform: scale(0.7);
		}
		33% {
			transform: scale(1.2);
		}
		66% {
			transform: scale(0.9);
			fill: var(--red-900);
		}
		100% {
			transform: scale(1);
			fill: var(--red-900);
		}
	}
	@keyframes favourite-button-deactivation-animation {
		0% {
			transform: scale(1.2);
		}
		33% {
			transform: scale(0.7);
		}
		100% {
			transform: scale(1);
		}
	}

	.favourites-button {
		width: 100%;
		height: 100%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2px;
		border: none;
		background-color: transparent;
		.favourites-icon {
			position: absolute;
			width: calc(100% - 4px);
			max-width: 20px;
			aspect-ratio: 1/1;
		}
		&:not(.isActive) .favourites-icon {
			animation: 0.5s favourite-button-deactivation-animation forwards;
		}
		&.isActive .favourites-icon {
			animation: 0.5s favourite-button-activation-animation forwards;
		}
	}
</style>
