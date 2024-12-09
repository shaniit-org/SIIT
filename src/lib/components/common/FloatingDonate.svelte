<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

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
	<div
		in:fade={{ duration: 500 }}
		out:fade={{ duration: 200 }}
		class="relative z-[1000] border-none"
	>
		<div
			class="border-none card variant-glass-surface translate-hover w-[250px] p-4 text-center hover:scale-[1.04] duration-500
    fixed top-[30%] right-5 md:right-10 flex flex-col gap-4"
		>
			<button
				on:click={close}
				class="absolute top-4 right-4 opacity-90 text-2xl max-w-max"
				aria-label="close donate popup"
			>
				<iconify-icon icon="material-symbols:cancel-outline" />
			</button>
			<h2 class="leading-[1.2] flex items-center gap-1">
				<span class="w-1/2 h-[2px] bg-primary-500" />
				<span class="w-full text-base font-semibold"> Make Some Donation </span>
				<span class="w-1/2 h-[2px] bg-primary-500" />
			</h2>
			<img src="/images/donate.png" alt="donate" class="mx-auto h-[50px] w-[50px] max-w-max" />
			<p class="my-4 leading-relaxed dark:text-surface-300">
				တွၼ်ႈတႃႇ ၵၢၼ်ဢၢႆႇထီႇတႆး တေၶိုၼ်ႈယႂ်ႇၼၼ်ႉ... လူဝ်ႇတၢင်းၸွႆႈထႅမ်သူၸဝ်ႈယူႇ။
			</p>
			<a class=" button variant-filled-primary py-3 rounded-token" href="/donate">Donate Now</a>
		</div>
	</div>
{/if}
