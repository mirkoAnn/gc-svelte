<script lang="ts">
  import { workersManager } from "$lib/workers-manager.svelte";

  let { entry, category }: { entry: any; category: string } = $props();

  let chosenRating = $state(""),
    newRating = $state({ up: entry.rating.up, down: entry.rating.down });

  const submitRating = (rating: "up" | "down") => {
    chosenRating = rating;
    rating === "up" ? newRating.up++ : newRating.down++;
    workersManager.updateRatingAsync(
      entry.id,
      newRating.up,
      newRating.down,
      category,
    );
  };
</script>

<div class="rating-buttons {chosenRating !== '' ? 'rated' : ''}">
  <button
    class="rating-button rating-up-button {chosenRating === 'up'
      ? 'isActive'
      : ''}"
    aria-label="Vota positivo"
    onclick={() => {
      submitRating("up");
    }}
  >
    <svg class="rating-icon rating-up-icon">
      <use href="/icons/icon-set.svg#thumb" />
    </svg>
    <span class="rating-value">{newRating.up}</span>
  </button>
  <button
    class="rating-button rating-down-button {chosenRating === 'down'
      ? 'isActive'
      : ''}"
    aria-label="Vota negativo"
    onclick={() => {
      submitRating("down");
    }}
  >
    <svg class="rating-icon rating-down-icon">
      <use href="/icons/icon-set.svg#thumb" />
    </svg>
    <span class="rating-value">{newRating.down}</span>
  </button>
</div>

<style>
  @keyframes up-rating-animation {
    0% {
      transform: scale(0.7) rotate(180deg);
    }
    33% {
      transform: scale(1.2) rotate(180deg);
    }
    66% {
      transform: scale(0.9) rotate(180deg);
      fill: var(--green-600);
    }
    100% {
      transform: scale(1) rotate(180deg);
      fill: var(--green-600);
    }
  }
  @keyframes down-rating-animation {
    0% {
      transform: scale(0.7);
    }
    33% {
      transform: scale(1.2);
    }
    66% {
      transform: scale(0.9);
      fill: var(--red-600);
    }
    100% {
      transform: scale(1);
      fill: var(--red-600);
    }
  }

  .rating-buttons {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    &.rated {
      pointer-events: none;
      opacity: 0.6;
    }
    .rating-button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border: none;
      background-color: transparent;
      font-size: 0.6rem;
      .rating-icon {
        width: 20px;
        aspect-ratio: 1/1;
      }
    }
    .rating-up-button {
      .rating-icon {
        transform: rotate(180deg);
      }
      &.isActive .rating-icon {
        animation: 0.5s up-rating-animation forwards;
      }
    }
    .rating-down-button {
      &.isActive .rating-icon {
        animation: 0.5s down-rating-animation forwards;
      }
    }
  }
</style>
