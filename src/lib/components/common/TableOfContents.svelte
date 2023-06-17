<script>
	import { TreeView } from 'carbon-components-svelte';
	let activeId = 0;
	let children = [
		{ id: 0, text: 'AI / Machine learning' },
		{
			id: 1,
			text: 'Analytics',
			children: [
				{
					id: 2,
					text: 'IBM Analytics Engine',
					children: [
						{ id: 3, text: 'Apache Spark' },
						{ id: 4, text: 'Hadoop' }
					]
				},
				{ id: 5, text: 'IBM Cloud SQL Query' },
				{ id: 6, text: 'IBM Db2 Warehouse on Cloud' }
			]
		}
	];
</script>

<div>
	<TreeView
		{children}
		bind:activeId
		labelText="Table of Contents"
		on:select={({ detail }) => console.log('select', detail)}
		on:toggle={({ detail }) => console.log('toggle', detail)}
		on:focus={({ detail }) => console.log('focus', detail)}
	/>
</div>
