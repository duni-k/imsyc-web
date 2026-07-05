<script lang="ts">
  import { onMount } from "svelte"
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

  function open(project: Project) {
    active = project
    history.pushState({ slug: project.href }, "", `/${project.href}`)
  }

  function close() {
    closing = true
    history.pushState({}, "", "/")
    requestAnimationFrame(() => {
      active = null
      // Block scroll after closing
      listEl.style.pointerEvents = "none"
      listEl.style.overflow = "hidden"
      setTimeout(() => {
        closing = false
        listEl.style.pointerEvents = ""
        listEl.style.overflow = ""
      }, 600)
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

    window.addEventListener("popstate", onPopState)

    introDone.set(true)

    return () => {
      window.removeEventListener("popstate", onPopState)
    }
  })
</script>

<div class="list" bind:this={listEl}>
  {#each workData as data}
    <div
      class="card-slot"
      class:is-active={active?.href === data.href}
      class:is-hidden={active !== null && !closing && active.href !== data.href}
    >
      <ProjectCard
        project={data}
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
  }

  .card-slot.is-hidden {
    visibility: hidden;
  }
</style>
