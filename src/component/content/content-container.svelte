<script lang="ts">
	import type { ContentItem } from '$lib/types/content';
	import Content from './content-element.svelte';

	let {
		content
	}: {
		content: ContentItem;
		// We use 'any' here because the content can have a complex structure with nested elements, and we will handle the typing more specifically within the functions that process the content based on their type and structure
	} = $props();

	const contentId = $derived.by(() => {
		const firstSection = content[0];

		if (firstSection?.type === 'heading') {
			return firstSection.children[0].text
				.split(' ')
				.map((word: string) => word.toLowerCase())
				.join('-')
				.replace(/[^a-z0-9-]/g, ''); // we log the text of the first child of the first content section to verify the structure of the content data and to ensure that we can access the text correctly for rendering in the component, we also format the text to create a slug-like string that can be used as an id for anchor links if needed by converting it to lowercase, replacing spaces with hyphens, and removing any special characters that are not alphanumeric or hyphens
		} else {
			return '';
		}
	}); // Log the text of the first child of the first content section to verify the structure of the content data and to ensure that we can access the text correctly for rendering in the component
</script>

<div id={contentId} class="content">
	<Content {content} />
</div>
