<script>
  export let content
  export let minHeight = 353
</script>

<div id="section-overview" style="min-height: {minHeight}px;">
  <div>
    <h1>My domain</h1>
    <h2>
      <br class="separator" />
      {#each content.domains as domain}
        {domain}<br />
      {/each}
    </h2>
  </div>
  <div>
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
  #section-overview {
    display: flex;
    width: 100% - 2 * var(--padding);
    justify-content: space-between;
    line-height: 40px;
    padding-left: var(--padding);
    padding-right: var(--padding);
  }

  #section-overview > div:last-child {
      width: 60%;
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
    font-size: 24px;
  }
  @media only screen and (max-width: 1023px) {
    #section-overview {
      display: flex;
      flex-direction: column;
      height: fit-content;
    }

    #section-overview > div:last-child {
      padding-top: 24px;
      width: 100%;
    }
  }

  @media only screen and (max-width: 767px) {
    h1 {
      font-size: 14px;
    }
    h2 {
      line-height: 17px;
      font-family: "Montserrat";
      font-weight: bold;
      font-size: 12px;
    }
    p {
      line-height: 17px;
      text-align: justify;
    }
  }
</style>
