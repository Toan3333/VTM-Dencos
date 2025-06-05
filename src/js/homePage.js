import {
	animate,
	createSpring,
	onScroll,
	stagger,
	utils,
	waapi,
} from 'animejs';
import { SplitText } from 'gsap/SplitText';

function rem(value) {
	return `${(value / 1920) * 100}rem`;
}
const sections = document.querySelectorAll('section');

export const homepage = {
	sectionTitle: () => {
		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const title = entry.target;
					const position = window.getComputedStyle(title).textAlign;
					let animateFrom = 'first';
					if (position === 'center') {
						animateFrom = 'center';
					}
					if (position === 'right') {
						animateFrom = 'last';
					}

					const splitText = SplitText.create(title, {
						type: 'chars,words',
					});
					title.style.opacity = 1;
					const { chars, words } = splitText;
					animate(chars, {
						opacity: [0, 1],
						y: [rem(20), 0],
						scale: [0.9, 1],
						duration: 500,
						ease: createSpring({
							stiffness: 150,
						}),
						delay: stagger(25, {
							from: animateFrom,
						}),
					});
					obs.unobserve(title);
				}
			});
		});

		sections.forEach(section => {
			const title =
				section.querySelector('.title-64') ||
				section.querySelector('.title-48');
			if (!title) return;
			title.style.opacity = 0;
			observer.observe(title);
		});
	},
	sectionItem: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0.5) {
						const item = entry.target;
						animate(item, {
							opacity: 1,
							y: [rem(40), 0],
							duration: 800,
							ease: createSpring({
								stiffness: 150,
							}),
							delay: item.dataset.index * 100,
						});
						obs.unobserve(item);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		sections.forEach(section => {
			const items = section.querySelectorAll('.item');
			if (!items) return;
			const isSpecialSection = section.closest('.home-6');
			if (isSpecialSection) return;
			items.forEach((item, index) => {
				item.style.opacity = 0;
				item.dataset.index = index;
				observer.observe(item);
			});
		});
	},
	sectionDescription: () => {
		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const description = entry.target;
					const splitText = SplitText.create(description, {
						type: 'words,chars',
					});
					description.style.opacity = 1;
					description.style.overflow = 'hidden';
					const { chars, words } = splitText;
					animate(words, {
						opacity: [0, 1],
						y: ['100%', 0],
						duration: 900,
						ease: createSpring({
							stiffness: 150,
						}),
						delay: stagger(25),
					});
					obs.unobserve(description);
				}
			});
		});

		sections.forEach(section => {
			const description = section.querySelector('.desc');
			//  || section.querySelector('.title-48');
			if (!description) return;
			description.style.opacity = 0;
			observer.observe(description);
		});
	},
	sectionImages: () => {
		const SCROLL_PERCENTAGE = 20;
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0.5) {
						const image = entry.target;
						animate(image, {
							opacity: 1,
						});
						animate(image, {
							top: [`-${SCROLL_PERCENTAGE}%`, `${SCROLL_PERCENTAGE}%`],
							ease: 'linear',
							autoplay: onScroll({
								// debug: true,
								sync: 1,
							}),
						});
					}
				});
			},
			{
				threshold: 0.5,
			}
		);
		sections.forEach(section => {
			const images = section.querySelectorAll('img');
			images.forEach(image => {
				const { objectFit } = window.getComputedStyle(image);
				const isSpecialSection =
					section.closest('.home-1') ||
					section.closest('.home-6') ||
					section.closest('.home-12');
				if (isSpecialSection) return;
				if (!objectFit || objectFit === 'fill') return;
				image.classList.add('js-animate-image');
				utils.set(image, {
					willChange: 'top',
					height: `${SCROLL_PERCENTAGE + 100}%`,
					top: `-${SCROLL_PERCENTAGE}%`,
					opacity: 0,
				});
				observer.observe(image);
			});
		});
	},
	sectionButton: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const wrap = entry.target;
						console.log('🟩 ~ wrap:', wrap.textContent);
						animate(wrap, {
							opacity: [0, 1],
							y: [45, 0],
							duration: 800,
							delay: 100,
						});
						obs.unobserve(wrap); // Only animate once
					}
				});
			},
			{
				threshold: 0.2, // Adjust as needed (20% visible)
			}
		);

		sections.forEach(section => {
			const buttons = section.querySelectorAll('.button-primary');
			const wrappers = [];

			buttons.forEach(button => {
				const wrap = document.createElement('div');
				wrap.classList.add('button-wrapper');

				const parent = button.parentNode;

				parent.insertBefore(wrap, button);

				wrap.appendChild(button);

				wrap.style.overflow = 'hidden';
				wrappers.push(wrap);
			});

			if (wrappers.length === 0) return;

			// Observe each wrapper for intersection
			wrappers.forEach(wrap => {
				observer.observe(wrap);
			});
		});
	},
	home_1: () => {
		//
	},

	init: () => {
		//
		if (
			document.body.classList.contains('home') &&
			window.innerWidth > 1200 &&
			sections.length > 0
		) {
			homepage.sectionTitle();
			homepage.sectionItem();
			homepage.sectionDescription();
			homepage.sectionImages();
			homepage.sectionButton();
		}
	},
};
