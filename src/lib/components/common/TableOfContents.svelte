<script>
	import { Share } from 'carbon-icons-svelte';
	import { Button, UnorderedList, ListItem, Link } from 'carbon-components-svelte';
	import { SvelteComponentTyped } from 'svelte';
	import { parseOutline } from '$lib/utils/generate-toc';
	import { LinkedIn, Facebook, Twitter } from 'svelte-share-buttons-component';

	/** @type {PortableText} */
	export let data;
	$: outline = parseOutline(data);
	console.log(outline);
	$: console.log(outline);
</script>

<div class="text-md cursor-pointer sticky top-20 flex gap-2 flex-col">
	{#if outline.length > 0}
		<span class="text-lg">Table of Contents</span>
		<UnorderedList class="pl-8">
			{#each outline as item}
				<ListItem>
					<Link href={`#${item.children[0]._key}`}>{item.children[0].text}</Link>
				</ListItem>
			{/each}
		</UnorderedList>
	{/if}
</div>
