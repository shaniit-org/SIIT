<script>
	import { init_autocomplete } from '../../utils/algolia';
	import { onMount } from 'svelte';
	import { navs } from '$lib/site/nav';
	onMount(() => {
		init_autocomplete();
	});
</script>

<header
	class="bg-surface-50-900-token backdrop-blur z-[9999] w-full bg-opacity-50 h-[5em] border-b border-b-surface-200 dark:border-b-surface-500 flex items-center"
>
	<div class="section-container w-full box flex items-center">
		<a href="/" class="grid place-items-center overflow-hidden">
			<img loading="eager" src={'/logo.svg'} alt="SIIT Logo" class="logo" />
		</a>
		<nav class="hidden mx-auto max-w-max pointer-events-none md:flex md:pointer-events-auto">
			<ul class="flex items-center gap-4">
				{#each navs as nav}
					<li>
						<a href={nav.path} class="variant-ghost px-2 py-2 button no-underline">
							{nav.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<button class="ml-auto grid place-items-center">
			<iconify-icon icon="material-symbols:search" class="font-bold text-3xl" />
		</button>
	</div>
</header>

<style>
	.logo {
		max-width: 100%;
		height: 20px;
		object-fit: cover;
	}
	:global(.aa-input-d) {
		border: solid 1px #393939;
		border-radius: 0px;
	}
	:global(.aa-input-d):hover {
		border: solid 1px white;
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
