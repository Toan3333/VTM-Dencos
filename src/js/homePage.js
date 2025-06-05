import { animate, createSpring, stagger, utils } from 'animejs';
import { SplitText } from 'gsap/SplitText';

function rem(value) {
	return `${(value / 1920) * 100}rem`;
}
const sections = document.querySelectorAll('section');

const DURATION = 1000;

export const homepage = {
	sectionTitle: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0.5) {
						const title = entry.target;

						const splitText = SplitText.create(title, {
							type: 'lines,words',
						});
						title.style.opacity = 1;
						const { lines } = splitText;
						lines.forEach((line, lineIndex) => {
							line.style.overflow = 'hidden';
							Array.from(line.children).forEach((child, childIndex) => {
								animate(child, {
									opacity: [0, 1],
									y: ['100%', 0],
									duration: DURATION,
									ease: 'outQuart',
									delay: lineIndex * 200,
								});
							});
						});

						obs.unobserve(title);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		sections.forEach(section => {
			const title =
				section.querySelector('.title-64') ||
				section.querySelector('.title-48');
			if (!title) return;
			title.style.opacity = 0;
			window.addEventListener('pageLoaded', () => {
				observer.observe(title);
			});
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
							x: [rem(40), 0],
							duration: DURATION,
							ease: 'outQuart',
							delay: item.dataset.index * 150,
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
						type: 'lines,words',
					});
					description.style.opacity = 1;
					const { lines } = splitText;
					lines.forEach((line, lineIndex) => {
						line.style.overflow = 'hidden';
						Array.from(line.children).forEach((child, childIndex) => {
							animate(child, {
								opacity: [0, 1],
								y: ['100%', 0],
								duration: DURATION,
								ease: 'outQuart',
								delay: lineIndex * 300,
							});
						});
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
			window.addEventListener('pageLoaded', () => {
				observer.observe(description);
			});
		});
	},
	sectionImages: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0.5) {
						const image = entry.target.querySelector('img');
						const index = image.dataset.index || 0;
						const sectionClass = image.dataset.sectionClass;
						let isSpecialSection = false;
						if (sectionClass) {
							const classes = sectionClass.split(' ');
							if (classes.includes('home-2') && !image.closest('.home-2-svg')) {
								isSpecialSection = true;
							}
						}
						if (isSpecialSection) {
							const { left } = image.getBoundingClientRect();
							const position = window.innerWidth / 2 > left ? 'left' : 'right';
							animate(image, {
								scale: [1.2, 1],
								opacity: [0, 1],
								x: [position === 'left' ? '-100%' : '100%', 0],
								ease: 'outQuart',
								duration: DURATION + 600,
								delay: index * 400,
							});
						} else {
							animate(image, {
								scale: [1.2, 1],
								opacity: [0, 1],
								ease: 'outQuart',
								duration: DURATION + 300,
								delay: index * 100,
							});
						}
						obs.unobserve(image.parentElement);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);
		sections.forEach(section => {
			const images = section.querySelectorAll('img');
			images.forEach((image, index) => {
				const { objectFit } = window.getComputedStyle(image);
				const isSpecialSection =
					// section.closest('.home-1') ||
					section.closest('.home-6') || section.closest('.home-12');
				if (isSpecialSection) return;
				if (!objectFit || objectFit === 'fill') return;
				image.classList.add('js-animate-image');
				image.dataset.index = index;
				image.dataset.sectionClass = section.classList;
				utils.set(image, {
					opacity: 0,
				});
				const imageWrapper = image.parentElement;
				window.addEventListener('pageLoaded', () => {
					observer.observe(imageWrapper);
				});
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
							// y: [45, 0],
							duration: DURATION,
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
				window.addEventListener('pageLoaded', () => {
					observer.observe(wrap);
				});
			});
		});
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
