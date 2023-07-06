<script>
	import { urlFor } from '$lib/sanity/image/config';
	let defaultMeta = {
		title: 'SIIT - Shan Institute of Information Technology',
		description: 'Shan Institute of Information Technology',
		ogImage: null
	};
	/**
	 * @type BaseMetaData - data
	 */
	export let data = defaultMeta;
	const { title, description, ogImage } = data;
	const domain = import.meta.env.VITE_PUBLIC_DOMAIN;
	const image = ogImage && urlFor(ogImage).width(1200).height(628).url();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={domain} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={domain} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>
