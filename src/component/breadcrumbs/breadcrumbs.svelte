<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '../../lib/app-manager.svelte';
	import type { Breadcrumb } from '$lib/types/breadcrumb';
	import { resolve } from '$app/paths';

	let { breadcrumbs }: { breadcrumbs: Breadcrumb[] } = $props();

	const countryCode = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let jsonLdItems = $derived.by(() => {
		return [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: `/${countryCode}`
			},
			...breadcrumbs.map((breadcrumb, index) => ({
				'@type': 'ListItem',
				position: index + 2,
				name: breadcrumb.title,
				item: resolve(breadcrumb.route.id, breadcrumb.route.params)
			}))
		];
	});
</script>

<ul class="breadcrumbs" itemscope>
	<li class="element" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
		<a
			class="breadcrumbs-link"
			itemprop="item"
			href={resolve(`/${countryCode}`)}
			title={`GamblingClub ${appManager.getCountryName()} - Homepage`}
		>
			<svg class="home-icon" aria-hidden="true">
				<use href="/icons/icon-set.svg#home" />
			</svg>
		</a>
		<meta itemprop="position" content="1" />
	</li>

	{#each breadcrumbs as { route, title, label }, i (route.id)}
		<li
			class="element mid-element"
			itemprop="itemListElement"
			itemscope
			itemtype="http://schema.org/ListItem"
		>
			<a class="breadcrumbs-link" itemprop="item" href={resolve(route.id, route.params)} {title}>
				<svg class="next-arrow" aria-hidden="true">
					<use href="/icons/icon-set.svg#arrow" />
				</svg>
				<span itemprop="name">{label}</span></a
			>
			<meta itemprop="position" content={(i + 2).toString()} />
		</li>
	{/each}
</ul>

<svelte:head>
	<script type="application/ld+json">
        {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: jsonLdItems
        })}
	</script>
</svelte:head>

<style>
	.breadcrumbs {
		width: 100%;
		list-style: none;
		display: flex;
		align-items: center;
		font-size: 12px;
		padding: 0 var(--mobile-padding);
		margin: 0;
		.element {
			.breadcrumbs-link {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				color: inherit;
				min-height: 44px;
				padding: 0 4px;
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
