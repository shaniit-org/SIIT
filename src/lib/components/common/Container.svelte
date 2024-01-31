<script>
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onNavigate } from '$app/navigation';
	import Scripts from './Scripts.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import FloatingDonate from '$lib/components/common/FloatingDonate.svelte';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/common/Header.svelte';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

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

<AppShell class="relative">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->

	<div class="relative z-1 font-san content w-full min-h-screen">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<Scripts />
		<FloatingDonate />
		<Footer />
	</svelte:fragment>
	<Toast position="br" />
	<!-- (footer) -->
</AppShell>
