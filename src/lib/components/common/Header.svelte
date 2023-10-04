<script>
	import { init_autocomplete } from '../../utils/algolia';
	import { onMount } from 'svelte';
	import {
		Header,
		HeaderUtilities,
		HeaderGlobalAction,
		HeaderNav,
		HeaderNavItem,
		SideNav,
		SideNavItems,
		SideNavLink,
		SkipToContent
	} from 'carbon-components-svelte';
	import { Search } from 'carbon-icons-svelte';
	import { navs } from '$lib/site/nav';

	let isSideNavOpen = false;
	onMount(() => {
		init_autocomplete();
	});
</script>

<Header bind:isSideNavOpen expandedByDefault={false}>
	<a href="/" slot="platform" class="grid place-items-center overflow-hidden">
		<img loading="eager" src={'/logo.svg'} alt="SIIT Logo" class="logo" />
	</a>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		{#each navs as nav}
			<HeaderNavItem href={nav.path} text={nav.name} />
		{/each}
		<Search size={32} />
	</HeaderNav>
	<HeaderUtilities>
		<HeaderGlobalAction
			id="autocomplete"
			kind="ghost"
			class="grid place-items-center text-white border-none mr-1 cursor-pointer"
		/>
	</HeaderUtilities>
</Header>
<SideNav bind:isOpen={isSideNavOpen} default={false}>
	<SideNavItems>
		{#each navs as nav}
			<SideNavLink text={nav.name} href={nav.path} />
		{/each}
	</SideNavItems>
</SideNav>

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
