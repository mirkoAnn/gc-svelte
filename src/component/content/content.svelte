<script lang="ts">
  let { content }: { content: any } = $props();

  // Function to handle headings based on their level
  const handleHeading = (section: any) => {
    switch (section.level) {
      case 1:
        formattedContent.push({ tag: "h1", text: section.children[0].text });
        break;
      case 2:
        formattedContent.push({ tag: "h2", text: section.children[0].text });
        break;
      case 3:
        formattedContent.push({ tag: "h3", text: section.children[0].text });
        break;
      // Add more cases as needed
      default:
        formattedContent.push({ tag: "p", text: section.children[0].text });
    }
  };

  // Function to handle text within paragraphs and links
  const handleText = (section: any) => {
    let paragraphText = "";
    section.children.forEach((child: any) => {
      switch (child.type) {
        case "text":
          paragraphText += child.text;
          break;
        case "link":
          paragraphText += `<a href="${child.url}" ${child.rel ? `rel="${child.rel}"` : ""} ${child.target ? `target="${child.target}"` : ""}>${child.children[0].text}</a>`;
          break;
        default:
          paragraphText += child.text;
      }
    });
    return paragraphText;
  };

  // Function to handle lists and their items recursively
  const handleList = (section: any) => {
    let listText = "";
    section.children.forEach((listItem: any) => {
      if (listItem.type === "list") {
        // Handle nested lists recursively
        listText += `
          ${listItem.format === "ordered" ? "<ol>" : "<ul>"}
          ${handleList(listItem)}
          ${listItem.format === "ordered" ? "</ol>" : "</ul>"}
        `;
      } else {
        // Handle regular list items with handleText function to process their content checking for links and text
        listText += `<li>${handleText(listItem)}</li>`;
      }
    });
    return listText;
  };

  const formattedContent: any = [];
  if (content && Array.isArray(content) && content.length > 0) {
    content.forEach((section: any) => {
      switch (section.type) {
        case "heading":
          handleHeading(section);
          break;
        case "paragraph":
          formattedContent.push({ tag: "p", text: handleText(section) });
          break;
        case "list":
          formattedContent.push({
            tag: section.format === "ordered" ? "ol" : "ul",
            text: handleList(section),
          });
          break;
      }
    });
  }
</script>

{#each formattedContent as item}
  {@html `<${item.tag}>${item.text}</${item.tag}>`}
{/each}
