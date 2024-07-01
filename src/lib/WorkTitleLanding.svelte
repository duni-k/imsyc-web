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
  }

  #year,
  #subtitle {
    padding-left: var(--padding);
  }

  #company {
    padding-left: 44px;
    font-family: "Syncopate";
    font-size: 200px;
  }

  #title-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
