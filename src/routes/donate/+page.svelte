<script>
	import Meta from '$lib/components/common/Meta.svelte';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import { Tile, Button, TextInput, TextArea } from 'carbon-components-svelte';
	import { MeterChart } from '@carbon/charts-svelte';
	import DonationMethod from '$lib/components/common/DonationMethod.svelte';

	let formID = 'mrgwbjkb';
	/**
	 * @type {{data:import('../../lib/types/donatePage').DonatePageData;}}
	 */
	export let data;
	let max = data.data.goal || 10000;

	let chartOptions = {
		title: 'Donation goal',
		height: '130px',
		meter: {
			proportional: {
				total: max,
				unit: 'Units',
				// @ts-ignore
				totalFormatter: (e) => `Goal : ${e}`,
				// @ts-ignore
				breakdownFormatter: (e) => `Currently Donated ${e.datasetsTotal} Units`
			}
		},
		toolbar: {
			enabled: false
		},
		color: {
			pairing: {
				option: 2
			}
		}
	};
</script>

<Meta data={data.data.seo} />
<div
	class="w-full bg-gradient-to-b from-black to-gray-900 text-white min-h-[300px] flex justify-end flex-col"
>
	<div class="section-container border p-6 md:p-12 w-full">
		<h1 class="text-5xl leading-[1.1] md:text-6xl mb-4">Donate us</h1>
	</div>
</div>
<div class="section-container p-4 md:px-12 py-12">
	<SanityImage
		image={data.data.coverImage}
		maxWidth={1000}
		alt={data.data.title}
		className="w-full h-full "
	/>
	<div class="w-full grid place-items-center mt-6">
		<div>
			<PortableText value={data.data.content} />
			<Tile class="my-8 p-4 border">
				<MeterChart data={data.data.donors} options={chartOptions} />
			</Tile>

			<div class="grid grid-cols-auto-fit-100 gap-1 md:gap-4 mt-8">
				{#each data.data.payment_methods as method}
					<DonationMethod data={method} />
				{/each}
			</div>
			<form
				class="flex flex-col basis-1/2 gap-4 mt-6"
				action={`https://formspree.io/f/${formID}`}
				method="POST"
			>
				<TextInput
					labelText="Email"
					placeholder="Enter your email"
					type="email"
					required
					name="email"
				/>
				<TextInput
					labelText="Units"
					placeholder="Enter units "
					type="number"
					required
					name="units"
				/>
				<TextArea labelText="Message" placeholder="Enter message..." name="message" required />
				<Button type="submit" class=" mt-4 bg-[#0F62FE]" kind="primary">Send</Button>
			</form>
		</div>
	</div>
</div>
