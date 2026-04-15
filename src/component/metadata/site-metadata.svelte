<script lang="ts">
	import { EMAIL, SITE_LOGO_URL, SITE_NAME, SITE_URL } from './sitedata-manager.svelte';

	const organizationSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${SITE_URL}#organization`,
		name: SITE_NAME,
		url: SITE_URL,
		logo: {
			'@type': 'ImageObject',
			'@id': `${SITE_URL}#logo`,
			url: SITE_LOGO_URL,
			width: 400,
			height: 80
		},
		image: {
			'@id': `${SITE_URL}#logo`
		},
		sameAs: [
			'https://www.facebook.com/gamblingonlineitalia.it/',
			'https://twitter.com/gamblingonlineitalia',
			'https://www.instagram.com/gamblingonlineitalia/',
			'https://feeds.feedburner.com/GamblingOnlineItalia'
		],
		contactPoint: {
			'@type': 'ContactPoint',
			email: EMAIL,
			contactType: 'Support'
		},
		parentOrganization: {
			'@type': 'Organization',
			'@id': 'https://netgenerationleads.com/#organization',
			url: 'https://netgenerationleads.com/',
			name: 'NetGenerationLeads.com',
			logo: {
				'@type': 'ImageObject',
				'@id': 'https://netgenerationleads.com/#logo',
				url: 'https://netgenerationleads.com/net-generation-leads-logo.svg'
			},
			contactPoint: {
				'@type': 'ContactPoint',
				email: 'info@netgenerationleads.com',
				contactType: 'Support'
			},
			address: {
				'@type': 'PostalAddress',
				addressCountry: {
					'@type': 'Country',
					name: 'ES'
				},
				addressLocality: 'Arona,Spain',
				addressRegion: 'Arona',
				postalCode: '38630',
				streetAddress: '325 Avenida Jose Antonio Tavio'
			},
			sameAs: ['https://www.linkedin.com/company/netgenerationleads/']
		}
	});

	const websiteSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_URL}#website`,
		url: SITE_URL,
		name: SITE_NAME,
		publisher: {
			'@type': 'Organization',
			'@id': `${SITE_URL}#organization`
		}
	});
</script>

<svelte:head>
	<svelte:element this={'script'} type="application/ld+json">{organizationSchema}</svelte:element>
	<svelte:element this={'script'} type="application/ld+json">{websiteSchema}</svelte:element>
</svelte:head>
