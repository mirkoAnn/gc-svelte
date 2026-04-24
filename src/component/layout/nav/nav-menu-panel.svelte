<script>
	import { navManager } from './nav-manager.svelte';
</script>

{#each navManager.getMenuActions() as action, i (action.category)}
	{#if action.category !== 'menu'}
		<div
			id="nav-action-tabpanel-{i}"
			class="nav-panel"
			role="tabpanel"
			tabindex="0"
			aria-labelledby="nav-action-tab-{i}"
			aria-hidden={navManager.getActiveActionIndex() === -1}
			inert={!(navManager.getActiveActionIndex() === i)}
		>
			{#if action.component}
				<action.component />
			{/if}
		</div>
	{/if}
{/each}

<style>
	.nav-panel {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		padding: 24px 0;
		opacity: 0;
		visibility: hidden;
		z-index: 999;
	}
</style>
