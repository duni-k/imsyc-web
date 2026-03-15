<script lang="ts">
  import { onMount } from "svelte"

  let { data } = $props()
  const { project, hero, images, flipped } = $derived(data)

  let contentEl: HTMLDivElement

  onMount(() => {
    const onWheel = (e: WheelEvent) => {
      if (contentEl && !contentEl.contains(e.target as Node)) {
        contentEl.scrollBy({ top: e.deltaY * 2 })
      }
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    return () => window.removeEventListener("wheel", onWheel)
  })
</script>

<div class="page">
  <div class="detail" class:flipped>
    <div
      class="content"
      bind:this={contentEl}
      style="view-transition-name: project-img-{project.href}"
    >
      <img class="hero" src={hero} alt={project.name} />
      {#each images as src}
        {#if src.endsWith(".webm")}
          <div class="video-wrap">
            <video {src} autoplay loop muted playsinline></video>
          </div>
        {:else}
          <img {src} alt={project.name} />
        {/if}
      {/each}
    </div>

    <div class="info" style="view-transition-name: project-info-{project.href}">
      <p class="description">{project.description}</p>

      <div class="meta">
        <p class="role">{project.role}</p>
        <div class="tags">
          {#each project.tags as tag, i}
            {#if i > 0}<span class="divider">|</span>{/if}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .page {
    height: 100vh;
    background-color: var(--background-extended);
  }

  .detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    overflow: hidden;
  }

  .content {
    height: 100vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }

  .content::-webkit-scrollbar {
    display: none;
  }

  .content .hero {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center;
  }

  .content img:not(.hero),
  .video-wrap {
    width: 100%;
    object-fit: fit;
    background: #1c1c1c;
  }

  .video-wrap video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .info {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    padding: var(--padding);
    overflow: hidden;
    box-sizing: border-box;
  }

  .description {
    font-family: "Satoshi";
    font-style: medium;
    font-size: 2.5rem;
    line-height: 1.6;
    max-width: 480px;
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
    font-style: bold;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .divider {
    font-size: 1.2rem;
    opacity: 0.3;
  }

  .detail.flipped .content {
    order: 2;
  }

  .detail.flipped .info {
    order: 1;
  }

  @media only screen and (max-width: 767px) {
    .detail {
      grid-template-columns: 1fr;
      height: auto;
      overflow: visible;
    }

    .content {
      height: auto;
      overflow: visible;
      scroll-snap-type: none;
    }

    .content .hero,
    .content img:not(.hero),
    .video-wrap {
      height: auto;
    }

    .info {
      height: auto;
      padding: var(--padding);
    }

    .detail.flipped .content,
    .detail.flipped .info {
      order: unset;
    }
  }
</style>
