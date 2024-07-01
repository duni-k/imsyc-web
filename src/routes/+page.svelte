<script>
  import workData from "../data/workData.json"
  import Flipcard from "$lib/Flipcard.svelte"
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
          <svg class="icon" viewBox="0 0 32 32">
            <path
              d="M29.7143 0H2.27857C1.02143 0 0 1.03571 0 2.30714V29.6929C0 30.9643 1.02143 32 2.27857 32H29.7143C30.9714 32 32 30.9643 32 29.6929V2.30714C32 1.03571 30.9714 0 29.7143 0ZM9.67143 27.4286H4.92857V12.1571H9.67857V27.4286H9.67143ZM7.3 10.0714C5.77857 10.0714 4.55 8.83571 4.55 7.32143C4.55 5.80714 5.77857 4.57143 7.3 4.57143C8.81429 4.57143 10.05 5.80714 10.05 7.32143C10.05 8.84286 8.82143 10.0714 7.3 10.0714ZM27.45 27.4286H22.7071V20C22.7071 18.2286 22.6714 15.95 20.2429 15.95C17.7714 15.95 17.3929 17.8786 17.3929 19.8714V27.4286H12.65V12.1571H17.2V14.2429H17.2643C17.9 13.0429 19.45 11.7786 21.7571 11.7786C26.5571 11.7786 27.45 14.9429 27.45 19.0571V27.4286Z"
            />
          </svg>
        </a>
        <a class="ext-link" href="mailto:imsyc1992@gmail.com">
          <svg class="icon" viewBox="0 0 32 32">
            <path
              d="M3 0C1.34375 0 0 1.79167 0 4C0 5.25833 0.44375 6.44167 1.2 7.2L14.6786 18.75C15.3911 19.4583 16.3661 19.4583 17.0786 18.75L30.8 7.2C31.5562 6.44167 32 5.25833 32 4C32 1.79167 30.6563 0 29 0H3ZM0 11.2143V26.6667C0 29.6083 1.79375 32 4 32H28C30.2063 32 32 29.6083 32 26.6667V11.5357L18.4 22.9333C16.975 24.3583 15.025 24.3583 13.6 22.9333L0 11.2143Z"
            />
          </svg>
        </a>
      </div>
    </div>

    <div class="highlights__container">
      <h1 class="highlights__title">HIGHLIGHTS</h1>
      <ul class="highlights">
        {#each Object.entries(workData).filter(([_, data]) => data.isHighlight) as [employer, data]}
          {@const thumbnail =
            "/images/" + data.href + "/" + data.href + "-thumbnail.png"}
          <li class="highlight">
            <a href={data.href} class="thumbnail-container">
              <img class="thumbnail" src={thumbnail} alt={employer} />
              <!-- svelte-ignore a11y-missing-attribute -->
              <img class="arrow" src="/images/thumbnail-arrow.svg" />
            </a>
            <div class="flipcard">
              <Flipcard {data} title={employer} />
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .landing {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100vh;
  }

  .motto {
    margin: auto;
    font-weight: 700;
    font-size: 48px;
    text-align: center;
    text-transform: uppercase;

    color: #1d3557;
  }

  .footer {
    position: absolute;
    z-index: 0;
    bottom: var(--padding);
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

  .highlights__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 30%;
    height: 100%;
    padding-right: var(--padding);
  }

  .highlights__title {
    font-family: "Syncopate";
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 19px;
    text-align: end;
  }

  .highlights {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 5%;
  }

  .highlight {
    position: relative;
    width: 96px;
    height: 96px;
  }

  .thumbnail-container {
    position: relative;
    width: 96px;
    height: 96px;
  }

  .thumbnail {
    border-radius: var(--border-radius);
    height: 100%;
    width: 100%;
    transition: all 0.6s;
    object-fit: cover;
  }

  .highlight:hover .thumbnail {
    -webkit-filter: brighness(0.5) blur(1px);
    filter: brightness(0.5) blur(1px);
  }

  .arrow {
    display: none;
    position: absolute;
    opacity: 0;
    left: 40px;
    bottom: 44px;
    transition-property: display opacity left;
    transition-duration: 0.4s;
    transition-delay: 0.5s;
    transition-behavior: allow-discrete;
    transition-timing-function: ease-out;
  }
  .highlight:hover .arrow {
    display: block;
    left: 40px;
    opacity: 1;
    transition-delay: 0s;

    @starting-style {
      left: 0;
      opacity: 0;
    }
  }

  .popout {
    font-family: "Chango";
    font-size: 128px;
    color: var(--highlight-primary);
  }

  .icon {
    fill: var(--text-primary);
    transition: fill 0.5s;
  }
  .icon:hover {
    fill: var(--highlight-primary);
  }

  .flipcard {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    right: 0px;
    bottom: 100px;
    height: 525px;
    width: 425px;
    transition-property: opacity, visibility, right, bottom;
    transition-behavior: allow-discrete;
    transition-duration: 0.6s;
    transition-delay: 0.5s;
  }

  .highlight:hover > .flipcard {
    display: block;
    visibility: visible;
    opacity: 1;
    right: 50px;
    bottom: 200px;
    transition-duration: 0.6s;
    transition-delay: 0s;

    @starting-style {
      right: 0;
      bottom: 200px;
    }
  }

  .flipcard:hover {
    display: block;
  }
</style>
