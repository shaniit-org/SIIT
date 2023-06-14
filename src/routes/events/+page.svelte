<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import EventCard from '$lib/components/common/EventCard.svelte';
	import { Select, SelectItem } from 'carbon-components-svelte';
	const data = [1, 2, 3];
</script>

<div class="min-h-screen">
	<SubHero title="Events" />
	<div class="section-container box mb-12">
		<div class="mb-8">
			<Select labelText="Sorted by" class="max-w-max ml-auto min-w-[200px]">
				<SelectItem value="white" />
				<SelectItem value="g10" />
				<SelectItem value="g80" />
				<SelectItem value="g90" />
				<SelectItem value="g100" />
			</Select>
		</div>
		<div class="flex flex-col gap-12">
			{#each data as item}
				<EventCard data={item} />
			{/each}
		</div>
	</div>
</div>
