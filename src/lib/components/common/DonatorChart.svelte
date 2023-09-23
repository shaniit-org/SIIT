<script>
	import PortableText from './portableText/PortableText.svelte';
	import '@carbon/charts-svelte/styles.css';
	import { PieChart, Alignments } from '@carbon/charts-svelte';
	import { ProgressBar } from 'carbon-components-svelte';

	/**
	 * @type { import('../../../lib/types/donatePage').Donator[]}
	 */
	export let data = [];

	/**
	 * @type { import('../../../lib/types/donatePage').DonateRoadmap}
	 */
	export let roadmap = {
		description: [],
		title: 'Our Donator',
		target: 0
	};

	let options = {
		title: 'Our Donator',
		resizable: true,
		height: '400px',
		toolbar: {
			enabled: false
		},
		pie: {
			alignment: Alignments.CENTER
		}
	};
</script>

<div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 md:my-24">
	<div class="grid place-items-center w-full p-4 md:p-0">
		<PieChart {data} {options} />
	</div>
	<div class="prose prose-h3:font-normal leading-relaxed w-full relative">
		<div class="mt-6 mb-6">
			<h3 class="text-md md:text-lg">{roadmap.title}</h3>
			<ProgressBar
				kind="default"
				value={roadmap.target}
				max={100}
				status="active"
				helperText={`${roadmap.target} of 100%`}
			/>
		</div>
		<PortableText value={roadmap.description} />
	</div>
</div>
