<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Meta from '$lib/components/common/Meta.svelte';
	/**
	 * @type {{ data : import('../../lib/types/faqPage').FaqPageData }} - data
	 */
	export let data;
	const { seo, faqs } = data.data;
</script>

<Meta data={seo} />
<SubHero title="FAQs" />
<div class="min-h-screen section-container box">
	{#if faqs?.length > 0}
		<Accordion spacing="space-y-4">
			{#each faqs as item}
				<AccordionItem class="mt-4">
					<svelte:fragment slot="summary">
						<h3 class="text-lg my-2">{item.category}</h3>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="text-lg">
							<ul class="list md:pl-4 flex flex-col gap-4">
								{#each item.qanda as itm}
									<li class="text-left gap-2">
										<span class="flex gap-2">
											<span
												class="shrink-0 flex-auto badge hidden md:flex variant-soft-primary aspect-square"
											>
												<iconify-icon icon="formkit:arrowright" ></iconify-icon>
											</span>
											<a class="flex-auto anchor mt-1" href="/faqs/{itm._id}"> {itm.question}</a>
										</span>
									</li>
								{/each}
							</ul>
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	{/if}
</div>
