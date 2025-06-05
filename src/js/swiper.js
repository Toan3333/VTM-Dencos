import Swiper from 'swiper';
import {
	Autoplay,
	Navigation,
	EffectFade,
	Pagination,
	EffectCoverflow,
	Grid,
} from 'swiper/modules';
/**
 * @param swiperInit
 */
export function swiperInit() {
	swiperBanner();
	swiperHomeBannerMobile();
	swiperHome5();
	swiperHome4();
	swiperHome6();
	swiperHome7();
	swiperHome8();
	swiperHome9();
	swiperHome10();
	swiperAbout6();
	swiperServiceDetail4();
	swiperServiceDetail5();
	swiperServiceDetail6();
	swiperServiceDetailOther();
	swiperOffer();
	swiperOfferOther();
	swiperNewsOther();
	swiperPartner();
}

function swiperBanner() {
	const swiper = new Swiper('.swiper-home-banner', {
		slidesPerView: 1,
		modules: [Autoplay, Navigation, EffectFade],
		loop: true,
		effect: 'fade',
		autoplay: {
			delay: 4500,
			disableOnInteraction: false,
		},
		speed: 1500,
		navigation: {
			nextEl: '.home-1 .btn-next',
			prevEl: '.home-1 .btn-prev',
		},
	});
	swiper.autoplay.stop();
	window.swiperBanner = swiper;
}

function swiperHomeBannerMobile() {
	const swiperHomeBannerMobile = new Swiper('.swiper-home-banner-mobile', {
		modules: [Autoplay, Navigation, EffectFade],
		slidesPerView: 1,
		speed: 1200,
		loop: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		autoplay: {
			delay: 3500,
		},
		navigation: {
			nextEl: '.home-1-mobile .btn-next',
			prevEl: '.home-1-mobile .btn-prev',
		},
	});
}

function swiperHome5() {
	const swiper = new Swiper('.home-5 .swiper', {
		modules: [Autoplay, Navigation, Grid],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		// autoplay: {
		// 	delay: 4500,
		// },

		navigation: {
			nextEl: '.home-5 .btn-next',
			prevEl: '.home-5 .btn-prev',
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
				grid: {
					rows: 2, // Điều này sẽ tạo ra 2 hàng
					fill: 'row',
				},
			},
			1920: {
				slidesPerView: 3,
				spaceBetween: 40,
				grid: {
					rows: 2, // Điều này sẽ tạo ra 2 hàng
					fill: 'row',
				},
			},
		},
	});
}

function swiperHome10() {
	const swiper = new Swiper('.home-10 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.home-5 .btn-next',
			prevEl: '.home-5 .btn-prev',
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1920: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
		},
	});
}

function swiperHome4() {
	// Kiểm tra phần tử chính
	const home4El = document.querySelector('.home-4');
	if (!home4El) return;

	// Kiểm tra phần tử Swiper và navigation buttons
	const swiperContainer = home4El.querySelector('.swiper');
	const btnNext = home4El.querySelector('.btn-next');
	const btnPrev = home4El.querySelector('.btn-prev');

	if (!swiperContainer || !btnNext || !btnPrev) return;

	const swiper = new Swiper(swiperContainer, {
		slidesPerView: 1,
		spaceBetween: 16,
		modules: [Autoplay, Navigation],
		rewind: true,
		speed: 1500,
		autoplay: {
			delay: 3500,
		},
		navigation: {
			nextEl: btnNext,
			prevEl: btnPrev,
		},
		on: {
			init: updateHome4State,
			slideChange: updateHome4State,
		},
	});

	function updateHome4State(swiperInstance) {
		const realIndex = swiperInstance.realIndex + 1;
		const totalSlides = swiperInstance.slides.length;

		const numberEl =
			swiperInstance.slides[swiperInstance.realIndex]?.querySelector('.number');
		if (numberEl) {
			numberEl.textContent = `${String(realIndex).padStart(2, '0')}/${String(
				totalSlides
			).padStart(2, '0')}`;
		}

		const colRightImages = home4El.querySelectorAll('.col-right .image');
		colRightImages.forEach(img => {
			img.classList.remove('active');
			if (img.dataset.id == realIndex) {
				img.classList.add('active');
			}
		});
	}
}

function swiperHome6() {
	const swiper = new Swiper('.home-6 .swiper', {
		slidesPerView: 1,
		spaceBetween: 32,
		modules: [Autoplay, Navigation, Pagination],
		loop: true,
		speed: 1500,

		pagination: {
			el: '.home-6 .pagination',
			clickable: true,
		},
		// autoplay: {
		// 	delay: 3500,
		// 	disableOnInteraction: false,
		// },
		navigation: {
			nextEl: '.home-6 .btn-next',
			prevEl: '.home-6 .btn-prev',
		},

		// ✨ Thêm xử lý khi slide thay đổi
		on: {
			slideChange: function () {
				const realIndex = this.realIndex; // Dùng realIndex do loop: true
				const slides = this.slides;
				const activeSlide = slides[this.activeIndex];
				const activeId = activeSlide.getAttribute('data-id');

				document.querySelectorAll('.home-6-image').forEach(img => {
					img.style.display =
						img.getAttribute('data-id') === activeId ? 'block' : 'none';
				});
			},
		},
	});

	// ✨ Ẩn ảnh khác, chỉ hiện ảnh đầu
	document.addEventListener('DOMContentLoaded', () => {
		const images = document.querySelectorAll('.home-6-image');
		images.forEach((img, index) => {
			img.style.display = index === 0 ? 'block' : 'none';
		});
	});
}

function swiperHome7() {
	const swiper = new Swiper('.home-7 .swiper', {
		modules: [Autoplay, Navigation, EffectCoverflow],
		slidesPerView: 'auto',
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 1,
			depth: 48,
			modifier: 7,
			slideShadows: false,
		},
		rewind: true,
		speed: 1200,
		initialSlide: 1,
		centeredSlides: true,
		navigation: {
			nextEl: '.home-7 .btn-next',
			prevEl: '.home-7 .btn-prev',
		},
	});
}

function swiperHome8() {
	const swiper = new Swiper('.home-8 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,

		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.home-8 .btn-next',
			prevEl: '.home-8 .btn-prev',
		},
	});
}

function swiperHome9() {
	const swiper = new Swiper('.home-9 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		speed: 1500,
		rewind: true,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.home-9 .btn-next',
			prevEl: '.home-9 .btn-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
		},
		on: {
			init(swiper) {
				updateHome9Number(swiper);
			},
			slideChange(swiper) {
				updateHome9Number(swiper);
			},
			resize(swiper) {
				updateHome9Number(swiper); // Cập nhật khi thay đổi kích thước màn hình
			},
		},
	});
}

function updateHome9Number(swiper) {
	const numberEl = document.querySelector('.home-9 .number');
	if (!numberEl) return;

	// Lấy slides thực (không tính clone)
	const slides = Array.from(swiper.slides).filter(
		el => !el.classList.contains('swiper-slide-duplicate')
	);
	const totalSlides = slides.length;

	// Lấy số slide hiển thị đồng thời (tính cả responsive)
	const perView = swiper.params.slidesPerView;

	// Tính tổng số trang
	const total = Math.ceil(totalSlides / perView);

	// Xử lý đặc biệt cho chế độ rewind
	let current;
	if (swiper.params.rewind) {
		if (swiper.isEnd) {
			// Khi ở cuối và rewind về đầu
			current = total;
		} else if (swiper.isBeginning) {
			// Khi ở đầu và rewind về cuối
			current = 1;
		} else {
			// Bình thường
			current = Math.min(Math.floor(swiper.activeIndex / perView) + 1, total);
		}
	} else {
		// Chế độ không rewind
		current = Math.min(Math.floor(swiper.activeIndex / perView) + 1, total);
	}

	// Hiển thị (dạng 01/03)
	numberEl.textContent = `${String(current).padStart(2, '0')}/${String(
		total
	).padStart(2, '0')}`;
}

function swiperServiceDetail4() {
	const container = document.querySelector('.service-detail-4 .swiper');
	if (!container) return;

	const slides = container.querySelectorAll('.swiper-slide');
	const totalSlides = slides.length;

	if (totalSlides === 0) return; // Không có gì để hiển thị

	const swiper = new Swiper(container, {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		rewind: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.service-detail-4 .btn-next',
			prevEl: '.service-detail-4 .btn-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: Math.min(2, totalSlides),
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: Math.min(4, totalSlides),
				spaceBetween: 20,
			},
			1920: {
				slidesPerView: Math.min(4, totalSlides), // Nếu chỉ có 3 bài → dùng 3
				spaceBetween: 40,
			},
		},
	});
}

function swiperServiceDetail5() {
	const swiper = new Swiper('.service-detail-5 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		rewind: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		on: {
			slideChange: function () {
				updateActive(this.realIndex);
			},
		},
	});

	const circles = document.querySelectorAll('.service-detail-5 .circle');
	const images = document.querySelectorAll(
		'.service-detail-5 .col-right .image'
	);

	// click vào .circle
	circles.forEach((circle, index) => {
		circle.addEventListener('click', () => {
			swiper.slideTo(index);
			updateActive(index);
		});
	});

	function updateActive(index) {
		// update circle active
		circles.forEach((circle, i) => {
			circle.classList.toggle('active', i === index);
		});
		// update image active
		images.forEach((img, i) => {
			img.classList.toggle('active', i === index);
		});
	}

	// Khởi tạo trạng thái ban đầu
	updateActive(swiper.realIndex);
}

function swiperServiceDetail6() {
	const swiper = new Swiper('.service-detail-6 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 24,
		loop: true,
		centeredSlides: false,

		rewind: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.service-detail-6 .btn-next',
			prevEl: '.service-detail-6 .btn-prev',
		},

		breakpoints: {
			768: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: 'auto',
				centeredSlides: true,
				initialSlide: 1,
				// spaceBetween: 40,
			},
		},
	});
}

function swiperServiceDetailOther() {
	const swiper = new Swiper('.service-detail-7 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.service-detail-7 .btn-next',
			prevEl: '.service-detail-7 .btn-prev',
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1920: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	});
}

function swiperOffer() {
	const swiper = new Swiper('.offer-wrapper .swiper', {
		modules: [Autoplay, EffectFade],
		slidesPerView: 1,
		effect: 'fade',
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
	});
}

function swiperOfferOther() {
	const swiper = new Swiper('.offer-detail-3 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.offer-detail-3 .btn-next',
			prevEl: '.offer-detail-3 .btn-prev',
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1920: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	});
}

function swiperAbout6() {
	const swiper = new Swiper('.about-6 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.about-6 .btn-next',
			prevEl: '.about-6 .btn-prev',
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			1920: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
		},
	});
}

function swiperNewsOther() {
	const swiper = new Swiper('.news-detail-3 .swiper', {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: '.news-detail-3 .btn-next',
			prevEl: '.news-detail-3 .btn-prev',
		},
		breakpoints: {
			768: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1920: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	});
}

function swiperPartner() {
	const swiper = new Swiper('.partner .swiper', {
		modules: [Autoplay],
		slidesPerView: 2,
		spaceBetween: 20,
		speed: 10000,
		a11y: false,
		loop: true,
		allowTouchMove: false,
		autoplay: {
			delay: 0, // chạy liên tục
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 6,
				spaceBetween: 60,
			},
		},
	});
}
