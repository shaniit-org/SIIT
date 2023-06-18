<script>
	import { Button } from 'carbon-components-svelte';
	import { TreeView } from 'carbon-components-svelte';
	import { generate_toc } from '$lib/utils/generate-toc';
	import { Share } from 'carbon-icons-svelte';
	/**
	 * {PortableText} - data
	 */
	export let data;
	const toc = generate_toc(data);
	/**
	 * {number | null} - activeId
	 */
	let activeId = null;

	$: {
		if (activeId) {
			const element = document.getElementById(activeId);
			element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<div class="text-md cursor-pointer sticky top-20 flex gap-4 flex-col">
	<div>
		<TreeView children={toc} labelText="Table of Contents" bind:activeId />
	</div>
	<Button
		icon={Share}
		size="field"
		class="bg-blue-500 max-w-[200px]"
		iconDescription="share on facebook">Share</Button
	>
</div>
