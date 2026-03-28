<script lang="ts">
  import { appManager } from "../../lib/app-manager.svelte";

  let { breadcrumbs }: { breadcrumbs: any } = $props();

  // La variabile jsonLdItems viene utilizzata per la ceazione dell'array listItems necessaria per i dati strutturati nel campo JsonLD.
  // Viene inserita la homepage in fase di iniziallizazione, dopodichè vengono inseriti i livelli inferiori tramite un ciclo effettuato
  // sulla variabile breadcrumbs. La variabile posizione viene utilizzata per i livelli inferiori ed è inizializzata a 2. Il livello 1 infatti
  // è associato alla homepage e viene utilizzato in fase di inizializzazione dell'array jsonLdItems.
  let jsonLdItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `/${appManager.getCountryCode()}`,
      },
    ],
    item,
    position = 2;

  breadcrumbs.forEach((breadcrumb: any) => {
    item = {
      "@type": "ListItem",
      position: position,
      name: breadcrumb.title,
      item: `/${appManager.getCountryCode()}${breadcrumb.url}`,
    };
    position += 1;
    jsonLdItems.push(item);
  });
</script>

<ul class="breadcrumbs" itemscope>
  <li
    class="element"
    itemprop="itemListElement"
    itemscope
    itemtype="http://schema.org/ListItem"
  >
    <a
      class="breadcrumbs-link"
      itemprop="item"
      href="/"
      title="La Homepage di SlotGratisOnline.it"
    >
      <svg class="home-icon"> <use href="/icons/icon-set.svg#home" /></svg>
    </a>
    <meta itemprop="position" content="1" />
  </li>
  {#each breadcrumbs as { url, title, label }, i}
    <li
      class="element mid-element"
      itemprop="itemListElement"
      itemscope
      itemtype="http://schema.org/ListItem"
    >
      <a
        class="breadcrumbs-link"
        itemprop="item"
        href={`/${appManager.getCountryCode()}${url}`}
        {title}
      >
        <svg class="next-arrow"> <use href="/icons/icon-set.svg#arrow" /></svg>
        <span itemprop="name">{label}</span></a
      >
      <meta itemprop="position" content={(i + 2).toString()} />
    </li>
  {/each}
</ul>

{@html `
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": ${JSON.stringify(jsonLdItems)}
    }
  </script>
`}

<style>
  .breadcrumbs {
    width: 100%;
    list-style: none;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 16px var(--mobile-padding);
    margin: 0;
    .element {
      .breadcrumbs-link {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        color: inherit;
        .home-icon {
          width: 12px;
          height: 12px;
        }
        .next-arrow {
          width: 10px;
          height: 10px;
          margin: 0 4px;
          transition: 0.5s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        &:hover {
          color: var(--blu-600);
          .next-arrow {
            transform: translateX(4px);
          }
        }
      }
    }
  }
</style>
