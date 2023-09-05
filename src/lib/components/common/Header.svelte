<script>
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
	import SearchModal from './SearchModal.svelte';
	let isSideNavOpen = false;
	let isSearchModalOpen = false;
	let toggle = () => {
		isSearchModalOpen = !isSearchModalOpen;
	};
</script>

<Header bind:isSideNavOpen expandedByDefault={false}>
	<a href="/" slot="platform" class="grid place-items-center overflow-hidden">
		<img loading="eager" src={'/logo.svg'} alt="IBM Logo" class="logo" />
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
			on:click={() => (isSearchModalOpen = true)}
			aria-label="Search Action Button"
			id="search_action"
			title="Search"
			icon={Search}
			class="grid place-items-center"
		/>
	</HeaderUtilities>
</Header>
<SearchModal open={isSearchModalOpen} {toggle} />
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
</style>
