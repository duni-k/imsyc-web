<script>
  import "../app.css"

  let { children } = $props()
</script>

<nav class="navbar">
  <a class="name" href="/">STELLA HSIAO</a>
</nav>

{@render children?.()}

<style>
  .navbar {
    position: fixed;
    z-index: 98;
    width: 100%;
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    font-family: "Syncopate";
    font-weight: bold;
    background: transparent;
    mix-blend-mode: difference;
    box-sizing: border-box;
  }

  .name {
    color: var(--text-secondary);
    font-size: 24px;
    padding-left: var(--padding);
    transition: color 0.5s;
  }

  .name:hover {
    color: var(--highlight-primary);
  }

  @media only screen and (max-width: 767px) {
    .name {
      font-size: 16px;
    }
  }
</style>
