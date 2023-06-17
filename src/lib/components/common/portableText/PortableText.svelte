<script>
	import { PortableText } from '@portabletext/svelte';
	import { components } from './components';
	/**
	 *  @type {import('@portabletext/svelte/ptTypes').InputValue}
	 */
	export let value = [];
</script>

<PortableText {value} {components} />
