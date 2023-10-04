<script>
	import { Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import LogoFacebook from 'carbon-icons-svelte/lib/LogoFacebook.svelte';

	/** @type string */
	let url;
	onMount(() => {
		url = window.location.href;
	});

	function shareOnFacebook() {
		const navUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
		window.open(navUrl, '_blank');
	}
</script>

<Button
	kind="primary"
	iconDescription="Delete"
	icon={LogoFacebook}
	class="mt-4 bg-blue-500"
	on:click={shareOnFacebook}
/>
