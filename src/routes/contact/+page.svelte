<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import { Location, PhoneVoice, Email } from 'carbon-icons-svelte';
</script>

<SubHero title="Contact us" />
<div class="min-h-screen section-container box">
	<div class="w-full h-full bg-theme-muted aspect-video max-h-[600px]">
		<iframe
			title="location of siit"
			class="w-full h-full"
			src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3701.2738804553615!2d96.0784871!3d21.9240201!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb73dd14e24807%3A0x23e132ecbe7ae3ee!2sSIIT%20Lab!5e0!3m2!1sen!2smm!4v1596806296158!5m2!1sen!2smm"
		/>
	</div>
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
