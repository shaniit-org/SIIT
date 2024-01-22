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
	class="w-full bg-gradient-to-b from-black to-gray-900 relative text-white min-h-[300px] flex justify-end flex-col overflow-hidden"
>
	<div class="section-container box w-full">
		<div class="flex gap-2 flex-col my-8">
			<h1 class="h1">
				{title}
			</h1>
			<p class="text-theme-muted text-sm md:w-3/4 leading-relaxed mt-4">
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
</div>
