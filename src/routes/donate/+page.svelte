<script>
	import Meta from '$lib/components/common/Meta.svelte';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import DonationMethod from '$lib/components/common/DonationMethod.svelte';

	let formID = 'mrgwbjkb';
	/**
	 * @type {{data:import('../../lib/types/donatePage').DonatePageData;}}
	 */
	export let data;
</script>

<Meta data={data.data.seo} />
<SubHero title="Donate Us" />
<div class="section-container p-4 md:px-12 py-12">
	<SanityImage
		image={data.data.coverImage}
		maxWidth={1000}
		alt={data.data.title}
		className="rounded-xl w-full h-full "
	/>
	<div class="w-full grid place-items-center mt-6">
		<div class="leading-loose md:max-w-[80%]">
			<div class="leading-loose mx-auto md:max-w-3xl">
				<PortableText value={data.data.content} />
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-8">
				{#each data.data.payment_methods as method}
					<DonationMethod data={method} />
				{/each}
			</div>

			<div class="mx-auto md:max-w-3xl">
				<form
					class="flex flex-col p-4 md:p-8 card basis-1/2 md:max-w-lg my-12"
					action={`https://formspree.io/f/${formID}`}
					method="POST"
				>
					<p class="h4 mb-4">Contact Us</p>
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
	</div>
</div>
