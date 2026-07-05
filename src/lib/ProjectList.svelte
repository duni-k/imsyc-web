<script lang="ts">
  import { onMount, tick } from "svelte"
  import workData from "../data/workData.json"
  import ProjectCard from "$lib/ProjectCard.svelte"
  import { introDone } from "$lib/introStore"

  let { initialSlug = "" } = $props<{ initialSlug?: string }>()

  type Project = (typeof workData)[number]

  let active: Project | null = $state(null)
  let closing = $state(false)
  let listEl: HTMLDivElement

  // svelte-ignore state_referenced_locally
  if (initialSlug) {
    active = workData.find((p) => p.href === initialSlug) ?? null
  }

  const CLOSE_DURATION = 600

  function open(project: Project) {
    if (closing) return
    active = project
    history.pushState({ slug: project.href }, "", `/${project.href}`)
  }

  // keeps the card mounted as a fixed overlay while the open-transition CSS
  // plays in reverse, then hands it back to the list aligned to its slot
  function animateClose() {
    if (closing || !active) return
    const href = active.href
    closing = true
    listEl.style.overflow = "hidden"
    setTimeout(async () => {
      active = null
      closing = false
      await tick()
      const idx = workData.findIndex((p) => p.href === href)
      const slot = listEl.children[idx] as HTMLElement | undefined
      slot?.scrollIntoView({ block: "start", behavior: "instant" })
      listEl.style.overflow = ""
    }, CLOSE_DURATION)
  }

  function close() {
    if (closing) return
    history.pushState({}, "", "/")
    animateClose()
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
      const match = workData.find((p) => p.href === slug) ?? null
      if (!match && active) {
        animateClose()
      } else {
        active = match
      }
    }

    window.addEventListener("popstate", onPopState)

    introDone.set(true)

    return () => {
      window.removeEventListener("popstate", onPopState)
    }
  })
</script>

<div class="list" bind:this={listEl}>
  {#each workData as data, i}
    <div
      class="card-slot"
      class:is-active={active?.href === data.href}
      class:is-hidden={active !== null && !closing && active.href !== data.href}
    >
      <ProjectCard
        project={data}
        eager={i === 0}
        active={active?.href === data.href}
        {closing}
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
    scroll-snap-type: y mandatory;
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
</style>
