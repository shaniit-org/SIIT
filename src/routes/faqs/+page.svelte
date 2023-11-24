<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import {
		Accordion,
		Link,
		AccordionItem,
		UnorderedList,
		ListItem
	} from 'carbon-components-svelte';
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
		<Accordion>
			{#each faqs as item}
				<AccordionItem>
					<svelte:fragment slot="title">
						<h3 class="text-lg my-2">{item.category}</h3>
					</svelte:fragment>
					<div class="text-lg">
						<UnorderedList class="pl-4 md:pl-6">
							{#each item.qanda as itm}
								<ListItem class="flex flex-col gap-2">
									<Link class="text-base mt-1 text-black" href="/faqs/{itm._id}">
										<span class="text-black">{itm.question}</span></Link
									>
								</ListItem>
							{/each}
						</UnorderedList>
					</div>
				</AccordionItem>
			{/each}
		</Accordion>
	{/if}
</div>
