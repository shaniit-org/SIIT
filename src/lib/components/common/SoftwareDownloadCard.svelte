<script>
	import { Button, Tag } from 'carbon-components-svelte';
	import { Download } from 'carbon-icons-svelte';
	/**
	 *  @type { import('../../types/keyboard_and_font').KeyboardOrFont} - data
	 */
	export let data;
</script>

<div class="bg-white">
	<div class="relative">
		<div class="absolute top-0 right-0">
			<Button
				size="lg"
				target="_blank"
				href={data.downloadlink}
				icon={Download}
				aria-label="Download"
				iconDescription="Download"
				class="bg-theme-dark bg-opacity-90"
			/>
		</div>
	</div>
	<div class="flex flex-col p-4">
		<h2 class="text-lg mb-2 pr-4">{data.title}</h2>
		<div class="mb-2">
			<Tag type="blue" size="sm" class="m-0">{data.type}</Tag>
		</div>
		<p class="text-sm">
			{data.description}
		</p>
	</div>
</div>
