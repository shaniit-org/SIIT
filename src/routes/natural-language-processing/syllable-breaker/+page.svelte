<script>
	import { clipboard } from '@skeletonlabs/skeleton';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	import { syllable_breaker } from '$lib/utils/sylabble';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	const t = {
		message: 'Text copied'
	};
	let input = '';
	let breaker = '|';

	/** @type string */
	let output = '';
	let is_breaked = false;
	function break_word() {
		output = syllable_breaker(input, breaker);
		is_breaked = true;
	}
	function clear() {
		input = '';
		output = '';
		is_breaked = false;
	}
</script>

<Meta />
<SubHero title="Syllable Breaker" />
<div class="section-container box min-h-screen flex flex-col md:flex-row gap-4">
	<div class="w-full h-full flex flex-col gap-4 card p-4">
		<label class="label mb-4">
			<span>Break word</span>
			<input
				class=" input px-4 py-2 rounded-xl"
				title="Enter your email "
				type="text"
				placeholder="Enter your email "
				bind:value={breaker}
			/>
		</label>
		<textarea
			placeholder="Enter message"
			bind:value={input}
			name="message"
			required
			class="textarea px-4 py-2 rounded-xl"
			rows="5"
		/>
		{#if is_breaked}
			<button on:click={clear} class="btn variant-soft-secondary max-w-max pt-3 mt-1">Clear</button>
		{:else}
			<button on:click={break_word} class="btn variant-soft-primary max-w-max pt-3 mt-1"
				>Break</button
			>
		{/if}
	</div>
	<div class="w-full flex flex-col gap-2">
		<div class="text-xl p-6 card">{output || ''}</div>
		<button
			on:click={() => toastStore.trigger(t)}
			use:clipboard={output || ''}
			class="btn variant-soft-secondary mt-1 max-w-max pt-3"
		>
			Copy
		</button>
	</div>
</div>
