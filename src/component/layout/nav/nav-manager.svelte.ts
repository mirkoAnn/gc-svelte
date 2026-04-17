import gsap from 'gsap/dist/gsap';
import NavSearch from './search/nav-search.svelte';
import FavouritesList from '../../favourites/favourites-list.svelte';
import { appManager, CountryCodes } from '$lib/app-manager.svelte';
import { m } from '../../../paraglide/messages';

let currentSection = $state('casino'); // Used to track the currently active section for styling purposes (e.g. casino or sport)

const locale = $derived(appManager.getCountryCode());

// Array of menu items for the navbar, including submenus and links
const menuItems = $derived([
	// Each object represents a menu item
	{
		section: 'casino',
		color: '#1b2a38ff',
		selectorColor: '#3d6080ff',
		items: [
			{
				label: m.nav_casinos({}, { locale }),
				category: 'casino',
				// Submenu items
				submenuItems: [
					{
						href: `/casino-online`,
						title: m.nav_casinos_all_title({ year: new Date().getFullYear() }, { locale }),
						label: m.nav_casinos_all({}, { locale }),
						category: 'casino'
					}
				]
			},
			{
				label: m.nav_slots({}, { locale }),
				category: 'slot',
				// Submenu items
				submenuItems: [
					{
						href: `/slot-gratis`,
						title: m.nav_slots_all_title({ year: new Date().getFullYear() }, { locale }),
						label: m.nav_slots_all({}, { locale }),
						category: 'slot'
					},
					{
						href: `/slot-gratis/slot-bar`,
						title: m.nav_slots_classic_title({ year: new Date().getFullYear() }, { locale }),
						label: m.nav_slots_classic({}, { locale }),
						category: 'bar'
					},
					{
						href: `/slot-gratis/slot-vlt`,
						title: m.nav_slots_vlt_title({ year: new Date().getFullYear() }, { locale }),
						label: m.nav_slots_vlt({}, { locale }),
						category: 'vlt',
						onlyForCountries: [CountryCodes.it]
					},
					{
						href: `/slot-gratis/slot-piu-giocate`,
						title: m.nav_slots_top_title({ year: new Date().getFullYear() }, { locale }),
						label: m.nav_slots_top({}, { locale }),
						category: 'piu-giocate'
					},
					{
						href: `/slot-gratis/slot-nuove`,
						title: m.nav_slots_new_title({ year: new Date().getFullYear() }, { locale }),
						label: m.nav_slots_new({}, { locale }),
						category: 'nuove'
					}
				]
			},
			{
				label: m.nav_roulettes({}, { locale }),
				category: 'roulette',
				// Submenu items
				submenuItems: [
					{
						href: `/roulette-gratis`,
						title: m.nav_roulettes_all_title({ year: new Date().getFullYear() }, { locale }),
						label: m.nav_roulettes_all({}, { locale }),
						category: 'roulette'
					}
					// {
					// 	href: `/roulette-gratis/roulette-francese`,
					// 	title: m.nav_roulettes_french_title({ year: new Date().getFullYear() }, { locale }),
					// 	label: m.nav_roulettes_french({}, { locale }),
					// 	category: 'francese'
					// },
					// {
					// 	href: `/roulette-gratis/roulette-europea`,
					// 	title: m.nav_roulettes_european_title({ year: new Date().getFullYear() }, { locale }),
					// 	label: m.nav_roulettes_european({}, { locale }),
					// 	category: 'europea'
					// },
					// {
					// 	href: `/roulette-gratis/roulette-americana`,
					// 	title: m.nav_roulettes_american_title({ year: new Date().getFullYear() }, { locale }),
					// 	label: m.nav_roulettes_american({}, { locale }),
					// 	category: 'americana'
					// }
				]
			}
		]
	}
	// {
	//   section: "sport",
	//   color: "#072f10ff",
	//   selectorColor: "#0e4f1cff",
	//   items: [
	//     {
	//       label: "Sport",
	//       category: "sport",
	//       // Submenu items
	//       submenuItems: [
	//         {
	//           href: `/sport`,
	//           title:
	//             "Resta aggiornato su tutti gli eventi sportivi del " +
	//             new Date().getFullYear(),
	//           label: "Tutti gli Sport",
	//           category: "sport",
	//         },
	//       ],
	//     },
	//   ],
	// },
]);

const menuActions = [
	{ label: 'Search', category: 'search', component: NavSearch },
	{ label: 'Favourites', category: 'favourites', component: FavouritesList },
	{ label: 'Menu', category: 'menu', component: null }
];

let menuAnimation: GSAPTimeline | null = $state(null), // GSAP animation instance
	buttonsAnimation: GSAPTimeline | null = $state(null), // GSAP animation instance
	activeMenuIndex: number = $state(-1), // Currently active menu index
	activeActionIndex: number = $state(-1), // Currently active action index
	activeSubmenuIndex: number = $state(-1); // Currently active submenu index

const screenBreakpoint = 768; // Tailwind 'md' breakpoint in pixels

// Function to toggle the main menu panel with animation
const toggleMenuPanel = (newMenuIndex: number) => {
	if (menuAnimation) {
		menuAnimation.kill();
	}
	gsap.matchMedia().add(
		{
			// set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
			isDesktop: `(min-width: ${screenBreakpoint}px)`,
			isMobile: `(max-width: ${screenBreakpoint - 1}px)`,
			reduceMotion: '(prefers-reduced-motion: reduce)'
		},
		(context: gsap.MatchMediaContext) => {
			// context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
			const { isDesktop } = context.conditions;

			// If closing the menu panel, reset the active menu index
			if (newMenuIndex === -1) {
				if (isDesktop) {
					menuAnimation = gsap
						.timeline({ defaults: { ease: 'power2.inOut' } })
						.to('.nav', {
							height: 60,
							left: isDesktop ? 300 : 0,
							width: isDesktop ? 'calc(100% - 300px)' : '100%',
							boxShadow: 'none'
						})
						.to('#nav-sidemenu', { x: 0 }, '<')
						.to('.main-outer', { left: 300, width: 'calc(100% - 300px)' }, '<');
				} else {
					menuAnimation = gsap
						.timeline({ defaults: { ease: 'power2.inOut' } })
						.to('.main-outer', { zIndex: 999 })
						.to('.nav', {
							height: 60,
							boxShadow: 'none'
						})
						.to(
							'#nav-sidemenu',
							{
								autoAlpha: 0
							},
							'<'
						)
						.to(
							'.nav-links-menu-item',
							{
								y: 50,
								autoAlpha: 0,
								stagger: 0.1
							},
							'<'
						)
						.to('.nav-menu-panel', { autoAlpha: 0, y: -20 }, '<')
						.to(
							newMenuIndex !== -1 ? '#nav-panel-' + newMenuIndex : '.nav-panel',
							{ autoAlpha: 0 },
							'<'
						);
				}
			} else {
				// If opening a new menu panel, animate it in from the side with staggered menu items animation
				menuAnimation = gsap
					.timeline({
						defaults: { ease: 'power2.inOut' },
						paused: true
					})
					.to(
						'.main-outer',
						{
							left: 0,
							width: '100%'
						},
						'<'
					)
					.to('#nav-sidemenu', { x: isDesktop ? -300 : 0 }, '<')
					.to(
						'.nav',
						{
							height: '100vh',
							left: 0,
							width: '100%',
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
						},
						'<'
					);

				if (menuActions[newMenuIndex].category === 'menu') {
					menuAnimation
						.to(
							'#nav-sidemenu',
							{
								autoAlpha: 1
							},
							'<'
						)
						.fromTo(
							'.nav-links-menu-item',
							{ y: 50, autoAlpha: 0 },
							{ y: 0, autoAlpha: 1, stagger: 0.1 }
						);
				} else {
					menuAnimation
						.fromTo('.nav-menu-panel', { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0 }, '<')
						.fromTo(
							newMenuIndex !== -1 ? '#nav-panel-' + newMenuIndex : '.nav-panel',
							{ autoAlpha: 0 },
							{ autoAlpha: 1 }
						);
				}
				menuAnimation.play();
			}
		}
	);
};
// Function to animate the action buttons when an action panel is opened or closed
const animateActionButtons = (newActionIndex: number) => {
	// Kill any existing animation instance to avoid conflicts
	if (buttonsAnimation) {
		buttonsAnimation.kill();
	}

	// context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
	// perform your animations here based on the matched conditions
	buttonsAnimation = gsap.timeline({
		defaults: { duration: 0.5, ease: 'back.inOut(1.7)' },
		paused: true
	});

	if (newActionIndex === -1) {
		// If closing the action panel, reset the active action index
		buttonsAnimation
			// Reset all action buttons to default state
			.to('.nav-action .nav-action-icon', { scale: 1 })
			// Animate the action button width and color
			.to('.nav-action', { width: 30, color: 'inherit' }, '<')
			// Animate the selector back to default position
			.to('.nav-action-selector', { autoAlpha: 0 }, '<')
			// Animate the close icon and label back to default state
			.to('.nav-action-close .nav-action-close-icon', { scale: 0 }, '<')
			// Animate the close icon and label back to default state
			.to('.nav-action-close-label', { autoAlpha: 0 }, '<')
			.to('.nav-panel', { autoAlpha: 0 }, '<');
	} else {
		buttonsAnimation
			.to('.nav-action .nav-action-icon', { scale: 1 }, '<')
			.fromTo(
				'.nav-action-' + newActionIndex + ' .nav-action-icon',
				{ scale: 1 },
				{ scale: 0 },
				'<'
			)
			// Animate the action button width and color
			.to('.nav-action', { width: 30, color: 'inherit' }, '<')
			.fromTo(
				'.nav-action-' + (newActionIndex !== -1 ? newActionIndex : activeActionIndex),
				{ width: 30, color: 'inherit' },
				{ width: 100, color: 'var(--black-800)' },
				'<'
			)
			.to(
				'.nav-action-selector',
				{
					x: newActionIndex * 38,
					autoAlpha: 1
				},
				'<'
			)
			// Animate the close icon and label
			.to('.nav-action-close .nav-action-close-icon', { scale: 0 }, '<')
			.fromTo(
				'.nav-action-' + newActionIndex + ' .nav-action-close .nav-action-close-icon',
				{ scale: 0 },
				{ scale: 1 },
				'<'
			)
			// Animate the close icon and label
			.to('.nav-action-close-label', { autoAlpha: 0 }, '<')
			.fromTo(
				'.nav-action-' + newActionIndex + ' .nav-action-close-label',
				{ autoAlpha: 0 },
				{ autoAlpha: 1 },
				'<'
			)
			.fromTo('.nav-action-close .nav-action-close-icon', { scale: 0 }, { scale: 1 }, '<');
	}
	buttonsAnimation.play();
};
// Function to switch between different action panels with animation
const switchBetweeenActionPanels = (newActionIndex: number) => {
	if (menuAnimation) {
		menuAnimation.kill();
	}

	menuAnimation = gsap.timeline();

	if (menuActions[newActionIndex].category === 'menu') {
		menuAnimation
			.to('.nav-panel', {
				autoAlpha: 0,
				y: 50
			})

			.to('#nav-sidemenu', {
				autoAlpha: 1
			})
			.to('.main-outer', { zIndex: 1000 })
			.fromTo(
				'.nav-links-menu-item',
				{ y: 50, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, stagger: 0.1 }
			);
	} else if (menuActions[activeActionIndex].category === 'menu') {
		menuAnimation
			.to(
				'.nav-menu-panel',

				{ autoAlpha: 1, y: 0 }
			)
			.to('#nav-panel-' + newActionIndex, { autoAlpha: 1, y: 0 })
			.to('.main-outer', { zIndex: 999 })
			.to('#nav-sidemenu', {
				autoAlpha: 0
			});
	} else {
		menuAnimation
			.to('.nav-panel', {
				autoAlpha: 0,
				y: 50
			})
			.to('#nav-panel-' + newActionIndex, { autoAlpha: 1, y: 0 });
	}
};
// Function to toggle submenu panels with animation
const toggleSubmenuPanel = (newSubmenuIndex: number) => {
	// Implementation for toggling submenu panels can be added here
	if (menuAnimation) {
		menuAnimation.kill();
	}
	if (newSubmenuIndex !== -1) {
		menuAnimation = gsap
			.timeline({ defaults: { ease: 'back.inOut(1.7)' } })
			.to('.nav-links-panel-' + activeSubmenuIndex, {
				height: document.querySelector('.nav-links-panel-' + activeSubmenuIndex)?.scrollHeight
			})
			.fromTo(
				'.nav-links-panel-' + activeSubmenuIndex + ' .nav-links-submenu-item',
				{
					autoAlpha: 0,
					y: 20
				},
				{
					autoAlpha: 1,
					y: 0,
					stagger: 0.1
				},
				'<'
			)
			.fromTo(
				'.nav-links-menu-item-' + activeSubmenuIndex + ' .nav-links-menu-item-arrow',
				{
					rotation: 180
				},
				{
					rotation: 0
				},
				'<'
			);
	} else {
		menuAnimation = gsap
			.timeline({ defaults: { ease: 'power2.inOut' } })
			.to('.nav-links-panel', {
				height: 0
			})
			.to(
				'.nav-links-menu-item .nav-links-menu-item-arrow',
				{
					rotation: 180
				},
				'<'
			);
	}
};
// Function to switch between different submenus with animation
const switchBetweenSubmenus = (newMenuIndex: number) => {
	if (menuAnimation) {
		menuAnimation.kill();
	}
	menuAnimation = gsap
		.timeline({ defaults: { ease: 'back.inOut(1.7)' } })
		.to('.nav-links-panel', {
			height: 0
		})
		.to(
			'.nav-links-menu-item .nav-links-menu-item-arrow',
			{
				rotation: 180
			},
			'<'
		)
		.to(
			'.nav-links-panel-' + newMenuIndex,
			{
				height: document.querySelector('.nav-links-panel-' + newMenuIndex)?.scrollHeight
			},
			'<'
		)
		.fromTo(
			'.nav-links-panel-' + newMenuIndex + ' .nav-links-submenu-item',
			{
				autoAlpha: 0,
				y: 20
			},
			{
				autoAlpha: 1,
				y: 0,
				stagger: 0.1
			},
			'<'
		)
		.fromTo(
			'.nav-links-menu-item-' + newMenuIndex + ' .nav-links-menu-item-arrow',
			{
				rotation: 180
			},
			{
				rotation: 0
			},
			'<'
		);
};
const animateSectionChange = () => {
	if (menuAnimation) {
		menuAnimation.kill();
	}

	toggleSubmenuPanel(-1); // Close any open submenu

	menuAnimation = gsap.matchMedia().add(
		{
			// set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
			isDesktop: `(min-width: ${screenBreakpoint}px)`,
			isMobile: `(max-width: ${screenBreakpoint - 1}px)`,
			reduceMotion: '(prefers-reduced-motion: reduce)'
		},

		(context: gsap.MatchMediaContext) => {
			// context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
			const { isDesktop } = context.conditions;
			// perform your animations here based on the matched conditions

			menuAnimation = gsap
				.timeline({ defaults: { ease: 'power4.inOut' } })
				.to(
					'.nav-section-toggler',
					{
						backgroundColor: isDesktop
							? menuItems.find((item) => item.section === currentSection)?.selectorColor
							: menuItems.find((item) => item.section === currentSection)?.color
					},
					'<'
				)
				.to(
					'.nav-section-selector',
					{
						xPercent: navManager.getMenuSections().indexOf(currentSection) * 100,
						duration: 0.5,
						ease: 'back.out(1.7)'
					},
					'<'
				)
				.to(
					'.nav-section-toggler-button-' + currentSection,
					{
						color: 'var(--toggler-bg-color)'
					},
					'<'
				)
				.to(
					'.nav-section-toggler-button:not(.nav-section-toggler-button-' + currentSection + ')',
					{
						color: 'inherit'
					},
					'<'
				)
				.to(
					'.nav',
					{
						backgroundColor: menuItems.find((item) => item.section === currentSection)?.color
					},
					'<'
				)
				.to(
					'.nav-submenu',
					{
						backgroundColor: menuItems.find((item) => item.section === currentSection)?.color
					},
					'<'
				)
				.to(
					'.nav-links-menu:not(.nav-links-menu-' + currentSection + ') .nav-links-menu-item',
					{
						xPercent: -100,
						autoAlpha: 0,
						stagger: 0.1
					},
					'<'
				)
				.to('.nav-links-menu:not(.nav-links-menu-' + currentSection + ')', {
					autoAlpha: 0,
					duration: 0
				})
				.to('.nav-links-menu-' + currentSection, {
					autoAlpha: 1,
					duration: 0
				})
				.to(
					'.nav-links-menu-' + currentSection + ' .nav-links-menu-item',
					{
						xPercent: 0,
						autoAlpha: 1,
						stagger: 0.1
					},
					'-=0.25'
				);
		}
	);
};

// Navbar manager object to handle menu interactions and state
export const navManager = {
	getCurrentSection: () => {
		return currentSection;
	},
	changeSection: (newSection: string) => {
		currentSection = newSection;
		// Reset active menu and submenu indices when changing section
		activeMenuIndex = -1;
		activeSubmenuIndex = -1;
		toggleMenuPanel(-1); // Close any open menu panel
		animateSectionChange(); // Animate the section change
	},
	getMenuSections: () => {
		return menuItems.map((item) => item.section);
	},
	getMenuItems: () => {
		return menuItems;
	},
	getMenuItemByIndex: (index: number) => {
		return (
			menuItems.find((item) => item.section === currentSection)?.items[index] || {
				label: '',
				category: '',
				submenuItems: []
			}
		);
	},
	getActiveMenuIndex: () => {
		return activeMenuIndex;
	},
	getActiveSubmenuIndex: () => {
		return activeSubmenuIndex;
	},
	getMenuActions: () => {
		return menuActions;
	},
	getActiveActionIndex: () => {
		return activeActionIndex;
	},
	toggleMenu: (newActionIndex: number) => {
		if (newActionIndex === -1 && activeActionIndex === -1) {
			// No action panel is open, do nothing
			return;
		}
		if (newActionIndex === activeActionIndex || newActionIndex === -1) {
			// Close the currently open action panel if the same action is clicked or if -1 is passed
			toggleMenuPanel(-1);
			activeActionIndex = -1;
			animateActionButtons(activeActionIndex);
		} else if (newActionIndex !== activeActionIndex && activeActionIndex === -1) {
			// Open the new action panel
			animateActionButtons(newActionIndex);
			activeActionIndex = newActionIndex;
			toggleMenuPanel(activeActionIndex);
		} else {
			// Switch between different action panels
			switchBetweeenActionPanels(newActionIndex);
			animateActionButtons(newActionIndex);
			activeActionIndex = newActionIndex;
		}
	},
	toggleSubmenu: (newSubmenuIndex: number) => {
		if (newSubmenuIndex === -1 && activeSubmenuIndex === -1) {
			// No submenu is open, do nothing
			return;
		}
		if (newSubmenuIndex === activeSubmenuIndex || newSubmenuIndex === -1) {
			// Close the currently open submenu if the same submenu is clicked or if -1 is passed
			activeSubmenuIndex = -1;
			toggleSubmenuPanel(-1);
		} else if (newSubmenuIndex !== activeSubmenuIndex && activeSubmenuIndex === -1) {
			// Open the new submenu
			activeSubmenuIndex = newSubmenuIndex;
			toggleSubmenuPanel(newSubmenuIndex);
		} else {
			// Switch between different submenus
			switchBetweenSubmenus(newSubmenuIndex);
			activeSubmenuIndex = newSubmenuIndex;
		}
	}
};
