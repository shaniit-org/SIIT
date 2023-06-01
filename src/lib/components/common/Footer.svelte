<script>
	import { ClickableTile } from 'carbon-components-svelte';
	import { navs } from '$lib/site/nav';
</script>

<footer class="bg-theme-dark">
	<div class="flex justify-between items-center">
		<span class="text-white font-bold p-4">LOGO</span>
		<ClickableTile class="text-lg p-12 ml-auto flex flex-col">
			<span class="text-xl text-theme-light">Contact Now !</span>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, nesciunt!
		</ClickableTile>
	</div>
	<div class="flex items-center p-4">
		<ul class="flex text-white gap-x-10">
			{#each navs as nav}
				<li>
					<a href={nav.path} class="text-theme-light hover:text-blue-500">{nav.name}</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>
