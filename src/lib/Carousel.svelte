<script>
  export let title
  export let images
  export let backgroundColor = "var(--background-seondary)"
  export let duration = 12
  export let color = "var(--text-secondary)"
</script>

<div
  class="carousel-container"
  style:color
  style:backgroundColor
>
  <div class="carousel__outer">
    <h2>{title}</h2>
    <div
      class="carousel__inner"
      style="animation-duration: {duration}s; animation-name: slide-{Object.keys(
        images
      ).length}"
    >
      {#each images as { src, alt }}
        <img {src} {alt} />
      {/each}
    </div>
  </div>
</div>

<style>
  h2 {
    font-size: 16px;
    text-align: end;
    padding-bottom: 16px;
  }

  .carousel-container {
    width: 100vw;
    height: 484px;
    position: relative;
    overflow: hidden;
  }

  .carousel__outer {
    margin: auto;
    margin-left: 64px;
    margin-right: 64px;
    overflow: hidden;
  }

  .carousel__inner {
    display: flex;
    gap: 48px;
    height: 450px;
    animation-delay: 1s;
    animation-iteration-count: infinite;
  }
  .carousel__inner:hover {
    animation-play-state: paused;
  }

  @media only screen and (max-width: 767px) {
    h2 {
      text-align: start;
    }

    .carousel-container {
      height: 175px;
    }
    .carousel__inner {
      display: flex;
      gap: 14px;
      height: 150px;
    }

    .carousel__outer {
      margin: auto;
      overflow: hidden;
    }
  }

  @keyframes -global-slide-3 {
    10% {
      transform: none;
    }
    40% {
      transform: translate(-20%);
    }
    70% {
      transform: translate(-40%);
    }
    100% {
      transform: translate(-60%);
    }
  }

  @keyframes -global-slide-4 {
    10% {
      transform: none;
    }
    32.5% {
      transform: translate(-20%);
    }
    55% {
      transform: translate(-60%);
    }
    77.5% {
      transform: translate(-80%);
    }
    100% {
      transform: translate(-100%);
    }
  }

  @keyframes -global-slide-5 {
    10% {
      transform: none;
    }
    28% {
      transform: translate(-30%);
    }
    46% {
      transform: translate(-60%);
    }
    64% {
      transform: translate(-90%);
    }
    82% {
      transform: translate(-120%);
    }
    100% {
      transform: translate(-150%);
    }
  }
</style>
