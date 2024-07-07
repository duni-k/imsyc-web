<script>
  export let content
  export let minHeight = 353
</script>

<div id="section-overview" style="min-height: {minHeight}px;">
  <div>
    <h1>My domain</h1>
    <br />
    <h2>
      {#each content.domains as domain}
        {domain}<br />
      {/each}
    </h2>
  </div>
  <div>
    <h1>OVERVIEW</h1>
    {#each content.bread as paragraph}
      <br />
      <p>
        {paragraph}
      </p>
    {/each}
  </div>
</div>

<style>
  #section-overview {
    display: flex;
    justify-content: space-between;
    width: 100%;
    line-height: 40px;
    & > div:first-child {
      padding-left: var(--padding);
      padding-right: var(--padding);
      min-width: fit-content;
    }
    & > div ~ div {
      width: 1098px;
    }
    & p {
      line-height: 40px;
      padding-right: var(--padding);
      white-space: pre-wrap;
    }
  }
  #section-overview h2 {
    font-weight: lighter;
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 24px;
  }
</style>
