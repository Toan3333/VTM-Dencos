import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
/**
 * @param swiperInit
 */
export function swiperInit() {
	swiperStaff();
	swiperProductSimilar();
	swiperSingleProject();

	//   new Swiper(".section-home-banner .swiper", {
	//     slidesPerView: 1,
	//     spaceBetween: 0,
	//     speed: 1000,
	//     loop: true,
	//     effect: "fade",
	//     autoplay: {
	//       delay: 3500,
	//     },
	//     modules: [Pagination, Navigation, Autoplay, EffectFade],
	//     pagination: {
	//       el: ".section-home-banner .swiper-pagination",
	//       clickable: true,
	//       renderBullet: function (index, className) {
	//         const slide = this.slides[index];
	//         const title = slide.getAttribute("data-title") || `Slide ${index + 1}`;
	//         return `<span class="${className}">${title}</span>`;
	//       },
	//     },
	//     navigation: {
	//       nextEl: ".section-home-banner .btn-next",
	//       prevEl: ".section-home-banner .btn-prev",
	//     },
	//   });
	//   // Reuseable Swiper
	//   $(".swiper-cols-1 .swiper").each(function () {
	//     new Swiper(this, {
	//       slidesPerView: 1,
	//       spaceBetween: 20,
	//       modules: [Navigation],
	//       navigation: {
	//         nextEl: $(this).closest(".swiper-cols-1").find(".btn-next")[0],
	//         prevEl: $(this).closest(".swiper-cols-1").find(".btn-prev")[0],
	//       },
	//     });
	//   });
	//   $(".swiper-cols-2 .swiper").each(function () {
	//     new Swiper(this, {
	//       slidesPerView: 1,
	//       spaceBetween: 20,
	//       modules: [Navigation],
	//       navigation: {
	//         nextEl: $(this).closest(".swiper-cols-1").find(".btn-next")[0],
	//         prevEl: $(this).closest(".swiper-cols-1").find(".btn-prev")[0],
	//       },
	//       breakpoints: {
	//         768: {
	//           slidesPerView: 2,
	//           spaceBetween: 40,
	//         },
	//       },
	//     });
	//   });
	//   $(".swiper-cols-3 .swiper").each(function () {
	//     new Swiper(this, {
	//       slidesPerView: 1,
	//       spaceBetween: 20,
	//       modules: [Navigation],
	//       navigation: {
	//         nextEl: $(this).closest(".swiper-cols-3").find(".btn-next")[0],
	//         prevEl: $(this).closest(".swiper-cols-3").find(".btn-prev")[0],
	//       },
	//       breakpoints: {
	//         768: {
	//           slidesPerView: 2,
	//         },
	//         1200: {
	//           slidesPerView: 3,
	//           spaceBetween: 40,
	//         },
	//       },
	//     });
	//   });
	//   $(".swiper-cols-4 .swiper").each(function () {
	//     new Swiper(this, {
	//       slidesPerView: 1,
	//       spaceBetween: 20,
	//       modules: [Navigation],
	//       navigation: {
	//         nextEl: $(this).closest(".swiper-cols-4").find(".btn-next")[0],
	//         prevEl: $(this).closest(".swiper-cols-4").find(".btn-prev")[0],
	//       },
	//       breakpoints: {
	//         768: {
	//           slidesPerView: 3,
	//         },
	//         1200: {
	//           slidesPerView: 4,
	//           spaceBetween: 40,
	//         },
	//       },
	//     });
	//   });
}
function swiperSingleProject() {
	const swiperSingleProject = new Swiper(".swiper-single-project .swiper", {
		modules: [Autoplay, Navigation],
		spaceBetween: 12,
		slidesPerView: 1.25,
		freeMode: true,
		initialSlide: 1,
		loop: true,
		centeredSlides: true,
		breakpoints: {
			1024: {
				slidesPerView: 1,
				centeredSlides: false,
				spaceBetween: 40,
			},
		},
	});
}

function swiperStaff() {
	const swiper = new Swiper(".swiper-staff", {
		spaceBetween: 20, // Khoảng cách giữa các slide
		slidesPerView: 2,
		modules: [Autoplay, Navigation],
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		speed: 2000,
		navigation: {
			nextEl: ".custom-next",
			prevEl: ".custom-prev",
		},
		breakpoints: {
			640: {
				slidesPerView: 1, // Số slide trên mỗi hàng ở kích thước màn hình nhỏ
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2, // Số slide trên mỗi hàng ở kích thước màn hình trung bình
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 3, // Số slide trên mỗi hàng ở kích thước màn hình lớn
				spaceBetween: 40,
			},
		},
	});
}

function swiperProductSimilar() {
	const swiper = new Swiper(".product-similar-swiper", {
		spaceBetween: 20, // Khoảng cách giữa các slide
		slidesPerView: 2,
		modules: [Autoplay, Navigation],
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		speed: 2000,
		navigation: {
			nextEl: ".custom-next",
			prevEl: ".custom-prev",
		},
		breakpoints: {
			640: {
				slidesPerView: 1, // Số slide trên mỗi hàng ở kích thước màn hình nhỏ
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2, // Số slide trên mỗi hàng ở kích thước màn hình trung bình
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 4, // Số slide trên mỗi hàng ở kích thước màn hình lớn
				spaceBetween: 40,
			},
		},
	});
}
