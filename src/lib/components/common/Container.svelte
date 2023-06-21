<script>
	import Footer from '$lib/components/common/Footer.svelte';
	import Header from '$lib/components/common/Header.svelte';
	import { Theme } from 'carbon-components-svelte';
	/**
	 * @type {'g10' | 'white'}
	 */
	let theme = 'white';
	let toggleTheme = () => {};
</script>

<Theme bind:theme />
<Header {toggleTheme} />
<div class="font-theme content w-full min-h-screen">
	<slot />
</div>
<Footer />

<style>
	.content {
		margin-top: 3rem;
	}
</style>
