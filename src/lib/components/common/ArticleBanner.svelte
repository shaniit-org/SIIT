<script>
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import moment from 'moment';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import { LogoFacebook, LogoTwitter, LogoLinkedin } from 'carbon-icons-svelte';
	/**
	 *  @type {string} - title
	 *  @type {import("../../types").Author[]} - authors
	 * @type {string} - _createdAt
	 */
	export let title = '';
	export let authors = [];
	export let publishedAt = '';
</script>

<div
	class="w-full bg-gradient-to-b from-black to-gray-900 relative text-white min-h-[300px] flex justify-end flex-col overflow-hidden"
>
	<div class="section-container box w-full">
		<h1 class="text-4xl font-bold lg:text-5xl lg:leading-[1.2] leading-[1.5] my-6 mb-12">
			{title}
		</h1>
		<div class="flex gap-4 md:flex-row flex-col">
			{#each authors as aut}
				<div class="flex items-center gap-4 flex-row">
					<div class="w-[60px] aspect-square bg-gray-800 h-[60px]">
						<SanityImage
							maxWidth={80}
							image={aut.profile}
							className="w-[60px] h-[60px] object-cover"
						/>
					</div>
					<div class="flex flex-col">
						<span class="uppercase mb-1 text-sm"> {aut.name} </span>
						<div class="flex items-center gap-4">
							<span class="text-gray-500">5 min read</span>
							<span class="text-sm text-gray-500"> {moment(publishedAt).format('LL')}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<ButtonSet class="mt-8 md:absolute bottom-0 w-full flex flex-wrap w-full">
			<Button icon={LogoFacebook} size="field" icondescription="share on facebook">Facebook</Button>
			<Button icon={LogoTwitter} size="field" iconDescription="Share on Twitter">Twitter</Button>
			<Button icon={LogoLinkedin} size="field" iconDescription="Share on LinkedIn">LinkedIn</Button>
		</ButtonSet>
	</div>
</div>
