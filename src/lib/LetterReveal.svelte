<script module lang="ts">
  // reveal state can be shared between several instances via `group`: the
  // cycling list renders each card multiple times, and the copy swapped
  // into the viewport must be at the exact same point of the reveal as the
  // copy it replaces, or the teleport becomes visible as a replay.
  // Ref-counted so callback order between observers can't flicker it.
  type Group = { count: number; visible: boolean }
  const groups = new Map<string, Group>()

  function getGroup(key: string): Group {
    let g = groups.get(key)
    if (!g) {
      const created: Group = $state({ count: 0, visible: false })
      groups.set(key, created)
      g = created
    }
    return g
  }
</script>

<script lang="ts">
  import { onMount } from "svelte"

  let { text, baseDelay = 0, staggerDelay = 30, group = "" } = $props()

  // letters are grouped per word so lines can only break between words,
  // never mid-word; spaces are real text nodes but keep their slot in the
  // stagger rhythm so timing matches the flat per-character original
  const words = $derived.by(() => {
    const result: { char: string; delay: number }[][] = []
    let i = 0
    for (const word of text.split(" ")) {
      result.push(
        word.split("").map((char: string) => ({
          char,
          delay: baseDelay + i++ * staggerDelay
        }))
      )
      i++
    }
    return result
  })

  let el: HTMLSpanElement
  let localVisible = $state(false)
  // svelte-ignore state_referenced_locally -- group is fixed per call site
  const shared = group ? getGroup(group) : null
  const visible = $derived(shared ? shared.visible : localVisible)

  onMount(() => {
    let intersecting = false

    const setIntersecting = (value: boolean) => {
      if (value === intersecting) return
      intersecting = value
      if (shared) {
        shared.count += value ? 1 : -1
        shared.visible = shared.count > 0
      } else {
        localVisible = value
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      setIntersecting(false)
    }
  })
</script>

<span class="letter-reveal" bind:this={el}>
  {#each words as word, w}
    {#if w > 0}{" "}{/if}<span class="word">
      {#each word as { char, delay }}
        <span class="letter-wrap">
          <span
            class="letter"
            class:visible
            style="transition-delay: {delay}ms"
          >{char}</span>
        </span>
      {/each}
    </span>
  {/each}
</span>

<style>
  .letter-reveal {
    display: inline;
  }

  .word {
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
