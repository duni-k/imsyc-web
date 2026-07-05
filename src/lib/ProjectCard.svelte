<script lang="ts">
  import { onMount } from "svelte"
  import LetterReveal from "$lib/LetterReveal.svelte"

  let {
    project,
    active = false,
    closing = false,
    eager = false,
    onopen,
    onclose,
    onclosedone
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
    closing?: boolean
    eager?: boolean
    onopen?: () => void
    onclose?: () => void
    onclosedone?: () => void
  }>()

  let flipped = $derived(parseInt(project.index) % 2 === 0)
  let hero = $derived(`/hero_images/${project.href}_hero.webp`)
  let contentItems = $derived(project.content)
  let el: HTMLElement
  let imgY = $state(0)
  let contentEl: HTMLDivElement | undefined = $state(undefined)
  let closeZoneEl: HTMLDivElement | undefined = $state(undefined)
  let progress = $state(0)

  // Scroll-to-close: progress is purely a function of how far the native
  // scroll position has travelled into the close zone at the end of .content
  $effect(() => {
    if (!active || !contentEl || !closeZoneEl) return
    const content = contentEl
    const zone = closeZoneEl
    let settleTimeout: ReturnType<typeof setTimeout> | undefined
    let touchActive = false

    // once the gesture settles inside the zone, commit: past halfway
    // completes and closes, before halfway rolls smoothly back out
    const settle = () => {
      if (closing) return
      if (progress >= 0.999) {
        onclose?.()
        return
      }
      if (progress <= 0.001) return
      const zoneStart =
        content.scrollHeight - content.clientHeight - zone.offsetHeight
      const target = progress >= 0.5 ? content.scrollHeight : zoneStart
      content.scrollTo({ top: target, behavior: "smooth" })
    }

    const scheduleSettle = () => {
      clearTimeout(settleTimeout)
      if (!touchActive) settleTimeout = setTimeout(settle, 150)
    }

    const onScroll = () => {
      if (closing) return
      const zoneStart =
        content.scrollHeight - content.clientHeight - zone.offsetHeight
      progress = Math.max(
        0,
        Math.min(1, (content.scrollTop - zoneStart) / zone.offsetHeight)
      )
      scheduleSettle()
    }

    const onTouchStart = () => {
      touchActive = true
      clearTimeout(settleTimeout)
    }

    const onTouchEnd = () => {
      touchActive = false
      scheduleSettle()
    }

    const onWheel = (e: WheelEvent) => {
      // forward wheel from the info pane to the scrollable content,
      // and stop it from scroll-chaining to the list behind the card
      if (content.contains(e.target as Node)) return
      e.preventDefault()
      content.scrollTop += e.deltaY
    }

    content.addEventListener("scroll", onScroll, { passive: true })
    content.addEventListener("touchstart", onTouchStart, { passive: true })
    content.addEventListener("touchend", onTouchEnd, { passive: true })
    content.addEventListener("touchcancel", onTouchEnd, { passive: true })
    el.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      clearTimeout(settleTimeout)
      content.removeEventListener("scroll", onScroll)
      content.removeEventListener("touchstart", onTouchStart)
      content.removeEventListener("touchend", onTouchEnd)
      content.removeEventListener("touchcancel", onTouchEnd)
      el.removeEventListener("wheel", onWheel)
      progress = 0
    }
  })

  onMount(() => {
    const scroller = el.closest(".list") ?? window

    const isMobile = window.innerWidth <= 500
    const parallaxFactor = isMobile ? 0.15 : 0.5

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      imgY = -offset * parallaxFactor
    }

    // only pay for the parallax layout read while the card is near the viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scroller.addEventListener("scroll", onScroll, { passive: true })
          onScroll()
        } else {
          scroller.removeEventListener("scroll", onScroll)
        }
      },
      { rootMargin: "50%" }
    )
    io.observe(el)

    // after a recenter teleport the clone now in the viewport hasn't had
    // its observer fire yet — refresh the parallax before the next paint
    scroller.addEventListener("recentered", onScroll)

    return () => {
      io.disconnect()
      scroller.removeEventListener("scroll", onScroll)
      scroller.removeEventListener("recentered", onScroll)
    }
  })
</script>

<div
  class="project"
  class:active={active && !closing}
  class:closing
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
      loading={eager ? "eager" : "lazy"}
      fetchpriority={eager ? "high" : undefined}
      decoding="async"
      style="transform: translateY({imgY}px)"
    />
    {#if active && !closing}
      {#each contentItems as src}
        {#if src.endsWith(".webm")}
          <div class="video-wrap">
            <video {src} autoplay loop muted playsinline></video>
          </div>
        {:else}
          <img {src} alt={project.name} loading="lazy" decoding="async" />
        {/if}
      {/each}
      <img
        class="hero hero-end"
        src={hero}
        alt={project.name}
        loading="lazy"
        decoding="async"
      />
      <div class="close-zone" bind:this={closeZoneEl}>
        <div
          class="scroll-hint"
          style="background: linear-gradient(to right, var(--background-primary) {progress *
            100}%, var(--text-primary) {progress * 100}%)"
        >
          <span
            class="scroll-text"
            style="color: {progress > 0.5
              ? 'var(--text-primary)'
              : 'var(--background-primary)'}">Scroll to close</span
          >
        </div>
      </div>
    {/if}
  </div>

  <div class="info">
    {#if active && !closing}
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
        style="background: linear-gradient(to right, var(--text-primary) {progress *
          100}%, transparent {progress * 100}%); color: {progress > 0.5
          ? 'var(--background-extended)'
          : 'var(--text-primary)'}"
        onclick={(e) => {
          e.stopPropagation()
          onclose?.()
        }}>BACK</button
      >
    {:else}
      <span class="card-index"
        ><LetterReveal
          text={String(project.index)}
          group="card-index-{project.href}"
        /></span
      >
      <span class="card-name">
        <LetterReveal
          text={project.name}
          baseDelay={String(project.index).length * 30}
          group="card-name-{project.href}"
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
    overscroll-behavior: contain;
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

  /* pins once it fills the pane, so scrolling through the close zone
     feeds the progress fill instead of visibly scrolling past the end */
  .active .hero-end {
    height: 100%;
    position: sticky;
    top: 0;
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
    /* stop touch scrolls here from chaining to the list behind the card */
    touch-action: none;
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

  .close-zone {
    display: flex;
    flex-direction: column;
    height: 75dvh;
    flex-shrink: 0;
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

    .active .content img:not(.hero) {
      height: auto;
    }

    .active .video-wrap {
      height: auto;
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
      position: sticky;
      bottom: 0;
      margin-top: auto;
      padding: 12px 0;
      width: 100vw;
      margin-left: calc(-1 * var(--padding));
      transition: background 0.1s linear;
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
