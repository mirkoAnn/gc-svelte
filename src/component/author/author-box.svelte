<script lang="ts">
	import { page } from '$app/state';
	import Content from '../content/content-element.svelte';
	import type { Author } from '$lib/types/author';
	import { m } from '../../paraglide/messages';
	import { appManager, CountryCodes } from '$lib/app-manager.svelte';

	let { author }: { author: Author } = $props();

	const locale = $derived.by(
		() => appManager.getCountryCodeFromPathname(page.url.pathname) ?? CountryCodes.it
	);

	const photoAlt = $derived(m.author_photo_description({ authorName: author.name }, { locale }));

	const socialLinks = $derived(
		[
			{
				href: author.facebookProfile,
				icon: 'facebook',
				label: m.author_social_profile({ social: 'Facebook', authorName: author.name }, { locale })
			},
			{
				href: author.linkedinProfile,
				icon: 'linkedin',
				label: m.author_social_profile({ social: 'LinkedIn', authorName: author.name }, { locale })
			},
			{
				href: author.email ? `mailto:${author.email}` : null,
				icon: 'email',
				label: m.author_send_email({ authorName: author.name }, { locale })
			}
		].filter((link) => link.href)
	);
</script>

<div class="author-container">
	<div class="author-container-inner">
		<div class="author-info">
			<img
				class="author-photo"
				src={author.image.url.replace('/upload/', '/upload/f_avif/w_300/')}
				alt={photoAlt}
				loading="lazy"
				decoding="async"
				width="300"
				height="300"
			/>
			<h3 class="author-name">{author.name}</h3>
		</div>
		<div class="author-description">
			<Content content={author.description} />
			{#if socialLinks.length > 0}
				<div class="social-container">
					{#each socialLinks as { href, icon, label } (icon)}
						<a
							{href}
							target={href?.startsWith('mailto:') ? undefined : '_blank'}
							rel={href?.startsWith('mailto:') ? undefined : 'external noopener noreferrer'}
							aria-label={label}
							class="social-link"
						>
							<svg class="social-bar-list-item-icon" aria-hidden="true">
								<use href="/icons/social-set.svg#{icon}"></use>
							</svg>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.author-container {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: var(--mobile-padding);
		.author-container-inner {
			width: 100%;
			max-width: 1000px;
			margin: 48px auto;
			display: flex;
			align-items: center;
			gap: 32px;
			background-color: var(--blu-700);
			padding: 24px;
			border-radius: 8px;
			color: var(--light-brown-900);
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			transition: box-shadow 0.3s ease-out;

			&:hover {
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			}
			.author-info {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 8px;
				.author-photo {
					width: 200px;
					aspect-ratio: 1/1;
					border-radius: 50%;
					object-fit: cover;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
					transition: box-shadow 0.3s ease-out;

					&:hover {
						box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
					}
				}
				.author-name {
					margin: 0;
					font-weight: 600;
				}
			}
			.author-description {
				flex: 1;
				.social-container {
					margin-top: 16px;
					display: flex;
					gap: 12px;
					.social-link {
						display: inline-flex;
						width: 32px;
						height: 32px;
						justify-content: center;
						align-items: center;
						border-radius: 50%;
						background-color: var(--light-brown-900);
						text-decoration: none;
						transition: all 0.2s ease-out;

						&:hover {
							background-color: var(--blu-600);
							transform: scale(1.1);
						}

						&:focus-visible {
							outline: 2px solid var(--blu-600);
							outline-offset: 2px;
						}

						.social-bar-list-item-icon {
							width: 16px;
							height: 16px;
							color: var(--blu-600);
							transition: color 0.2s ease-out;
						}

						&:hover .social-bar-list-item-icon {
							color: var(--light-brown-900);
						}
					}
				}
			}
		}
		@media (max-width: 767px) {
			.author-container-inner {
				flex-direction: column;
				text-align: center;
				.author-description {
					.social-container {
						justify-content: center;
					}
				}
			}
		}
	}
</style>
