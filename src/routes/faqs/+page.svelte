<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import {
		Accordion,
		Search,
		AccordionItem,
		UnorderedList,
		ListItem,
		OutboundLink
	} from 'carbon-components-svelte';
	import { Link as LinkIcon } from 'carbon-icons-svelte';
	const data = [1, 2];
</script>

<SubHero title="FAQs" />
<div class="min-h-screen section-container box">
	<div class="mb-12">
		<Search placeholder="Search Faqs" />
	</div>
	<div class="flex flex-col gap-4">
		{#each data as _}
			<div class=" my-4">
				<h2 class="text-3xl mb-6 flex items-center gap-2">General</h2>
				<Accordion class="mt-4 flex flex-col " size="xl">
					{#each data as item}
						<AccordionItem>
							<svelte:fragment slot="title">
								<h3 class="text-xl my-2">Natural Language Classifier</h3>
							</svelte:fragment>
							<div class="text-lg">
								<UnorderedList class="pl-4 md:pl-6">
									<ListItem class="flex flex-col gap-2">
										<p class="leading-relaxed text-sm">
											Natural Language Classifier uses advanced natural language processing and
											machine learning techniques to create custom classification models. Users
											train their data and the service predicts the appropriate category for the
											inputted text.
										</p>
										<OutboundLink href="https://www.carbondesignsystem.com/"
											>Carbon Design System</OutboundLink
										>
									</ListItem>
								</UnorderedList>
							</div>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		{/each}
	</div>
</div>
