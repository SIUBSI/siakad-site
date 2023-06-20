
// Script untuk Hamburger Menu
const navBar = document.querySelector('.navbar-nav');
document.querySelector('#hamburger-menu').onclick = () => {
    navBar.classList.toggle('active');
}

const hamburgerMenu = document.querySelector('#hamburger-menu');
document.addEventListener('click', function(f) {
    if(!hamburgerMenu.contains(f.target) && !navBar.contains(f.target)) {
        navBar.classList.remove('active');
    }
})



// Script untuk Section Team
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Jumlah kartu yang bisa muat di carousel sekaligus
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Sisipkan salinan dari beberapa kartu terakhir ke awal korsel untuk pengguliran tak terbatas
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Sisipkan salinan dari beberapa kartu pertama ke ujung korsel untuk pengguliran tak terbatas
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Gulir carousel pada posisi yang sesuai untuk menyembunyikan beberapa kartu duplikat pertama di Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Tambahkan pendengar acara untuk tombol panah untuk menggulir korsel ke kiri dan kanan
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left-arrow" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Merekam kursor awal dan posisi scroll carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // jika isDragging salah kembali dari sini
    // Memperbarui posisi gulir korsel berdasarkan gerakan kursor
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // Jika korsel ada di awal, gulir ke akhir
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // Jika carousel ada di akhir, scroll ke awal
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Hapus batas waktu yang ada untuk memulai putar otomatis jika mouse tidak diarahkan ke carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Kembali jika jendela lebih kecil dari 800 atau AutoPlay salah
    // Putar otomatis korsel setelah setiap 2500 md
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);