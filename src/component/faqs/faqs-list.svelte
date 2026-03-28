<script lang="ts">
  import Faq from "./faq.svelte";

  let { faqs } = $props();
</script>

<div class="content faqs-container">
  <h2 class="faqs-title">Domande Frequenti</h2>
  <div class="faqs-inner">
    {#each faqs as faq}
      <Faq {faq} />
    {/each}
  </div>
</div>

{@html `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [${faqs.map((faq: any) => {
          return `
          {
            "@type": "Question",
            "name": "${faq.question}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${faq.answer[0].children[0].text.replace(/"/g, "'").replace(/\n/g, " ")}"
            }
          }`;
        })}
        ]
      }
    </script>
`}

<style>
  .faqs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    .faqs-title {
      text-align: center;
    }
    .faqs-inner {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
</style>
