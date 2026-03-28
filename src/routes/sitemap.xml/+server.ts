import { dbManager } from "$lib/db-manager.svelte";
import { error } from "@sveltejs/kit";

export async function GET() {
  let query = `
    query {
      homepage {
        updatedAt
      }
      slotsPage {
        updatedAt
      }
      slotThemes(pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
      slotMechanics(pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
      slots(pagination: { page: 1, pageSize: 5000 }) {
        slug
        updatedAt
      }
      providersPage {
        updatedAt
      }
      providers(pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
      casinosPage {
        updatedAt
      }
      casinos(pagination: { page: 1, pageSize: 500 }) {
        slug
        updatedAt
      }
    }
  `;

  let urlset: any = [];
  const SITE_ADDRESS = "https://slotgratisonline.it";

  await dbManager
    .executeQuery(query)
    .catch(() => {
      throw error(404, {
        message: "Error loading page",
      });
    })
    .then((response: any) => {
      // Main Pages entries
      urlset.push(
        {
          loc: SITE_ADDRESS,
          freq: "daily",
          mod: response.data.homepage.updatedAt,
          priority: 1,
        },
        {
          loc: SITE_ADDRESS + "/slot-gratis",
          freq: "daily",
          mod: response.data.slotsPage.updatedAt,
          priority: 1,
        },
        {
          loc: SITE_ADDRESS + "/providers",
          freq: "monthly",
          mod: response.data.providersPage.updatedAt,
          priority: 1,
        },
        {
          loc: SITE_ADDRESS + "/casino-online",
          freq: "weekly",
          mod: response.data.casinosPage.updatedAt,
          priority: 0.9,
        },
      );

      // Temporary variable to store entries during cycles
      let url: any, entries: any;

      // Casino entries
      entries = response.data.casinos;
      entries.forEach((entry: any) => {
        url = {
          loc: SITE_ADDRESS + "/casino-online/" + entry.slug,
          freq: "monthly",
          mod: entry.updatedAt,
          priority: 0.8,
        };
        urlset.push(url);
      });

      // Slot Categories entries
      entries = response.data.slotThemes;
      entries.forEach((entry: any) => {
        url = {
          loc: SITE_ADDRESS + "/slot-gratis/slot-" + entry.slug,
          freq: "yearly",
          mod: entry.updatedAt,
          priority: 0.5,
        };
        urlset.push(url);
      });

      // Slot Mechanics entries
      entries = response.data.slotMechanics;
      entries.forEach((entry: any) => {
        url = {
          loc: SITE_ADDRESS + "/slot-gratis/regole-" + entry.slug,
          freq: "yearly",
          mod: entry.updatedAt,
          priority: 0.5,
        };
        urlset.push(url);
      });

      // Slots entries
      entries = response.data.slots;
      entries.forEach((entry: any) => {
        url = {
          loc: SITE_ADDRESS + "/slot/" + entry.slug,
          freq: "yearly",
          mod: entry.updatedAt,
          priority: 0.5,
        };
        urlset.push(url);
      });

      // Providers entries
      entries = response.data.providers;
      entries.forEach((entry: any) => {
        url = {
          loc: SITE_ADDRESS + "/providers/" + entry.slug,
          freq: "yearly",
          mod: entry.updatedAt,
          priority: 0.5,
        };
        urlset.push(url);
      });
    });

  let mappedUrlset = "";
  urlset.forEach((url: any) => {
    mappedUrlset += `<url>
      <loc>${url.loc}</loc>
      <changefreq>${url.freq}</changefreq>
      <lastmod>${url.mod}</lastmod>
      <priority>${url.priority}</priority>
    </url>`;
  });

  return new Response(
    `
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
        ${mappedUrlset}
        </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
