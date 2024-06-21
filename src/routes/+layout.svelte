<script>
  import { onMount } from "svelte";

  import Flipcard from "$lib/Flipcard.svelte";
  import Link from "$lib/Link.svelte";
  import "../app.css";
  import workData from "../data/workData.json";

  let showMyWork = false;
  function myworkClickHandler() {
    showMyWork = !showMyWork;
  }

  onMount(() => {
    const carousel = document.getElementById("carousel");

    window.addEventListener("wheel", (e) => {
      carousel.scrollBy(e.deltaY, 0);
    });
  });
</script>

<nav class="navbar primary-palette">
  <div class="name"><Link href="/" strokeColor="var(--text-primary)">STELLA HSIAO</Link></div>
  <button class="workHandle" on:click={myworkClickHandler}>
    <Link strokeColor="var(--text-primary)">MY WORK</Link>
  </button>
</nav>

<slot />

<div class="carousel-container{showMyWork ? '--show' : ''} secondary-palette">
  <nav class="navbar">
    <div class="name"><Link href="/" strokeColor="var(--text-secondary)">STELLA HSIAO</Link></div>
    <button class="workHandle" on:click={myworkClickHandler}>
      <Link strokeColor="var(--text-secondary)">CLOSE</Link>
    </button>
  </nav>
  <div id="carousel">
    {#each workData as workItem}
      <div class="carousel-item">
        <Flipcard>
          <img class="work-img" slot="front" src={workItem.src} alt={workItem.href} />
          <div slot="back">
            <h1>TEST</h1>
          </div>
        </Flipcard>
      </div>
    {/each}
  </div>
</div>

<style>
  .navbar {
    width: 100%;
    height: var(--navbar-height);
    display: flex;
    flex-direction: row;
    font-family: "Syncopate";
    font-size: 24px;
    font-weight: bold;
    justify-content: space-between;
  }

  .workHandle {
    display: inline-block;
    text-align: start;
    font-family: inherit;
    background-color: inherit;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
    margin-right: var(--padding);
  }

  .name {
    display: inline-block;
    display: flex;
    align-items: center;
    margin-left: var(--padding);
  }

  .carousel-container {
    position: absolute;
    top: 100vh;
    height: 100vh;
    width: 100%;
    transition: transform 0.5s ease;
    transform: translateY(100vh);
  }

  .carousel-container--show {
    position: absolute;
    height: 100%;
    width: 100%;
    transition: transform 0.8s ease;
    transform: translateY(-100vh);
  }

  #carousel {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none; /* Hide the scrollbar for MS Edge */
    scrollbar-width: none; /* Hide the scrollbar for Mozilla Firefox */
  }

  .carousel-item {
    padding-top: 10%;
    width: 425px;
    margin-right: 5px;
    margin-left: 5px;
    border-radius: var(--border-radius);
  }

  .work-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: show;
    border-radius: inherit;
  }
</style>
