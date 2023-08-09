<script>
	import { UnorderedList, ListItem, Link } from 'carbon-components-svelte';
	import { parseOutline } from '$lib/utils/generate-toc';

	/** @type {PortableText} */
	export let data;
	/** @type {any[]} */
	$: outline = parseOutline(data);
	/** @type {boolean} */
	export let toggle = true;

	function toggle_toc() {
		toggle = !toggle;
	}
</script>

{#if outline.length > 0}
	<div
		class="text-md cursor-pointer sticky top-20 flex gap-2 flex-col lg:min-w-[300px] border p-4 border-solid border-theme-muted"
	>
		<button on:click={toggle_toc} class="text-left outline-none border-none hover:text-blue-500">
			<span class="text-lg">Table of Contents</span>
		</button>
		{#if toggle}
			<UnorderedList class="pl-8 flex flex-col gap-2">
				{#each outline as item}
					<ListItem>
						<Link href={`#${item.children[0]._key}`}>{item.children[0].text}</Link>
					</ListItem>
				{/each}
			</UnorderedList>
		{/if}
	</div>
{/if}
