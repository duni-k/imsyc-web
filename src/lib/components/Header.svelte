
<script>
  import { onMount } from "svelte";

  // Show mobile icon and display menu
  let mobile = false;

  // Mobile menu click event handler
  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

  // Media match query handler
  const mediaQueryHandler = e => {
    // Reset mobile state
    if (!e.matches) {
      mobile = false;
    }
  };

  // Attach media query listener on mount hook
  onMount(() => {
    const mediaListener = window.matchMedia("(max-width: 767px)");

    mediaListener.addListener(mediaQueryHandler);
  });
</script>


<header>
  {#if mobile}
  <p>TEST</p>
  {:else}
  <div class="row padded">
  <a href="/"><img src="images/favicon.png"/></a>
  <a class="right" href="mailto:imsyc.stella@gmail.com"><button>Contact</button></a>
  </div>
  {/if}
</header>

<style>
  header {
    padding-top: 3%;
    padding-bottom: 1%;
    background: white;
  }

  row {
    align: horizontal;
  }

  .right {
    margin-left: auto;
    marign-right: 0;
  }
</style>
