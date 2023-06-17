<script>
	import { ListItem } from 'carbon-components-svelte';
	/**
	 *  @type {import("@portabletext/svelte").BlockComponentProps}>
	 */
	export let portableText;
</script>

<ListItem class="text-base">
	<slot />
</ListItem>
