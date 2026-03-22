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
  let contentItems = $derived([...project.content, hero])
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
      const rect = el.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      imgY = -offset * 0.5
    }

    const handleOverscroll = (delta: number) => {
      if (!contentEl) return
      const atBottom =
        contentEl.scrollTop + contentEl.clientHeight >=
        contentEl.scrollHeight - 2
      if (atBottom && delta > 0) {
        overscroll += delta
        if (overscroll > 1500) {
          overscroll = 0
          onclose?.()
        }
      } else {
        overscroll = 0
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (!active || !contentEl) return
      if (!contentEl.contains(e.target as Node)) {
        contentEl.scrollBy({ top: e.deltaY * 2 })
      }
      handleOverscroll(e.deltaY)
    }

    let lastTouchY = 0

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!active || !contentEl) return
      const dy = lastTouchY - e.touches[0].clientY
      lastTouchY = e.touches[0].clientY
      handleOverscroll(dy * 3)
    }

    scroller.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(rafId)
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
  <div class="content" bind:this={contentEl}>
    <img
      class="hero"
      src={hero}
      alt={project.name}
      style="transform: translateY({imgY}px)"
    />
    {#if active}
      {#each contentItems as src}
        {#if src.endsWith(".webm")}
          <div class="video-wrap">
            <video {src} autoplay loop muted playsinline></video>
          </div>
        {:else}
          <img {src} alt={project.name} />
        {/if}
      {/each}
      <div
        class="scroll-hint"
        style="background: linear-gradient(to right, var(--background-primary) {smoothProgress *
          100}%, var(--text-primary) {smoothProgress * 100}%)"
      >
        <span
          class="scroll-text"
          style="color: {smoothProgress > 0.5
            ? 'var(--text-primary)'
            : 'var(--background-primary)'}">Scroll to close</span
        >
      </div>
    {/if}
  </div>

  <div class="info">
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
    height: 100dvh;
    flex-shrink: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: var(--background-primary);
    transition: background-color 0.5s ease;
  }

  .project.active {
    display: grid;
    grid-template-columns: 1fr 1fr;
    cursor: default;
    background-color: var(--background-extended);
  }

  .content {
    width: 50%;
    height: 100%;
    overflow: hidden;
  }

  .active .content {
    width: 100%;
    height: 100dvh;
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }

  .active .content::-webkit-scrollbar {
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
    height: 100dvh;
  }

  .active .content img:not(.hero),
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
    transition:
      left 0.5s ease,
      right 0.5s ease,
      bottom 0.5s ease;
  }

  .active .info {
    position: static;
    height: 100dvh;
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
    font-size: var(--font-card);
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
    font-size: var(--font-heading);
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
  }

  .description {
    font-family: "Satoshi";
    font-size: var(--font-body);
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
    font-size: var(--font-label);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .divider {
    font-size: var(--font-label);
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

  .flipped .content {
    position: absolute;
    right: 0;
  }

  .flipped .info {
    left: 0;
    right: 50%;
    flex-direction: row-reverse;
  }

  .flipped.active .content {
    position: static;
    order: 2;
  }

  .flipped.active .info {
    order: 1;
    flex-direction: column;
  }

  .flipped.active .header {
    flex-direction: row-reverse;
  }

  .flipped.active .back {
    align-self: flex-end;
  }

  .scroll-hint {
    display: none;
  }

  @media only screen and (max-width: 500px) {
    .project {
      aspect-ratio: 3 / 4;
      display: flex;
      flex-direction: column;
      background-color: var(--background-extended);
    }

    .content {
      width: 100%;
      height: 50%;
      position: static;
      order: 1;
      transition:
        height 0.6s ease,
        padding 0.6s ease;
    }

    .info {
      position: static;
      height: 50%;
      padding: var(--padding);
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: flex-end;
      box-sizing: border-box;
    }

    .info .description {
      padding-bottom: var(--padding);
    }

    .flipped .content {
      position: static;
      right: auto;
    }

    .flipped .info {
      position: static;
      left: auto;
      right: auto;
      flex-direction: row-reverse;
    }

    .project.active {
      display: flex;
      flex-direction: column;
      height: 100%;
      aspect-ratio: unset;
    }

    .active .content {
      position: static;
      height: 50%;
      overflow-y: auto;
      flex-shrink: 0;
      order: 1;
      padding-left: var(--padding);
      padding-right: var(--padding);
      box-sizing: border-box;
    }

    .active .hero {
      min-height: 100%;
      object-fit: fit;
    }

    .active .content img:not(.hero) {
      min-height: 100%;
      object-fit: fit;
    }

    .active .video-wrap {
      background: none;
    }

    .active .video-wrap video {
      object-fit: cover;
    }

    .active .info {
      position: static;
      height: 50%;
      padding: var(--padding);
      padding-top: calc(var(--navbar-height) + var(--padding));
      overflow: hidden;
      box-sizing: border-box;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-end;
      gap: 16px;
    }

    .active .header {
      flex-direction: row;
      order: 3;
    }

    .description {
      line-height: 1.4;
    }

    .back {
      display: none;
    }

    .scroll-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 0;
      width: 100vw;
      margin-left: calc(-1 * var(--padding));
      transition: background 0.3s ease;
    }

    .scroll-text {
      font-family: "Satoshi";
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      transition: color 0.3s ease;
    }
  }
</style>
