<script>
  import "../app.css"

  import Flipcard from "$lib/Flipcard.svelte"
  import Link from "$lib/Link.svelte"
  import workData from "../data/workData.json"

  import { onMount } from "svelte"
  import { fade } from "svelte/transition"

  let showMyWork = false
  let currentItem = getRandomWorkItem()

  export let data

  function getRandomWorkItem() {
    return Object.values(workData)[Math.floor(Math.random() * workData.length)]
  }

  function myworkClickHandler() {
    showMyWork = !showMyWork
    currentItem = getRandomWorkItem()
  }

  $: carouselBackground =
    "/images/" + currentItem.href + "/" + currentItem.href + "-showcase.png"

  onMount(() => {
    let carousel = document.getElementById("carousel")
    if (carousel === null) {
      return
    }

    carousel.scrollLeft = carousel.scrollWidth / 2

    window.addEventListener("wheel", (e) => {
      carousel.scrollBy(e.deltaY, 0)

      if (carousel.scrollLeft >= 4175) {
        carousel.scrollLeft = 1200
      } else if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = carousel.scrollWidth / 2
      }
    })
  })

  // hiding scrollbar when scrolling down, showing it when
  // scrolling up
  let scrollY
  let hideNav = false
  let lastY = 0
  let tolerance = 15
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

  $: hideNav = updateY(scrollY)
  $: inParams = showMyWork ? { duration: 0 } : { duration: 200, delay: 300 }
  $: outParams = showMyWork ? { duration: 0 } : { duration: 200 }
</script>

<svelte:window
  on:wheel|nonpassive={(e) => {
    if (showMyWork) e.preventDefault()
  }}
  bind:scrollY
/>

<body>
  <div class="nav-container" class:hideNav>
    <nav class="navbar primary-palette">
      <div class="name">
        <a href="/" style="">STELLA HSIAO</a>
      </div>
      <button
        class="workHandle"
        on:click={myworkClickHandler}
        style={"margin-right:" +
          (data.pathname == "/"
            ? "var(--padding);"
            : "calc(var(--padding) - var(--scrollbar-width));")}
      >
        <Link strokeColor="var(--text-primary)"
          ><span class="desktop-work-prefix">MY</span> WORK</Link
        >
      </button>
    </nav>

    <!-- absolute position -->
    <div
      class="carousel-container{showMyWork ? '--show' : ''} secondary-palette"
    >
      <nav class="navbar secondary-palette">
        <a class="name" href="/" on:click={myworkClickHandler}>STELLA HSIAO</a>
        <button
          class="workHandle"
          on:click={myworkClickHandler}
          style={"margin-right:" +
            (data.pathname == "/"
              ? "var(--padding);"
              : "calc(var(--padding) - var(--scrollbar-width));")}
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
          {#each workData as data (data)}
            <div
              class="carousel-item"
              on:mouseenter={() => (currentItem = data)}
              role="listitem"
            >
              <Flipcard blur={true} {data} click={myworkClickHandler} />
            </div>
          {/each}
          {#each workData as data (data)}
            <div
              class="carousel-item"
              on:mouseenter={() => (currentItem = data)}
              role="listitem"
            >
              <Flipcard blur={true} {data} click={myworkClickHandler} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  {#key data.pathname}
    <div id="page-content" in:fade={inParams} out:fade={outParams}>
      <slot />
    </div>
  {/key}
</body>

<style>
  #page-content {
    position: relative;
    z-index: 1;
  }
  .nav-container {
    position: fixed;
    z-index: 2;
    width: 100%;
  }

  .navbar {
    width: 100%;
    height: var(--navbar-height);
    display: flex;
    flex-direction: row;
    font-family: "Syncopate";
    font-weight: bold;
    justify-content: space-between;
    background: transparent;
    mix-blend-mode: difference;
  }

  .workHandle,
  .name {
    color: inherit;
    display: inline-block;
    font-size: 24px;
  }

  .workHandle {
    padding-right: var(--padding);
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
  }

  .name {
    display: flex;
    align-items: center;
    margin-left: var(--padding);
    transition: color 0.5s;
  }
  .name:hover {
    color: var(--highlight-primary);
  }

  .carousel-container {
    position: fixed;
    top: 100vh;
    height: 100vw;
    width: 100%;
    transition: transform 0.8s;
  }

  .carousel-container--show {
    position: absolute;
    top: 100vh;
    width: 100%;
    height: 100vh;
    transition: transform 0.6s;
    transform: translateY(-100vh);
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

  @media only screen and (max-width: 767px) {
    .workHandle,
    .name {
      font-size: 16px;
    }
    .desktop-work-prefix {
      display: none;
    }

    .nav-container {
      transition: transform 200ms linear;
    }
    .hideNav {
      transform: translateY(-100px);
      transition: transform 200ms linear;
    }
  }
</style>
