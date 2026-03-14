<script>
  import workData from "../data/workData.json"
  import MainCard from "$lib/MainCard.svelte"
</script>

<div class="list">
  {#each workData as data, i}
    <MainCard
      img={"/images/" + data.href + "/" + data.href + "-flipcard.png"}
      index={i + 1}
      name={data.name}
    />
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: var(--padding);
  }
</style>
