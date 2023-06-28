<script>
	import Footer from '$lib/components/common/Footer.svelte';
	import Header from '$lib/components/common/Header.svelte';
	/**
	 * @type {'g10' | 'white'}
	 */
</script>

<Header />
<div class="font-san content w-full min-h-screen">
	<slot />
</div>
<Footer />

<style>
	.content {
		margin-top: 3rem;
	}
</style>
