<script>
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { Share } from 'carbon-icons-svelte';
	/**
	 *  @type {string}
	 */
	export let title = '';
</script>

<div
	class="w-full bg-gradient-to-b from-black to-gray-900 text-white min-h-[300px] flex justify-end flex-col"
>
	<div class="section-container box w-full">
		<h1 class="text-3xl lg:text-5xl lg:leading-[1.2] my-6">
			{title}
		</h1>
		<div class="flex items-center gap-4">
			<div class="w-[60px] aspect-square rounded-full bg-gray-800" />
			<div class="flex flex-col">
				<span class="uppercase mb-1 text-sm"> sai mawn khan </span>
				<div class="flex items-center gap-4">
					<span class="text-gray-500">5 min read</span>
					<span class="text-sm text-gray-500"> Jan 12, 2023 </span>
				</div>
			</div>
		</div>
		<!--
		<ButtonSet class="mt-8 flex gap-1 bg-transparent max-w-max">
			<Button icon={Share} class="bg-gray-900 text-gray-300 ">Facebook</Button>
			<Button icon={Share} class="bg-gray-900 text-gray-300">Twitter</Button>
			<Button icon={Share} size="field" class="bg-gray-900 text-gray-300">LinkedIn</Button>
		</ButtonSet>
        -->
	</div>
</div>
