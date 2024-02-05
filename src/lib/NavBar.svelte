<script>
	import { blur, slide } from "svelte/transition";

	export let workExpRoutes;

	let isExpanded = false;
	let innerWidth = 0;

	function clickHandler() {
		isExpanded = !isExpanded;
	}

	function mouseLeave() {
		isExpanded = false;
	}

	function mouseEnter() {
		isExpanded = true;
	}

	$: transitionAnimation = innerWidth <= 768 ? slide : blur
	console.log(transitionAnimation)
</script>

<svelte:window bind:innerWidth />
<nav class="navbar" transition:transitionAnimation>
	<a href="/"><img class="logo" src="/images/favicon.svg" alt="my logo" /></a>
	<input class="menu-btn" type="checkbox" id="menu-btn" />
	<label class="menu-icon" for="menu-btn"><span class="navicon"></span></label
	>
	<ul class="menu">
		<div class="internal-btn-grp">
			<li>
				<button
					on:click={clickHandler}
					on:mouseenter={mouseEnter}
					on:mouseleave={mouseLeave}
					class="dd-btn"
				>
					<span class="link-text expander-txt">Experience</span>
					<img
						class="expander-icon"
						src={isExpanded
							? "/images/minus.svg"
							: "/images/plus.svg"}
						alt="expander-icon"
					/>
				</button>
			</li>
			{#if isExpanded}
				<div
					class="dropdown"
					role="button"
					tabindex="-1"
					on:mouseenter={mouseEnter}
					on:mouseleave={mouseLeave}
					transition:transitionAnimation={{ delay: 0, duration: 300 }}
				>
					<ul>
						{#each workExpRoutes as workExpRoute}
							{#if !workExpRoute.isFirstItem}
								<li class="dd-li">
									<a
										class="dd-link-text"
										href={workExpRoute.href}
										>{workExpRoute.employer}</a
									>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			{/if}
			<li class="menu-item">
				<div>
					<a class="link-text" href="/">UX articles</a>
				</div>
			</li>
			<li class="menu-item">
				<div>
					<a class="link-text" href="/">Resume</a>
				</div>
			</li>
		</div>
		<div class="ext-btn-grp">
			<li>
				<a href="https://se.linkedin.com/in/stellahsiaoyuchen">
					<button class="ext-btn">
						<div class="btn-text">Linkedin</div>
						<img
							class="btn-icon"
							src="/images/linkedin.svg"
							alt="linkedin icon"
						/>
					</button>
				</a>
			</li>
			<li>
				<a href="mailto:imsyc1992@gmail.com">
					<button class="ext-btn">
						<span class="btn-text">Email me</span>
						<img
							class="btn-icon"
							src="/images/mail.svg"
							alt="mail icon"
						/>
					</button>
				</a>
			</li>
		</div>
	</ul>
</nav>

<style>
	* {
		border: none;
		white-space: nowrap;
	}

	a {
		font-family: Avenir;
		font-style: bold;
		height: 100%;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #fff;
	}

	li {
		height: 10vh;
		margin: 0;
		padding: 0;
		justify-content: center;
	}

	button:focus {
		outline: none;
	}

	.btn-text {
		float: left;
		overflow: hidden;
		color: white;
	}

	.btn-icon {
		float: right;
		padding-top: 1%;
	}

	.dropdown {
		display: block;
		text-align: center;
		background-color: white;
	}

	.dd-btn {
		display: inline-flex;
		width: 100vw;
		height: 100%;
		justify-content: center;
		align-items: center;
		background-color: white;
		color: black;
	}

	.dd-btn:active {
		background-color: rgba(209, 209, 209, 0.192);
	}

	.dd-li {
		height: 7vh;
	}

	.dd-link-text {
		font-style: light;
		font-size: 16px;
		color: #a0a09f;
		text-align: center;
		text-decoration: none;
	}

	.internal-btn-grp {
		justify-content: center;
		margin: 0;
		padding: 0;
		margin-top: 10vh;
		height: 60vh;
		overflow: hidden;
	}

	.ext-btn {
		position: relative;
		display: inline;
		height: 6vh;
		width: 80%;
		margin: 2% 10% 5%;
		margin-bottom: 0;
		border-radius: 3px;
		background-color: black;
	}

	.ext-btn:active {
		background-color: white;
		color: black;
	}

	.link-text {
		font-size: 24px;
		text-align: center;
		display: block;
		text-decoration: none;
		color: black;
	}

	.menu-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.navbar {
		top: 0;
		background-color: #fff;
		width: 100%;
		z-index: 3;
	}

	.navbar .logo {
		float: left;
		padding: 1em 1em;
	}

	/* menu */
	.navbar .menu {
		justify-content: space-between;
		clear: both;
		max-height: 0;
		height: 100%;
	}

	/* menu icon */
	.navbar .menu-icon {
		cursor: pointer;
		float: right;
		padding: 35px 20px;
		position: relative;
		user-select: none;
	}

	.navbar .menu-icon .navicon {
		background: #333;
		display: block;
		height: 2px;
		position: relative;
		transition: background 0.2s ease-out;
		width: 20px;
	}

	.navbar .menu-icon .navicon:before,
	.navbar .menu-icon .navicon:after {
		background: #333;
		content: "";
		display: block;
		height: 100%;
		position: absolute;
		transition: all 0.2s ease-out;
		width: 100%;
	}

	.navbar .menu-icon .navicon:before {
		top: 5px;
	}

	.navbar .menu-icon .navicon:after {
		top: -5px;
	}

	/* menu btn */

	.navbar .menu-btn {
		display: none;
	}

	.navbar .menu-btn:checked ~ .menu {
		max-height: 100%;
		transition:
			all 0.3s ease-in-out 0s,
			visibility 0s linear 0.3s,
			z-index 0s linear 0.01s;
	}

	.navbar .menu-btn:checked ~ .menu-icon .navicon {
		background: transparent;
	}

	.navbar .menu-btn:checked ~ .menu-icon .navicon:before {
		transform: rotate(-45deg);
	}

	.navbar .menu-btn:checked ~ .menu-icon .navicon:after {
		transform: rotate(45deg);
	}

	.navbar .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
	.navbar .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
		top: 0;
	}

	@media (min-width: 768px) {
		* {
			margin: 0;
			padding: 0;
			font-size: 16px;
		}

		button {
			height: 100%;
		}

		.btn-text,
		.link-text {
			color: black;
		}

		ul {
			height: 100%;
		}

		li {
			float: right;
			height: 100%;
			background-color: white;
			padding-right: 48px;
		}

		li:has(~ li:hover) .link-text,
		li:hover ~ li .link-text,
		li:has(~ li:hover) .btn-text,
		li:hover ~ li .btn-text,
		div:hover ~ li .link-text,
		.internal-btn-grp:hover + .ext-btn-grp .btn-text,
		.internal-btn-grp:has(+ .ext-btn-grp:hover) .link-text {
			color: #a0a09f;
		}

		.link-text {
			font-size: 16px;
		}

		.dropdown {
			position: absolute;
			left: -5px;
			top: 10vh;
			width: 200px;
			border-radius: 2px;
			z-index: 99;
			background: rgba(255, 255, 255, 0.8);
			backdrop-filter: blur(2px);
		}

		.dropdown * {
			background-color: rgba(0, 0, 0, 0);
		}

		.dropdown > ul {
			display: flex;
			flex-direction: column;
			text-align: left;
		}

		.dropdown > ul li {
			height: 43px;
		}

		.ext-btn {
			width: 100%;
			height: 100%;
			border: 0;
			margin: 0;
			background-color: white;
		}

		.internal-btn-grp {
			overflow: visible;
			position: relative;
			display: flex;
			flex-direction: row;
			margin-top: 0vh;
			height: 100%;
		}

		/* menu */
		.navbar .menu {
			overflow: visible;
			position: static;
			display: inline-flex;
			max-height: 100%;
		}

		.menu-item {
			display: flex;
			margin: auto;
		}

		.btn-icon,
		.menu-icon,
		.expander-icon {
			display: none;
		}

		.dd-btn {
			width: 100%;
		}

		.dd-link-text {
			padding-left: 5px;
			font-size: 14px;
		}

		.dd-link-text:hover {
			color: black;
		}

		.ext-btn {
			background-color: white;
			color: black;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.navbar {
			background-color: #fff;
			width: 100%;
			height: 10vh;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			z-index: 3;
		}

		.navbar .logo {
			padding-top: 2em;
		}
	}
</style>
