<script>
	import 'carbon-components-svelte/css/all.css';

	/**
	 * @type { import('carbon-components-svelte/types/Theme/Theme.svelte').CarbonTheme}
	 */
</script>

<div>
	<slot name="header" />
	<slot />
	<slot name="footer" />
</div>
