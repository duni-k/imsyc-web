<script>
  import AccordionItem from "$lib/AccordionItem.svelte"
  let { items } = $props();
</script>

{#each items as { header, details}, number }
  <hr/>
  <AccordionItem>
    {#snippet number()}
        <h1 >{number + 1}</h1>
      {/snippet}
    {#snippet header()}
        <h1 >{header}</h1>
      {/snippet}
    {#snippet details()}
        <p >{@html details}</p>
      {/snippet}
  </AccordionItem>
{/each}
<hr/>

<style>
  hr {
    margin-bottom: 1rem;
  }
</style>
