<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').News}
	 */
	export let data;
</script>

<a href={`/events/${data.slug}`} class="cursor-pointer card flex flex-col gap-4 p-4 md:p-6 justify-stretch">
	<SanityImage
		maxWidth={450}
		image={data.coverImage}
		alt={data.title}
		className="rounded-lg aspect-video w-full object-cover"
	/>
	<h3 class="h3 mt-2 leading-relaxed text-xl">
		{data.title}
	</h3>
  <div class="font-domine">
		<p class="font-san text-surface-300 mb-2 leading-relaxed line-clamp-2">{data.description}</p>
		<span class="text-surface-200 text-sm"> {moment(data.publishedAt).format('LL')}</span>
  </div>
</a>
