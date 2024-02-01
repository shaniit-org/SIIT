<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import FloatingDonate from '$lib/components/common/FloatingDonate.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Header from '$lib/components/common/Header.svelte';
	import Scripts from './Scripts.svelte';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { navs } from '$lib/site/nav';
	import { onNavigate } from '$app/navigation';
	import { storePopup } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
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
	<!-- (sidebarLeft) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->

	<div class="relative z-1 font-san content w-full min-h-screen">
		<Header />
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<Scripts />
		<FloatingDonate />
		<Footer />
	</svelte:fragment>
	<Drawer>
		{#if $drawerStore.id === 'navigation'}
			<nav class="flex flex-col p-4">
				<a href="/" class=" mb-4 mx-auto">
					<img
						loading="eager"
						src={'/logo.svg'}
						alt="SIIT Logo"
						class="w-[90px] aspect-video"
						width="60"
					/>
				</a>
				<ul class="flex w-full items-center flex-col gap-2">
					{#each navs as nav}
						<li class="w-full">
							<a
								href={nav.path}
								class="w-full variant-ghost px-2 py-2 rounded-none btn no-underline"
							>
								{nav.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</Drawer>
	<Toast position="br" />
	<!-- (footer) -->
</AppShell>
