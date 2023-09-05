<script>
	import Scripts from './Scripts.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Header from '$lib/components/common/Header.svelte';
</script>

<Header />
<div class="font-san content w-full min-h-screen">
	<slot />
</div>
<Footer />
<Scripts />

<style>
	.content {
		margin-top: 3rem;
	}
</style>
