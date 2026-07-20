window.addEventListener("DOMContentLoaded", () => {
const intro = document.getElementById("intro");
const text = document.querySelector(".intro-text");


// 要素が無ければ何もしない（止まらない保険）
if (!intro || !text) return;


// ★ 最初に transition を必ず指定（超重要）
text.style.transition = "opacity 0.6s ease, transform 0.6s ease-out";
text.style.transform = "scale(1)";
text.style.opacity = "1";


// ① 少し待ってから拡大＋文字フェード
setTimeout(() => {
text.style.opacity = "0";
text.style.transform = "scale(1.18)";
}, 400);


// ② イントロ全体をフェードアウト
setTimeout(() => {
intro.style.transition = "opacity 0.8s ease";
intro.style.opacity = "0";
}, 1000);


// ③ 完全に削除（ここで必ず切り替わる）
setTimeout(() => {
intro.remove();
}, 1800);
});

/* =========================
Hero slider (no sound / soft fade)
========================= */
const heroImages = document.querySelectorAll(".hero-img");
let heroIndex = 0;


if (heroImages.length > 0) {
setInterval(() => {
heroImages[heroIndex].classList.remove("active");
heroIndex = (heroIndex + 1) % heroImages.length;
heroImages[heroIndex].classList.add("active");
}, 5000);
}




/* =========================
Hamburger menu (mobile only)
========================= */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");


if (hamburger && mobileNav) {
hamburger.addEventListener("click", () => {
mobileNav.classList.toggle("active");
});


// メニュー内リンクを押したら閉じる
mobileNav.querySelectorAll("a").forEach(link => {
link.addEventListener("click", () => {
mobileNav.classList.remove("active");
});
});
}

/* =========================
   ページトップへ戻る
========================= */
document.addEventListener("DOMContentLoaded", () => {
const toTop = document.getElementById("toTop");


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
window.scrollTo({
top: 0,
behavior: "smooth"
});
});
});

// ===== Gallery Modal =====
document.addEventListener("DOMContentLoaded", () => {
const images = document.querySelectorAll(".gallery-grid img");
const modal = document.getElementById("gallery-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal-close");


if (!images.length || !modal || !modalImg || !closeBtn) {
console.warn("Gallery modal elements not found");
return;
}


images.forEach(img => {
img.addEventListener("click", () => {
const fullSrc = img.dataset.full;
modalImg.src = fullSrc;
modal.classList.add("active");
});
});


closeBtn.addEventListener("click", () => {
modal.classList.remove("active");
modalImg.src = "";
});


modal.addEventListener("click", (e) => {
if (e.target === modal) {
modal.classList.remove("active");
modalImg.src = "";
}
});
});

const images = document.querySelectorAll(".gallery-grid img");
const modal = document.getElementById("gallery-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal-close");
const prevBtn = document.querySelector(".modal-nav.prev");
const nextBtn = document.querySelector(".modal-nav.next");

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    modalImg.src = img.dataset.full;
    modal.classList.add("active");
  });
});

function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  modalImg.src = images[currentIndex].dataset.full;
}

prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  modalImg.src = "";
});

modal.addEventListener("click", (e) => {
// 背景だけクリックした時に閉じる
if (e.target.id === "gallery-modal") {
modal.classList.remove("active");
modalImg.src = "";
}
});

let startX = 0;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      showImage(currentIndex + 1); // 左スワイプ → 次
    } else {
      showImage(currentIndex - 1); // 右スワイプ → 前
    }
  }
});

prevBtn.addEventListener("click", (e) => {
e.stopPropagation();
showImage(currentIndex - 1);
});


nextBtn.addEventListener("click", (e) => {
e.stopPropagation();
showImage(currentIndex + 1);
});