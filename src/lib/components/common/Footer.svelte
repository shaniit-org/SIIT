<script>
	import { navs } from '$lib/site/nav';
	import { page } from '$app/stores';
	let formID = 'mrgwbjkb';
</script>

<footer class="card rounded-none border-none p-2">
	<div class="section-container box">
		<div class="flex flex-col gap-4 md:flex-row justify-between">
			<div class="basis-1/2">
				<div class="mb-6">
					<img class="max-w-[100px] aspect-video" src="/logo.svg" alt="SIIT logo" />
				</div>
				<ul class="grid grid-cols-2 gap-y-6 justify-center gap-x-10">
					{#each navs as nav}
						<li>
							<a
								href={nav.path}
								class="px-2 py-2 no-underline text-base {nav.path === $page.url.pathname
									? 'variant-glass-primary'
									: 'variant-glass-surface text-surface-200'}"
							>
								{nav.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<form
				class="flex flex-col p-4 md:p-8 card basis-1/2 md:max-w-lg"
				action={`https://formspree.io/f/${formID}`}
				method="POST"
			>
				<p class="font-semibold text-2xl mb-4">Contact Us</p>
				<label class="label mb-4">
					<span class="dark:text-surface-300">Email</span>
					<input
						class="input px-4 py-2 rounded-token"
						title="Enter your email "
						type="text"
						placeholder="Enter your email "
					/>
				</label>
				<p class="dark:text-surface-300 mb-2">Message</p>
				<textarea
					placeholder="Enter message"
					name="message"
					required
					class="textarea px-4 py-2"
					rows="5"
				/>
				<button type="submit" class="mt-4 button variant-filled-primary py-2 rounded-token"
					>Submit</button
				>
			</form>
		</div>
	</div>
</footer>
