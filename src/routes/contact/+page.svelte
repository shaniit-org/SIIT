<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import { Location, PhoneVoice, Email } from 'carbon-icons-svelte';
</script>

<SubHero title="Contact us" />
<div class="min-h-screen section-container box">
	<div class="w-full h-full bg-theme-muted aspect-video max-h-[600px]" />
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
		<div class="bg-white">
			<div class="p-2 bg-theme-dark max-w-max text-white">
				<Location size={24} />
			</div>
			<div class="flex flex-col p-4">
				<span class="text-lg mb-1 font-bold">Location</span>
				<ul>
					<li>Waeponglaa Shan Kyaung</li>
					<li>Yepawsitekwin Qt, Pyi Kyi Thagon Tsp</li>
					<li>Mandalay, Myanmar</li>
				</ul>
			</div>
		</div>
		<div class="bg-white">
			<div class="p-2 bg-theme-dark max-w-max text-white">
				<Email size={24} />
			</div>
			<div class="flex flex-col p-4">
				<span class="text-lg mb-1 font-bold">Email</span>
				<ul>
					<li>
						<a href="mailto:contact@shaniit.org" class="hover:text-blue-700">
							contact@shaniit.org
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="bg-white">
			<div class="p-2 bg-theme-dark max-w-max text-white">
				<PhoneVoice size={24} />
			</div>
			<div class="flex flex-col p-4">
				<span class="text-lg mb-1 font-bold">Phone</span>
				<ul>
					<li>
						<a href="tel:+959-527-5238" class="hover:text-blue-700"> +959-527-5238 </a>
					</li>
					<li>
						<a href="tel:+959-797-469-924" class="hover:text-blue-700"> +959-797-469-924 </a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
