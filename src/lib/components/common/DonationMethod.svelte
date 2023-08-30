<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types/donatePage').PaymentMethod} - data
	 */

	export let data;
</script>

<div
	class="cursor-pointer group bg-[#edf3f9] py-2 min-h-[130px] items-center flex justify-between flex-col"
>
	<div class="w-full flex mx-auto transition-all duration-300 group-hover:scale-[1.1]">
		<SanityImage
			className="w-[100px] md:w-[140px]   aspect-square mx-auto object-contain bg-transparent"
			image={data.Image}
			alt={data.name}
			maxWidth={200}
		/>
	</div>
	<div class="flex flex-col p-4 text-center">
		<p class="md:text-lg text-base text-theme-body font-bold">{data.name}</p>
		<p class="text-base md:text-lg">{data.number}</p>
	</div>
</div>
