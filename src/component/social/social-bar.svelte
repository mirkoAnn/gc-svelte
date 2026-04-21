<script lang="ts">
	import { page } from '$app/state';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';
	import { m } from '../../paraglide/messages';

	const socialLinks = [
		{
			label: 'Facebook',
			url: 'https://www.facebook.com/profile.php?id=61570662777578',
			icon: 'facebook'
		},
		{
			label: 'Instagram',
			url: '',
			icon: 'instagram'
		},
		{
			label: 'X',
			url: 'https://x.com/GamLub25323',
			icon: 'x'
		},
		{
			label: 'LinkedIn',
			url: 'https://www.linkedin.com/company/gamlub/about/?viewAsMember=true',
			icon: 'linkedin'
		},
		{
			label: 'email',
			url: 'mailto:info@gamlub.com',
			icon: 'email'
		}
	];

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);
</script>

<ul class="social-bar-list">
	{#each socialLinks as link ('social-link-' + link.label)}
		<li class="social-bar-list-item">
			<a
				class="social-bar-list-item-link"
				href={link.url}
				target="_blank"
				rel="external noopener noreferrer"
				aria-label={m.social_follow_us_on({ social: link.label }, { locale })}
			>
				<svg class="social-bar-list-item-icon" aria-hidden="true">
					<use href="/icons/social-set.svg#{link.icon}"></use>
				</svg>
			</a>
		</li>
	{/each}
</ul>

<style>
	.social-bar-list {
		width: 100%;
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		margin: 0;
		padding: 0;
		color: inherit;
		.social-bar-list-item {
			color: inherit;
			.social-bar-list-item-link {
				display: flex;
				align-items: center;
				justify-content: center;
				text-decoration: none;
				color: inherit;
				.social-bar-list-item-icon {
					width: 20px;
					height: 20px;
					transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
				}
				&:hover {
					.social-bar-list-item-icon {
						transform: scale(1.5);
						fill: var(--accent-color);
					}
				}
			}
		}
	}
</style>
