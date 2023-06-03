<script>
	import { ImageLoader, Button, Tag } from 'carbon-components-svelte';
	import { Download } from 'carbon-icons-svelte';
</script>

<div class="bg-white">
	<div class="relative">
		<div class="absolute top-0 right-0">
			<Button
				size="lg"
				icon={Download}
				aria-label="Download"
				iconDescription="Download"
				class="bg-theme-dark"
			/>
		</div>

		<ImageLoader src="/images/background.png" class="h-[380px]  object-cover" />
	</div>
	<div class="flex flex-col p-4">
		<h2 class="text-lg mb-1">Ubuntu for You</h2>
		<div class="mb-4">
			<Tag type="blue" size="sm" class="m-0">Ubuntu</Tag>
			<Tag type="blue" size="sm" class="m-0">Linux</Tag>
		</div>
		<p class=" text-sm">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero exercitationem reprehenderit
			sed delectus! Delectus provident ipsa et quos eos obcaecati!
		</p>
	</div>
</div>
