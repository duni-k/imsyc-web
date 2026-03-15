<script>
  import workData from "../data/workData.json"
  import MainCard from "$lib/MainCard.svelte"
</script>

<div class="list">
  {#each workData as data, _}
    <MainCard
      img={"/hero_images/" + data.href + "_hero.png"}
      index={data.index}
      name={data.name}
      href={data.href}
    />
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
</style>
