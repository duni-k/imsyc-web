<script lang="ts">
  import { onMount, tick } from "svelte"
  import workData from "../data/workData.json"
  import ProjectCard from "$lib/ProjectCard.svelte"
  import { introDone } from "$lib/introStore"

  let { initialSlug = "" } = $props<{ initialSlug?: string }>()

  type Project = (typeof workData)[number]

  // the list is rendered several times over and scrolling starts in the
  // middle copy; when the position drifts into the outer copies it is
  // shifted back by whole copy-heights (identical content, so the jump is
  // invisible), which makes the list cycle endlessly in both directions
  const COPIES = 5
  const MID_COPY = Math.floor(COPIES / 2)
  const N = workData.length
  const loopData: Project[] = Array.from({ length: COPIES }, () =>
    workData
  ).flat()

  let activeIdx: number | null = $state(null)
  let closing = $state(false)
  let listEl: HTMLDivElement

  let active = $derived(activeIdx === null ? null : loopData[activeIdx])

  // svelte-ignore state_referenced_locally
  if (initialSlug) {
    const i = workData.findIndex((p) => p.href === initialSlug)
    if (i !== -1) activeIdx = MID_COPY * N + i
  }

  const CLOSE_DURATION = 600

  // correcting scrollTop while a drag, fling or snap animation is running
  // fights the browser, which keeps re-asserting its own position — that
  // fight renders as a violent spasm. So the correction only ever runs
  // once scrolling has been idle for a beat; the extra copies provide the
  // runway that makes waiting safe.
  function recenter() {
    const copyHeight = listEl.scrollHeight / COPIES
    const cardHeight = copyHeight / N
    // band edges sit mid-card so they never coincide with a card edge,
    // where sub-pixel jitter would re-trigger the jump endlessly
    const low = (Math.round(N * (MID_COPY - 0.5)) - 0.5) * cardHeight
    const high = 2 * MID_COPY * copyHeight - low
    const top = listEl.scrollTop
    if (top >= low && top <= high) return
    const offset = ((top % copyHeight) + copyHeight) % copyHeight
    let target = MID_COPY * copyHeight + offset
    if (target > high) target -= copyHeight
    listEl.scrollTo({ top: target, behavior: "instant" })
    listEl.dispatchEvent(new CustomEvent("recentered"))
  }

  let touchActive = false
  let settleTimer: ReturnType<typeof setTimeout> | undefined

  function scheduleRecenter() {
    clearTimeout(settleTimer)
    settleTimer = setTimeout(() => {
      if (!touchActive) recenter()
    }, 150)
  }

  function onTouchStart() {
    touchActive = true
    clearTimeout(settleTimer)
  }

  function onTouchEnd(e: TouchEvent) {
    if (e.touches.length > 0) return
    touchActive = false
    scheduleRecenter()
  }

  function open(idx: number) {
    if (closing) return
    activeIdx = idx
    const slug = loopData[idx].href
    history.pushState({ slug }, "", `/${slug}`)
  }

  // keeps the card mounted as a fixed overlay while the open-transition CSS
  // plays in reverse, then hands it back to the list aligned to its slot
  function animateClose() {
    if (closing || activeIdx === null) return
    const idx = activeIdx
    closing = true
    listEl.style.overflow = "hidden"
    setTimeout(async () => {
      activeIdx = null
      closing = false
      await tick()
      const slot = listEl.children[idx] as HTMLElement | undefined
      slot?.scrollIntoView({ block: "start", behavior: "instant" })
      recenter()
      listEl.style.overflow = ""
    }, CLOSE_DURATION)
  }

  function close() {
    if (closing) return
    history.pushState({}, "", "/")
    animateClose()
  }

  onMount(() => {
    if (activeIdx === null) {
      const path = window.location.pathname.slice(1)
      if (path) {
        const i = workData.findIndex((p) => p.href === path)
        if (i !== -1) activeIdx = MID_COPY * N + i
      }
    }

    listEl.scrollTo({
      top: (listEl.scrollHeight / COPIES) * MID_COPY,
      behavior: "instant"
    })

    const onPopState = () => {
      const slug = window.location.pathname.slice(1)
      const i = workData.findIndex((p) => p.href === slug)
      if (i === -1) {
        if (activeIdx !== null) animateClose()
      } else if (active?.href !== slug) {
        activeIdx = MID_COPY * N + i
      }
    }

    window.addEventListener("popstate", onPopState)
    listEl.addEventListener("scroll", scheduleRecenter, { passive: true })
    listEl.addEventListener("touchstart", onTouchStart, { passive: true })
    listEl.addEventListener("touchend", onTouchEnd, { passive: true })
    listEl.addEventListener("touchcancel", onTouchEnd, { passive: true })

    introDone.set(true)

    return () => {
      clearTimeout(settleTimer)
      window.removeEventListener("popstate", onPopState)
      listEl.removeEventListener("scroll", scheduleRecenter)
      listEl.removeEventListener("touchstart", onTouchStart)
      listEl.removeEventListener("touchend", onTouchEnd)
      listEl.removeEventListener("touchcancel", onTouchEnd)
    }
  })
</script>

<div class="list" bind:this={listEl}>
  {#each loopData as data, i (i)}
    <div
      class="card-slot"
      class:is-active={activeIdx === i}
      class:is-hidden={activeIdx !== null && !closing && activeIdx !== i}
    >
      <ProjectCard
        project={data}
        eager={i % N === 0}
        active={activeIdx === i}
        {closing}
        onopen={() => open(i)}
        onclose={close}
      />
    </div>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    /* the list cycles endlessly, so a scrollbar position is meaningless */
    scrollbar-width: none;
  }

  .list::-webkit-scrollbar {
    display: none;
  }

  .card-slot {
    flex-shrink: 0;
    scroll-snap-align: start;
  }

  .card-slot.is-active {
    position: fixed;
    inset: 0;
    z-index: 10;
    background: var(--background-primary);
  }

  .card-slot.is-hidden {
    visibility: hidden;
  }

  /* on mobile the cards are shorter than the viewport (3/4 aspect), and
     mandatory snapping with snap points denser than the viewport is what
     caused the jumpy scrolling — so snapping is desktop-only */
  @media only screen and (max-width: 500px) {
    .list {
      scroll-snap-type: none;
    }
  }
</style>
