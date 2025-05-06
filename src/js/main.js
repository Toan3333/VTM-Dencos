import AOS from "aos";
import lozad from "lozad";
import {
	setBackgroundElement,
	detectCloseElement,
	buttonToTop,
	clickScrollToDiv,
	appendCaptchaASP,
	countUpInit,
	ToggleItem,
} from "./helper";
import { header } from "./header";
import { swiperInit } from "./swiper";

$(document).ready(function () {
	setBackgroundElement();
	header.init();
	swiperInit();
	ToggleItem();
	countUpInit();

	$(".service-3-tab-fixed .tabslet-tab a").on("click", function (e) {
		e.preventDefault();
		const target = $(this).attr("href"); // "#tab1" hoặc "#tab2"

		// 1. Reset tất cả tab & nội dung
		$(".tabslet-tab li").removeClass("active");
		$(".tabslet-content").removeClass("active").hide(); // <- quan trọng!

		// 2. Kích hoạt tab đã click (tab fixed)
		$(this).parent().addClass("active");

		// 3. Kích hoạt tab gốc trong .service-3-tab
		$('.service-3-tab .tabslet-tab a[href="' + target + '"]')
			.parent()
			.addClass("active");

		// 4. Hiện nội dung tương ứng
		$(target).addClass("active").show();

		// 5. Scroll nếu cần
		$("html, body").animate(
			{
				scrollTop: $(".service-3").offset().top - 100,
			},
			600
		);
	});

	$(".service-tab-fixed .tabslet-tab a").on("click", function (e) {
		e.preventDefault();

		const target = $(this).attr("href"); // ví dụ: #tab2

		// 1. Remove active tất cả
		$(".service-tab-fixed .tabslet-tab li").removeClass("active");

		// 2. Add active cho tab đang click
		$(this).parent().addClass("active");

		// 3. Scroll mượt đến section tương ứng
		if ($(target).length) {
			$("html, body").animate(
				{
					scrollTop: $(target).offset().top - 100, // Điều chỉnh -100 nếu cần
				},
				600
			);
		}
	});
});

// fancyfox popup
document.addEventListener("DOMContentLoaded", function () {
	Fancybox.bind("[data-fancybox]", {
		dragToClose: false,
		backdropClick: false,
		template: {
			closeButton:
				'<button class="fancybox-button fancybox-button--close" title="Close"><i class="fa-duotone fa-solid fa-xmark"></i></button>',
		},
	});
});

/*==================== Aos Init ====================*/
AOS.init({
	offset: 100,
});
/*==================== Lazyload JS ====================*/
const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();
