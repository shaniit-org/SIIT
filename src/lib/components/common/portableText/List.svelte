<script>
	import { OrderedList, UnorderedList } from 'carbon-components-svelte';
	/**
	 *  @type {import("@portabletext/svelte").BlockComponentProps}>
	 */
	export let portableText;
	const { value } = portableText;
</script>

{#if value.listItem === 'number'}
	<OrderedList class="pl-12 my-4 leading-loose flex flex-col gap-2">
		<slot />
	</OrderedList>
{/if}
{#if value.listItem === 'bullet'}
	<UnorderedList class="pl-11  my-4 leading-loose flex flex-col gap-2">
		<slot />
	</UnorderedList>
{/if}
