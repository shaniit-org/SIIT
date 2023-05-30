<script>
	import { Tile, ImageLoader } from 'carbon-components-svelte';
</script>

<Tile class="flex flex-col gap-4">
	<ImageLoader
		src="https://source.unsplash.com/random/800x600"
		fadeIn
		class="aspect-video"
		alt="random image"
	/>
	<div class="flex flex-col justify-between">
		<h3>Moving forward: On deprecating carbon-components and carbon-components-react</h3>
		<div class="flex flex-col">
			<span class="dark:text-red-200"> francine luca </span>
			<span> May 15th, 2023 </span>
		</div>
	</div>
</Tile>
