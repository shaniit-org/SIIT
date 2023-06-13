<script>
	import { renderStudio } from 'sanity';
	import { onMount } from 'svelte';
	import config from '../../lib/studio/sanity.config';
	onMount(() => {
		renderStudio(document.getElementById('sanity-studio'), config);
	});
</script>

<div>
	<div id="sanity-studio" />
</div>

<style>
	#sanity-studio {
		height: 100vh;
		max-height: 100dvh;
		overscroll-behavior: none;
		-webkit-font-smoothing: antialiased;
		overflow: auto;
	}
</style>
