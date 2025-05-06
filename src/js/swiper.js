import Swiper from "swiper";
import { Autoplay, Navigation, EffectFade, Pagination, EffectCoverflow } from "swiper/modules";
/**
 * @param swiperInit
 */
export function swiperInit() {
	swiperBanner();
	swiperHomeBannerMobile();
	swiperHome4();
	swiperHome6();
	swiperHome7();
	swiperHome8();
	swiperHome9();
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
	const swiper = new Swiper(".swiper-home-banner", {
		slidesPerView: 1,
		modules: [Autoplay, Navigation, EffectFade],
		loop: true,
		effect: "fade",
		autoplay: {
			delay: 4500,
			disableOnInteraction: false,
		},
		speed: 1500,
		navigation: {
			nextEl: ".home-1 .btn-next",
			prevEl: ".home-1 .btn-prev",
		},
	});
}

function swiperHomeBannerMobile() {
	const swiperHomeBannerMobile = new Swiper(".swiper-home-banner-mobile", {
		modules: [Autoplay, Navigation, EffectFade],
		slidesPerView: 1,
		speed: 1200,
		loop: true,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		autoplay: {
			delay: 3500,
		},
		navigation: {
			nextEl: ".home-1-mobile .btn-next",
			prevEl: ".home-1-mobile .btn-prev",
		},
	});
}

function swiperHome4() {
	const swiper = new Swiper(".home-4 .swiper", {
		slidesPerView: 1,
		spaceBetween: 16,
		modules: [Autoplay, Navigation],
		loop: false, // Để đảm bảo tính đúng số slide
		speed: 1500,
		autoplay: {
			delay: 3500,
		},
		navigation: {
			nextEl: ".home-4 .btn-next",
			prevEl: ".home-4 .btn-prev",
		},
		on: {
			init: updateHome4State,
			slideChange: updateHome4State,
		},
	});

	function updateHome4State(swiperInstance) {
		const realIndex = swiperInstance.realIndex + 1; // Slide bắt đầu từ 1
		const totalSlides = swiperInstance.slides.length;

		const numberEl = swiperInstance.slides[swiperInstance.realIndex].querySelector(".number"); // Lấy phần tử số của slide hiện tại

		// Cập nhật phần tử .number với đúng số thứ tự
		if (numberEl) {
			numberEl.textContent = `${String(realIndex).padStart(2, "0")}/${String(totalSlides).padStart(
				2,
				"0"
			)}`;
		}

		// Cập nhật ảnh trong .col-right dựa theo slide hiện tại
		const colRightImages = document.querySelectorAll(".home-4 .col-right .image");
		colRightImages.forEach((img) => {
			img.classList.remove("active");
			if (img.dataset.id == realIndex) {
				img.classList.add("active");
			}
		});
	}
}

function swiperHome6() {
	const swiper = new Swiper(".home-6 .swiper", {
		slidesPerView: 1,
		spaceBetween: 16,
		modules: [Autoplay, Navigation, Pagination],
		loop: true, // Để đảm bảo tính đúng số slide
		speed: 1500,

		pagination: {
			el: ".home-6 .pagination",
			clickable: true,
		},
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".home-6 .btn-next",
			prevEl: ".home-6 .btn-prev",
		},
	});
}

function swiperHome7() {
	const swiper = new Swiper(".home-7 .swiper", {
		modules: [Autoplay, Navigation, EffectCoverflow],
		slidesPerView: "auto",

		effect: "coverflow",
		coverflowEffect: {
			rotate: 0,
			stretch: 1,
			depth: 48,
			modifier: 7,
			slideShadows: false,
		},
		loop: true,
		speed: 1000,

		centeredSlides: true,
		navigation: {
			nextEl: ".home-7 .btn-next",
			prevEl: ".home-7 .btn-prev",
		},
	});
}

function swiperHome8() {
	const swiper = new Swiper(".home-8 .swiper", {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,

		loop: true,
		speed: 1500,
		// autoplay: {
		// 	delay: 4500,
		// },
		navigation: {
			nextEl: ".home-8 .btn-next",
			prevEl: ".home-8 .btn-prev",
		},
	});
}

function swiperHome9() {
	const swiper = new Swiper(".home-9 .swiper", {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		rewind: true,
		speed: 1500,
		// autoplay: {
		// 	delay: 4500,
		// },
		navigation: {
			nextEl: ".home-9 .btn-next",
			prevEl: ".home-9 .btn-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 3.7,
				spaceBetween: 24,
			},
		},
	});
}

function swiperServiceDetail4() {
	const swiper = new Swiper(".service-detail-4 .swiper", {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		rewind: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: ".service-detail-4 .btn-next",
			prevEl: ".service-detail-4 .btn-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1920: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
		},
	});
}

function swiperServiceDetail5() {
	const swiper = new Swiper(".service-detail-5 .swiper", {
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

	const circles = document.querySelectorAll(".service-detail-5 .circle");
	const images = document.querySelectorAll(".service-detail-5 .col-right .image");

	// click vào .circle
	circles.forEach((circle, index) => {
		circle.addEventListener("click", () => {
			swiper.slideTo(index);
			updateActive(index);
		});
	});

	function updateActive(index) {
		// update circle active
		circles.forEach((circle, i) => {
			circle.classList.toggle("active", i === index);
		});
		// update image active
		images.forEach((img, i) => {
			img.classList.toggle("active", i === index);
		});
	}

	// Khởi tạo trạng thái ban đầu
	updateActive(swiper.realIndex);
}

function swiperServiceDetail6() {
	const swiper = new Swiper(".service-detail-6 .swiper", {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 40,
		loop: true,
		centeredSlides: true,
		initialSlide: 1,
		// rewind: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: ".service-detail-6 .btn-next",
			prevEl: ".service-detail-6 .btn-prev",
		},

		breakpoints: {
			768: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: "auto",
				// spaceBetween: 40,
			},
		},
	});
}

function swiperServiceDetailOther() {
	const swiper = new Swiper(".service-detail-7 .swiper", {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: ".service-detail-7 .btn-next",
			prevEl: ".service-detail-7 .btn-prev",
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
	const swiper = new Swiper(".offer-wrapper .swiper", {
		modules: [Autoplay, EffectFade],
		slidesPerView: 1,
		effect: "fade",
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
	});
}

function swiperOfferOther() {
	const swiper = new Swiper(".offer-detail-3 .swiper", {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: ".offer-detail-3 .btn-next",
			prevEl: ".offer-detail-3 .btn-prev",
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

function swiperNewsOther() {
	const swiper = new Swiper(".news-detail-3 .swiper", {
		modules: [Autoplay, Navigation],
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
		},
		navigation: {
			nextEl: ".news-detail-3 .btn-next",
			prevEl: ".news-detail-3 .btn-prev",
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
	const swiper = new Swiper(".partner .swiper", {
		modules: [Autoplay],
		slidesPerView: 2,
		spaceBetween: 20,
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 4500,
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
