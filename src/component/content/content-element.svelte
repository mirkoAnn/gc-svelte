<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import type {
		ContentItem,
		ContentSection,
		HeadingContent,
		ListContent,
		ListItem,
		TextChild
	} from '$lib/types/content';

	let {
		content
	}: {
		content: ContentItem;
		// We use 'any' here because the content can have a complex structure with nested elements, and we will handle the typing more specifically within the functions that process the content based on their type and structure
	} = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	// Function to handle headings based on their level
	const handleHeading = (section: HeadingContent): { tag: string; text: string } => ({
		tag: `h${section.level}`,
		text: section.children[0].text
	});

	// Function to handle text within paragraphs and links
	const handleText = (section: { children: TextChild[] }): string => {
		let paragraphText = '';
		section.children.forEach((child: TextChild) => {
			switch (child.type) {
				case 'text':
					if (child.italic) {
						paragraphText += `<em>${child.text}</em>`;
					} else {
						paragraphText += child.text;
					}
					break;
				case 'link':
					if (child.url && child.url.includes('http')) {
						paragraphText += `<a href="${child.url}" ${child.rel ? `rel="external noopener noreferrer"` : ''} ${
							child.target ? `target="${child.target}"` : ''
						}>${child.children ? child.children[0].text : ''}</a>`;
					} else {
						paragraphText += `<a href="/${locale}${child.url}" ${child.rel ? `rel="${child.rel}"` : ''} ${child.target ? `target="${child.target}"` : ''}>${child.children ? child.children[0].text : ''}</a>`;
					}
					break;
				default:
					paragraphText += child.text;
			}
		});
		return paragraphText;
	};

	// Function to handle lists and their items recursively
	const handleList = (section: ListContent | ListItem): string => {
		let listText = '';
		section.children.forEach((listItem: ListItem) => {
			if (listItem.type === 'list') {
				// Handle nested lists recursively
				listText += `
          ${listItem.format === 'ordered' ? '<ol>' : '<ul>'}
          ${handleList(listItem)}
          ${listItem.format === 'ordered' ? '</ol>' : '</ul>'}
        `;
			} else {
				// Handle regular list items with handleText function to process their content checking for links and text
				listText += `<li>${handleText(listItem)}</li>`;
			}
		});
		return listText;
	};

	// Derived store to format the content into HTML tags based on their type and structure and to handle nested lists and links within paragraphs
	const formattedContent: { tag: string; text: string }[] = $derived.by(() => {
		const result: { tag: string; text: string }[] = [];
		if (content && Array.isArray(content) && content.length > 0) {
			content.forEach((section: ContentSection) => {
				switch (section.type) {
					case 'heading':
						result.push(handleHeading(section));
						break;
					case 'paragraph':
						result.push({ tag: 'p', text: handleText(section) });
						break;
					case 'list':
						result.push({
							tag: section.format === 'ordered' ? 'ol' : 'ul',
							text: handleList(section)
						});
						break;
				}
			});
		}
		return result;
	});
</script>

{#each formattedContent as item, index ('text' + index)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<${item.tag}>${item.text}</${item.tag}>`}
{/each}
