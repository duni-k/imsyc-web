<script>
	import Carousel from '$lib/Carousel.svelte';

	let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
</script>

<Carousel duration="5000">
	{#each colors as color, index (index)}
		<div class="container" style="background-color: {color}" />
	{/each}
	<img slot="left-control" src="/images/arrow-left.svg" alt="right control for carousel" />
	<img slot="right-control" src="/images/arrow-right.svg" alt="right control for carousel"/>
</Carousel>

<style>
	.container {
		height: 504px;
		width: 318px;
	}
</style>
