import { dbManager } from '$lib/db-manager.svelte.js';
import type { Author } from '$lib/types/author.js';
import type { Colors } from '$lib/types/colors.js';
import type { Content } from '$lib/types/content.js';
import type { Image } from '$lib/types/image.js';
import { error } from '@sveltejs/kit';

type CasinoPageData = {
	page: {
		id: string;
		title: string;
		slug: string;
		rank: number;
		seo: {
			title: string;
			description: string;
		};
		logo: {
			url: string;
		};
		colors: Colors;
		images: Array<Image>;
		imagesMobile: Array<Image>;
		info: {
			homepageUrl: string;
			email: string;
			telephone: string;
			depositMin: number;
			withdrawalMin: number;
			withdrawalTime: string;
			hasApp: boolean;
			hasGreatDesign: boolean;
			hasRoulette: boolean;
			hasBlackjack: boolean;
			hasPoker: boolean;
			hasLiveGames: boolean;
			hasSportBetting: boolean;
		};
		paymentMethods: Array<{
			slug: string;
		}>;
		providers: Array<{
			title: string;
			slug: string;
			logo: Image;
			colors: Colors;
		}>;
		content: Content;
		author: Author;
	};
};

export async function load({ params }) {
	const query = `
    query {
      page: casinos(filters: { slug: { eq: "${params.slug}" } }) {
        id: documentId
        title
        slug
        rank
        seo {
          title
          description
        }
        logo {
          url
        }
        colors {
          background
          text
        }
        images {
          id:documentId
          url
        }
        imagesMobile {
          id:documentId
          url
        }
        info {
          homepageUrl
          email
          telephone
          depositMin
          withdrawalMin
          withdrawalTime
          hasApp
          hasGreatDesign
          hasRoulette
          hasBlackjack
          hasPoker
          hasLiveGames
          hasSportBetting
        }
        paymentMethods {
          slug
        }
        providers {
          title
          slug
          logo {
            url
          }
          colors {
            background
          }
        }
        content {
          introContent
          secondContent
          thirdContent
          fourthContent
          fifthContent
          sixthContent
          seventhContent
          eighthContent
          ninethContent
          tenthContent
        }
        author {
          name
          image {
            url
          }
          description
          facebookProfile
          linkedinProfile
        }
        publishedAt
        updatedAt
      }
    }
  `;

	return await dbManager
		.executeQuery(query)
		.then((response: { data: { page: Array<CasinoPageData> } }) => {
			return response.data.page[0];
		})
		.catch(() => {
			throw error(404, {
				message: 'Error loading page'
			});
		});
}
