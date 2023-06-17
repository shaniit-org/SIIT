<script>
	import TermHero from '$lib/components/common/TermHero.svelte';
	const data = [1];
</script>

<div class="min-h-screen">
	<TermHero title="Application" />

	<div class="p-4 md:p-12 max-w-[1000px] mx-auto">
		<h2 class="text-xl md:text-3xl mb-2 md:mb-4 font-bold">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, quas?
		</h2>

		{#each data as item}
			<p class="text-base md:text-lg md:leading-[1.8] my-2">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
				Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
				assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
				Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
				debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
				Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
				necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam
				eligendi blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque
				porro! Recusandae explicabo consequuntur quis?
			</p>
		{/each}
	</div>
</div>
