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
	},

	mobile: function () {
		$(".header-bar").on("click", function () {
			$(this).toggleClass("active");
			$("body").toggleClass("openMenuMobile");
		});

		$(".menu-children [data-tab]").on("mouseenter", function () {
			const tabId = $(this).data("tab");

			$(".mega-dropdown .content").each(function () {
				const contentId = $(this).data("content");
				$(this).css("display", contentId === tabId ? "flex" : "none");
			});
		});

		if (window.matchMedia("(max-width: 1023.98px)").matches) {
			// Đưa menu vào container mobile
			$(".header-right-mobile .header-menu").appendTo(".header-menu-mobile");

			// --- MỞ CẤP 1 ---
			// --- MỞ CẤP 1 ---
			$(".header-menu-mobile").on(
				"click",
				".menu-item-has-children > .wrap-toggle > .fa-chevron-right",
				function (e) {
					e.preventDefault();

					const $menuItem = $(this).closest("li.menu-item-has-children");
					const $megaMenu = $menuItem.children(
						".mega-menu-product, .mega-menu-default, .mega-menu-brand"
					);

					if ($megaMenu.length) {
						$(".mega-menu-product, .mega-menu-default, .mega-menu-brand").removeClass("active");
						$(".mega-wrap").removeClass("active");

						$megaMenu.addClass("active");

						// ✅ GÁN TÊN MỤC VÀO .label
						const name = $menuItem.find("a:first").text().trim();
						$megaMenu.find(".close-button .label").text(name);

						$(".header-close")
							.addClass("is-back-active")
							.data("level", 1)
							.data("target", $megaMenu);
					}
				}
			);

			// --- MỞ CẤP 2 ---
			$(".header-menu-mobile").on(
				"click",
				".sub-menu > .menu-item-has-children > .wrap-toggle > .fa-chevron-right",
				function (e) {
					e.preventDefault();

					const $menuItem = $(this).closest("li.menu-item-has-children");
					const $parentMega = $menuItem.closest(".mega-menu-product");
					const index = $menuItem.index();
					const $wrap2 = $parentMega.find(".sub-menu-2 .mega-wrap").eq(index);

					if ($wrap2.length) {
						$parentMega.find(".sub-menu-2 .mega-wrap").removeClass("active");
						$wrap2.addClass("active");

						// ✅ GÁN TÊN MỤC VÀO .label
						const name = $menuItem.find("a:first span:last-child").text().trim(); // dùng span cuối nếu có icon
						$wrap2.find(".close-button .label").text(name);

						$(".header-close").addClass("is-back-active").data("level", 2).data("target", $wrap2);
					}
				}
			);

			// --- MỞ CẤP 3 ---
			$(".header-menu-mobile").on(
				"click",
				".sub-menu-child > .menu-item-has-children > .wrap-toggle > .fa-chevron-right",
				function (e) {
					e.preventDefault();

					const $menuItem = $(this).closest("li.menu-item-has-children");
					const $parentMega = $menuItem.closest(".mega-menu-product");
					const index = $menuItem.index();
					const $wrap3 = $parentMega.find(".sub-menu-3 .mega-wrap").eq(index);

					if ($wrap3.length) {
						$parentMega.find(".sub-menu-3 .mega-wrap").removeClass("active");
						$wrap3.addClass("active");

						// ✅ GÁN TÊN MỤC VÀO .label
						const name = $menuItem.find("a:first span:last-child").text().trim();
						$wrap3.find(".close-button .label").text(name);

						$(".header-close").addClass("is-back-active").data("level", 3).data("target", $wrap3);
					}
				}
			);

			// --- NÚT BACK (.header-close) ---
			$(".header-close")
				.off("click.mobileMenu")
				.on("click.mobileMenu", function () {
					const $btn = $(this);
					const level = $btn.data("level");
					const $target = $btn.data("target");

					if (level === 3 && $target?.length) {
						$target.removeClass("active");
						const $wrap2 = $target
							.closest(".mega-menu-product")
							.find(".sub-menu-2 .mega-wrap.active");
						$btn.data("level", 2).data("target", $wrap2.length ? $wrap2 : null);
					} else if (level === 2 && $target?.length) {
						$target.removeClass("active");
						const $parentMega = $target.closest(".mega-menu-product");
						$parentMega.addClass("active");
						$btn.data("level", 1).data("target", $parentMega);
					} else if (level === 1 && $target?.length) {
						$target.removeClass("active");
						$btn.removeClass("is-back-active").removeData("level").removeData("target");
					} else {
						$("body").removeClass("openMenuMobile");
						$(".mega-menu-product, .mega-menu-brand, .mega-menu-default").removeClass("active");
						$(".mega-wrap").removeClass("active");
						$btn.removeClass("is-back-active").removeData("level").removeData("target");
					}
				});

			// --- NÚT .close-button BÊN TRONG MỖI MENU ---
			$(".header-menu-mobile").on("click", ".close-button", function (e) {
				e.preventDefault();

				const $parentMenu = $(this).closest(".mega-menu-product, .mega-wrap");

				if ($parentMenu.hasClass("mega-wrap") && $parentMenu.closest(".sub-menu-3").length) {
					// Từ cấp 3 về cấp 2
					$parentMenu.removeClass("active");
					const $wrap2 = $parentMenu
						.closest(".mega-menu-product")
						.find(".sub-menu-2 .mega-wrap.active");
					$(".header-close")
						.data("level", 2)
						.data("target", $wrap2.length ? $wrap2 : null);
				} else if ($parentMenu.hasClass("mega-wrap") && $parentMenu.closest(".sub-menu-2").length) {
					// Từ cấp 2 về cấp 1
					$parentMenu.removeClass("active");
					const $mega = $parentMenu.closest(".mega-menu-product");
					$mega.addClass("active");
					$(".header-close").data("level", 1).data("target", $mega);
				} else if ($parentMenu.hasClass("mega-menu-product")) {
					// Từ cấp 1 thoát hoàn toàn
					$parentMenu.removeClass("active");
					$(".header-close").removeClass("is-back-active").removeData("level").removeData("target");
				}
			});
		}

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
