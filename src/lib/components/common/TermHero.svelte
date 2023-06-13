<script>
	import { Tag } from 'carbon-components-svelte';
	/**
    @type string - title 
*/
	export let title;
</script>

<div
	class="w-full bg-gradient-to-b from-black to-gray-900 text-white min-h-[300px] flex justify-end flex-col"
>
	<div class="section-container border p-6 md:p-12 w-full">
		<h1 class="text-5xl leading-[1.1] md:text-6xl mb-4">{title}</h1>
		<div class="flex flex-col gap-2 mt-4">
			<p class="leading-loose text-sm">
				ဢႅၼ်းတရၢႆႉၼႆႉ ပဵၼ် ပိူင်သၢင်ႈၵၢၼ်ၸၢၵ်ႈ မူဝ်ႇပၢႆး ဢၼ်လုၵ်ႉတီႈ ၵူႇၵႄႇၶဝ် ၶူင်သၢင်ႈမႃးၼၼ်ႉယဝ်ႉ။
				ၼၼ်ႉၼႆႉ လႆႈထုၵ်ႇဢဝ်ၸႂ်ႉတီႈ smartphone လႄႈ tablet တင်းၼမ်ယဝ်ႉ။ တူဝ်ယၢင်ႇမၼ်း ၶဝ်ႈပႃး Sony
				Xperia, Samsung Galaxy လႄႈ Google Nexus One ၸိူဝ်းၼႆႉယဝ်ႉ။
			</p>
			<Tag class="max-w-max">IBM Cloud</Tag>
		</div>
	</div>
</div>
