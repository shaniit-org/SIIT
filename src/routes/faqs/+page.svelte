<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import {
		Accordion,
		Link,
		Search,
		AccordionItem,
		UnorderedList,
		ListItem
	} from 'carbon-components-svelte';
	/**
	 * @type {{ data : import('../../lib/types/faqPage').FAQList}} - data
	 */
	export let data = { data: [] };
</script>

<SubHero title="FAQs" />
<div class="min-h-screen section-container box">
	<div class="mb-12">
		<Search placeholder="Search Faqs" />
	</div>
	<Accordion>
		{#each data.data.faqs as item}
			<AccordionItem>
				<svelte:fragment slot="title">
					<h3 class="text-lg my-2">{item.category}</h3>
				</svelte:fragment>
				<div class="text-lg">
					<UnorderedList class="pl-4 md:pl-6">
						{#each item.qanda as itm}
							<ListItem class="flex flex-col gap-2">
								<Link class="text-sm mt-1 text-black" href="/faqs/{itm._id}">
									<span class="text-black">{itm.question}</span></Link
								>
							</ListItem>
						{/each}
					</UnorderedList>
				</div>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
