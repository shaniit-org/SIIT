<script>
	import Mac from '$lib/components/icons/mac.svelte';
	import Android from '$lib/components/icons/android.svelte';
	import Windows from '$lib/components/icons/windows.svelte';
	import { ContentSwitcher, Switch } from 'carbon-components-svelte';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import { TextFont, Keyboard, SkipForwardOutline } from 'carbon-icons-svelte';
	import SoftwareDownloadCard from '$lib/components/common/SoftwareDownloadCard.svelte';
	import Linux from '$lib/components/icons/linux.svelte';
	/** @type {{ data : import('../../lib/types/keyboard_and_font').KeyboardOrFontList}} - data */
	export let data;

	let filter = 0;
</script>

<SubHero title="Fonts & Keyboards" />
<div class="min-h-screen section-container box">
	<div class="mb-6">
		<ContentSwitcher bind:selectedIndex={filter}>
			<Switch text="All" value={'all'} />
			<Switch value="keyboard">
				<div style="display: flex; align-items: center;">
					<Keyboard style="margin-right: 0.5rem;" />Keyboard
				</div>
			</Switch>
			<Switch value="font">
				<div style="display: flex; align-items: center;">
					<TextFont style="margin-right: 0.5rem;" />Font
				</div>
			</Switch>
		</ContentSwitcher>
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-xl leading-relaxed">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id quis quos provident quaerat
			tempora facilis blanditiis beatae. Quos eaque possimus ea suscipit totam molestias optio,
			ipsam, dolorum aspernatur quis quaerat.
		</p>
	</div>

	{#if data.data.linux.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Linux />
				<h2 class="text-xl my-4 text-theme-dark cursor-pointer">Linux</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each data.data.linux as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
	{#if data.data.windows.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Windows />
				<h2 class="text-xl my-4 text-theme-dark cursor-pointer">Window</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each data.data.windows as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
	{#if data.data.mac.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Mac />
				<h2 class="text-xl my-4 text-theme-dark cursor-pointer">Mac</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each data.data.mac as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
	{#if data.data.android.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Android />
				<h2 class="text-xl my-4 text-theme-dark cursor-pointer">Android</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each data.data.android as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
	{#if data.data.ios.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Mac />
				<h2 class="text-xl my-4 text-theme-dark cursor-pointer">IOS</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each data.data.ios as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
</div>
