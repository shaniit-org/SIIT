<script>
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
		class="text-md cursor-pointer card rounded-xl p-4 sticky top-20 flex gap-2 flex-col lg:min-w-[300px] border-solid border-theme-muted"
	>
		<button on:click={toggle_toc} class="text-left outline-none border-none">
			<span class="h5">On this page</span>
		</button>
		{#if toggle}
			<ul class="flex flex-col gap-2">
				{#each outline as item}
					<li class="flex items-center gap-2">
						<iconify-icon icon="basil:caret-right-outline" />
						<a class="flex items-center anchor no-underline" href={`#${item.children[0]._key}`}>
							{item.children[0].text}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}
