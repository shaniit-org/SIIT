<script>
	/**
	 *  @type {import("@portabletext/svelte").CustomBlockComponentProps}>
	 */
	export let portableText;
	const { value } = portableText;
</script>

<a href={value.href} class="anchor dark:text-primary-500"><slot /></a>
