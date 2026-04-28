<script lang="ts">
	import type { Favourite } from '$lib/types/favourites';
	import { favouritesManager } from './favourites-manager.svelte';

	let {
		data,
		category,
		isOnFavouritesList = false
	}: { data: Favourite; category: string; isOnFavouritesList?: boolean } = $props();
</script>

<button
	class="action-button favourites-button favourites-button-{data.id} {favouritesManager.isOnFavouritesByCategory(
		data.id,
		category
	)
		? 'isActive'
		: ''} {isOnFavouritesList ? 'on-favourites-list' : ''}"
	aria-label="Aggiungi o rimuovi dai preferiti"
	onclick={() => favouritesManager.toggleFromList(data, category)}
>
	<svg class="favourites-icon" aria-hidden="true">
		<use href={isOnFavouritesList ? '/icons/icon-set.svg#close' : '/icons/icon-set.svg#favourites'}
		></use>
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
		&:not(.on-favourites-list) {
			&:not(.isActive) .favourites-icon {
				animation: 0.5s favourite-button-deactivation-animation forwards;
			}
			&.isActive .favourites-icon {
				animation: 0.5s favourite-button-activation-animation forwards;
			}
		}
		&.on-favourites-list .favourites-icon {
			color: var(--light-brown-900);
		}
	}
</style>
