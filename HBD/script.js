let currentPin = "";
const correctPin = "1234"; // Ganti PIN sesuai keinginan Anda di sini

// 1. PIN Logic
function pressPin(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();
    }
}

function clearPin() {
    currentPin = "";
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function submitPin() {
    if (currentPin === correctPin) {
        document.getElementById('pin-screen').classList.add('hidden');
        document.getElementById('gift-screen').classList.remove('hidden');
    } else {
        alert("Kode salah, coba lagi!");
        clearPin();
    }
}

// 2. Gift Box Logic
function openGift() {
    document.getElementById('gift-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
}

// 3. Candle Logic
function blowCandle() {
    alert("🎉 Selamat! Semoga semua impian dan doamu di tahun ini dikabulkan!");
}

// 4. Bouquet Message
function showFlowerMsg(msg) {
    document.getElementById('flower-message').innerText = msg;
}

// 5. Polaroid Reveal
function revealPhoto(card) {
    card.classList.add('open');
}

// 6. Jar of Notes Logic
const notes = [
    "Aku bersyukur untuk setiap tawa yang kita bagikan bersama.",
    "Terima kasih telah selalu menjadi tempat terbaik untuk pulang.",
    "Senyummu selalu berhasil menceriakan hari-hari tersulitku.",
    "Semoga tahun ini membawa kejutan indah dan kebahagiaan tanpa batas!"
];

function drawNote() {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    document.getElementById('note-display').innerText = `"${randomNote}"`;
}
// ==========================================
// 1. ANIMASI CANVAS BACKGROUND (Bunga Melayang)
// ==========================================
const canvas = document.getElementById('floating-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const emojis = ['🌸', '🌷', '✨', '💖', '🌼'];

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 18 + 12;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.rotation = Math.random() * 360;
        this.rotSpeed = Math.random() * 2 - 1;
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;
        if (this.y < -30) this.reset();
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
    }
}

// Buat 25 partikel melayang
for (let i = 0; i < 25; i++) {
    const p = new Particle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();


// ==========================================
// 2. ANIMASI LEDAKAN BUNGA / CONFETTI (Buka Kado)
// ==========================================
function triggerFlowerBurst() {
    for (let i = 0; i < 40; i++) {
        const burstParticle = new Particle();
        burstParticle.x = canvas.width / 2;
        burstParticle.y = canvas.height / 2;
        burstParticle.speedX = (Math.random() - 0.5) * 12;
        burstParticle.speedY = (Math.random() - 0.5) * 12;
        particles.push(burstParticle);
    }
}

// Update fungsi openGift yang sudah ada untuk menambahkan animasi
const originalOpenGift = openGift;
openGift = function() {
    triggerFlowerBurst();
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) giftBox.style.transform = "scale(1.5)";
    
    setTimeout(() => {
        document.getElementById('gift-screen').classList.add('hidden');
        const mainContent = document.getElementById('main-content');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('fade-in');
    }, 400);
};


// ==========================================
// 3. ANIMASI KOCOK TOPLES (Jar of Notes)
// ==========================================
const originalDrawNote = drawNote;
drawNote = function() {
    const jarBox = document.querySelector('.jar-box');
    if (jarBox) {
        jarBox.classList.remove('shake');
        void jarBox.offsetWidth; // Trigger reflow
        jarBox.classList.add('shake');
    }
    originalDrawNote();
};


// ==========================================
// 4. REVEAL ANIMATION SAAT SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.section, .timeline-item, .polaroid-card');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add('reveal-on-scroll', 'active');
        }
    });
});