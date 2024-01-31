<script>
	/**
    @type string - title 
     */
	export let title;
	/**
      @type string - charType 
     */
	export let charType;

	/**
        @type string - description
     */
	export let description;
</script>

<div class="w-full relative card box rounded-none bg-opacity-50 backdrop-filter backdrop-blur-lg">
	<div class="section-container p-6 md:p-12 w-full">
		<h1 class="h1 font-bold text-5xl lg:text-6xl">{title}</h1>
		<div class="flex flex-col gap-2 mt-8">
			<p class="leading-loose mb-2">
				{description}
			</p>
			<span class="badge variant-soft-primary max-w-max pt-1">{charType}</span>
		</div>
	</div>
</div>
