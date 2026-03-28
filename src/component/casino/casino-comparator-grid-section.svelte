<script lang="ts">
  let {
    title,
    comparedCasinoValue,
    currentCasinoValue,
  }: {
    title: string;
    comparedCasinoValue: number;
    currentCasinoValue: number;
  } = $props();
</script>

<div class="casino-comparator-section-inner">
  <div class="casino-comparator-label casino-comparator-bonus-label">
    {title}
  </div>
  <div class="casino-comparator-section-values">
    <div
      class="casino-comparator-value-bar casino-comparator-bonus-bar compared-casino"
      style="--value: {comparedCasinoValue}"
    >
      <span class="casino-comparator-value">{comparedCasinoValue}</span>
    </div>
    <div
      class="casino-comparator-value-bar casino-comparator-bonus-bar current-casino"
      style="--value: {currentCasinoValue}"
    >
      <span class="casino-comparator-value">{currentCasinoValue}</span>
    </div>
  </div>
</div>

<style>
  .casino-comparator-section-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100%;
    .casino-comparator-label {
      font-size: 12px;
      text-transform: uppercase;
      text-align: center;
    }
    .casino-comparator-section-values {
      width: 100%;
      display: flex;
      gap: 16px;
      .casino-comparator-value-bar {
        position: relative;
        width: 100%;
        height: 35px;
        background-color: var(--white-900);
        border-radius: 0 20px 20px 0;
        box-shadow: 2px 0 8px -6px;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: calc(var(--value) * 20%);
          height: 100%;
          background: linear-gradient(
            to right,
            var(--orange-800),
            var(--orange-900)
          );
          border-radius: 0 20px 20px 0;
          transition: 0.5s all ease;
        }
        .casino-comparator-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          font-weight: 600;
          color: var(--white-900);
          z-index: 1;
        }
        &.compared-casino {
          align-items: flex-end;
          border-radius: 20px 0 0 20px;
          box-shadow: -2px 0 8px -6px;
          &::after {
            left: auto;
            right: 0;
            border-radius: 20px 0 0 20px;
            background: linear-gradient(
              to right,
              var(--graph-color),
              var(--graph-color-opacity-500)
            );
          }
        }
      }
    }
  }
</style>
