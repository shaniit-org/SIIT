<script>
	import { PortableText } from '@portabletext/svelte';
	import { components } from './components';
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-bash';
	import 'prismjs/components/prism-git';
	import 'prismjs/components/prism-python';
	import 'prismjs/components/prism-markdown';
	/**
	 *  @type {import('@portabletext/svelte/dist/index').InputValue}
	 */
	export let value = [];
	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="prose lg:prose-xl">
	<PortableText {value} {components} />
</div>
