<script>
	import { Button } from 'carbon-components-svelte';
	import { Launch, Tools } from 'carbon-icons-svelte';
</script>

<div class="bg-white min-h-[160px] flex justify-between flex-col">
	<div class="flex flex-col p-4">
		<h2 class="text-xl mb-2">Ubuntu for You</h2>
		<p class="text-sm">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero exercitationem reprehenderit
			sed delectus! Delectus provident ipsa et quos eos obcaecati!
		</p>
	</div>
	<div class="w-full flex flex-col">
		<div class="flex justify-between">
			<div class="aspect-square grid items-center p-4">
				<Tools size={20} />
			</div>
			<Button
				size="lg"
				icon={Launch}
				aria-label="More"
				iconDescription="More"
				class="bg-theme-dark "
			/>
		</div>
	</div>
</div>
