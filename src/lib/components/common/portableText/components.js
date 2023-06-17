import Heading from './Heading.svelte';
import Paragraph from './Paragraph.svelte';
import Image from './Image.svelte';
import ListItem from './ListItem.svelte';
import List from './List.svelte';
import Link from './Link.svelte';
import Strong from './Strong.svelte';
import Em from './Em.svelte';
export const components = {
	types: {
		image: Image
	},
	marks: {
		em: Em,
		link: Link,
		strong: Strong
	},
	block: {
		normal: Paragraph,
		//	blockquote: Quote,
		// Re-using the same component across multiple styles
		h1: Heading,
		h2: Heading,
		h3: Heading,
		h4: Heading
	},
	list: {
		// Swap only the list parts you need
		bullet: List,
		// Custom user-defined list type
		normal: List,
		number: List
		//	checklist: ChecklistWrapper
	},
	listItem: {
		number: ListItem,
		bullet: ListItem,
		normal: ListItem
		// checklist: ChecklistItem
	}
};
