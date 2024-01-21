<script>
	import ImageGrid from '$lib/components/ImageGrid.svelte';
	import Carousel from '$lib/components/Carousel.svelte'

 	import work from '$lib/data/work_data.json';
</script>

<div id="landing">
	<Carousel/>
	<div class="arrow-down">
		<a href="#keynotes">
			<img alt="scroll to next element" src="images/arrow-down.png"/>
		</a>
	</div>
</div>

<div id="keynotes">
</div>

<style>
	#landing, #keynotes {
		background-color: #FFF;
		min-height: 100vh;
	}

	.arrow-down {
	  display: flex;
	  justify-content: center;
	}
</style>
