<script>
	import ArticleBanner from '$lib/components/common/ArticleBanner.svelte';
	import {
		Link,
		CodeSnippet,
		OrderedList,
		ListItem,
		UnorderedList
	} from 'carbon-components-svelte';
	import { Link as LinkIcon } from 'carbon-icons-svelte';
	const data = [1];
</script>

<div class="min-h-screen">
	<ArticleBanner />
	<div class="p-4 md:p-12 max-w-[1000px] mx-auto">
		<h2 class="text-xl md:text-3xl mb-2 md:mb-4 font-bold">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, quas?
		</h2>

		{#each data as item}
			<p class="text-base md:text-lg md:leading-[1.8] my-2">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
				Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
				assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
				Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
				debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
				Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
				necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam
				eligendi blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque
				porro! Recusandae explicabo consequuntur quis?
			</p>
		{/each}
		<h3 class="text-lg md:text-2xl mt-6 mb-2 font-bold">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, quas?
		</h3>
		<p class="text-base md:text-lg md:leading-[1.8] my-2">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
			Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
			assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
			Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
			debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
			Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
			necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam
			eligendi blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque porro!
			Recusandae explicabo consequuntur quis?
		</p>
		<h4 class="text-base md:text-xl mt-6 mb-2 font-bold">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, quas?
		</h4>
		<p class="text-base md:text-lg md:leading-[1.8] my-2">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
			Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
			assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
			Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
			debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
			Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
			necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam
			eligendi blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque porro!
			Recusandae explicabo consequuntur quis?
		</p>
		<Link href="https://www.carbondesignsystem.com/" icon={LinkIcon} class="mt-2"
			>Carbon Design System</Link
		>
		<p class="text-base md:text-lg md:leading-[1.8] my-2">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
			Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
			assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
			Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
			debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
			Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
			necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam
			eligendi blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque porro!
			Recusandae explicabo consequuntur quis?
		</p>
		<OrderedList class="pl-16 mt-2 text-lg">
			<ListItem>Ordered list item</ListItem>
			<ListItem>Ordered list item</ListItem>
			<ListItem>Ordered list item</ListItem>
		</OrderedList>
		<p class="text-base md:text-lg md:leading-[1.8] my-2">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
			Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
			assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
			Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
			debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
			Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
			necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam
			eligendi blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque porro!
			Recusandae explicabo consequuntur quis?
		</p>
		<UnorderedList class="pl-16 mt-2 text-lg">
			<ListItem>Unordered list item</ListItem>
			<ListItem>Unordered list item</ListItem>
			<ListItem>Unordered list item</ListItem>
		</UnorderedList>
		<p class="text-base md:text-lg md:leading-[1.8] my-2">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
			Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
			assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
			Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
			debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
			Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
			<i class="italic"> i am italic </i>
			necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam eligendi
			blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque porro! Recusandae
			explicabo consequuntur quis?
		</p>
		<CodeSnippet code="yarn add -D carbon-components-svelte" class="my-6" />
		<p class="text-base md:text-lg md:leading-[1.8] my-2">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iusto aperiam quae.
			Impedit praesentium omnis nulla, deleniti sapiente dolore, excepturi dolor cupiditate totam,
			assumenda corrupti atque eligendi in illum iste fugit maiores debitis quibusdam quaerat qui.
			Omnis recusandae, cumque quas ullam nisi, eveniet ducimus maxime nihil fugit beatae autem
			debitis cum, iure unde vitae delectus adipisci ab nobis accusamus dolores rem quidem porro?
			Blanditiis doloremque commodi sint deleniti veniam cupiditate fuga alias? Expedita dicta,
			<strong> i am strong </strong>
			necessitatibus, optio veritatis voluptatum voluptatibus eaque molestiae quo fuga magnam eligendi
			blanditiis, esse eum neque atque asperiores facere fugit quibusdam doloremque porro! Recusandae
			explicabo consequuntur quis?
		</p>
	</div>
</div>
