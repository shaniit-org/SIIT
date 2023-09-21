<script>
	import PortableText from './portableText/PortableText.svelte';
	import '@carbon/charts-svelte/styles.css';
	import { PieChart, Alignments } from '@carbon/charts-svelte';
	import { ProgressIndicator, ProgressStep } from 'carbon-components-svelte';

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

	let currentIndex = 2;

	let progress_steps = [
		{ id: '1', label: 'Goal 1', description: 'Step 1 Description', complete: true },
		{ id: '2', label: 'Goal 2', description: 'Step 2 Description', complete: true },
		{ id: '3', label: 'Goal 3', description: 'Step 3 Description', complete: false }
	];
</script>

<div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 overflow-hidden md:my-24">
	<div class="grid place-items-center w-full p-4 md:p-0">
		<PieChart {data} {options} />
	</div>
	<div class="prose prose-h3:font-normal leading-relaxed">
		<h3>{roadmap.title}</h3>
		<PortableText value={roadmap.description} />
		<div class="grid">
			<ProgressIndicator {currentIndex} preventChangeOnClick class="m-0 w-full p-0">
				{#each progress_steps as step}
					<ProgressStep
						id={step.id}
						label={step.label}
						description={step.description}
						complete={step.complete}
						class="max-w-full"
					/>
				{/each}
			</ProgressIndicator>
		</div>
	</div>
</div>
