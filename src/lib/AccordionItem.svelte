<script>
  import { slide } from "svelte/transition"
  import { sineIn, cubicInOut } from "svelte/easing"

  width = `${width}px`;

  /**
   * @typedef {Object} Props
   * @property {any} width
   * @property {boolean} [open]
   * @property {import('svelte').Snippet} [number]
   * @property {import('svelte').Snippet} [header]
   * @property {import('svelte').Snippet} [details]
   */

  /** @type {Props} */
  let {
    width = $bindable(),
    open = $bindable(false),
    number,
    header,
    details
  } = $props();
</script>

<div class="accordion" style:width>
  <button
    onclick={() => (open = !open)}>
    <div class="header">
      <div class="bullet">
        {@render number?.()}
      </div>
      <div class="text">
        {@render header?.()}
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
      {@render details?.()}
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
