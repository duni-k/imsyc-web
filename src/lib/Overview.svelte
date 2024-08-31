<script>
  export let content
  export let minHeight = 353
</script>

<div class="section-container" style="min-height: {minHeight}px;">
  <div class="domain">
    <h1>My domain</h1>
    <h2>
      <br class="separator" />
      {#each content.domains as domain}
        {domain}<br />
      {/each}
    </h2>
  </div>
  <div class="overview">
    <h1>OVERVIEW</h1>
    {#each content.bread as paragraph}
      <p>
        <br />
        {paragraph}
      </p>
    {/each}
  </div>
</div>

<style>
  .section-container {
    margin-top: var(--padding);
  }
  .domain {
    grid-column: 1 / 3;
  }

  .overview {
    display: flex;
    flex-direction: column;
    grid-column: 4 / 9;
  }

  p {
    line-height: 40px;
  }

  h1 {
    font-family: "Syncopate";
  }

  h2 {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 2.4rem;
  }

  @media only screen and (max-width: 1023px) {
    .section-container {
      display: flex;
      flex-direction: column;
      height: fit-content;
    }

    .section-container > div:last-child {
      padding-top: 24px;
      width: 100%;
    }
  }

  @media only screen and (max-width: 767px) {
    h1 {
      font-size: 1.4rem;
    }
    h2 {
      line-height: 1.7rem;
      font-family: "Montserrat";
      font-weight: bold;
      font-size: 1.2rem;
    }
    p {
      line-height: 1.7rem;
      text-align: justify;
    }
  }
</style>
