<script lang="ts">
  import "../app.css"
  import { page } from "$app/state"
  import workData from "../data/workData.json"
  import Footer from "$lib/Footer.svelte"
  import LetterReveal from "$lib/LetterReveal.svelte"

  let { children } = $props()

  let cursorX = $state(0)
  let cursorY = $state(0)
  let overLink = $state(false)

  function onMouseMove(e: MouseEvent) {
    cursorX = e.clientX
    cursorY = e.clientY
    overLink = (e.target as HTMLElement).closest("a") !== null
  }

  const PROJECT_STEP = 80
  const STAGGER = 30
  const listEndDelay = workData.length * PROJECT_STEP

  // idle | sweeping | open | sweeping-out
  let menuState = $state("idle")

  const bioText =
    "Taiwanese designer based in Stockholm. I usually work in-house, but every now and then a project comes along that's too interesting to pass up."

  function openMenu() {
    if (menuState !== "idle") return
    menuState = "sweeping"
  }

  function closeMenu() {
    if (menuState !== "open") return
    menuState = "sweeping-out"
  }

  function onSweepEnd() {
    if (menuState === "sweeping") {
      menuState = "open"
    } else if (menuState === "sweeping-out") {
      menuState = "idle"
    }
  }

  let touchStartX = 0
  let touchStartY = 0

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }

  function onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX
    const dy = e.changedTouches[0].clientY - touchStartY
    const swipedUp = dy < -80 && Math.abs(dy) > Math.abs(dx)
    const swipedRight = dx > 80 && Math.abs(dx) > Math.abs(dy)
    if (swipedUp || swipedRight) closeMenu()
  }
</script>

<nav class="navbar">
  <button
    class="nav-btn name"
    onclick={menuState === "idle" ? openMenu : closeMenu}
    >SH<span style="color: var(--highlight-primary)">.</span></button
  >
  <button
    class="nav-btn menu-text"
    onclick={menuState === "idle" ? openMenu : closeMenu}>menu</button
  >
</nav>

{#if menuState !== "idle"}
  <div
    class="sweep"
    class:sweep-in={menuState === "sweeping"}
    class:sweep-stay={menuState === "open"}
    class:sweep-out={menuState === "sweeping-out"}
    onanimationend={onSweepEnd}
    onmousemove={onMouseMove}
    ontouchstart={onTouchStart}
    ontouchend={onTouchEnd}
    onclick={closeMenu}
    onkeydown={(e) => e.key === "Escape" && closeMenu()}
    role="button"
    tabindex="-1"
  >
    <div
      class="custom-cursor"
      class:hidden={overLink}
      style="left: {cursorX}px; top: {cursorY}px"
    >
      <span class="cursor-x">✕</span>
      <span class="cursor-label">close</span>
    </div>

    {#if menuState === "open"}
      <div class="menu">
        <div class="menu-content">
          <p class="bio">{bioText}</p>

          <div class="projects">
            {#each workData as project, projectIndex}
              <a
                href="/{project.href}"
                class="project-item"
                onclick={(e) => {
                  e.stopPropagation()
                  closeMenu()
                }}
              >
                <span class="year">
                  <LetterReveal
                    text={String(project.index)}
                    baseDelay={projectIndex * PROJECT_STEP}
                  />
                </span>
                <span class="project-name">
                  <LetterReveal
                    text={project.name}
                    baseDelay={projectIndex * PROJECT_STEP +
                      String(project.index).length * STAGGER}
                  />
                </span>
              </a>
            {/each}
          </div>
        </div>

        <div class="menu-footer">
          <Footer
            baseDelay={listEndDelay}
            background="var(--background-secondary)"
            foreground="var(--text-secondary)"
          />
        </div>
      </div>
    {/if}
  </div>
{/if}

{#key page.url.pathname}
  {@render children?.()}
{/key}

<style>
  .navbar {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: var(--navbar-height);
    padding-top: var(--padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    mix-blend-mode: difference;
    box-sizing: border-box;
  }

  .nav-btn {
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 4rem;
  }

  .name {
    font-family: "Technor";
    font-weight: 900;
    padding-left: var(--padding);
  }

  .menu-text {
    font-family: "Satoshi";
    font-weight: 900;
    padding-right: var(--padding);
  }

  .sweep {
    position: fixed;
    inset: 0;
    z-index: 50;
    padding-top: calc(var(--navbar-height) + var(--padding));
    background-color: var(--background-secondary);
    will-change: transform;
    cursor: none;
  }

  .sweep :global(a) {
    cursor: pointer;
  }

  .custom-cursor.hidden {
    opacity: 0;
  }

  .sweep-in {
    animation: sweepDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .sweep-stay {
    transform: translateY(0);
  }

  .sweep-out {
    animation: sweepUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: var(--text-secondary);
  }

  .menu-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: var(--padding);
    padding: calc(var(--navbar-height) + 20px) var(--padding) 0;
  }

  .bio {
    max-width: 40vh;
    text-align: right;
    justify-self: right;
    font-family: "Satoshi";
    font-weight: 400;
    font-size: var(--font-menu);
    opacity: 0;
    animation: fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .projects {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 800px;
  }

  .project-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: "Satoshi";
    font-size: var(--font-menu);
    color: var(--text-secondary);
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .project-item:hover {
    opacity: 0.6;
  }

  .year {
    font-weight: 400;
    display: inline-flex;
  }

  .project-name {
    font-weight: 700;
    text-transform: uppercase;
    display: inline-flex;
  }

  .menu-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 var(--padding) var(--padding);
  }

  .custom-cursor {
    position: fixed;
    z-index: 60;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transform: translate(-50%, -50%);
  }

  .cursor-x {
    font-family: "Satoshi";
    font-size: 2.4rem;
    font-weight: 300;
    color: var(--text-secondary);
    line-height: 1;
  }

  .cursor-label {
    font-family: "Satoshi";
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.6;
  }

  @media only screen and (max-width: 768px) {
    .menu-content {
      padding: 0 16px;
      gap: var(--gap-menu);
    }

    .bio {
      text-align: center;
    }

    .projects {
      min-width: auto;
      width: 100%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes sweepDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes sweepUp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
</style>
