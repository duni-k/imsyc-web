<script>
  import workData from "../data/workData.json"
  import MainCard from "$lib/MainCard.svelte"
  import Footer from "$lib/Footer.svelte"
</script>

<div class="list">
  {#each workData as data, _}
    <MainCard
      img={"/" + data.href + "/" + data.href + "_hero.png"}
      index={data.index}
      name={data.name}
    />
  {/each}

  <Footer />
</div>

<style>
  .list {
    display: flex;
    flex-direction: column;
  }

</style>
