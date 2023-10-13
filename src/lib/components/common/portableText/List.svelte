<script>
	import { OrderedList, UnorderedList } from 'carbon-components-svelte';
	/**
	 *  @type {import("@portabletext/svelte").BlockComponentProps}>
	 */
	export let portableText;
	const { value } = portableText;
</script>

{#if value.listItem === 'number'}
	<OrderedList class="not-prose pl-4 my-4 leading-loose flex flex-col gap-2">
		<slot />
	</OrderedList>
{/if}
{#if value.listItem === 'bullet'}
	<UnorderedList class="not-prose pl-4 my-4 leading-loose flex flex-col gap-2">
		<slot />
	</UnorderedList>
{/if}
