<script>
	import { ClickableTile, ImageLoader } from 'carbon-components-svelte';
</script>

<div
	class=" grid grid-rows-[auto_1fr] gap-4 justify-end relative w-full min-h-[60vh] md:min-h-[700px]"
>
	<ImageLoader
		fadeIn
		src="/images/background.png"
		class="h-full w-full object-cover absolute z-[-1]"
	/>
	<ClickableTile class=" max-w-[90%] md:max-w-[400px] h-auto space-y-2 mt-auto row-start-2">
		<div class="p-4">
			<div class="flex items-center justify-between">
				<span>Term Of The Day</span>
				<span>Jan 8, 2023</span>
			</div>
			<h2 class="text-2xl lg:mb-4">App</h2>
			<p class="text-sm leading-loose mt-2">
				မိူဝ်ႈၼႆႉ ပီ 2023 ၸၼ်ႇဝႃႇရီႇ 4 ဝၼ်း - လုၵ်ႉတီႈ Wikimedia Foundation သေ လႆပိုတ်ႇတၢင်ႇပၼ်
				ဝီႇၶီႇပပ်ႉတႆး ႁဝ်းၶႃႈယဝ်ႉ။ ဝီႇၶီႇပပ်ႉဢၼ်ဝႃႈၼႆႉ မၼ်းပဵၼ် တီႈဢဝ် ပၵ်းလၵ်းသုတ်ႇ ပပ်ႉၵၢၼ်ႁဵၼ်း
				ဢၼ်လွတ်ႈလႅဝ်းထၢင်ႇႁၢင်ႈၼၼ်ႉ တ
			</p>
		</div>
	</ClickableTile>
</div>
