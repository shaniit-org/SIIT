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
		class="text-md cursor-pointer border-l-2 sticky top-20 flex gap-2 flex-col lg:min-w-[300px] pl-4 py-2 border-solid border-theme-muted"
	>
		<button on:click={toggle_toc} class="text-left outline-none border-none">
			<span class="text-lg">On this page</span>
		</button>
		{#if toggle}
			<UnorderedList class=" pl-4 flex flex-col gap-2">
				{#each outline as item}
					<ListItem>
						<Link class=" hover:text-blue-500" href={`#${item.children[0]._key}`}>
							<span class="text-theme-dark">
								{item.children[0].text}
							</span>
						</Link>
					</ListItem>
				{/each}
			</UnorderedList>
		{/if}
	</div>
{/if}
