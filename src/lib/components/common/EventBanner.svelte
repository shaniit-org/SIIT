<script>
	import moment from 'moment';
	/**
	 *  @type {string} - title
	 */
	export let title = '';
	/**
	 *  @type {string} - description
	 */
	export let description = '';
	/**
	 *  @type {string} - _createdat
	 */
	export let publishedAt = '';
</script>

<div
	class="w-full relative card text-white min-h-[400px] flex justify-end flex-col overflow-hidden box"
>
	<div class="section-container w-full">
		<div class="flex gap-2 flex-col my-8">
			<h1 class="h1 font-bold mb-4">
				{title}
			</h1>
			<p class="md:w-3/4 block leading-relaxed mt-4">
				{description}
			</p>
			<span class="mt-2"> {moment(publishedAt).format('LL')}</span>
		</div>
	</div>
</div>
