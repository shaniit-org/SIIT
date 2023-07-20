<script>
	import PortableText from '$lib/components/common/portableText/PortableText.svelte';
	import FaqBanner from '$lib/components/common/FaqBanner.svelte';
	export let data = {};
</script>

<div class="min-h-screen">
	<FaqBanner title={data.data.question} />
	<div class="section-container box">
		<PortableText value={data.data.answer} />
	</div>
</div>
