<script lang="ts">
	import gsap from 'gsap/dist/gsap';
	import Content from '../content/content-element.svelte';

	let { faq } = $props();

	let isVisible = $state(false);

	const toggleFaq = () => {
		isVisible = !isVisible;
		gsap
			.timeline({ defaults: { ease: 'back.inOut(1.7)' } })
			.to(`#faq-item-${faq.id} .faq-answer`, {
				height: isVisible ? 'auto' : 0
			})
			.to(
				`#faq-item-${faq.id} .faq-icon`,
				{
					rotate: isVisible ? 180 : 0
				},
				0
			);
	};
</script>

<div id={'faq-item-' + faq.id} class="faq-item" aria-expanded={isVisible}>
	<button onclick={toggleFaq} class="faq-item-toggler" aria-controls="faq-answer-{faq.id}">
		<h3 class="faq-question">
			<span class="faq-question-text">
				{faq.question}
			</span>
			<svg class="faq-icon">
				<use href="/icons/icon-set.svg#fill-arrow" />
			</svg>
		</h3>
	</button>
	<div class="faq-answer"><Content content={faq.answer} /></div>
</div>

<style>
	.faq-item {
		padding: 16px;
		border: 1px solid #ddd;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-align: left;
		.faq-question {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0;
			.faq-question-text {
				font-weight: bold;
				font-size: 1rem;
				text-align: left;
				max-width: 90%;
			}
			.faq-icon {
				width: 16px;
				height: 16px;
			}
		}
		.faq-answer {
			height: 0;
			font-size: 0.9rem;
			overflow: hidden;
			:global(p) {
				margin-top: 16px;
			}
		}
	}
</style>
