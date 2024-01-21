<script>
	export let images;
</script>

<div class="row">
	{#each images as { src, label, href, desc }}
		<div class="container">
			<a {href}>
				<img {src} alt="Portfolio image for the company {label}" />
				<div class="text">
					<p class="company-name font-light">{label}</p>
					<p />
					<h2 class="company-desc">
						{desc}
						<p />
					</h2>
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	.row {
		width: 100%;
		display: flex;
	}

	.container {
		margin: 0px;
		position: relative;
		width: 100%;
		margin: 0px;
		padding: 0px;
	}

	img {
		width: 100%;
		opacity: 1;
		display: block;
		transition: all 0.2s ease;
		backface-visibility: hidden;
	}

	.text {
		transition: all 0.5s ease;
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 40%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		text-align: left;
		color: #000;
	}

	.company-name {
		font-size: 1.2em;
	}

	.company-desc {
		font-size: 1.5em;
	}

	.container:hover img {
		opacity: 0.2;
	}

	.container:hover .text {
		opacity: 1;
	}

	.container {
		display: block;
		width: 50%;
	}
</style>
