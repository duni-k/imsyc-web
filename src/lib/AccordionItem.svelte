<script>
  import { slide } from "svelte/transition"
  import { sineIn, cubicInOut } from "svelte/easing"

  export let width
  width = `${width}px`;

  export let open = false
</script>

<div class="accordion" style:width>
  <button
    on:click={() => (open = !open)}>
    <div class="header">
      <div class="bullet">
        <slot name="number"></slot>
      </div>
      <div class="text">
        <slot name="header"></slot>
      </div>

      <img
        class="accordion-button-{open ? "open" : "close"}"
        src="/images/accordion-button.svg" alt=""
       />
    </div>
  </button>
</div>

{#if open}
  <div class="details-container">
    <div
      class="details"
      style:width
      in:slide={{delay: 0, duration: 800, easing: sineIn, axis: "y" }}
      out:slide={{delay: 100, duration: 300, easing: cubicInOut, axis: "y" }}
    >
      <slot name="details"></slot>
    </div>
  </div>
{/if}

<style>
  .accordion {
    height: 109px;
  }

  button {
    display: flex;
		justify-content: left;
		align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .accordion-button-open,
  .accordion-button-close {
    position: absolute;
    right: 24px;
    width: 29px;
    height: 29px;
    object-fit: contain;
    transition: transform 0.4s ease;
  }

  .accordion-button-open {
    transform: rotate(135deg);
    transition: transform 0.8s ease;
  }

  .header {
    padding-left: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: var(--text-secondary);
		width: 100%;
  }

  .header .bullet {
    grid-column: 1;
  }
	
	.header .text, .header .bullet {
		text-align: left;
    font-family: Montserrat;
    font-size: 1.5rem;
	}

	.header .text {
	  grid-column: 2 / 4;
	}

	.details-container {
	  padding-left: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
	}

	.details {
	  grid-column: 2 / 5;
	  margin-bottom: calc(var(--padding) / 2 );
	}

	.bullet, .text, img {
	  height: 100%;
	}
</style>
