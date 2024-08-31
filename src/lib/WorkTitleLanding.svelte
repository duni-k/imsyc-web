<script>
  export let year, company, subtitle, image
</script>

<div id="title" class="extended-palette">
  <p id="year">{year}</p>
  <h1 id="company">{company}</h1>
  <p id="subtitle">{subtitle}</p>
</div>

<img id="title-image" src={image} alt="{company} highlight" />


<style>
  #title {
    display: flex;
    flex-direction: column;
    text-align: start;
    justify-content: end;
    font-weight: bold;
    height: 85vh;
    text-transform: uppercase;
    padding-bottom: var(--padding);
  }

  #year,
  #subtitle {
    padding-left: var(--padding);
  }

  #company {
    padding-left: 44px;
    font-family: "Syncopate";
    font-size: 20rem;
  }

  #title-image {
    z-index: 0;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 100%;
    object-fit: contain;
  }

  @media only screen and (min-width: 767px) and (max-width: 1023px) {
    #company {
      font-size: 6rem;
      padding-left: 55px;
    }
  }

  @media only screen and (max-width: 767px) {
    #company {
      font-size: 2.4rem;
      padding-left: 15px;
    }

    #year,
    #subtitle {
      font-size: 1rem;
    }
    #title {
      height: 30vh;
    }

    #title-image {
      height: 360px;
    }
  }
</style>
