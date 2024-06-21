<script>
  export let width = "300px";
  export let height = "300px";
</script>

<div class="flip-card" style:width style:height>
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <slot name="front" />
    </div>
    <div class="flip-card-back">
      <slot name="back" />
    </div>
  </div>
</div>

<style>
  .flip-card {
    background-color: transparent;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: var(--border-radius);
  }

  .flip-card-front {
    background-color: #bbb;
    color: black;
    border-radius: var(--border-radius);
  }

  .flip-card-back {
    background-color: var(--background-secondary);
    color: white;
    transform: rotateY(180deg);
    border-radius: var(--border-radius);
    border: 1px solid white;
  }
</style>
