<script>
	import { onNavigate } from '$app/navigation';
	import Scripts from './Scripts.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import FloatingDonate from '$lib/components/common/FloatingDonate.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';

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

<AppShell>
	<svelte:fragment slot="header">
		<!-- <Header />
-->
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->

	<div class="font-san content w-full min-h-screen bg-surface-900">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<Scripts />
		<FloatingDonate />
		<Footer />
	</svelte:fragment>
	<!-- (footer) -->
</AppShell>
