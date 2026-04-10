<script lang="ts">
	import Content from '../content/content.svelte';
	import type { Author } from '$lib/types/author';
	import { m } from '../../paraglide/messages';
	import { appManager } from '$lib/app-manager.svelte';

	let { author }: { author: Author } = $props();

	const locale = $derived(appManager.getCountryCode());
	const photoAlt = $derived(m.author_photo_description({ authorName: author.name }, { locale }));
</script>

<div class="author-container">
	<div class="author-container-inner">
		<div class="author-info">
			<img
				class="author-photo"
				src={author.image.url.replace('/upload/', '/upload/f_avif/w_300/')}
				alt={photoAlt}
				title={photoAlt}
				width="300"
				height="300"
			/>
			<h3 class="author-name">{author.name}</h3>
		</div>
		<div class="author-description">
			<Content content={author.description} />
			<div class="social-container">
				{#if author.facebookProfile}
					<a
						href={author.facebookProfile}
						target="_blank"
						rel="external noopener noreferrer"
						aria-label={m.author_social_profile(
							{ social: 'Facebook', authorName: author.name },
							{ locale }
						)}
						class="social-link"
					>
						<svg class="social-bar-list-item-icon" aria-hidden="true">
							<use href="/icons/social-set.svg#facebook"></use>
						</svg>
					</a>
				{/if}
				{#if author.linkedinProfile}
					<a
						href={author.linkedinProfile}
						target="_blank"
						rel="external noopener noreferrer"
						aria-label={m.author_social_profile(
							{ social: 'LinkedIn', authorName: author.name },
							{ locale }
						)}
						class="social-link"
					>
						<svg class="social-bar-list-item-icon" aria-hidden="true">
							<use href="/icons/social-set.svg#linkedin"></use>
						</svg>
					</a>
				{/if}
				{#if author.email}
					<a
						href={`mailto:${author.email}`}
						aria-label={m.author_send_email({ authorName: author.name }, { locale })}
						class="social-link"
					>
						<svg class="social-bar-list-item-icon" aria-hidden="true">
							<use href="/icons/social-set.svg#email"></use>
						</svg>
					</a>
				{/if}
			</div>
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
				}
				.author-name {
					margin: 0;
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
						color: var(--blu-600);
						background-color: var(--light-brown-900);
						text-decoration: none;

						.social-bar-list-item-icon {
							width: 16px;
							height: 16px;
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
