<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { ClickableTile, ImageLoader, Button } from 'carbon-components-svelte';
	import CloseOutline from 'carbon-icons-svelte/lib/CloseOutline.svelte';

	let show = false;
	onMount(() => {
		setTimeout(() => {
			show = true;
		}, 3000);
	});
	function close() {
		show = false;
	}
</script>

{#if show}
	<div in:fade={{ duration: 500 }} out:fade={{ duration: 200 }} class="relative z-[1000]">
		<ClickableTile
			style="padding-inline: 1.5rem; padding-block: 1.5rem;"
			class="translate-hover w-[250px]  hover:bg-white text-center hover:scale-[1.04] duration-500 
    fixed top-[30%] right-5 md:right-10 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] flex flex-col gap-4  "
		>
			<Button
				tooltipPosition="left"
				tooltipAlignment="center"
				on:click={close}
				iconDescription="Close"
				icon={CloseOutline}
				style="position: absolute; top: 0; right: 0;"
				class="bg-transparent text-black hover:bg-red-600 transition-all duration-500 max-w-max"
				size="lg"
			/>
			<h2 class="leading-[1.2] flex items-center gap-1">
				<span class="w-1/2 h-[2px] bg-[#E3983B]" />
				<span class="w-full text-base font-semibold"> Make Some Donation </span>
				<span class="w-1/2 h-[2px] bg-[#E3983B]" />
			</h2>
			<ImageLoader
				src="/images/donate.png"
				alt="donate"
				class="max-w-max mx-auto min-h-[50px] min-w-[50px]"
			/>
			<p class="text-sm my-4 leading-relaxed">
				တွၼ်ႈတႃႇ ၵၢၼ်ဢၢႆႇထီႇတႆး တေၶိုၼ်ႈယႂ်ႇၼၼ်ႉ... လူဝ်ႇတၢင်းၸွႆႈထႅမ်သူၸဝ်ႈယူႇ။
			</p>
			<Button class="bg-[#E3983B] hover:bg-[#e3983B] py-3" size="field" href="/donate"
				>Donate Now</Button
			>
		</ClickableTile>
	</div>
{/if}
