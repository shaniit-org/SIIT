<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	const t = {
		message: 'Account number copied to clipboard'
	};

	/**
	 * @type {import('../../types/donatePage').PaymentMethod} - data
	 */
	export let data;
</script>

<button
	on:click={() => toastStore.trigger(t)}
	use:clipboard={data.number}
	class=" card card-hover p-4 cursor-pointer flex flex-col md:flex-row md:gap-6 items-center"
>
	<div class="w-full h-full basis-[20%] md:max-w-[330px]">
		<SanityImage
			className="w-full aspect-square mx-auto object-contain bg-transparent max-w-[100px]"
			image={data.Image}
			alt={data.name}
			maxWidth={100}
		/>
	</div>
	<div class="text-center md:text-left flex flex-col mt-4 px-4">
		<h3 class="h5 font-semibold md:mb-2">
			{data.name}
		</h3>
		<p class="dark:text-surface-300 leading-relaxed line-clamp-3">
			{data.number}
		</p>
	</div>
</button>
