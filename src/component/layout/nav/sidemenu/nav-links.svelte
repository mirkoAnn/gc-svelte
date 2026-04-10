<script lang="ts">
	import NavLinksSubmenu from './nav-links-submenu.svelte';
	import { navManager } from '../nav-manager.svelte';
	import { m } from '../../../../paraglide/messages';
	import { appManager } from '$lib/app-manager.svelte';

	const locale = $derived(appManager.getCountryCode());

	const initialSection = navManager.getCurrentSection();
</script>

<div class="nav-links-menus-outer">
	{#each navManager.getMenuItems() as menuItem (menuItem.section)}
		<ul
			id="nav-links-menu-{menuItem.section}"
			class="nav-links-menu nav-links-menu-{menuItem.section} {menuItem.section === initialSection
				? 'initial-section'
				: ''}"
			role="tablist"
			aria-label={m.nav_links_menu_aria_label({ locale })}
			style="--nav-submenu-links-bg-color: var(--nav-submenu-links-bg-color-{menuItem.section});"
		>
			{#each menuItem.items as item, i (item.category)}
				<li class="nav-links-menu-item nav-links-menu-item-{i}" role="presentation">
					<button
						class="nav-links-menu-item-button"
						type="button"
						role="tab"
						aria-selected={navManager.getActiveSubmenuIndex() === i}
						aria-controls={`nav-links-panel-${i}`}
						tabindex={navManager.getActiveSubmenuIndex() === i ? 0 : -1}
						onclick={() => navManager.toggleSubmenu(i)}
					>
						<svg class="nav-links-menu-item-icon" aria-hidden="true">
							<use href="/icons/{item.category}-set.svg#{item.category}"></use>
						</svg>
						<span class="nav-links-menu-item-label">{item.label}</span>

						<svg class="nav-links-menu-item-arrow" aria-hidden="true">
							<use href="/icons/icon-set.svg#fill-arrow" />
						</svg>
					</button>
					<NavLinksSubmenu menu={item} menuIndex={i} />
				</li>
			{/each}
		</ul>
	{/each}
</div>

<style>
	.nav-links-menus-outer {
		position: relative;
		flex: 1;
		.nav-links-menu {
			width: 100%;
			position: absolute;
			list-style: none;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
			margin: 0;
			padding: 0;
			&:not(.initial-section) {
				opacity: 0;
				visibility: hidden;
			}
			.nav-links-menu-item {
				width: 100%;
				overflow: hidden;
				.nav-links-menu-item-button {
					width: 100%;
					background: var(--nav-submenu-links-bg-color);
					padding: 8px 16px;
					border: none;
					cursor: pointer;
					border-radius: 8px;
					font-size: 16px;
					font-weight: 500;
					color: var(--light-brown-800);
					display: flex;
					align-items: center;
					gap: 8px;
					.nav-links-menu-item-icon {
						width: 24px;
						height: 24px;
					}
					.nav-links-menu-item-arrow {
						width: 16px;
						height: 16px;
						margin-left: auto;
						transform: rotate(180deg);
					}
				}
			}
		}
	}
</style>
