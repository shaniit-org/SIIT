<script>
	import { Tag } from 'carbon-components-svelte';

	/**
    @type string - title 
     */
	export let title;
	/**
      @type string - charType 
     */
	export let charType;

	/**
        @type string - description
     */
	export let description;
</script>

<div
	class="w-full bg-gradient-to-b from-black to-gray-900 mt-[3em] text-white min-h-[300px] flex justify-end flex-col"
>
	<div class="section-container border p-6 md:p-12 w-full">
		<h1 class="text-5xl leading-[1.1] md:text-6xl mb-4">{title}</h1>
		<div class="flex flex-col gap-2 mt-4">
			<p class="leading-loose text-sm">
				{description}
			</p>
			<Tag class="max-w-max">{charType}</Tag>
		</div>
	</div>
</div>
