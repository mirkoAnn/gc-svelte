<script lang="ts">
	import { appManager } from '$lib/app-manager.svelte';
	import type { Provider } from '$lib/types/provider';
	import { resolve } from '$app/paths';
	import { m } from '../../paraglide/messages';

	let { providers }: { providers: Provider[] } = $props();

	const locale = $derived(appManager.getCountryCode());
</script>

<div class="providers-gallery">
	{#each providers as provider ('provider-' + provider.slug)}
		<a
			href={resolve(`/${locale}/providers/[slug]`, { slug: provider.slug })}
			class="provider-card"
			style="--bg-color:{provider.colors.background}"
			title={m.logo_description({ title: provider.title }, { locale })}
		>
			<img
				src={provider.logo.url}
				alt={m.logo_description({ title: provider.title }, { locale })}
				title={m.logo_description({ title: provider.title }, { locale })}
				class="provider-logo"
				width={100}
				height={50}
			/>
		</a>
	{/each}
</div>

<style>
	.providers-gallery {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: center;
		.provider-card {
			width: 100px;
			text-align: center;
			background-color: var(--bg-color);
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			.provider-logo {
				max-width: 100%;
				height: auto;
			}
		}
	}
</style>
