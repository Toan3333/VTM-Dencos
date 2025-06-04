import { headerSearch } from "../../plugins/ComponentsUi/HeaderSearch/HeaderSearch";
import { detectCloseElement } from "./helper";
/*==================== Header ====================*/
/**
 * @param header
 */
const vw = $(window).width();
export const header = {
	scrollActive: function () {
		const height = $("header").height();
		const isDesktop = window.innerWidth > 1024;
		const scrolledPastHeader = $(window).scrollTop() > height;

		if (isDesktop && scrolledPastHeader) {
			$("header").addClass("active");
		} else {
			$("header").removeClass("active");
		}

		$(document).ready(function () {
			const $tabFixed1 = $(".service-3-tab-fixed"); // Chọn tất cả phần tử
			const $tabFixed2 = $(".service-tab-fixed"); // Chọn phần tử đầu tiên
			const scrollHeight = 740; // Ngưỡng scroll để kích hoạt

			$(window).on("scroll", function () {
				const currentScroll = $(this).scrollTop(); // Lấy vị trí scroll hiện tại

				if (currentScroll > scrollHeight) {
					$tabFixed1.addClass("active"); // Thêm class 'active' vào tất cả phần tử
					$tabFixed2.addClass("show");
				} else {
					$tabFixed1.removeClass("active"); // Xóa class 'active'
					$tabFixed2.removeClass("show");
				}
			});
		});
	},

	mobile: function () {
		$(".header-bar").on("click", function () {
			$(this).toggleClass("active");
			$("body").toggleClass("openMenuMobile");
		});

		function isMobile() {
			return window.innerWidth <= 1024; // hoặc breakpoint bạn muốn
		}

		// Desktop: hover
		$(".menu-children [data-tab]").on("mouseenter", function () {
			if (isMobile()) return; // không chạy trên mobile

			const tabId = $(this).data("tab");

			$(".mega-dropdown .content").each(function () {
				const contentId = $(this).data("content");
				$(this).css("display", contentId === tabId ? "flex" : "none");
			});
		});

		let menuLevel = 0; // 0: chưa mở, 1: mở menu-children, 2: mở tab content

		// Mở menu chính (menu-children)
		$(".header-menu-mobile .header-menu > li.menu-item-has-children > a").on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			const $megaDropdown = $(this).siblings(".mega-dropdown");

			// Nếu đang ở level 2, không làm gì
			if (menuLevel === 2) return;

			// Toggle menu chính
			$(".mega-dropdown").not($megaDropdown).removeClass("active");
			$megaDropdown.toggleClass("active");

			// Reset level nếu đóng menu
			menuLevel = $megaDropdown.hasClass("active") ? 1 : 0;

			// Nếu đang mở menu thì reset các tab con
			if (menuLevel === 1) {
				$megaDropdown.find(".col-right, .content").removeClass("active");
				$megaDropdown.find(".menu-children li").removeClass("active");
			}
		});

		// Mở tab con trong menu (col-right + content)
		$(".menu-children li[data-tab]").on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			const $li = $(this);
			const tabId = $li.data("tab");
			const $megaDropdown = $li.closest(".mega-dropdown");

			// Active tab và content tương ứng
			$li.addClass("active").siblings().removeClass("active");
			$megaDropdown.find(".content").removeClass("active");
			$megaDropdown.find(`.content[data-content="${tabId}"]`).addClass("active");
			$megaDropdown.find(".col-right").addClass("active");

			menuLevel = 2;
		});

		// Đóng menu từng cấp
		$(".header-close").on("click", function () {
			const $activeMegaDropdown = $(".mega-dropdown.active");

			if (menuLevel === 2) {
				// Lùi từ tab → menu-children
				$activeMegaDropdown.find(".col-right, .content").removeClass("active");
				menuLevel = 1;
			} else if (menuLevel === 1) {
				// Lùi từ menu-children → đóng hoàn toàn
				$activeMegaDropdown.removeClass("active");
				menuLevel = 0;
			} else {
				// Đóng menu mobile nếu có
				$("body").removeClass("openMenuMobile");
			}
		});

		$(
			".header-menu-mobile .sub-menu, .header-menu-mobile .sub-menu-children, .header-menu-mobile .sub-menu-children-dropdown"
		).hide();

		$('.header-menu-mobile li[class*="menu-item-has-children"] > a').on("click", function (e) {
			e.preventDefault();
			$(this)
				.toggleClass("dropdown-active")
				.next()
				.slideToggle()
				.parent()
				.siblings()
				.find("a")
				.removeClass("dropdown-active")
				.next()
				.slideUp();
		});

		const $barBtn = $(".header-bar-mobile");
		const $menu = $(".header-nav-mobile");

		if ($barBtn.length && $menu.length) {
			$barBtn.on("click", function () {
				$menu.toggleClass("open");

				const $icon = $barBtn.find("i");
				$icon.toggleClass("fa-bars", !$menu.hasClass("open"));
				$icon.toggleClass("fa-times", $menu.hasClass("open"));
			});
		}

		const $searchBtns = $(".header-search-active,.header-search-mobile");
		const $searchBar = $(".search-bar-container");
		const $searchMobileClose = $(".search-mobile-close");

		if ($searchBar.length && $searchBtns.length) {
			$searchBtns.on("click", function () {
				toggleSearchBar($(this));
			});
		}

		if ($searchMobileClose.length) {
			$searchMobileClose.on("click", closeSearchBar);
		}

		$searchBar.on("click", function (e) {
			if ($(e.target).is($searchBar)) closeSearchBar();
		});

		function toggleSearchBar($btn) {
			$searchBar.toggleClass("active");
			$("body").toggleClass("search-open");

			const $icon = $btn.find("i");
			$icon.toggleClass("fa-magnifying-glass", !$searchBar.hasClass("active"));
			$icon.toggleClass("fa-times", $searchBar.hasClass("active"));
		}

		function closeSearchBar() {
			$searchBar.removeClass("active");
			$("body").removeClass("search-open");
			resetSearchIcons();
		}

		function resetSearchIcons() {
			$searchBtns.each(function () {
				const $icon = $(this).find("i");
				$icon.removeClass("fa-times");
				$icon.addClass("fa-magnifying-glass");
			});
		}
	},

	// initVariable: function () {
	// 	const $header = $("header.header"); // Chắc chắn đúng selector
	// 	if ($header.length) {
	// 		const height = $header.outerHeight(); // outerHeight có padding & border

	// 		document.documentElement.style.setProperty("--header-height", `${height}px`);
	// 	}

	// },

	initVariable: function () {
		const $header = document.querySelector("header");
		if (!$header) return;

		// Hàm cập nhật chiều cao header
		function updateHeaderHeight() {
			const height = $header.offsetHeight;
			document.documentElement.style.setProperty("--header-height", `${height}px`);
		}

		// Cập nhật ban đầu
		updateHeaderHeight();

		// Theo dõi mọi thay đổi chiều cao của header
		const ro = new ResizeObserver(updateHeaderHeight);
		ro.observe($header);

		// Phòng trường hợp ảnh hoặc font chưa load xong
		window.addEventListener("load", () => {
			setTimeout(updateHeaderHeight, 100);
		});
	},

	init: function () {
		headerSearch();
		header.scrollActive();
		header.mobile();
		header.initVariable();
	},
};
document.addEventListener(
	"scroll",
	function (e) {
		header.scrollActive();
	},
	true
);
