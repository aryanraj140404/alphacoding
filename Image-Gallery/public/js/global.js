// Sidebar
function openSidebar() {
    document.getElementById("sidebar").style.width = "260px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}


// ================= LIGHTBOX SLIDER =================
let currentIndex = 0;
const totalImages = 6;

function openLightbox(index) {
    currentIndex = index;
    document.getElementById("lightbox").style.display = "flex";
    updateSlider();
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(step) {
    currentIndex = (currentIndex + step + totalImages) % totalImages;
    updateSlider();
}

function updateSlider() {
    document.getElementById("slider").style.transform =
        `translateX(-${currentIndex * 100}%)`;
}


// ================= IMAGE FILTER =================
function filterImages(category) {
    let imgs = document.querySelectorAll(".image");

    imgs.forEach(img => {
        if (category === "all" || img.classList.contains(category)) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    });
}
