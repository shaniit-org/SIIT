<script>
	import { Button } from 'carbon-components-svelte';
	import { Share, Link as LinkIcon } from 'carbon-icons-svelte';
	/**
	 * @type {Array<{title:string; slug:string; _id:string}> } ;
	 */
	export let data = [];
	export let title = 'Related ';
	export let slug_prefix = '';
</script>

<div class="text-md cursor-pointer sticky top-20 flex gap-2 flex-col">
	{#if data.length > 0}
		<span class="text-lg">{title}</span>
		<ul class="flex flex-col">
			{#each data as item}
				<li class="flex gap-2 group items-center gap-1">
					<a
						href={`${slug_prefix}/${item.slug}`}
						class="flex items-center gap-2 text-theme-dark hover:text-blue-500 hover:underline"
						>{item.title}</a
					>
					<LinkIcon size={20} class="hidden group-hover:block text-blue-500" />
				</li>
			{/each}
		</ul>
	{/if}
	<Button
		icon={Share}
		size="field"
		class="bg-blue-500 max-w-[200px] mt-12"
		iconDescription="share on facebook">Share</Button
	>
</div>
