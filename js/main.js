document.addEventListener("DOMContentLoaded", () => {

    // 1. Intro Screen
    const intro = document.getElementById("intro");
    const text = document.querySelector(".intro-text");
    if (intro && text) {
        text.style.transition = "opacity 0.6s ease, transform 0.6s ease-out";
        text.style.transform = "scale(1)";
        text.style.opacity = "1";
        setTimeout(() => { text.style.opacity = "0"; text.style.transform = "scale(1.18)"; }, 400);
        setTimeout(() => { intro.style.transition = "opacity 0.8s ease"; intro.style.opacity = "0"; }, 1000);
        setTimeout(() => {
    if (intro) {
        intro.remove();
    }
}, 1800);
    }

    // 2. Hero slider
    const heroImages = document.querySelectorAll(".hero-img");
    let heroIndex = 0;
    if (heroImages.length > 0) {
        setInterval(() => {
            heroImages[heroIndex].classList.remove("active");
            heroIndex = (heroIndex + 1) % heroImages.length;
            heroImages[heroIndex].classList.add("active");
        }, 5000);
    }

// 3. Hamburger Menu & Overlay
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    const overlay = document.getElementById("overlay");

    if (hamburger && mobileNav && overlay) {
        const toggleMenu = () => {
            mobileNav.classList.toggle("active");
            overlay.classList.toggle("active");
        };

        hamburger.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", toggleMenu);

        // 【最終対策】リンククリック時のイベントを完全にリセットし、干渉を防ぐ
        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (e) => {
                // e.stopPropagation() も消し、リンクの標準動作を邪魔しないようにする
                // クラスの付け外し（閉じる処理）を一切行わず、純粋にページ遷移させる
            });
        });
    }

    // 4. Scroll to Top
    const toTop = document.getElementById("toTop");
    if (toTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                toTop.style.opacity = "1";
                toTop.style.pointerEvents = "auto";
            } else {
                toTop.style.opacity = "0";
                toTop.style.pointerEvents = "none";
            }
        });
        toTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. Gallery Modal
    const images = document.querySelectorAll(".gallery-grid img");
    const modal = document.getElementById("gallery-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".modal-close");
    const prevBtn = document.querySelector(".modal-nav.prev");
    const nextBtn = document.querySelector(".modal-nav.next");
    let currentIndex = 0;

    if (images.length > 0 && modal && modalImg) {
        images.forEach((img, index) => {
            img.addEventListener("click", () => {
                currentIndex = index;
                modalImg.src = img.dataset.full;
                modal.classList.add("active");
            });
        });

        const showImage = (index) => {
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;
            currentIndex = index;
            modalImg.src = images[currentIndex].dataset.full;
        };

        if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
        if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
        if (closeBtn) closeBtn.addEventListener("click", () => { modal.classList.remove("active"); });
        
        modal.addEventListener("click", (e) => {
            if (e.target.id === "gallery-modal") modal.classList.remove("active");
        });
    }
});



/* Swiper
------------------------------------------------------------------------------------------------ */
$(function(){
	var mySwiper = new Swiper('.style1', {
		slidesPerView: '1.4',
		spaceBetween: '10%',
		centeredSlides: false,
		loop: false,
		grabCursor: true,
		watchSlidesProgress: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});
});



/* Infinite Loop
------------------------------------------------------------------------------------------------ */
$(function() {
	var infiniteSlider = new Swiper(".infinite-slider", {
		loop: true,
		allowTouchMove: false,
		slidesPerView: 4,
		breakpoints: {
			750: {
				slidesPerView: 6,
			}
		},
		centeredSlides: true,
		speed: 1000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
	});
});

const videoSwiper = new Swiper('.video-slider', {
  loop: true,
  speed: 5000,
  slidesPerView: 1.2,
  centeredSlides: true,
  spaceBetween: 20,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    }
  }
});


// YouTubeプレーヤー
let youtubePlayers = [];

function onYouTubeIframeAPIReady() {
  const iframes = document.querySelectorAll('.video-slider iframe');

  iframes.forEach((iframe, index) => {
    youtubePlayers[index] = new YT.Player(iframe);
  });
}


// 動画クリック
document.querySelectorAll('.video-slider .swiper-slide').forEach((slide) => {

  slide.addEventListener('click', () => {

    const iframe = slide.querySelector('iframe');

    if (!iframe) return;

    const iframes = [...document.querySelectorAll('.video-slider iframe')];
    const index = iframes.indexOf(iframe);

    const player = youtubePlayers[index];

    if (!player) return;


    // 再生中なら停止
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {

      player.pauseVideo();

      // スクロール再開
      videoSwiper.autoplay.start();

    } else {

      // 他の動画を停止
      youtubePlayers.forEach((otherPlayer) => {
        if (otherPlayer && otherPlayer !== player) {
          otherPlayer.pauseVideo();
        }
      });

      // スクロール停止
      videoSwiper.autoplay.stop();

      // 再生
      player.playVideo();
    }

  });

});