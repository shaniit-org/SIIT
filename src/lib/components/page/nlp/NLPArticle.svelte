<script>
	import { ImageLoader, Button } from 'carbon-components-svelte';
	import { Link } from 'carbon-icons-svelte';
</script>

<div class="cursor-pointer flex flex-col gap-8 md:flex-row md:gap-12">
	<div class="w-full h-full aspect-video md:max-w-[260px] shrink-0">
		<ImageLoader src="/images/bg.png" class="w-full " />
	</div>
	<div class="flex flex-col justify-center">
		<h2 class="text-2xl mb-2 md:mb-2">
			Moving forward: On deprecating carbon-components and carbon-components-react
		</h2>
		<span class=" mb-4"> May 15th, 2023 </span>
		<p class="mb-4 text-sm">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus commodi maiores totam
			pariatur aliquid fuga rem a amet quisquam debitis. Expedita molestias voluptates reiciendis
			architecto culpa nulla eius. Cumque, quod.
		</p>
		<Button size="field" class="border border-blue-500 text-blue-500 max-w-max" icon={Link}
			>Read More</Button
		>
	</div>
</div>
