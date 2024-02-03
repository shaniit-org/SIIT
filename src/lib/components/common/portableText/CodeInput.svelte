<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
	/**
	 *  @type {{value:{language:string,text:string,code:string}}})}>
	 */

	export let portableText;
</script>

<CodeBlock code={portableText.value.text || portableText.value.code} />
