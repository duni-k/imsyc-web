<script>
  import AccordionItem from "$lib/AccordionItem.svelte"
  export let items
</script>

{#each items as { header, details}, number }
  <hr/>
  <AccordionItem>
    <h1 slot="number">{number + 1}</h1>
    <h1 slot="header">{header}</h1>
    <p slot="details">{@html details}</p>
  </AccordionItem>
{/each}
<hr/>

<style>
  hr {
    margin-bottom: 1rem;
  }
</style>
