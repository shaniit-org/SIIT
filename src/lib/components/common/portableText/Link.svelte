<script>
	import { Link } from 'carbon-components-svelte';
	import { Link as LinkIcon } from 'carbon-icons-svelte';
	/**
	 *  @type {import("@portabletext/svelte").CustomBlockComponentProps}>
	 */
	export let portableText;
	const { value } = portableText;
</script>

<Link href={value.href} icon={LinkIcon} class="mt-2 mx-2 "><slot /></Link>
