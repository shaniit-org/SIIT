<script>
	import moment from 'moment';
	/**
	 * @type {import('../../types').News}
	 */
	export let data;
</script>

<a href={`/events/${data.slug}`} class="cursor-pointer hover:bg-theme-muted bg-white flex flex-col">
	<div class="flex flex-col justify-between p-4 flex gap-6">
		<h3 class="text-lg text-theme-dark">
			{data.title}
		</h3>
		<div class="flex flex-col">
			<span class="text-gray-800 mb-2"> {data.description} </span>
			<span> {moment(data.publishedAt).format('LL')}</span>
		</div>
	</div>
</a>
