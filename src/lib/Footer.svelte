<script lang="ts">
  import { onMount } from "svelte"
  import LetterReveal from "$lib/LetterReveal.svelte"

  let {
    baseDelay = 0,
    background = "var(--background-primary)",
    foreground = "var(--text-primary)"
  } = $props()

  let footer: HTMLElement
  let visible = $state(false)

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible = true
      },
      { threshold: 0.2 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  })
</script>

<footer bind:this={footer} style="--bg: {background}; --fg: {foreground}">
  <a
    href="https://linkedin.com/stellahsiaoyuchen"
    class="footer-link"
    class:visible
    style="transition-delay: {baseDelay + 100}ms"
  >
    <span>Linkedin</span>
    <span class="underline"></span>
  </a>
  <a
    href="mailto:imsyc1992@gmail.com"
    class="footer-link"
    class:visible
    style="transition-delay: {baseDelay + 200}ms"
  >
    <span>Mail</span>
    <span class="underline"></span>
  </a>
  <div class="footer-name">
    <LetterReveal
      text="Stella Hsiao"
      baseDelay={baseDelay + 300}
      staggerDelay={60}
    />
  </div>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    font-family: "Satoshi";
    background-color: var(--bg);
    color: var(--fg);
  }

  .footer-link {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 8px;
    width: 180px;
    font-size: 1.8rem;
    color: var(--fg);
    text-decoration: none;
    font-weight: 400;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .footer-link:hover {
    opacity: 0.6;
  }

  .footer-link.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .underline {
    height: 1px;
    border-top: 1px solid var(--fg);
    align-self: end;
    margin-bottom: 2px;
  }

  .footer-name {
    font-family: "Technor";
    font-size: 10rem;
    font-weight: 900;
    line-height: 1;
    margin-top: 8px;
    width: 100%;
    display: inline-flex;
  }

  @media only screen and (max-width: 767px) {
    .footer-name {
      font-size: 4rem;
    }
  }
</style>
