<script>
	/**
	 *  @type { import('../../types/keyboard_and_font').KeyboardOrFont} - data
	 */
	export let data;
</script>

<div class="card p-4">
	<div class="relative">
		<div class="absolute top-0 right-0" />
	</div>
	<div class="flex flex-col p-6">
		<h2 class="h3 mb-4 pr-2">{data.title}</h2>
		<div class="mb-4">
			<span class="badge m-0 variant-soft-primary pt-2">{data.type}</span>
		</div>
		<p class="leading-loose">
			{data.description}
		</p>

		<a
			href={data.downloadlink}
			target="_blank"
			aria-label="Download"
			class="button variant-filled-primary rounded-xl mt-4 px-4 flex items-center gap-2 py-2 max-w-max"
		>
			<span class="pt-1"> Download </span>
			<iconify-icon icon="material-symbols:download" class="text-xl" />
		</a>
	</div>
</div>
