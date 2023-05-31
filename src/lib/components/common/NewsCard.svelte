<script>
	import { ImageLoader } from 'carbon-components-svelte';
</script>

<div class="cursor-pointer hover:bg-theme-muted bg-white flex flex-col">
	<ImageLoader
		src="https://source.unsplash.com/random/800x600"
		fadeIn
		class="aspect-video"
		alt="random image"
	/>
	<div class="flex flex-col justify-between p-4 flex gap-12">
		<h3 class="text-lg">
			Moving forward: On deprecating carbon-components and carbon-components-react
		</h3>
		<div class="flex flex-col">
			<span class="text-gray-800"> francine luca </span>
			<span> May 15th, 2023 </span>
		</div>
	</div>
</div>
