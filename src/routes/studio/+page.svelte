<script>
	export const ssr = false;
	import { renderStudio } from 'sanity';
	import config from '../../lib/studio/sanity.config';
	renderStudio(document.getElementById('sanity-studio'), config);
</script>

<div id="sanity-studio" />

<style>
	#sanity-studio {
		height: 100vh;
		max-height: 100dvh;
		overscroll-behavior: none;
		-webkit-font-smoothing: antialiased;
		overflow: auto;
	}
</style>
