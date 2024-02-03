<script>
	import { onMount } from 'svelte';

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

<button
	on:click={shareOnFacebook}
	aria-label="Share"
	class="text-xl btn-icon variant-soft-primary grid place-items-center"
>
	<iconify-icon icon="ri:facebook-fill" />
</button>
