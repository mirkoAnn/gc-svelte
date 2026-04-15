import gsap from 'gsap/dist/gsap';

export enum CountryCodes {
	it = 'it'
}

let isMobile = $state<boolean>(false),
	countryCode = $state<CountryCodes>(CountryCodes.it);

export const appManager = {
	setDeviceType: () => {
		isMobile = window.innerWidth < 768;
	},
	isMobile: () => {
		return isMobile;
	},
	setCountryCode: (code: CountryCodes) => {
		countryCode = code;
	},
	getCountryCode: () => {
		return countryCode;
	},
	getCountryName: () => {
		switch (countryCode) {
			case CountryCodes.it:
				return 'Italia';
			default:
				return '';
		}
	},
	getCountryLangCode: (country?: CountryCodes) => {
		switch (country ?? countryCode) {
			case CountryCodes.it:
				return 'it-IT';
			default:
				return '';
		}
	},
	getCurrencyCode: (country?: CountryCodes) => {
		switch (country ?? countryCode) {
			case CountryCodes.it:
				return 'EUR';
			default:
				return '';
		}
	},
	// Add content animation on scroll using GSAP and ScrollTrigger plugin in all pages
	addContentAnimation: async () => {
		const scrollTrigger = await import('gsap/dist/ScrollTrigger');
		gsap.registerPlugin(scrollTrigger);
		document.querySelectorAll('.content').forEach((section) => {
			gsap
				.timeline({
					scrollTrigger: {
						scroller: '.main-inner',
						trigger: section,
						start: 'top 80%',
						end: 'top 30%',
						scrub: true
					}
				})
				.fromTo(
					section,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0
					}
				);
		});
	},
	scrollToTop: () => {
		document.querySelector('.main-inner')!.scrollTo(0, 0);
	}
};
