<script>
	import { onNavigate } from '$app/navigation';
	import Scripts from './Scripts.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Header from '$lib/components/common/Header.svelte';
	import FloatingDonate from '$lib/components/common/FloatingDonate.svelte';

	onNavigate((navigation) => {
		// check if view transition is supported
		// @ts-ignore
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			//@ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Header />
<div class="font-san content w-full min-h-screen">
	<slot />
</div>
<FloatingDonate />
<Footer />
<Scripts />
