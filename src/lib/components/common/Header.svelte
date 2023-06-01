<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		SkipToContent,
		HeaderGlobalAction,
		HeaderUtilities,
		HeaderSearch
	} from 'carbon-components-svelte';
	import { navs } from '$lib/site/nav';
	import { Asleep } from 'carbon-icons-svelte';
	/**
        @type {() => void} toggleTheme - toggle theme function
    */
	export let toggleTheme;
	const data = [
		{
			href: '/',
			text: 'Kubernetes Service',
			description:
				'Deploy secure, highly available apps in a native Kubernetes experience. IBM Cloud Kubernetes Service creates a cluster of compute hosts and deploys highly available containers.'
		},
		{
			href: '/',
			text: 'Red Hat OpenShift on IBM Cloud',
			description:
				'Deploy and secure enterprise workloads on native OpenShift with developer focused tools to run highly available apps. OpenShift clusters build on Kubernetes container orchestration that offers consistency and flexibility in operations.'
		},
		{
			href: '/',
			text: 'Container Registry',
			description:
				'Securely store container images and monitor their vulnerabilities in a private registry.'
		},
		{
			href: '/',
			text: 'Code Engine',
			description: 'Run your application, job, or container on a managed serverless platform.'
		}
	];
	/**
	 * @type {HTMLInputElement | null} ref - search reference
	 */
	let ref = null;
	let active = false;
	let value = '';
	let selectedResultIndex = 0;
	/**
	 * @type {Array<{type : 'active'| 'clear' | 'inactive' | 'select'}>} events - search events
	 */
	let events = [];

	$: lowerCaseValue = value.toLowerCase();
	$: results =
		value.length > 0
			? data.filter((item) => {
					return (
						item.text.toLowerCase().includes(lowerCaseValue) ||
						item.description.includes(lowerCaseValue)
					);
			  })
			: [];
	let isSideNavOpen = false;

	/**
	 * @type {boolean}>} isSideNavExpanded - nav toggle
	 */
	let isSideNavExpanded = false;
</script>

<Header company="ShanIIT" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		{#each navs as nav}
			<HeaderNavItem href={nav.path} text={nav.name} />
		{/each}
	</HeaderNav>
	<HeaderUtilities>
		<HeaderSearch
			bind:ref
			bind:active
			bind:value
			bind:selectedResultIndex
			placeholder="Search services"
			{results}
			on:active={() => {
				events = [...events, { type: 'active' }];
			}}
			on:inactive={() => {
				events = [...events, { type: 'inactive' }];
			}}
			on:clear={() => {
				events = [...events, { type: 'clear' }];
			}}
			on:select={(e) => {
				events = [...events, { type: 'select', ...e.detail }];
			}}
		/>
		<HeaderGlobalAction aria-label="Theme" icon={Asleep} on:click={toggleTheme} />
	</HeaderUtilities>
</Header>
