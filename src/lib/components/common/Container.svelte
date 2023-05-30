<script>
	import Header from '$lib/components/common/Header.svelte';
	import { Theme } from 'carbon-components-svelte';
	/**
	 * @type {'g90' | 'white'}
	 */
	let theme = 'g90';
	let toggleTheme = () => {
		theme = theme === 'g90' ? 'white' : 'g90';
	};
</script>

<Theme bind:theme />
<Header {toggleTheme} />
<div class="content">
	<slot />
</div>

<style>
	.content {
		margin-top: 3rem;
	}
</style>
