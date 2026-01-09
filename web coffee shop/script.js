// Inisialisasi AOS (Animasi Muncul)
AOS.init({ duration: 1000, once: true });

// Navbar Toggle
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

// Slider Experts
var swiperTeam = new Swiper(".team-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".team-slider .swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});

// Slider Review
var swiperReview = new Swiper(".review-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    centeredSlides: true, // WAJIB: Agar slide aktif berada di tengah
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".review-slider .swiper-pagination",
        clickable: true,
    },
});

// Fungsi untuk Icon Heart (Klik berubah merah & solid)
document.querySelectorAll('.heart-icon').forEach(heart => {
    heart.onclick = () => {
        heart.classList.toggle('active');
        
        // Ganti icon FontAwesome far (garis) ke fas (isi)
        if(heart.classList.contains('active')){
            heart.classList.replace('far', 'fas');
        } else {
            heart.classList.replace('fas', 'far');
        }

        // Animasi detak jantung singkat
        heart.style.transform = "scale(1.4)";
        setTimeout(() => heart.style.transform = "scale(1)", 200);
    }
});

// Fungsi untuk Tombol Keranjang (Animasi & Navigasi)
document.querySelectorAll('.cart-circle').forEach(btn => {
    btn.onclick = (e) => {
        // Efek klik
        btn.style.transform = "scale(0.8)";
        setTimeout(() => btn.style.transform = "scale(1.1)", 150);
        
        // Opsional: Jika ingin memberi animasi pada keranjang di header
        const cartHeader = document.querySelector('#cart-btn');
        if(cartHeader) {
            cartHeader.style.transform = "scale(1.5)";
            cartHeader.style.color = "var(--orange)";
            setTimeout(() => {
                cartHeader.style.transform = "scale(1)";
                cartHeader.style.color = "";
            }, 500);
        }
    }
});

let cartData = [];

const cartBtn = document.querySelector('#cart-btn');
const cartContainer = document.querySelector('.cart-items-container');
const cartList = document.querySelector('#cart-list');
const cartCount = document.querySelector('#cart-count');
const totalPriceDisplay = document.querySelector('#total-price');

// 1. Klik ikon untuk buka/tutup keranjang
cartBtn.onclick = (e) => {
    // Mencegah menu menutup saat kita klik di dalam kotak keranjang
    if (e.target.closest('.cart-items-container')) return;
    cartContainer.classList.toggle('active');
};

// 2. Klik Tambah ke Keranjang pada Produk
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.onclick = (e) => {
        e.stopPropagation();
        const productBox = btn.closest('.box');
        const name = productBox.getAttribute('data-name');
        const price = parseInt(productBox.getAttribute('data-price'));

        // Masukkan ke database sementara
        cartData.push({ name, price });

        // Update UI
        updateCartUI();

        // Animasi feedback
        cartBtn.style.transform = "scale(1.3)";
        setTimeout(() => cartBtn.style.transform = "scale(1)", 200);
    }
});

// 3. Fungsi Render List
function updateCartUI() {
    cartCount.innerText = cartData.length;
    cartList.innerHTML = '';

    if (cartData.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">Belum ada pesanan</p>';
        totalPriceDisplay.innerText = '0';
    } else {
        let total = 0;
        cartData.forEach(item => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `<h4>${item.name}</h4> <span>$${item.price}</span>`;
            cartList.appendChild(div);
        });
        totalPriceDisplay.innerText = total;
    }
}

// Tutup jika scroll atau klik luar
window.onscroll = () => cartContainer.classList.remove('active');

