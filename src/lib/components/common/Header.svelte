<script>
	import { init_autocomplete } from '../../utils/algolia';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { navs } from '$lib/site/nav';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	onMount(() => {
		init_autocomplete();
	});

	const drawerSettings = {
		id: 'navigation',
		width: 'w-[280px] md:w-[480px] ',
		padding: 'p-4',
		rounded: 'rounded-xl'
	};
</script>

<header
	class="sticky top-0 left-0 z-[90] w-full h-[3.5em] border-b border-b-surface-100 dark:border-b-surface-500 flex items-center bg-surface-800/90 backdrop-blur-lg"
>
	<div class="section-container w-full box flex items-center">
		<a href="/" class="grid place-items-center overflow-hidden">
			<img loading="eager" src={'/logo.svg'} alt="SIIT Logo" class="logo" />
		</a>
		<nav class="hidden mx-auto max-w-max pointer-events-none md:flex md:pointer-events-auto">
			<ul class="flex items-center gap-4">
				{#each navs as nav}
					<li>
						<a
							href={nav.path}
							class="px-2 py-2 no-underline text-base {nav.path === $page.url.pathname
								? 'variant-glass-primary'
								: 'variant-glass-surface text-surface-200'}"
						>
							{nav.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="flex ml-auto items-center gap-2">
			<button class=" grid place-items-center" aria-label="Search entire site">
				<div id="autocomplete" />
			</button>

			<button
				on:click={() => drawerStore.open(drawerSettings)}
				class="lg:hidden btn w-full h-full text-xl p-3 variant-soft-surface rounded-xl aspect-square grid place-items-center"
				aria-label="Open Navigation"
			>
				<iconify-icon icon="material-symbols:menu" />
			</button>
		</div>
	</div>
</header>

<style>
	.logo {
		max-width: 100%;
		height: 20px;
		object-fit: cover;
	}
	:global(.aa-input-d) {
		background: rgb(var(--color-surface-500) / 0.2);
		border-radius: 0.75rem;
		border: none;
	}
	:global(.aa-input-d):hover {
		border: solid 1px rgb(var(--color-surface-500) / 0.9);
		cursor: pointer;
	}
	:global(.aa-input-d-i) {
		color: white;
	}
	:global(.aa-input-d-p) {
		display: none;
	}
	:global(.aa-input-d-q) {
		display: none;
	}
</style>
