import { headerSearch } from "../../plugins/ComponentsUi/HeaderSearch/HeaderSearch";
import { detectCloseElement } from "./helper";
/*==================== Header ====================*/
/**
 * @param header
 */
const vw = $(window).width();
export const header = {
	scrollActive: function () {
		let height = $("header").height();
		if ($(window).scrollTop() > height) {
			$("header").addClass("active");
		} else {
			$("header").removeClass("active");
		}
	},
	mobile: function () {
		$(".header-hambuger").on("click", function () {
			$(this).toggleClass("active");
			$("body").toggleClass("isOpenMenu");
		});
		$('.header-nav-mobile li[class*="menu-item-has-children"] > a').on("click", function (e) {
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

		const $searchBtns = $(".header-search, .header-search-mobile");
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
	initVariable: function () {
		const $header = $("header.header"); // Chắc chắn đúng selector
		if ($header.length) {
			const height = $header.outerHeight(); // outerHeight có padding & border
			console.log("Header height:", height); // Debug cho chắc
			document.documentElement.style.setProperty("--header-height", `${height}px`);
		}
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
