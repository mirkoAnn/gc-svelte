<script lang="ts">
  import gsap from "gsap/dist/gsap";
  import { casinosDataManager } from "./casinos-data-manager.svelte";
  import RadialChart from "../graphics/charts/radial-chart.svelte";

  let {
    casinos,
    ratingsShouldBeShown = false,
  }: { casinos: any; ratingsShouldBeShown?: boolean } = $props();

  let areBonusInfosVisible: boolean = $state(false);

  const toogleBonusDisclaimer = (casinoId: string) => {
    areBonusInfosVisible = !areBonusInfosVisible;
    const disclaimer = document.getElementById(`bonus-info-${casinoId}`);
    if (disclaimer) {
      gsap
        .timeline()
        .to(disclaimer, {
          height: areBonusInfosVisible ? "auto" : 0,
          autoAlpha: areBonusInfosVisible ? 1 : 0,
        })
        .to(
          `#info-button-${casinoId} .casino-card-info-icon-open`,
          {
            scale: areBonusInfosVisible ? 0 : 1,
            autoAlpha: areBonusInfosVisible ? 0 : 1,
          },
          "<",
        )
        .to(
          `#info-button-${casinoId} .casino-card-info-icon-close`,
          {
            scale: areBonusInfosVisible ? 1 : 0,
            autoAlpha: areBonusInfosVisible ? 1 : 0,
          },
          "<",
        );
    }
  };
</script>

<div class="casino-cards">
  {#each casinos as casino}
    <div
      class="casino-card"
      style="--bg-color: {casino.colors.background}; --text-color: {casino
        .colors.text}"
    >
      <a
        class="casino-card-link"
        href={`/casino-online/${casino.slug}`}
        title={`Scopri di più su${casino.title}`}
      >
        <div class="casino-card-header">
          <img
            class="casino-card-logo"
            src={casino.logo.url}
            alt={`Logo di ${casino.title}`}
            width={150}
            height={50}
          />
        </div>
        <div class="casino-card-body">
          <ul class="casino-card-bonus">
            <li class="casino-card-bonus-item">
              {casino.welcomeBonus.noDeposit}
            </li>
            <li class="casino-card-bonus-item">
              {casino.welcomeBonus.withDeposit}
            </li>
          </ul>
        </div>
        {#if ratingsShouldBeShown}
          <div class="casino-card-graph">
            <RadialChart
              data={[
                casinosDataManager.getCasinoById(casino.id).info.bonusRating,
                casinosDataManager.getCasinoById(casino.id).info.designRating,
                casinosDataManager.getCasinoById(casino.id).info.mobileRating,
                casinosDataManager.getCasinoById(casino.id).info.gamesRating,
                casinosDataManager.getCasinoById(casino.id).info.supportRating,
              ]}
              labels={["Bonus", "Design", "Mobile", "Giochi", "Supporto"]}
              textColor={casino.colors.text}
            />
          </div>
        {/if}
        <div id={`bonus-info-${casino.id}`} class="bonus-info-disclaimer">
          <span class="bonus-info-disclaimer-title"
            >Requisiti senza deposito:</span
          >
          <span class="bonus-info-disclaimer-list-item">
            {casino.welcomeBonus.noDepositRequirements}
          </span>
          <span class="bonus-info-disclaimer-title"
            >Requisiti con deposito:</span
          >
          <span class="bonus-info-disclaimer-list-item">
            {casino.welcomeBonus.withDepositRequirements}
          </span>
        </div>
      </a>
      <div class="casino-card-info-container">
        <div class="casino-card-info-container-inner">
          <button
            id={`info-button-${casino.id}`}
            onclick={() => {
              toogleBonusDisclaimer(casino.id);
            }}
            class="casino-card-info-button"
            aria-label={`Info su ${casino.title}`}
          >
            <svg
              class="casino-card-info-icon casino-card-info-icon-open"
              width="20"
              height="20"
            >
              <use href="/icons/icon-set.svg#info" />
            </svg>
            <svg
              class="casino-card-info-icon casino-card-info-icon-close"
              width="20"
              height="20"
            >
              <use href="/icons/icon-set.svg#close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .casino-cards {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 24px;
    margin: 24px auto;
    .casino-card {
      position: relative;
      width: 100%;
      max-width: 300px;
      background-color: var(--bg-color);
      color: var(--text-color);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.05);
      }
      .casino-card-link {
        text-decoration: none;
        color: inherit;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .casino-card-logo {
          max-width: 100%;
          height: auto;
        }
        .casino-card-bonus {
          list-style-type: none;
          padding: 0;
          margin: 0;
          text-align: center;
        }
        .casino-card-bonus-item {
          font-weight: bold;
        }
        .bonus-info-disclaimer {
          overflow: hidden;
          height: 0;
          opacity: 0;
          visibility: hidden;
          margin-top: 8px;
          font-size: 0.7em;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 8px;
          .bonus-info-disclaimer-title {
            font-weight: bold;
            margin-top: 8px;
          }
        }
        .casino-card-graph {
          padding: 0 24px;
        }
      }
      .casino-card-info-container {
        position: absolute;
        top: -1px;
        right: 0;
        .casino-card-info-container-inner {
          position: relative;
          background-color: var(--light-brown-900);
          border-bottom-left-radius: 12px;
          border-top-right-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          .casino-card-info-button {
            position: relative;
            width: 30px;
            height: 30px;
            background: none;
            color: var(--bg-color);
            border: none;
            cursor: pointer;
            .casino-card-info-icon {
              position: absolute;
              top: 5px;
              left: 5px;
              width: 20px;
              height: 20px;
            }
            .casino-card-info-icon-close {
              transform: scale(0);
              opacity: 0;
              visibility: hidden;
            }
          }
          &::before,
          &::after {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: inherit;
            mask-image: url("/icons/rounded-corner.svg");
            transform: rotate(270deg);
          }
          &::before {
            top: 0;
            left: -20px;
          }
          &::after {
            bottom: -20px;
            right: 0;
          }
        }
      }
    }
    @media (max-width: 767px) {
      justify-content: center;
    }
  }
</style>
