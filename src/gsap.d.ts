/// <reference types="gsap" />
// Import GSAP types for TypeScript to recognize GSAP and its plugins also in dist version
declare module 'gsap/dist/gsap' {
	export * from 'gsap';
	export { default } from 'gsap';
}
declare module 'gsap/dist/ScrollTrigger' {
	export * from 'gsap/ScrollTrigger';
	export { default } from 'gsap/ScrollTrigger';
}
