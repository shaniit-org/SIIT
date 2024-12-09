<script>
	/**
	 * @type {import('$lib/types/nlpPage').Tools} - data
	 */
	export let data;
</script>

<div class="card variant-soft-surface p-4 lg:p-8 min-h-[160px] flex justify-between flex-col">
	<div class="flex gap-2 flex-col">
		<h3 class="h3 mb-2 font-semibold dark:text-surface-100 text-xl">{data.title}</h3>
		<p class="dark:text-surface-200 leading-relaxed">{data.description}</p>
	</div>
	<div class="w-full flex flex-col mt-2">
		<div class="flex justify-between">
			<div class="aspect-square grid items-center">
				<iconify-icon
					icon="material-symbols:tools-pliers-wire-stripper"
					class="text-3xl rotate-45"
				/>
			</div>

			<a
				href={data.downloadlink}
				target="_blank"
				aria-label="Download"
				class="button variant-filled-primary rounded-token text-sm mt-4 px-4 flex items-center gap-2 py-2 max-w-max"
			>
				<span class=""> More </span>
				<iconify-icon icon="formkit:arrowright" />
			</a>
		</div>
	</div>
</div>
