<script>
	import { navs } from '$lib/site/nav';
	import { ImageLoader, TextInput, TextArea, Button } from 'carbon-components-svelte';
	let formID = import.meta.env.FLY_FORMSPREE_ID || import.meta.env.PUBLIC_FORMSPREE_ID;
</script>

<footer class="bg-theme-dark p-2">
	<div class="section-container box">
		<div class="flex flex-col gap-4 md:flex-row justify-between">
			<div class="basis-1/2">
				<div class="mb-6">
					<ImageLoader class="max-w-[100px] aspect-video " src="/logo.svg" alt="SIIT logo" />
				</div>
				<ul class="grid grid-cols-2 gap-y-4 justify-center text-white gap-x-10">
					{#each navs as nav}
						<li>
							<a href={nav.path} class="text-theme-light hover:text-blue-500 text-base"
								>{nav.name}</a
							>
						</li>
					{/each}
				</ul>
			</div>
			<form
				class="flex flex-col p-0 md:p-4 basis-1/2"
				action="https://formspree.io/f/{formID}"
				method="POST"
			>
				<p class="text-white text-xl mb-6">Contact Us</p>
				<p class="text-white mb-2">Email</p>
				<TextInput
					placeholder="Enter your name..."
					class="mb-4 bg-[#262626]  text-white"
					type="email"
					required
					name="email"
				/>
				<p class="text-white mb-2">Message</p>
				<TextArea
					placeholder="Enter message..."
					class="mb-4 bg-[#262626] text-white"
					name="message"
					required
				/>
				<Button type="submit" class=" mt-4 bg-[#0F62FE]" kind="primary">Submit</Button>
			</form>
		</div>
	</div>
</footer>
