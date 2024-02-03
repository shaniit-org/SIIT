<script>
	/**
	 *  @type {import("@portabletext/svelte").CustomBlockComponentProps}>
	 */
	export let portableText;
	const { value } = portableText;
</script>

<a href={value.href} class="anchor"><slot /></a>
