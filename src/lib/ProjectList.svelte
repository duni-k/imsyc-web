<script lang="ts">
  import { onMount } from "svelte"
  import workData from "../data/workData.json"
  import ProjectCard from "$lib/ProjectCard.svelte"

  let { initialSlug = "" } = $props<{ initialSlug?: string }>()

  type Project = (typeof workData)[number]

  let active: Project | null = $state(null)
  let listEl: HTMLDivElement

  // svelte-ignore state_referenced_locally
  if (initialSlug) {
    active = workData.find((p) => p.href === initialSlug) ?? null
  }

  function open(project: Project) {
    active = project
    history.pushState({ slug: project.href }, "", `/${project.href}`)
  }

  function close() {
    active = null
    history.pushState({}, "", "/")
  }

  onMount(() => {
    if (!active) {
      const path = window.location.pathname.slice(1)
      if (path) {
        const match = workData.find((p) => p.href === path)
        if (match) active = match
      }
    }

    const onPopState = () => {
      const slug = window.location.pathname.slice(1)
      active = workData.find((p) => p.href === slug) ?? null
    }

    let snapTimeout: ReturnType<typeof setTimeout>
    let scrollVelocity = 0
    let scrollRaf = 0
    let isScrolling = false
    const SNAP_DELAY = 200
    const SNAP_DURATION = 600
    const FRICTION = 0.95

    const snapToNearest = () => {
      const cardHeight = listEl.clientHeight
      const scrollPos = listEl.scrollTop
      const nearest = Math.round(scrollPos / cardHeight) * cardHeight

      if (Math.abs(scrollPos - nearest) < 5) return

      const start = scrollPos
      const distance = nearest - start
      const startTime = performance.now()

      const animate = (now: number) => {
        if (isScrolling) return
        const elapsed = now - startTime
        const t = Math.min(elapsed / SNAP_DURATION, 1)
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        listEl.scrollTop = start + distance * ease
        if (t < 1) requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }

    const scheduleSnap = () => {
      clearTimeout(snapTimeout)
      snapTimeout = setTimeout(snapToNearest, SNAP_DELAY)
    }

    const smoothScroll = () => {
      listEl.scrollTop += scrollVelocity
      scrollVelocity *= FRICTION
      if (Math.abs(scrollVelocity) > 0.5) {
        scrollRaf = requestAnimationFrame(smoothScroll)
      } else {
        scrollVelocity = 0
        isScrolling = false
        scheduleSnap()
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (!active && listEl) {
        e.preventDefault()
        scrollVelocity += e.deltaY * 0.8
        isScrolling = true
        clearTimeout(snapTimeout)
        cancelAnimationFrame(scrollRaf)
        scrollRaf = requestAnimationFrame(smoothScroll)
      }
    }

    window.addEventListener("popstate", onPopState)
    listEl.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      clearTimeout(snapTimeout)
      cancelAnimationFrame(scrollRaf)
      window.removeEventListener("popstate", onPopState)
      listEl.removeEventListener("wheel", onWheel)
    }
  })
</script>

<div class="list" bind:this={listEl}>
  {#each workData as data}
    <div
      class="card-slot"
      class:is-active={active?.href === data.href}
      class:is-hidden={active !== null && active.href !== data.href}
    >
      <ProjectCard
        project={data}
        active={active?.href === data.href}
        onopen={() => open(data)}
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
  }

  .card-slot {
    flex-shrink: 0;
  }

  .card-slot.is-active {
    position: fixed;
    inset: 0;
    z-index: 10;
  }

  .card-slot.is-hidden {
    visibility: hidden;
  }
</style>
