<script>
	import { navs } from '$lib/site/nav';
	let formID = 'mrgwbjkb';
</script>

<footer class="card rounded-none border-none p-2">
	<div class="section-container box">
		<div class="flex flex-col gap-4 md:flex-row justify-between">
			<div class="basis-1/2">
				<div class="mb-6">
					<img class="max-w-[100px] aspect-video" src="/logo.svg" alt="SIIT logo" />
				</div>
				<ul class="grid grid-cols-2 gap-y-4 justify-center gap-x-10">
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
				class="flex flex-col p-4 md:p-8 card basis-1/2 md:max-w-lg"
				action={`https://formspree.io/f/${formID}`}
				method="POST"
			>
				<p class=" text-xl mb-6">Contact Us</p>
				<label class="label mb-4">
					<span>Email</span>
					<input
						class=" input px-4 py-2"
						title="Enter your email "
						type="text"
						placeholder="Enter your email "
					/>
				</label>
				<p class=" mb-2">Message</p>
				<textarea
					placeholder="Enter message"
					name="message"
					required
					class="textarea px-4 py-2"
					rows="5"
				/>
				<button type="submit" class="mt-4 button variant-filled-primary py-2 rounded-token pt-4"
					>Submit</button
				>
			</form>
		</div>
	</div>
</footer>
