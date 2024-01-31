<script>
	import { taiToEng, engToTai } from '$lib/utils/shan-translit/shan-translit';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';

	let left = '';
	let right = '';

	let toEng = true;

	function convert() {
		if (toEng) {
			right = taiToEng(left);
		} else {
			right = engToTai(left);
		}
	}

	function swap() {
		[left, right] = [right, left];
		toEng = !toEng;
	}
</script>

<Meta />
<SubHero title="Syllable Breaker" />
<div class="section-container box min-h-screen flex flex-col gap-4">
	<div class="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 card p-4">
		<div class="flex flex-col basis-1/2">
			<span class="h4 mb-2">
				{#if toEng}
					Tai
				{:else}
					English
				{/if}
			</span>
			<textarea
				placeholder="Text"
				name="message"
				required
				class="text-xl textarea px-4 py-2 rounded-xl"
				bind:value={left}
				rows="5"
			/>
		</div>
		<div class="relative flex flex-col gap-1 text-center">
			<button class="my-auto btn variant-soft-secondary" on:click={swap}>
				<iconify-icon icon="subway:round-arrow-1" />
			</button>
		</div>
		<div class="flex flex-col basis-1/2">
			<span class="h4 mb-2">
				{#if toEng}
					English
				{:else}
					Tai
				{/if}
			</span>
			<textarea
				placeholder="Text"
				name="message"
				required
				class="text-xl textarea px-4 py-2 rounded-xl"
				bind:value={right}
				rows="5"
			/>
		</div>
	</div>

	<div class="flex flex-row items-center gap-4">
		<button class="btn variant-soft-secondary mt-1 max-w-max pt-3" on:click={convert}>
			convert
		</button>
	</div>
</div>
