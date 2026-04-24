import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),
		sveltekit()
	],
	worker: {
		format: 'es'
	},
	optimizeDeps: {
		include: ['gsap/dist/gsap', 'gsap/dist/ScrollTrigger', 'chart.js']
	},
	build: {
		target: 'esnext'
	}
});
