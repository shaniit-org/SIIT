<script>
	import NlpArticle from '$lib/components/page/nlp/NLPArticle.svelte';
	import NlpCard from '$lib/components/page/nlp/NLPCard.svelte';
	import SubHero from '$lib/components/common/SubHero.svelte';
	import { ContentSwitcher, Switch } from 'carbon-components-svelte';
	import { Tools, Keyboard, TextFont } from 'carbon-icons-svelte';
	const data = ['Tools', 'Data', 'Stories'];
</script>

<SubHero title="Natural language processing" />
<div class="section-container box min-h-screen">
	<div class="flex flex-col">
		<p class="text-xl leading-relaxed max-w-[900px]">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id quis quos provident quaerat
			tempora facilis blanditiis beatae. Quos eaque possimus ea suscipit totam molestias optio,
			ipsam, dolorum aspernatur quis quaerat.
		</p>
		<!--
		<div class="mt-8">
			<ContentSwitcher>
				<Switch text="All" />
				<Switch>
					<div style="display: flex; align-items: center;">
						<Tools style="margin-right: 0.5rem;" />Tools
					</div>
				</Switch>
				<Switch>
					<div style="display: flex; align-items: center;">
						<Keyboard style="margin-right: 0.5rem;" />Data
					</div>
				</Switch>
				<Switch>
					<div style="display: flex; align-items: center;">
						<TextFont style="margin-right: 0.5rem;" />Stories
					</div>
				</Switch>
			</ContentSwitcher>
		</div>
        -->
	</div>
	<div class="flex gap-12 flex-col mt-12">
		<div>
			<div class="flex flex-col gap-2">
				<h2 class="text-3xl my-4 text-theme-dark cursor-pointer">Tools</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-[900px]">
				<NlpCard />
				<NlpCard />
			</div>
		</div>
		<div>
			<div class="flex items-center gap-2">
				<h2 class="text-3xl my-4 text-theme-dark cursor-pointer">Articles</h2>
			</div>
			<div class="flex flex-col gap-12 mt-2">
				<NlpArticle />
				<NlpArticle />
			</div>
		</div>
	</div>
</div>
