<script>
	import Meta from '$lib/components/common/Meta.svelte';
	import Mac from '$lib/components/icons/mac.svelte';
	import Android from '$lib/components/icons/android.svelte';
	import Windows from '$lib/components/icons/windows.svelte';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import SoftwareDownloadCard from '$lib/components/common/SoftwareDownloadCard.svelte';
	import Linux from '$lib/components/icons/linux.svelte';

	/** @type {{ data : import('../../lib/types/keyboard_and_font').KeyboardOrFontList}} - data */
	export let data;
	let filter = 0;
	$: linux = filterByType(data.data.linux);
	$: mac = filterByType(data.data.mac);
	$: windows = filterByType(data.data.windows);
	$: android = filterByType(data.data.android);
	$: ios = filterByType(data.data.ios);
	/**
	 * @param {import('../../lib/types/keyboard_and_font').KeyboardOrFont[]} data
	 */
	$: filterByType = (
		/**@type import('../../lib/types/keyboard_and_font').KeyboardOrFont[] | undefined */ data
	) => {
		if (!data) return [];
		if (filter === 0) {
			return data;
		} else if (filter === 1) {
			return data.filter((item) => item.type === 'keyboard');
		} else if (filter === 2) {
			return data.filter((item) => item.type === 'font');
		}
		return data;
	};
</script>

<Meta data={data.data.seo} />
<SubHero title="Fonts & Keyboards" />
<div class="min-h-screen section-container box">
	<div class="btn-group variant-soft-surface">
		<button
			class={`pt-2 ${filter === 0 && 'variant-soft-primary'}`}
			on:click={() => {
				filter = 0;
			}}
		>
			All
		</button>
		<button
			class={`pt-2 ${filter === 1 && 'variant-soft-primary'}`}
			on:click={() => {
				filter = 1;
			}}
		>
			Keyboards
		</button>
		<button
			class={`pt-2 ${filter === 2 && 'variant-soft-primary'}`}
			on:click={() => {
				filter = 2;
			}}
		>
			Fonts
		</button>
	</div>
	{#if linux.length > 0 && linux}
		<div class="mt-10">
			<div class="flex items-center gap-2">
				<Linux />
				<h2 class="h3">Linux</h2>
			</div>
			<div class="grid mt-4 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each linux as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
	{#if windows.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Windows />
				<h2 class="h3">Window</h2>
			</div>
			<div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each windows as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}

	{#if mac.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Mac />
				<h2 class="text-xl my-4 text-theme-dark cursor-pointer">Mac</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each mac as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}

	{#if ios.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Android />
				<h2 class="h3">Android</h2>
			</div>
			<div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each ios as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
	{#if android.length > 0}
		<div class="mt-12">
			<div class="flex items-center gap-2">
				<Mac />
				<h2 class="h3">IOS</h2>
			</div>
			<div class="grid mt-4 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each android as item}
					<SoftwareDownloadCard data={item} />
				{/each}
			</div>
		</div>
	{/if}
</div>
