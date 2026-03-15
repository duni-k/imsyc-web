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
    // kill scroll momentum by briefly disabling overflow
    listEl.style.overflow = "hidden"
    requestAnimationFrame(() => {
      listEl.style.overflow = ""
    })
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

    const onWheel = (e: WheelEvent) => {
      if (!active && listEl) {
        e.preventDefault()
        listEl.scrollBy({ top: e.deltaY * 12 })
      }
    }

    window.addEventListener("popstate", onPopState)
    listEl.addEventListener("wheel", onWheel, { passive: false })

    return () => {
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
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y proximity;
    scroll-behavior: smooth;
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
