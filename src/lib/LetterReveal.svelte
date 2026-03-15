<script>
  import { onMount } from "svelte"

  let { text, baseDelay = 0, staggerDelay = 30 } = $props()

  const chars = $derived(text.split(""))
  let el
  let visible = $state(false)

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  })
</script>

<span class="letter-reveal" bind:this={el}>
  {#each chars as char, i}
    <span class="letter-wrap">
      <span
        class="letter"
        class:visible
        style="transition-delay: {baseDelay + i * staggerDelay}ms"
      >{char === " " ? "\u00A0" : char}</span>
    </span>
  {/each}
</span>

<style>
  .letter-reveal {
    display: inline-flex;
  }

  .letter-wrap {
    display: inline-block;
    overflow: hidden;
  }

  .letter {
    display: inline-block;
    transform: translateY(110%);
    opacity: 0;
    transition:
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .letter.visible {
    transform: translateY(0);
    opacity: 1;
  }
</style>
