<script>
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import moment from 'moment';
	import { Share, LogoFacebook, LogoTwitter, LogoLinkedin } from 'carbon-icons-svelte';
	/**
	 *  @type {string} - title
	 *  @type {import("../../types").Author[]} - authors
	 * @type {string} - _createdAt
	 */
	export let title = '';
	export let authors = [1, 2];
	export let publishedAt = '';
</script>

<div
	class="w-full bg-gradient-to-b from-black to-gray-900 relative text-white min-h-[300px] flex justify-end flex-col"
>
	<div class="section-container box w-full">
		<h1 class="text-3xl lg:text-5xl lg:leading-[1.2] my-6">
			{title}
		</h1>
		<div class="flex gap-4">
			{#each authors as aut}
				<div class="flex items-center gap-4">
					<div class="w-[60px] aspect-square bg-gray-800" />
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
		<!--
		<div class="flex items-center mt-4 absolute bottom-0">
			<button class="bg-blue-500 hover:bg-blue-500 cursor-pointer text-white hover:text-white p-2">
				<LogoFacebook size={24} />
			</button>
			<button class="bg-blue-500 hover:bg-blue-500 cursor-pointer text-white hover:text-white p-2">
				<LogoTwitter size={24} />
			</button>
			<button class="bg-blue-500 hover:bg-blue-500 cursor-pointer text-white hover:text-white p-2">
				<LogoLinkedin size={24} />
			</button>
		</div>-->
		<ButtonSet class="absolute bottom-0">
			<Button icon={LogoFacebook} size="field">Facebook</Button>
			<Button icon={LogoTwitter} size="field">Twitter</Button>
			<Button icon={LogoLinkedin} size="field">LinkedIn</Button>
		</ButtonSet>
	</div>
</div>
