<script>
	import { ClickableTile, CodeSnippet } from 'carbon-components-svelte';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';

	import { ComposedModal, ModalHeader, ModalBody } from 'carbon-components-svelte';
	/**
	 * @type {import('../../types/donatePage').PaymentMethod} - data
	 */

	export let data;
	$: open = false;
</script>

<ComposedModal size="xs" bind:open on:open on:open on:close>
	<ModalHeader title={data.name} />
	<ModalBody>
		<div class=" text-lg overflow-hidden">
			<CodeSnippet light={true}>{data.number}</CodeSnippet>
		</div>
	</ModalBody>
</ComposedModal>
<ClickableTile
	class="cursor-pointer group   grid place-items-center "
	on:click={() => (open = true)}
>
	<SanityImage
		className="w-full aspect-square mx-auto object-contain bg-transparent max-w-[80px]"
		image={data.Image}
		alt={data.name}
		maxWidth={100}
	/>
</ClickableTile>
