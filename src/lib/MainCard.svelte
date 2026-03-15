<script lang="ts">
  import { onMount } from "svelte"
  import LetterReveal from "$lib/LetterReveal.svelte"

  let { img, index, name, href } = $props()

  let flipped = $derived(index % 2 === 0)
  let card: HTMLAnchorElement
  let imgY = $state(0)

  onMount(() => {
    const scroller = card.closest(".list") ?? window
    const onScroll = () => {
      const rect = card.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      imgY = -offset * 0.3
    }

    scroller.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => scroller.removeEventListener("scroll", onScroll)
  })
</script>

<a class="card" class:flipped bind:this={card} href="/{href}">
  <div class="img-container" style="view-transition-name: project-img-{href}">
    <img src={img} alt={name} style="transform: translateY({imgY}px)" />
  </div>
  <div class="info" style="view-transition-name: project-info-{href}">
    <span class="index"><LetterReveal text={String(index)} /></span>
    <span class="name"
      ><LetterReveal text={name} baseDelay={String(index).length * 30} /></span
    >
  </div>
</a>

<style>
  a.card {
    display: block;
    text-decoration: none;
  }

  .card {
    position: relative;
    width: 100%;
    height: 100vh;
    flex-shrink: 0;
    scroll-snap-align: start;
    background-color: var(--background-primary);
    overflow: hidden;
  }

  .img-container {
    width: 50%;
    height: 100%;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 120%;
    object-fit: cover;
    object-position: center;
    will-change: transform;
  }

  .info {
    position: absolute;
    bottom: 32px;
    left: calc(50% + 16px);
    right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 24px;
    color: var(--text-primary);
  }

  .flipped .img-container {
    position: absolute;
    right: 0;
  }

  .flipped .info {
    left: 0;
    right: 50%;
    flex-direction: row-reverse;
  }

  .index,
  .name {
    font-family: "Satoshi";
    font-size: 3.8rem;
    font-weight: 900;
    display: inline-flex;
  }

  @media only screen and (max-width: 768px) {
    .card {
      aspect-ratio: 3 / 4;
    }

    .img-container {
      width: 100%;
      height: 60%;
      position: absolute;
      top: 0;
    }

    .info {
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;
      padding: 0;
      flex-direction: row;
      align-items: baseline;
      justify-content: space-between;
    }

    .flipped .img-container {
      right: auto;
      position: absolute;
      top: 0;
    }

    .flipped .info {
      left: 16px;
      right: 16px;
      bottom: 16px;
      flex-direction: row;
      align-items: baseline;
    }

    .index,
    .name {
      font-size: 2.5rem;
    }
  }
</style>
