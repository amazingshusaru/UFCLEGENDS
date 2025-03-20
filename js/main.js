// ===== ナビゲーションハンドリング =====
document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビリンククリック時にモバイルメニューを閉じる
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // スクロール時のナビゲーション背景変更
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== ヘッダー背景画像の自動切り替え =====
    const headerBgs = document.querySelectorAll('.header-bg');
    let currentBg = 0;

    function changeBackground() {
        // 全ての背景画像からactiveクラスを削除
        headerBgs.forEach(bg => bg.classList.remove('active'));
        
        // 次の背景画像を表示
        currentBg = (currentBg + 1) % headerBgs.length;
        headerBgs[currentBg].classList.add('active');
    }

    // 5秒ごとに背景画像を切り替え
    let bgInterval = setInterval(changeBackground, 5000);

    // ページにフォーカスがない場合は切り替えを停止（オプション）
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(bgInterval);
        } else {
            bgInterval = setInterval(changeBackground, 5000);
        }
    });

    // ===== スムーススクロール =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== タブ切り替え =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // すべてのタブから active クラスを削除
            tabBtns.forEach(b => b.classList.remove('active'));
            // クリックされたタブに active クラスを追加
            btn.classList.add('active');
            
            // すべてのコンテンツエリアを非表示
            const weightClasses = document.querySelectorAll('.weight-classes');
            weightClasses.forEach(wc => wc.classList.remove('active'));
            
            // 対応するコンテンツエリアを表示
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // ===== スター選手スライダー機能 =====
    const slides = document.querySelectorAll('.era-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // スライドを移動する関数
    const moveToSlide = (slideIndex) => {
        // インデックスの範囲チェック
        if (slideIndex < 0) {
            slideIndex = slideCount - 1;
        } else if (slideIndex >= slideCount) {
            slideIndex = 0;
        }
        
        // すべてのスライドから active クラスを除去
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 新しいスライドに active クラスを追加
        slides[slideIndex].classList.add('active');
        
        // すべてのドットから active クラスを除去
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 現在のスライドに対応するドットに active クラスを追加
        dots[slideIndex].classList.add('active');
        
        // 現在のスライドインデックスを更新
        currentSlide = slideIndex;
    };
    
    // 前のスライドボタンのイベントリスナー
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
    });
    
    // 次のスライドボタンのイベントリスナー
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
    });
    
    // ドットクリック時のイベントリスナー
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
    
    // 自動スライド機能（5秒ごと）
    let slideInterval = setInterval(() => {
        moveToSlide(currentSlide + 1);
    }, 5000);
    
    // スライダーにマウスが乗ったら自動スライドを停止
    const slider = document.querySelector('.star-era-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // スライダーからマウスが離れたら自動スライドを再開
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            moveToSlide(currentSlide + 1);
        }, 5000);
    });

    // ===== タイムライン要素のアニメーション =====
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateOnScroll = () => {
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.animation = `fadeIn 1s ${index * 0.2}s forwards`;
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // 初期読み込み時にもアニメーションを実行
    animateOnScroll();

    // ===== コンタクトフォーム送信処理 =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得（実際の送信処理はバックエンド側で実装）
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // バリデーション（簡易版）
            let isValid = true;
            for (const [key, value] of Object.entries(formValues)) {
                if (!value.trim()) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                // 実際の環境ではここでAPIを呼び出すなどの処理を行う
                alert('お問い合わせありがとうございます。メッセージを送信しました。');
                contactForm.reset();
            } else {
                alert('すべての項目を入力してください。');
            }
        });
    }

    // ===== オクタゴンアニメーション =====
    const octagon = document.querySelector('.octagon-container');
    if (octagon) {
        // ページロード時のアニメーション
        octagon.classList.add('animate-in');
        
        // マウスムーブ時のエフェクト
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            if (octagon.querySelector('.octagon')) {
                octagon.querySelector('.octagon').style.transform = `rotate(22.5deg) translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            }
        });
    }

    // ===== 地球儀のインタラクション =====
    const globePins = document.querySelectorAll('.globe-pin');
    globePins.forEach(pin => {
        pin.addEventListener('click', () => {
            // ピンがクリックされたときのアクション
            const country = pin.getAttribute('data-country');
            
            // 国名を表示するなどのインタラクション（オプション）
            alert(`${country}での大会・選手について詳しく見る`);
        });
    });
});

// ===== ページの読み込み完了時の処理 =====
window.addEventListener('load', () => {
    // ページ全体をフェードインさせる
    document.body.classList.add('loaded');
});
