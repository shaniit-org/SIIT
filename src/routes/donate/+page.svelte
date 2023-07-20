<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import DonationMethod from '$lib/components/common/DonationMethod.svelte';
	/**
	 * @type {{data:import('../../lib/types/donatePage').DonatePageData;}}
	 */
	export let data;
</script>

<Meta data={data.data.seo} />
<div class="w-full min-h-screen flex flex-col gap-6 md:gap-12">
	<SubHero title="Donate Us" />

	<div class="section-container box">
		<div class="w-full flex flex-col">
			<div class="mb-8">
				<SanityImage
					image={data.data.coverImage}
					maxWidth={1000}
					alt={data.data.title}
					className="w-full h-full "
				/>
			</div>
			<div class="w-full md:w-[80%] mx-auto">
				<PortableText value={data.data.content} />
			</div>
		</div>
		<div class="flex flex-col gap-4 my-12">
			<h3 class="text-xl md:text-4xl text-center mb-4">{data.data.payment_methods_description}</h3>
			<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
				{#each data.data.payment_methods as method}
					<DonationMethod data={method} />
				{/each}
			</div>
		</div>
	</div>
</div>
