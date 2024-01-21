<div class="section wrapper bg-dark fg-light sans-serif">
	<div class="padded" id="competence">
		<h2>Core Competence</h2>
	</div>
	<div class="pd">
		<h3>Product Design</h3>
		<hr class="line" />
		<p>I design products that solve problems and drive both user and business value.</p>
	</div>
	<div class="ps">
		<h3>Product Strategy</h3>
		<hr class="line" />
		<p>I help companies define their vision and business model.</p>
	</div>
	<div class="ur">
		<h3>User Research</h3>
		<hr class="line" />
		<p>I am excellent at uncovering user needs, behaviours and preference.</p>
	</div>
	<div class="cb">
		<h3>Culture Building</h3>
		<hr class="line" />
		<p>I help companies build creative teams and user-centred culture.</p>
		<p />
	</div>
</div>

<style>
	h2, h3, p {
		text-align: left;
		color: white;
	}

	.wrapper {
		flex-direction: column;
	}

	.pd,
	.ps,
	.ur,
	.cb {
		margin-left: 5%;
		margin-right: 5%;
	}

	#competence {
		padding-bottom: 40px;
	}

	h3 {
		font-size: 15px;
	}

	.line {
		border-color: white;
		width: 100%;
		margin-left: 0;
		border-width: 2px;
	}

	@media only screen and (min-width: 481px) {
		.wrapper {
			display: grid;
		}
		#competence,
		.pd,
		.ps,
		.ur,
		.cb {
			margin-left: 0%;
			margin-right: 0%;
		}
	}

	@media only screen and (min-width: 481px) and (max-width: 1079px) {
		.wrapper {
			padding-top: 40px;
			padding-bottom: 40px;
			grid-template-columns: repeat(50, 1fr);
		}

		h3 {
			font-size: 20px;
		}

		#competence,
		.pd,
		.ps {
			grid-column-end: 25;
		}

		.pd,
		.ps {
			grid-column-start: 4;
		}

		.ur,
		.cb {
			grid-column-start: 28;
			grid-column-end: 45;
		}

		#competence {
			grid-column-start: 4;
			grid-column-end: 15;
			grid-row-start: 1;
			grid-row-end: 2;
		}

		.pd,
		.ur {
			grid-row-start: 4;
			grid-row-end: 5;
		}

		.ps,
		.cb {
			grid-row-start: 6;
			grid-row-end: 7;
		}

		.line {
			border-width: 3px;
		}
	}

	@media only screen and (min-width: 1080px) {
		.wrapper {
			grid-template-columns: repeat(20, 1fr);
			padding-top: 80px;
			padding-bottom: 80px;
		}

		h3 {
			font-size: 24px;
		}

		#competence {
			grid-column-start: 2;
			grid-column-end: 7;
			grid-row-start: 1;
			grid-row-end: 2;
		}

		.pd,
		.ps {
			grid-column-start: 9;
			grid-column-end: 13;
		}

		.pd {
			grid-row-start: 1;
			grid-row-end: 2;
		}

		.ps {
			grid-row-start: 2;
			grid-row-end: 3;
		}

		.ur,
		.cb {
			grid-column-start: 13;
			grid-column-end: 17;
		}

		.ur {
			grid-row-start: 1;
			grid-row-end: 2;
		}

		.cb {
			grid-row-start: 2;
			grid-row-end: 3;
		}

		.line {
			width: 25%;
			border-width: 3px;
		}
	}
</style>
