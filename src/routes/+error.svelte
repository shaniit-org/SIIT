<script>
	import { page } from '$app/stores';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import { Link } from 'carbon-icons-svelte';
	import { Button } from 'carbon-components-svelte';
	$: meta = {
		title: 'SIIT - Shan Institute of Information Technology',
		description: $page && $page?.error?.message
	};

	$: domain = import.meta.env.VITE_PUBLIC_DOMAIN;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={domain} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={'/images/siit.png'} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={domain} />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
	<meta property="twitter:image" content="/images/siit.png" />
</svelte:head>
<SubHero title={'Oops 😥'} />
<div class="section-container box">
	<div>
		<p class="mb-4 text-sm lg:text-4xl lg:leading-[2]">
			Page you are looking does not exist or has been removed.
		</p>

		<Button size="field" href="/" class="text-white border border-blue-500  max-w-max" icon={Link}
			>Go to Home</Button
		>
	</div>
</div>
