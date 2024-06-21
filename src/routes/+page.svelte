<script>
  import { fade, fly } from "svelte/transition";
  import workData from "../data/workData.json";
  import Flipcard from "$lib/Flipcard.svelte";

  /**
   * @type {number | null}
   */
  let active;
  /**
   * @type {HTMLLIElement}
   */
  /**
   * @type {number}
   */
  let floatingCardX;
</script>

<div class="landing primary-palette">
  <div class="motto">
    <h1>
      I CRAFT<br />
      <span class="popout">HEARTFELT</span><br />
      EXPERIENCE
    </h1>
  </div>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="footer">
    <div class="footer-container__left">
      <div class="buttons">
        <a class="ext-link" href="https://se.linkedin.com/in/stellahsiaoyuchen">
          <img src="/images/linkedin.svg" alt="linkedin icon" />
        </a>
        <a class="ext-link" href="mailto:imsyc1992@gmail.com">
          <img src="/images/email.svg" alt="mail icon" />
        </a>
      </div>
    </div>

    <div class="highlights__container">
      <h1 class="highlights__title">HIGHLIGHTS</h1>
      <ul class="highlights">
        {#each workData.slice(0, 4) as highlight, i}
          <li
            class="highlight"
            on:mouseenter={(e) => {
              active = i;
              floatingCardX = e.clientX;
            }}
            on:mouseleave={() => {
              active = null;
            }}
          >
            <img class="thumbnail" src={highlight.src} alt={highlight.employer} />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

{#if active != null}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    in:fly={{ x: 100, y: 100, duration: 500 }}
    out:fade={{ delay: 500 }}
    style="position: absolute; left: {floatingCardX - 425}px; bottom: 182px;"
    on:mouseenter={() => {
      active = active;
    }}
    on:mouseleave={() => {
      active = null;
    }}
  >
    <Flipcard height="525px" width="425px">
      <img
        class="floating-card"
        slot="front"
        src={workData[active].src}
        alt={workData[active].employer}
      />
    </Flipcard>
  </div>
{/if}

<style>
  .landing {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - var(--navbar-height));
  }

  .footer {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: var(--padding);
  }

  .footer-container__left {
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 50%;
  }

  .buttons {
    display: flex;
    gap: 24px;
    padding-left: var(--padding);
  }

  .ext-link {
    width: 32px;
    height: 32px;
    padding-right: 2%;
  }

  .motto {
    display: flex;
    flex-direction: column;
    justify-items: center;
    text-align: center;
    height: 40%;
    padding-top: var(--navbar-height);
    font-family: "Avenir";
    font-weight: bold;
    font-size: 48px;
  }

  .highlights__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: end;
    width: 30%;
    height: 100%;
    padding-right: var(--padding);
  }

  .highlights__title {
    font-family: "Syncopate";
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 5%;
  }

  .highlights {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 5%;
  }

  .highlight {
    width: 96px;
    height: 96px;
  }

  .highlight:hover {
    -webkit-filter: opacity(0.5);
    filter: opacity(0.5);
  }

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .popout {
    font-family: "Chango";
    font-size: 128px;
    color: var(--highlight-primary);
  }

  .floating-card {
    width: 425px;
    height: 526px;
    border-radius: var(--border-radius);
  }
</style>
