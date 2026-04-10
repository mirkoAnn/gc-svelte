<script lang="ts">
	import type { Menu } from '$lib/types/nav';
	import { resolve } from '$app/paths';
	import { appManager } from '../../../../lib/app-manager.svelte';
	import { navManager } from '../nav-manager.svelte';
	import { m } from '../../../../paraglide/messages';

	let { menu, menuIndex }: { menu: Menu; menuIndex: number } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

<div
	id="nav-links-panel-{menuIndex}"
	class="nav-links-panel nav-links-panel-{menuIndex}"
	role="tabpanel"
	tabindex="0"
	aria-labelledby="navbar-tab-{menuIndex}"
	inert={!(navManager.getActiveSubmenuIndex() === menuIndex)}
>
	<ul
		id="nav-links-submenu"
		class="nav-links-submenu"
		role="list"
		aria-label={m.nav_links_submenu_aria_label({ locale })}
	>
		{#each menu.submenuItems as subitem, index ('submenu' + index)}
			<li class="nav-links-submenu-item">
				<svg class="nav-links-submenu-item-icon" aria-hidden="true">
					<use href="/icons/{menu.category}-set.svg#{subitem.category}"></use>
				</svg>
				<a
					class="nav-links-submenu-item-link"
					title={m.go_to_page({ page: subitem.label }, { locale })}
					href={`/${locale}${subitem.href}`}
				>
					{subitem.label}
				</a>
				<svg class="nav-links-submenu-item-link-icon" aria-hidden="true">
					<use href="/icons/icon-set.svg#arrow" />
				</svg>
			</li>
		{/each}
	</ul>
</div>

<style>
	.nav-links-panel {
		width: 100%;
		height: 0;
		.nav-links-submenu {
			list-style: none;
			margin: 0;
			padding: 16px 16px 16px 24px;
			display: flex;
			flex-direction: column;
			gap: 10px;
			.nav-links-submenu-item {
				width: 100%;
				display: flex;
				align-items: center;
				gap: 8px;
				text-decoration: none;
				color: var(--light-brown-700);
				.nav-links-submenu-item-icon {
					width: 16px;
					height: 16px;
				}
				.nav-links-submenu-item-link {
					font-size: 14px;
					color: inherit;
				}
				.nav-links-submenu-item-link:hover,
				.nav-links-submenu-item-link:focus {
					color: var(--light-brown-900);
					outline: none;
				}
				.nav-links-submenu-item-link-icon {
					width: 12px;
					height: 12px;
					transition: transform 0.3s ease;
				}
				&:hover {
					color: var(--light-brown-900);
					.nav-links-submenu-item-link-icon {
						transform: translateX(16px);
					}
				}
			}
		}
	}
</style>
