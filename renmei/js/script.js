document.addEventListener('DOMContentLoaded', function () {
    /* =========================================
       1. ハンバーガーメニュー
       ========================================= */
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    /* =========================================
       2. スクロールフェードイン
       ========================================= */
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    /* =========================================
       3. MV フェードスライダー（矢印・ドットなし）
       ========================================= */
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        if (slides.length > 1) {
            let currentIndex = 0;
            const intervalMs = 5000; // 5秒ごとに切り替え

            setInterval(() => {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }, intervalMs);
        }
    }

    /* =========================================
       4. 教会一覧 モーダル表示
       ========================================= */
    const CHURCH_DATA = {
        'kakukyoukai/sorachi.html': {
            name: '空知太栄光キリスト教会',
            sub: '',
            image: 'img/church1.jpg',
            address: '〒073-0175 北海道砂川市空知太西５条7丁目1-24',
            tel: '0125-53-3150',
            url: 'http://meigata-bokushin.secret.jp/index.php?空知太栄光キリスト教会',
            email: 'shalomkingdom52@gmail.com'
        },
        'kakukyoukai/toyama.html': {
            name: '戸山教会',
            sub: '',
            image: 'img/church2.jpg',
            address: '〒162-0052 東京都新宿区戸山○-○-○',
            tel: '03-0000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/kiyose.html': {
            name: '清瀬旭ヶ丘教会',
            sub: '',
            image: 'img/church3.jpg',
            address: '〒204-0002 東京都清瀬市旭が丘○-○-○',
            tel: '042-000-0000',
            url: '',
            email: 'info@example.com'
        },
        'kakukyoukai/tamagawa.html': {
            name: '玉川神の教会',
            sub: '',
            image: 'img/church4.jpg',
            address: '〒158-0083 東京都世田谷区奥沢○-○-○',
            tel: '03-0000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/nerima.html': {
            name: '練馬神の教会',
            sub: '',
            image: 'img/church5.jpg',
            address: '〒176-0001 東京都練馬区練馬○-○-○',
            tel: '03-0000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/hagiyama.html': {
            name: '萩山神の教会',
            sub: '',
            image: 'img/church6.jpg',
            address: '〒189-0012 東京都東村山市萩山町○-○-○',
            tel: '042-000-0000',
            url: '',
            email: 'info@example.com'
        },
        'kakukyoukai/nishikunitachi.html': {
            name: '西国立神の教会',
            sub: '',
            image: 'img/church7.jpg',
            address: '〒190-0021 東京都立川市羽衣町○-○-○',
            tel: '042-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/tachikawa.html': {
            name: '立川神の教会',
            sub: '',
            image: 'img/church8.jpg',
            address: '〒190-0000 東京都立川市○-○-○',
            tel: '042-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/kitano.html': {
            name: '北野キリスト教会',
            sub: '',
            image: 'img/church9.jpg',
            address: '〒192-0906 東京都八王子市北野町○-○-○',
            tel: '042-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/fukaya.html': {
            name: '深谷神の教会',
            sub: '',
            image: 'img/church10.jpg',
            address: '〒366-0000 埼玉県深谷市○-○-○',
            tel: '048-000-0000',
            url: '',
            email: 'info@example.com'
        },
        'kakukyoukai/kounoike.html': {
            name: '大阪鴻池神の教会',
            sub: '',
            image: 'img/church11.jpg',
            address: '〒578-0973 大阪府東大阪市東鴻池町○-○-○',
            tel: '072-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/tarumi.html': {
            name: '垂水神の教会',
            sub: '',
            image: 'img/church12.jpg',
            address: '〒655-0000 兵庫県神戸市垂水区○-○-○',
            tel: '078-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/futsukaichi.html': {
            name: '二日市栄光キリスト教会',
            sub: '',
            image: 'img/church13.jpg',
            address: '〒818-0056 福岡県筑紫野市二日市北○-○-○',
            tel: '092-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/imajyuku.html': {
            name: '今宿神の教会',
            sub: '今宿キリスト教会',
            image: 'img/church14.jpg',
            address: '〒819-0167 福岡県福岡市西区今宿○-○-○',
            tel: '092-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/saga.html': {
            name: '佐賀神の教会',
            sub: '',
            image: 'img/church15.jpg',
            address: '〒840-0000 佐賀県佐賀市○-○-○',
            tel: '0952-00-0000',
            url: '',
            email: 'info@example.com'
        },
        'kakukyoukai/okinawaameku.html': {
            name: '沖縄天久神の教会',
            sub: '',
            image: 'img/church16.jpg',
            address: '〒900-0005 沖縄県那覇市天久○-○-○',
            tel: '098-000-0000',
            url: 'https://example.com',
            email: ''
        },
        'kakukyoukai/tomishiro.html': {
            name: '豊見城神の教会',
            sub: '沖縄ゴスペルファミリーチャーチ',
            image: 'img/church17.jpg',
            address: '〒901-0200 沖縄県豊見城市○-○-○',
            tel: '098-000-0000',
            url: 'https://example.com',
            email: ''
        }
    };

    const modal = document.getElementById('churchModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalImgWrap = document.getElementById('modalImgWrap');
    const modalChurchImg = document.getElementById('modalChurchImg');
    const modalChurchSub = document.getElementById('modalChurchSub');
    const modalChurchName = document.getElementById('modalChurchName');
    const modalAddressRow = document.getElementById('modalAddressRow');
    const modalAddress = document.getElementById('modalAddress');
    const modalTelRow = document.getElementById('modalTelRow');
    const modalTel = document.getElementById('modalTel');
    const modalWebRow = document.getElementById('modalWebRow');
    const modalWebLabel = document.getElementById('modalWebLabel');
    const modalWeb = document.getElementById('modalWeb');
    const modalDetailLink = document.getElementById('modalDetailLink');

    function openChurchModal(href, fallbackName, fallbackSub) {
        if (!modal) return;

        const data = CHURCH_DATA[href] || {
            name: fallbackName,
            sub: fallbackSub,
            image: 'img/hero1.jpg',
            address: '準備中',
            tel: '',
            url: '',
            email: ''
        };

        modalChurchName.textContent = data.name || fallbackName;
        if (data.sub) {
            modalChurchSub.textContent = data.sub;
            modalChurchSub.style.display = 'block';
        } else {
            modalChurchSub.style.display = 'none';
        }

        if (data.image) {
            modalChurchImg.src = data.image;
            modalChurchImg.alt = data.name + 'の外観・内観';
            modalImgWrap.style.display = 'block';
        } else {
            modalImgWrap.style.display = 'none';
        }

        if (data.address) {
            modalAddress.textContent = data.address;
            modalAddressRow.style.display = 'flex';
        } else {
            modalAddressRow.style.display = 'none';
        }

        if (data.tel) {
            modalTel.textContent = data.tel;
            modalTel.href = 'tel:' + data.tel.replace(/[^0-9+]/g, '');
            modalTelRow.style.display = 'flex';
        } else {
            modalTelRow.style.display = 'none';
        }

        if (data.url) {
            modalWebLabel.textContent = 'サイト';
            modalWeb.textContent = data.url;
            modalWeb.href = data.url;
            modalWeb.target = '_blank';
            modalWeb.rel = 'noopener';
            modalWebRow.style.display = 'flex';
        } else if (data.email) {
            modalWebLabel.textContent = 'メール';
            modalWeb.textContent = data.email;
            modalWeb.href = 'mailto:' + data.email;
            modalWeb.removeAttribute('target');
            modalWeb.removeAttribute('rel');
            modalWebRow.style.display = 'flex';
        } else {
            modalWebRow.style.display = 'none';
        }

        if (href) {
            modalDetailLink.href = href;
            modalDetailLink.style.display = 'inline-block';
        } else {
            modalDetailLink.style.display = 'none';
        }

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeChurchModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    const churchItems = document.querySelectorAll('.church-item');
    churchItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const nameEl = this.querySelector('.church-name');
            const subEl = this.querySelector('.church-sub');
            const name = nameEl ? nameEl.textContent.trim() : '';
            const sub = subEl ? subEl.textContent.trim() : '';
            openChurchModal(href, name, sub);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeChurchModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeChurchModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeChurchModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

  /* --- 既存の処理（ハンバーガーメニュー等） --- */

  // 💡 追加：トップへ戻るボタンのスクロール制御
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (scrollTopBtn) {
    // 300px以上スクロールしたらボタンを表示
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    });

    // ボタンタップで最上部へスムーズにスクロール
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

/* =========================================
   5. イラストナビ 自動スライダー（ずっと左へ流れる無限ループ）
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.getElementById('illustSliderWrapper');
    const track = document.getElementById('illustSliderTrack');
    const prevBtn = document.getElementById('illustPrevBtn');
    const nextBtn = document.getElementById('illustNextBtn');
    const dotsContainer = document.getElementById('illustSliderDots');

    if (!wrapper || !track) return;

    let cards = Array.from(track.querySelectorAll('.illust-card'));
    const totalCards = cards.length;
    let autoTimer = null;
    const intervalMs = 2000; // 4秒ごとに自動スライド
    let isAnimating = false;
    let currentDotIndex = 0;

    // ドットの生成
    function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'illust-slider-dot' + (i === currentDotIndex ? ' active' : '');
            dot.setAttribute('aria-label', `${i + 1}番目を表示`);
            dotsContainer.appendChild(dot);
        }
    }

    // ドットの表示更新
    function updateDots(newIndex) {
        currentDotIndex = (newIndex + totalCards) % totalCards;
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.illust-slider-dot');
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === currentDotIndex);
            });
        }
    }

    // 左へ1枚分スライドする（常に左方向へ循環）
    function slideLeft() {
        if (isAnimating) return;
        isAnimating = true;

        const gap = parseFloat(getComputedStyle(track).gap) || 24;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const moveAmount = cardWidth + gap;

        // 左へスライドするアニメーション
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        track.style.transform = `translateX(-${moveAmount}px)`;

        setTimeout(() => {
            // アニメーション完了後、トランジションを消して位置をリセット
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';

            // 先頭にあったカードをDOMの末尾に移動させることで無限ループを実現
            const firstCard = track.firstElementChild;
            track.appendChild(firstCard);
            cards = Array.from(track.querySelectorAll('.illust-card'));

            updateDots(currentDotIndex + 1);
            isAnimating = false;
        }, 600); // CSSのtransition時間と一致させる
    }

    // 右へ1枚分スライドする（「前へ」ボタン用）
    function slideRight() {
        if (isAnimating) return;
        isAnimating = true;

        const gap = parseFloat(getComputedStyle(track).gap) || 24;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const moveAmount = cardWidth + gap;

        // 末尾のカードをあらかじめ先頭に移動しておく
        const lastCard = track.lastElementChild;
        track.insertBefore(lastCard, track.firstElementChild);
        cards = Array.from(track.querySelectorAll('.illust-card'));

        // 一瞬で左にオフセットした状態を作り、右へスライドインさせる
        track.style.transition = 'none';
        track.style.transform = `translateX(-${moveAmount}px)`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                track.style.transform = 'translateX(0)';
            });
        });

        setTimeout(() => {
            updateDots(currentDotIndex - 1);
            isAnimating = false;
        }, 600);
    }

    // 自動再生の制御
    function startAutoPlay() {
        stopAutoPlay();
        autoTimer = setInterval(() => {
            slideLeft();
        }, intervalMs);
    }

    function stopAutoPlay() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // ボタン操作
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            slideLeft();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            slideRight();
            resetAutoPlay();
        });
    }

    // マウスホバー中は自動スライドを一時停止
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);

    // スマホのスワイプ操作対応
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 40) {
            if (diffX > 0) {
                slideLeft();
            } else {
                slideRight();
            }
        }
        startAutoPlay();
    });

    // 初期化
    buildDots();
    startAutoPlay();
});