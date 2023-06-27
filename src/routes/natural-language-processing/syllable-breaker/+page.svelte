<script>
	import { CopyButton, TextArea, Button, Tile } from 'carbon-components-svelte';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import { syllable_breaker } from '../../../lib/utils/syllable_breaker';

	let input = '';

	/** @type string */
	let output = '';
	let is_breaked = false;
	function break_word() {
		output = syllable_breaker(input);
		is_breaked = true;
	}
	function clear() {
		input = '';
		output = '';
		is_breaked = false;
	}
</script>

<SubHero title="Syllable Breaker" />
<div class="section-container box min-h-screen flex flex-col md:flex-row gap-4">
	<div class="w-full h-full flex flex-col gap-4">
		<TextArea
			placeholder="Enter text"
			type={'multi'}
			rows={10}
			bind:value={input}
			class="text-xl"
		/>
		{#if is_breaked}
			<Button on:click={clear} kind="secondary" class="bg-gray-500">Clear</Button>
		{:else}
			<Button on:click={break_word} kind="primary" class="bg-blue-500">Break</Button>
		{/if}
	</div>
	<div class="w-full flex flex-col gap-2">
		<Tile class="text-xl p-6 tracking-widest">{output}</Tile>
		<CopyButton text={output} class="bg-white ml-auto" />
	</div>
</div>
