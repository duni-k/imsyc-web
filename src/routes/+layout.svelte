<script lang="ts">
  import "../app.css"
  import { onNavigate } from "$app/navigation"
  import workData from "../data/workData.json"
  import Footer from "$lib/Footer.svelte"
  import LetterReveal from "$lib/LetterReveal.svelte"

  let { children } = $props()

  onNavigate((navigation) => {
    if (!document.startViewTransition) return
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

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
  >
    {#if menuState === "open"}
      <div class="menu">
        <div class="menu-content">
          <p class="bio">{bioText}</p>

          <div class="projects">
            {#each workData as project, projectIndex}
              <a
                href="/{project.href}"
                class="project-item"
                onclick={closeMenu}
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

          <button
            class="close"
            onclick={closeMenu}
            style="nav-btn animation-delay: {listEndDelay + 50}ms"
          >
            CLOSE
          </button>
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

{@render children?.()}

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

  .nav-btn:hover,
  .close:hover {
    transition: color 0.5s;
    color: var(--highlight-primary);
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
    max-width: 30vh;
    text-align: right;
    justify-self: right;
    font-family: "Satoshi";
    font-weight: 400;
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
    font-size: 2rem;
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
    width: 100vh;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 var(--padding) var(--padding);
  }

  .close {
    font-family: "Satoshi";
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--text-secondary);
    cursor: pointer;
    margin-top: calc(var(--padding) / 2);
    align-self: flex-end;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeSlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @media only screen and (max-width: 768px) {
    .menu-content {
      padding: 0 16px;
      gap: 32px;
    }

    .bio {
      font-size: 1.4rem;
      text-align: center;
    }

    .projects {
      min-width: auto;
      width: 100%;
    }

    .project-item {
      font-size: 1.6rem;
    }

    .close {
      bottom: 16px;
      left: 16px;
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

  @keyframes fadeSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
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
