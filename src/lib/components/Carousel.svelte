<script>
	import Siema from 'siema';
	import { onMount } from 'svelte';

	import work from "$lib/data/work_data.json"
	
	let slider, prev, next
	let select = 0
	
	let data = [
		{val:1},
		{val:2},
		{val:3},
		{val:4},
		{val:5}
	] //end array data
	
	onMount(() => {
		slider = new Siema({
				selector: '.siema',
				duration: 200,
				easing: 'ease-in-out',
				perPage: 3,
				startIndex: 0,
				draggable: true,
				multipleDrag: true,
				threshold: 20,
				loop: true,
				rtl: false,
				onInit: () => {},
				onChange: () => {},
			}); //end Siema constructor

		prev = () => {
			slider.prev()
			if (select > 0) {
				select -= 1
			}
		}

		next = () => {
			slider.next()
			if (select >= 0) {
				select += 1
			}
		}
	}) //end onMount
	
	
</script>

<div class="wrapper">
<img src="images/arrow-left.png" class="left" on:click={prev}/>
<div class="siema">
	{#each work as { src, desc, href}}
		<div class='slider'>
			<img {src} alt={desc}/>
			<h2>{desc}</h2>
		</div>
	{/each}
</div>
<img src="images/arrow-right.png" class="right" on:click={next}/>
</div>

<style>
	.slider {
		overflow: hidden;
		background-color:lightblue;
		min-height:75vh;
		margin:1rem;
		display:flex;
		justify-content:center;
		align-items:center;
	}
	img {
		object-fit: cover;
		width: 50%;
		height: 50%;
	}
	input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		border-radius: 50%;
		width: 8px;
		height: 8px;
		
		background-color:lightgrey;
		transition: 0.2s all linear;
		margin-right: 5px;

		position: relative;
		top: 4px;
	}
	input:checked {
		background-color:grey;
	}
	.left, .right {
		z-index: 999;
		position: fixed;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.left {
	 	right: 90%;
	}
	.right {
		left: 90%;
	}
</style>