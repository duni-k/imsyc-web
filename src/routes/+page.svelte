<script>
	import Carousel from "$lib/Carousel.svelte";

	import workData from "/src/data/workData.json";

	function scrollIntoView({ target }) {
		const el = document.querySelector(target.getAttribute("href"));
		if (!el) return;
		el.scrollIntoView({
			behavior: "smooth",
			top,
		});
	}
</script>

<div class="container">
	<section id="experience">
		<Carousel duration="1000">
			{#each workData as carouselItem (carouselItem.id)}
				<div id="carouselItem">
					{#if !carouselItem.isFirstItem}
						<img
							id="carousel-image"
							src={carouselItem.src}
							alt={carouselItem.alt}
						/>
						<div id="description">
							<p id="year">
								{carouselItem.year}
							</p>
							<h2>
								{carouselItem.role} @ {carouselItem.employer}
							</h2>
							<p id="bread">
								{carouselItem.bread}
							</p>
						</div>
					{:else}
						<div id="first-item">
							<h1>
								{carouselItem.text}
							</h1>
						</div>
					{/if}
				</div>
			{/each}
		</Carousel>

		<a href="#speeches" on:click={scrollIntoView}>
			<nav class="button-container" id="down-button">
				<img src="/images/arrow-down.svg" alt="scroll to next page" />
			</nav>
		</a>
	</section>

	<section id="speeches">
		<a href="#experience" on:click={scrollIntoView}>
			<nav class="button-container" id="up-button">
				<img src="/images/arrow-up.svg" alt="scroll to previous page" />
			</nav>
		</a>

		<h2 style="font-size: 54px; color: white">TESTING</h2>
	</section>
</div>

<style>
	@media (min-width: 768px) {
		h1 {
			font-family: "Playfair Display";
			font-size: 42px;
			color: #fafafa;
			font-style: normal;
			font-weight: 600;
			line-height: 64px; /* 152.381% */
			letter-spacing: 1.26px;
			margin: 48px;
		}

		.container {
			width: 100%;
			height: 100vh;
			scroll-snap-type: y mandatory;
			overflow-x: hidden;
			overflow-y: scroll;
			scroll-behavior: smooth;
		}

		section {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100vw;
			height: 100vh;
			scroll-snap-align: start;
		}

		#experience {
			justify-content: end;
		}

		#speeches {
			justify-content: start;
			background: #2f2e2e;
		}

		#first-item {
			width: 100%;
			height: 100%;
			background-color: #222;
		}

		#carouselItem {
			display: flex;
			flex-direction: column;
			width: 80%;
			height: 700px;
			border-radius: 4px;
			overflow: hidden;
			-webkit-transition: background-color 0.5s ease-out;
			-moz-transition: background-color 0.5s ease-out;
			-o-transition: background-color 0.5s ease-out;
			transition: background-color 0.5s ease-out;
		}

		#carouselItem:hover {
			background-color: #d7d7d76e;
		}

		#description {
			margin: 5px;
		}

		#carousel-image {
			height: 60%;
			width: 100%;
			object-fit: cover;
		}

		.button-container {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 64px;
			width: 128px;
			background: rgba(255, 255, 255, 0.3);
			backdrop-filter: blur(2px);
			border-radius: 3px;
		}

		.button-container {
			-webkit-transition: background-color 0.5s ease-out;
			-moz-transition: background-color 0.5s ease-out;
			-o-transition: background-color 0.5s ease-out;
			transition: background-color 0.5s ease-out;
		}

		#down-button:hover {
			background: rgba(200, 200, 200, 0.3);
		}

		#up-button:hover {
			background: rgba(255, 255, 255, 0.6);
		}

		#down-button {
			margin-bottom: 3vh;
			margin-top: 3vh;
		}

		#up-button {
			margin-top: 13vh;
		}
	}
</style>
