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
    justify-content: space-between;
    width: 100%;
    line-height: 40px;
    padding-left: var(--padding);
    padding-right: var(--padding);
    & > div:first-child {
      min-width: fit-content;
    }
    & > div ~ div {
      width: 1098px;
    }
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

  @media only screen and (max-width: 767px) {
    #section-overview {
      flex-direction: column;
      height: fit-content;
    }
    #section-overview > div ~ div {
      padding-top: 24px;
      width: calc(100% - 2 * var(--padding));
    }

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
