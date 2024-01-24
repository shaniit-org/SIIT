<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import { Button } from 'carbon-components-svelte';
	import { Link } from 'carbon-icons-svelte';
	/**
	 * @type {import('../../types').Event}
	 */
	export let data;
</script>

<div
	class="border-t border-t-gray-200 border-solid pt-4 cursor-pointer flex flex-col gap-8 md:flex-row md:gap-6"
>
	<div class="w-full h-full basis-[20%] aspect-video max-w-[330px] mt-4 shrink-0 overflow-hidden">
		<SanityImage
			className="rounded-token w-full h-full object-cover"
			maxWidth={300}
			image={data.coverImage}
			alt={data.title}
		/>
	</div>
	<div class="flex flex-col">
		<h3 class="h3 my-4 md:mb-2">
			{data.title}
		</h3>
		<span class="mb-2 block text-base mt-2">
			{moment(data.publishedAt).format('LL')}
		</span>
		<p class="mb-4 leading-loose text-sm">
			{data.description}
		</p>
		<Button href={`/events/${data.slug}`} class="border border-blue-500 max-w-max" icon={Link}
			>Read More</Button
		>
	</div>
</div>
