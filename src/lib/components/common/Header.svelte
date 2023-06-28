<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		SideNav,
		SideNavItems,
		SideNavLink,
		SkipToContent
	} from 'carbon-components-svelte';
	import { navs } from '$lib/site/nav';
	let isSideNavOpen = false;
</script>

<Header bind:isSideNavOpen expandedByDefault={false}>
	<div slot="platform">SIIT</div>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		{#each navs as nav}
			<HeaderNavItem href={nav.path} text={nav.name} />
		{/each}
	</HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen} default={false}>
	<SideNavItems>
		{#each navs as nav}
			<SideNavLink text={nav.name} href={nav.path} />
		{/each}
	</SideNavItems>
</SideNav>
