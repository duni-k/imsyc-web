<script>
  let { img, index, name } = $props()
</script>

<div class="card">
  <img src={img} alt={name} />
  <div class="info">
    <span class="index">{index}</span>
    <span class="name">{name}</span>
  </div>
</div>

<style>
  .card {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: var(--background-secondary);
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }

  .info {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: baseline;
    gap: 24px;
    padding: 16px 24px;
    color: var(--text-secondary);
  }

  .index {
    font-family: "Montserrat";
    font-size: 2.4rem;
    font-weight: bold;
  }

  .name {
    font-family: "Syncopate";
    font-size: 1.6rem;
    text-transform: uppercase;
  }
</style>
