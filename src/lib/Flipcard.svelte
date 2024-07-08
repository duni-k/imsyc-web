<script>
  export let click
  export let data
  export let blur = false

  let flipCardImage = "/images/" + data.href + "/" + data.href + "-flipcard.png"
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card">
  <a class="card-inner" href={data.href} on:click={click}>
    <div id="front">
      <p id="title" class="special-text">{data.name}</p>
      <p id="branch">{data.branch}</p>
      <img src={flipCardImage} alt={data.name} />
    </div>
    <div id="back" class="bread-text {blur ? 'blur' : 'noblur'}">
      <p>{data.role}</p>
      <p><br />{data.bread}</p>
      <p><br />{data.country}</p>
      <img src="/images/card-corner.svg" />
    </div>
  </a>
</div>

<style>
  .card {
    height: 90%;
    width: 100%;
    perspective: 2000px;
    cursor: pointer;
  }

  .card-inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease;
    transform-style: preserve-3d;
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
    transition: transform 0.4s ease;
  }

  #front,
  #back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    /* backface fix for firefox */
    transform: rotate(0deg);

    text-transform: uppercase;
  }

  #front img {
    border-radius: var(--border-radius);
    width: 100%;
    height: 100%;
  }

  #front p {
    width: 100%;
    color: var(--text-secondary);
    position: absolute;
    text-align: center;
  }

  #front #title {
    font-family: "Syncopate";
    font-weight: normal;
    top: 16px;
    font-size: 24px;
  }

  #front #branch {
    font-weight: bold;
    font-size: 16px;
    bottom: 16px;
  }

  #back {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: rotateY(180deg);
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  #back p {
    font-size: 16px;
    line-height: 150%;
    text-align: left;
    padding-left: 16px;
    padding-right: 16px;
    font-weight: bold;
  }

  #back img {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .blur {
    background-color: transparent;
    border: 0;
    backdrop-filter: blur(15px) brightness(80%);
  }
  .noblur {
    background-color: var(--background-secondary);
    color: var(--text-secondary);
    border-radius: var(--border-radius);
    border: 2px solid var(--background-primary);
  }
  
  @media only screen and (max-width: 767px) {
    #back p {
      font-size: 14px;
    }

    #front #title {
      top: 8px;
      font-size: 16px;
    }

    #front #branch {
      font-size: 14px;
      bottom: 16px;
    }
  }
</style>
