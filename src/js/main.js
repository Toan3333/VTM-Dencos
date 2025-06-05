import AOS from 'aos';
import lozad from 'lozad';
import { setBackgroundElement, countUpInit, ToggleItem } from './helper';
import { header } from './header';
import { swiperInit } from './swiper';
import { homepage } from './homepage';

$(document).ready(function () {
	// animejs
	homepage.init();
	setBackgroundElement();
	header.init();
	swiperInit();
	ToggleItem();
	countUpInit();
	setTimeout(() => {
		console.log('init AOS');
		AOS.init({
			offset: 100,
			once: true,
			disable: function () {
				return window.innerWidth < 768;
			},
		});
	}, 100);
	setTimeout(() => {
		console.log('refresh AOS');
		AOS.refresh();
	}, 1000);
	const $section = $('.service-detail-3');
	if ($section.length === 0) return;

	const $img = $section.find('.col-left img');
	const $content = $section.find('.col-right');

	const isImageMissing = $img.length === 0 || $.trim($img.attr('src')) === '';
	const isContentEmpty =
		$content.length === 0 || $.trim($content.text()) === '';

	if (isImageMissing && isContentEmpty) {
		$section.hide(); // Ẩn bằng jQuery
	}

	// Handle .service-3-tab-fixed

	// $(".service-3-tab-fixed .tabslet-tab a").on("click", function (e) {
	// 	e.preventDefault();
	// 	const target = $(this).attr("href"); // "#tab1" hoặc "#tab2"

	// 	// 1. Reset tất cả tab & nội dung
	// 	$(".tabslet-tab li").removeClass("active");
	// 	$(".tabslet-content").removeClass("active").hide(); // <- quan trọng!

	// 	// 2. Kích hoạt tab đã click (tab fixed)
	// 	$(this).parent().addClass("active");

	// 	// 3. Kích hoạt tab gốc trong .service-3-tab
	// 	$('.service-3-tab .tabslet-tab a[href="' + target + '"]')
	// 		.parent()
	// 		.addClass("active");

	// 	// 4. Hiện nội dung tương ứng
	// 	$(target).addClass("active").show();

	// 	// 5. Scroll nếu cần
	// 	$("html, body").animate(
	// 		{
	// 			scrollTop: $(".service-3").offset().top - 100,
	// 		},
	// 		600
	// 	);
	// });

	// $(".service-tab-fixed .tabslet-tab a").on("click", function (e) {
	// 	e.preventDefault();

	// 	const target = $(this).attr("href"); // ví dụ: #tab2

	// 	// 1. Remove active tất cả
	// 	$(".service-tab-fixed .tabslet-tab li").removeClass("active");

	// 	// 2. Add active cho tab đang click
	// 	$(this).parent().addClass("active");

	// 	// 3. Scroll mượt đến section tương ứng
	// 	if ($(target).length) {
	// 		$("html, body").animate(
	// 			{
	// 				scrollTop: $(target).offset().top - 100, // Điều chỉnh -100 nếu cần
	// 			},
	// 			600
	// 		);
	// 	}
	// });
});

const start = Date.now(); // ghi lại thời gian bắt đầu

window.addEventListener('load', function () {
	const end = Date.now(); // thời điểm load xong
	const elapsed = end - start; // thời gian tải trang (ms)
	const loader = document.querySelector('.loader-container');

	// Nếu trang load < 2s, chờ đủ 2s mới ẩn
	// Nếu trang load > 2s, ẩn ngay
	const remaining = Math.max(0, 2000 - elapsed);
	// window.dispatchEvent(new CustomEvent('pageLoaded'));
	setTimeout(() => {
		if (loader) {
			loader.classList.add('loaded');
			window.dispatchEvent(new CustomEvent('pageLoaded'));
			setTimeout(() => {
				loader.remove();
			}, 1000); // Optional fade-out
		}
		document.body.classList.add('loaded');
	}, remaining);
});

const mouseInner = document.querySelector('.tf-mouse-inner');
const mouseOuter = document.querySelector('.tf-mouse-outer');

let mouseX = 0;
let mouseY = 0;
let innerX = 0;
let innerY = 0;
let outerX = 0;
let outerY = 0;

document.addEventListener('mousemove', function (e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
	const isinteractionDom = e.target.closest('a') || e.target.closest('button');
	if (isinteractionDom) {
		mouseOuter.classList.add('active');
	} else {
		mouseOuter.classList.remove('active');
	}
});
// document.addEventListener('mouseup', function (e) {
// 	mouseOuter.classList.remove('active');
// });

// Animate
function animateCursor() {
	// Tạo hiệu ứng trễ (dấu chấm đi theo từ từ)
	innerX += (mouseX - innerX) * 0.35;
	innerY += (mouseY - innerY) * 0.35;

	outerX += (mouseX - outerX) * 0.15;
	outerY += (mouseY - outerY) * 0.15;

	mouseInner.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
	mouseOuter.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;

	requestAnimationFrame(animateCursor);
}

animateCursor();

// fancyfox popup
document.addEventListener('DOMContentLoaded', function () {
	Fancybox.bind('[data-fancybox]', {
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
