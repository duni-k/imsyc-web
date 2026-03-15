<script lang="ts">
  import { onMount } from "svelte"
  import LetterReveal from "$lib/LetterReveal.svelte"

  let {
    project,
    active = false,
    onopen,
    onclose
  } = $props<{
    project: {
      name: string
      href: string
      index: string
      description: string
      role: string
      tags: string[]
      content: string[]
      country?: string
      industry?: string
    }
    active?: boolean
    onopen?: () => void
    onclose?: () => void
  }>()

  let flipped = $derived(parseInt(project.index) % 2 === 0)
  let hero = $derived(`/hero_images/${project.href}_hero.png`)
  let el: HTMLElement
  let imgY = $state(0)
  let contentEl: HTMLDivElement | undefined = $state(undefined)
  let overscroll = $state(0)
  let smoothProgress = $state(0)
  let rafId = 0

  function lerp() {
    const target = Math.min(overscroll / 1000, 1)
    smoothProgress += (target - smoothProgress) * 0.08
    if (Math.abs(target - smoothProgress) > 0.001) {
      rafId = requestAnimationFrame(lerp)
    } else {
      smoothProgress = target
    }
  }

  $effect(() => {
    // trigger lerp whenever overscroll changes
    void overscroll
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(lerp)
  })

  onMount(() => {
    const scroller = el.closest(".list") ?? window

    const onScroll = () => {
      if (active) return
      const rect = el.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      imgY = -offset * 0.3
    }

    const onWheel = (e: WheelEvent) => {
      if (!active || !contentEl) return

      if (!contentEl.contains(e.target as Node)) {
        contentEl.scrollBy({ top: e.deltaY * 2 })
      }

      const atBottom =
        contentEl.scrollTop + contentEl.clientHeight >=
        contentEl.scrollHeight - 2

      if (atBottom && e.deltaY > 0) {
        overscroll += e.deltaY
        if (overscroll > 2000) {
          overscroll = 0
          onclose?.()
        }
      } else {
        overscroll = 0
      }
    }

    let lastTouchY = 0

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!active || !contentEl) return
      const dy = lastTouchY - e.touches[0].clientY
      lastTouchY = e.touches[0].clientY

      const atBottom =
        contentEl.scrollTop + contentEl.clientHeight >=
        contentEl.scrollHeight - 2

      if (atBottom && dy > 0) {
        overscroll += dy * 3
        if (overscroll > 2000) {
          overscroll = 0
          onclose?.()
        }
      } else {
        overscroll = 0
      }
    }

    scroller.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    onScroll()

    return () => {
      scroller.removeEventListener("scroll", onScroll)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }
  })
</script>

<div
  class="project"
  class:active
  class:flipped
  bind:this={el}
  role="button"
  tabindex="0"
  onclick={() => !active && onopen?.()}
  onkeydown={(e) => e.key === "Enter" && !active && onopen?.()}
>
  <div class="img-side" bind:this={contentEl}>
    <img class="hero" src={hero} alt={project.name} />
    {#if active}
      {#each project.content as src}
        {#if src.endsWith(".webm") || src.endsWith(".mp4")}
          <div class="video-wrap">
            <video {src} autoplay loop muted playsinline></video>
          </div>
        {:else}
          <img {src} alt={project.name} />
        {/if}
      {/each}
    {/if}
  </div>

  <div class="info-side">
    {#if active}
      <div class="header">
        <h1 class="detail-name"><LetterReveal text={project.name} /></h1>
        <span class="detail-index"
          ><LetterReveal
            text={project.index}
            baseDelay={project.name.length * 30}
          /></span
        >
      </div>

      <p class="description">
        <LetterReveal
          text={project.description}
          baseDelay={200}
          staggerDelay={10}
        />
      </p>

      <div class="meta">
        <p class="role">
          <LetterReveal text={project.role} baseDelay={400} staggerDelay={15} />
        </p>
        <div class="tags">
          {#each project.tags as tag, i}
            {#if i > 0}<span class="divider">|</span>{/if}
            <span class="tag"
              ><LetterReveal
                text={tag}
                baseDelay={500 + i * 100}
                staggerDelay={15}
              /></span
            >
          {/each}
        </div>
      </div>

      <button
        class="back"
        style="background: linear-gradient(to right, var(--text-primary) {smoothProgress *
          100}%, transparent {smoothProgress * 100}%); color: {smoothProgress >
        0.5
          ? 'var(--background-extended)'
          : 'var(--text-primary)'}"
        onclick={(e) => {
          e.stopPropagation()
          onclose?.()
        }}>BACK</button
      >
    {:else}
      <span class="card-index"
        ><LetterReveal text={String(project.index)} /></span
      >
      <span class="card-name">
        <LetterReveal
          text={project.name}
          baseDelay={String(project.index).length * 30}
        />
      </span>
    {/if}
  </div>
</div>

<style>
  .project {
    position: relative;
    width: 100%;
    height: 100vh;
    flex-shrink: 0;
    overflow: hidden;
    cursor: pointer;
    scroll-snap-align: start;
    background-color: var(--background-primary);
    transition: background-color 0.5s ease;
  }

  .project.active {
    display: grid;
    grid-template-columns: 1fr 1fr;
    cursor: default;
    background-color: var(--background-extended);
  }

  .img-side {
    width: 50%;
    height: 100%;
    overflow: hidden;
  }

  .active .img-side {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }

  .active .img-side::-webkit-scrollbar {
    display: none;
  }

  .hero {
    width: 100%;
    height: 120%;
    object-fit: cover;
    object-position: center;
    will-change: transform;
    transition: height 0.5s ease;
  }

  .active .hero {
    height: 100vh;
  }

  .active .img-side img:not(.hero),
  .active .video-wrap {
    width: 100%;
    object-fit: contain;
    background: #1c1c1c;
  }

  .active .video-wrap video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .info-side {
    position: absolute;
    bottom: 32px;
    left: calc(50% + 16px);
    right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 24px;
    color: var(--text-primary);
    transition:
      left 0.5s ease,
      right 0.5s ease,
      bottom 0.5s ease;
  }

  .active .info-side {
    position: static;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    padding: calc(var(--padding) / 2);
    padding-top: calc(var(--padding) + var(--navbar-height));
    overflow: hidden;
    box-sizing: border-box;
  }

  .card-index,
  .card-name {
    font-family: "Satoshi";
    font-size: 3.8rem;
    font-weight: 900;
    display: inline-flex;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
  }

  .detail-name,
  .detail-index {
    font-family: "Satoshi";
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
  }

  .description {
    font-family: "Satoshi";
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.6;
    max-width: 480px;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag,
  .role {
    font-family: "Satoshi";
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .divider {
    font-size: 1.2rem;
    opacity: 0.3;
  }

  .back {
    font-family: "Satoshi";
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    align-self: flex-start;
    padding: 8px 16px;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  .flipped .img-side {
    position: absolute;
    right: 0;
  }

  .flipped .info-side {
    left: 0;
    right: 50%;
    flex-direction: row-reverse;
  }

  .flipped.active .img-side {
    position: static;
    order: 2;
  }

  .flipped.active .info-side {
    order: 1;
    flex-direction: column;
  }

  .flipped.active .header {
    flex-direction: row-reverse;
  }

  .flipped.active .back {
    align-self: flex-end;
  }

  @media only screen and (max-width: 768px) {
    .project {
      aspect-ratio: 3 / 4;
    }

    .img-side {
      width: 100%;
      height: 60%;
      position: absolute;
      top: 0;
    }

    .info-side {
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;
      padding: 0;
      flex-direction: row;
      align-items: baseline;
      justify-content: space-between;
    }

    .flipped .img-side {
      right: auto;
      position: absolute;
      top: 0;
    }

    .flipped .info-side {
      left: 16px;
      right: 16px;
      bottom: 16px;
      flex-direction: row;
      align-items: baseline;
    }

    .card-index,
    .card-name {
      font-size: 2.5rem;
    }

    .project.active {
      display: flex;
      flex-direction: column;
      height: 100%;
      aspect-ratio: unset;
    }

    .active .img-side {
      position: static;
      height: 75%;
      overflow-y: auto;
      flex-shrink: 0;
    }

    .active .hero {
      height: auto;
    }

    .active .img-side img:not(.hero),
    .active .video-wrap {
      height: auto;
    }

    .active .info-side {
      position: static;
      height: 25%;
      padding: var(--padding);
      padding-top: calc(var(--padding) + var(--navbar-height));
      order: -1;
      overflow: hidden;
      box-sizing: border-box;
    }

    .active .header {
      flex-direction: row;
    }

    .detail-name,
    .detail-index {
      font-size: 2.4rem;
    }

    .description {
      font-size: 1.6rem;
      line-height: 1.4;
    }

    .tag,
    .role {
      font-size: 1rem;
    }

    .back {
      font-size: 1.4rem;
    }

    .flipped.active .img-side,
    .flipped.active .info-side {
      order: unset;
    }

    .flipped.active .info-side {
      order: -1;
    }

    .flipped.active .header {
      flex-direction: row;
    }
  }
</style>
