<script>
  import { run, nonpassive } from 'svelte/legacy';

  import "../app.css"

  import { Flipcard, Link } from "$lib/index.js"
  import workData from "../data/workData.json"

  import { onMount } from "svelte"
  import { fade, slide } from "svelte/transition"

  let showMyWork = $state(false)
  let currentItem = $state(getRandomWorkItem())

  let { data, children } = $props();

  function getRandomWorkItem() {
    return Object.values(workData)[Math.floor(Math.random() * workData.length)]
  }

  function myworkClickHandler() {
    showMyWork = !showMyWork
    currentItem = getRandomWorkItem()
  }

  let carouselBackground =
    $derived("/images/" + currentItem.href + "/" + currentItem.href + "-showcase.png")

  onMount(() => {
    let carousel = document.getElementById("carousel")

    carousel.scrollLeft = carousel.scrollWidth / 2

    window.addEventListener("wheel", (e) => {
        carousel.scrollBy(e.deltaY, 0);

      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0
      } else if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = carousel.scrollWidth / 2
      }
    })
  })

  // hiding scrollbar when scrolling down,
  // showing it when scrolling up
  let scrollY = $state()
  let hideNav = $state(false)
  let lastY = 0
  let tolerance = 0
  let offset = 100

  function updateY(y) {
    const dy = lastY - y
    lastY = y
    return hide(y, dy)
  }

  function hide(y, dy) {
    // show if at the top of page
    if (y < offset) {
      return false
    }

    // don't change the state unless scroll delta
    // is above a threshold
    if (Math.abs(dy) <= tolerance) {
      return hideNav
    }

    // if scrolling up, show
    if (dy < 0) {
      return true
    }

    // if scrolling down, hide
    return false
  }

  let scrollBarMargin = $derived(data.pathname !== "/")
  run(() => {
    hideNav = updateY(scrollY)
  });
  let inParams = $derived(showMyWork ? {axis: "y", duration: 0 } : {axis: "x", duration: 200, delay: 300 })
  let outParams = $derived(showMyWork ? {axis: "y", duration: 0 } : {axis: "x", duration: 200 })
</script>

<svelte:window
  use:nonpassive={['dragover', () => (e) => {if (showMyWork) e.preventDefault()}]}
  use:nonpassive={['touchemove', () => (e) => {if (showMyWork) e.preventDefault()}]}
  use:nonpassive={['drag', () => (e) => {if (showMyWork) e.preventDefault()}]}
  use:nonpassive={['wheel', () => (e) => {if (showMyWork) e.preventDefault()}]}
  bind:scrollY
/>

<nav class=secondary-palette>
  <nav class="navbar" class:hideNav>
    <a class="name" href="/" style="">STELLA HSIAO</a>
    <button
      class="workHandle"
      onclick={myworkClickHandler}
    >
      <Link strokeColor="var(--text-primary)"
        ><span class="desktop-work-prefix">MY</span> WORK</Link
      >
    </button>
  </nav>

    <!-- absolute position -->
  <div
    class="carousel-container{showMyWork ? '--show' : ''}"
  >
    <nav class="navbar--alt">
      <a class="name" href="/" onclick={myworkClickHandler}>STELLA HSIAO</a>
      <button
        class="workHandle"
        class:scrollBarMargin
        onclick={myworkClickHandler}
        style="}"
      >
        <Link strokeColor="var(--text-secondary)">CLOSE</Link>
      </button>
    </nav>
    {#key carouselBackground}
      <img
        class="carousel-background"
        src={carouselBackground}
        alt="carousel background"
        transition:fade={{ duration: 600 }}
      />
    {/key}
    <div id="carousel">
      <div class="carousel__inner">
        {#each workData.concat(workData) as data}
          <div
            class="carousel-item"
            onmouseenter={() => (currentItem = data)}
            role="listitem"
          >
            <Flipcard blur={true} {data} click={myworkClickHandler} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</nav>

{#key data.pathname}
  <div id="page-content" in:slide={inParams} out:slide={outParams}>
    {@render children?.()}
  </div>
{/key}

<style>
  #page-content {
    position: relative;
    width: 100%;
  }

  .navbar {
    position: fixed;
  }

  .navbar,
  .navbar--alt {
    z-index: 98;
    width: 100%;
    height: var(--navbar-height);
    display: flex;
    flex-direction: row;
    font-family: "Syncopate";
    font-weight: bold;
    justify-content: space-between;
    background: transparent;
    mix-blend-mode: difference;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
  }

  .workHandle,
  .name {
    color: inherit;
    display: inline-block;
    font-size: 24px;
  }

  .workHandle {
    text-align: end;
    padding-right: var(--padding);
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
  }

  .name {
    display: flex;
    align-items: center;
    transition: color 0.5s;
    padding-left: var(--padding);
  }
  .name:hover {
    color: var(--highlight-primary);
  }

  .carousel-container,
  .carousel-container--show {
    z-index: 99;
  }

  .carousel-container {
    position: fixed;
    top: calc(100vh + 100px);
    height: 100vw;
    width: 100%;
    transition: transform 0.8s;
  }

  .carousel-container--show {
    position: fixed;
    top: 110vh;
    width: 100%;
    height: 100vh;
    transition: transform 0.6s;
    transform: translate3d(0, -110vh, 0);
    overflow: hidden;
  }

  #carousel {
    height: 100%;
    overflow-x: auto;
  }

  .carousel__inner {
    display: flex;
    height: 100%;
    width: min-content;
    align-items: center;
    overflow-x: auto;
    gap: 24px;
  }

  .carousel-item {
    width: 425px;
    height: 600px;
    border-radius: var(--border-radius);
  }

  .carousel-background {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    transition: opacity;
  }

  .desktop-work-prefix {
    display: inline-block;
  }

  .scrollBarMargin {
    margin-right: calc(var(--padding) - var(--scrollbar-width));
  }

  @media only screen and (max-width: 767px) {
    .workHandle,
    .name {
      font-size: 16px;
    }

    .desktop-work-prefix {
      display: none;
    }

    .hideNav {
      transform: translate3d(0,-100px,0);
      transition: transform 200ms linear;
    }

    .carousel__inner {
      gap: 12px;
    }

    .carousel-item {
      width: 250px;
      height: 350px;
      border-radius: var(--border-radius);
    }
  }
</style>
