<script lang="ts">
	let { children } = $props();
</script>

<svg class="gooey-effect" xmlns="http://www.w3.org/2000/svg" version="1.1">
	<defs>
		<filter id="gooey">
			<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
			<feColorMatrix
				in="blur"
				type="matrix"
				values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
				result="goo"
			/>
			<feComposite in="SourceGraphic" in2="goo" operator="atop" />
		</filter>
	</defs>
</svg>

<div class="gooey-container">
	{@render children()}
</div>

<style>
	.gooey-effect {
		display: none;
	}
	.gooey-container {
		filter: url('#gooey');
	}
</style>
