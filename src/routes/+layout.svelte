<script>
  import "../app.css";

  import NavBar from "$lib/NavBar.svelte";

  import workExpRoutes from "/src/data/workData.json";
</script>

<header>
  <NavBar {workExpRoutes} />
</header>

<slot />

<style>
  .main-container::-webkit-scrollbar {
    width: 8px;
  }

  header {
    position: fixed;
    z-index: 4;
  }

  @media (min-width: 768px) {
    header {
      width: calc(100% - 15px);
    }
  }
</style>
