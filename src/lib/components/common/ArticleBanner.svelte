<script>
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 *  @type {string} - title
	 */
	export let title = '';
	/**
	 *  @type {string} - description
	 */
	export let description = '';
	/**
	 *  @type {import("../../types").Author[] | undefined} - authors
	 */
	export let authors = [];
	/**
	 *  @type {string} - _createdat
	 */
	export let publishedAt = '';
	/**
	 *  @type {number} - readintTime
	 */
	export let readingTime;
</script>

<div
	class="w-full relative card text-white min-h-[400px] flex justify-end flex-col overflow-hidden rounded-none box"
>
	<div class="section-container box w-full">
		<div class="flex gap-2 flex-col">
			<h1 class="h1 mb-2">
				{title}
			</h1>
			<p class="my-4 leading-loose text-lg">
				{description}
			</p>
		</div>
		<div class="flex gap-4 md:flex-row flex-col">
			{#if authors}
				{#each authors as aut}
					<div class="flex items-center gap-4 flex-row">
						<div class="w-[60px] aspect-square bg-gray-800 h-[60px] rounded-full">
							<SanityImage
								maxWidth={80}
								image={aut.profile}
								className="w-[60px] h-[60px] object-cover rounded-full"
							/>
						</div>
						<div class="flex flex-col">
							<span class="uppercase mb-1 text-sm"> {aut.name} </span>
							<div class="flex flex-col md:flex-row md:items-center md:gap-4">
								<span class="text-gray-500">{readingTime} min read</span>
								<span class="text-sm text-gray-500"> {moment(publishedAt).format('LL')}</span>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div
		class="z-[-11] card rounded-full backdrop-blur w-[30%] blur-[200px] aspect-square absolute top-0 right-0 translate-y-[-90%] bg-gradient-to-tl opacity-20 variant-gradient-success-error"
	/>
	<div
		class="z-[-13] card rounded-full backdrop-blur w-[40%] blur-[200px] aspect-square absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-90%] variant-gradient-primary-secondary bg-gradient-to-tl opacity-40"
	/>
</div>
