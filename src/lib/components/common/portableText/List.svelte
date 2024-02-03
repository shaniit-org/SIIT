<script>
	/**
	 *  @type {import("@portabletext/svelte").BlockComponentProps}>
	 */
	export let portableText;
	const { value } = portableText;
</script>

{#if value.listItem === 'number'}
	<ol class="pl-4 md:pl-8 py-2 list-decimal">
		<slot />
	</ol>
{/if}
{#if value.listItem === 'bullet'}
	<ul class="pl-4 md:pl-8 py-2 list-decimal">
		<slot />
	</ul>
{/if}
