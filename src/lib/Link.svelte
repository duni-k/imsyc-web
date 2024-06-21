<script>
  export let strokeColor;
  export let href;
</script>

<a {href} class="wave-link" style="--stroke-color: {strokeColor}">
  <span><slot /></span>
  <svg
    class="link__graphic link__graphic--slide"
    width="300%"
    height="100%"
    viewBox="0 0 1200 60"
    preserveAspectRatio="none"
  >
    <path
      d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
    ></path>
  </svg>
</a>

<style>
  a {
    position: relative;
    padding: 0.25rem 1rem;

    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    width: 100%;
  }

  a.wave-link {
    cursor: pointer;
    font-size: 18px;
    position: relative;
    white-space: nowrap;
    background: transparent;
    border: 0;
    overflow: hidden;
    padding: 8px 0;
  }
  a.wave-link:before {
    content: "";
    background: inherit;
    position: absolute;
    width: 100%;
    height: 1px;
    top: 100%;
    left: 0;
    pointer-events: none;
  }
  .link__graphic {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    fill: none;
    stroke: var(--stroke-color);
    stroke-width: 0px;
  }

  .link__graphic--slide {
    top: -3px;
    stroke-width: 0px;
    transition: transform 0.9s;
    transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
  }
  a.wave-link:hover .link__graphic--slide {
    stroke-width: 2px;
    transform: translate3d(-66.6%, 0, 0);
  }
</style>
