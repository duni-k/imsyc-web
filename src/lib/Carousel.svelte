<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  export let workData;
</script>

<Splide aria-label="My Work Carousel">
  {#each workData as data}
    <SplideSlide>
      <img src={data.src} alt="placeholder" />
    </SplideSlide>
  {/each}
</Splide>
