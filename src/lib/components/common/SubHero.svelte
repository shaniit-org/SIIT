<script>
	/**
    @type string - title 
*/
	export let title;
</script>

<div class="w-full relative card box rounded-none bg-opacity-50 backdrop-filter backdrop-blur-lg">
	<div class="section-container lg:px-12 py-4 lg:py-10 text-6xl">
		<h1 class="h1 font-bold text-5xl lg:text-6xl">{title}</h1>
	</div>

	<div
		class="z-[-11] card rounded-full backdrop-blur w-[30%] blur-[200px] aspect-square absolute top-0 right-0 translate-y-[-90%] bg-gradient-to-tl opacity-20 variant-gradient-success-error"
	/>
	<div
		class="z-[-13] card rounded-full backdrop-blur w-[40%] blur-[200px] aspect-square absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-90%] variant-gradient-primary-secondary bg-gradient-to-tl opacity-40"
	/>
</div>
