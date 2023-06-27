<script>
	import { Button } from 'carbon-components-svelte';
	import { Launch, Tools } from 'carbon-icons-svelte';
	/**
	 * @type {import('$lib/types/nlpPage').Tools} - data
	 */
	export let data;
	console.log(data);
</script>

<div class="bg-white min-h-[160px] flex justify-between flex-col">
	<div class="flex flex-col p-4">
		<h2 class="text-xl mb-2">{data.title}</h2>
		<p class="text-sm">
			{data.description}
		</p>
	</div>
	<div class="w-full flex flex-col">
		<div class="flex justify-between">
			<div class="aspect-square grid items-center p-4">
				<Tools size={20} />
			</div>
			<Button
				size="lg"
				href={data.downloadlink}
				icon={Launch}
				target="_blank"
				aria-label="More"
				iconDescription="More"
				class="bg-theme-dark "
			/>
		</div>
	</div>
</div>
