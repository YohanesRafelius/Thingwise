// ===================================================================
// KODE INI MENGGABUNGKAN LOGIKA MODAL, DATA KATALOG, DAN PENCARIAN
// PASTIKAN KODE INI BERADA DI BAGIAN ATAS FILE JS ANDA
// ===================================================================

// --- Variabel & Fungsi Modal (Global Scope) ---
const catalogueModal2 = document.getElementById('catalogueModal2');
const modalOverlay2 = document.getElementById('modalOverlay2');
const modalClose2 = document.getElementById('modalClose2');

function openModal2(item){
    // Mengisi konten modal
    document.getElementById('modalImg2').src = item.img;
    document.getElementById('modalName2').innerText = item.name;
    document.getElementById('modalRaw2').innerText = item.raw;
    document.getElementById('modalProcess2').innerText = item.process;
    document.getElementById('modalTime2').innerText = item.time;
    document.getElementById('modalWaste2').innerText = item.waste;

    const modalSustain2 = document.getElementById('modalSustain2');
    modalSustain2.innerText = item.sustain.charAt(0).toUpperCase() + item.sustain.slice(1);
    modalSustain2.className = 'sustain-badge ' + 
      (item.sustain==='high'?'sustain-high':item.sustain==='moderate'?'sustain-moderate':'sustain-low');

    // Menampilkan modal pop-up
    if(catalogueModal2) {
        catalogueModal2.classList.add('show');
    }
}

// Menambahkan Event Listeners untuk menutup modal (HARUS GLOBAL)
document.addEventListener("DOMContentLoaded", function() {
    if(modalClose2) {
        modalClose2.addEventListener('click', ()=> catalogueModal2.classList.remove('show'));
    }
    if(modalOverlay2) {
        modalOverlay2.addEventListener('click', ()=> catalogueModal2.classList.remove('show'));
    }
});


// ===================================================================
// --- DATA KATALOG & LOGIKA RENDER (DALAM IIFE KHUSUS KATALOG) ---
// ===================================================================
(function(){
    const grid2 = document.getElementById('catalogueGrid2');
    const expandBtn2 = document.getElementById('expandBtn2');
    const minimizeBtn2 = document.getElementById('minimizeBtn2'); // diasumsikan ada
    
    const itemsPerPage2 = 8;
    let currentPage2 = 0;

    // Data katalog sekarang disimpan di window.catalogueData2 (GLOBAL)
    // PENTING: Jika Anda sudah memiliki data katalog di tempat lain, HAPUS BLOK INI!
    // Jika tidak, biarkan ini untuk memastikan data ada.
    window.catalogueData2 = [
        {id:1, name:"Tissue Paper", img:"catalogue/catalogue1.png", raw:"Wood pulp, recycled paper pulp, water, softener, bleaching agent", process:"Pulping → Bleaching → Pressing → Drying → Cutting & Packaging", time:"5 minutes", waste:"Quickly decomposes, but large-scale production causes deforestation and energy waste", sustain:"moderate"},
{id:2, name:"Glass Bottle", img:"catalogue/catalogue2.png", raw:"Sand, soda ash, limestone, recycled glass", process:"Melting → Molding → Annealing → Cooling → Labeling & Packaging", time:"Hours to decades", waste:"Recyclable but requires high energy; breaks can be hazardous", sustain:"high"},
{id:3, name:"Plastic Bottle", img:"catalogue/catalogue3.png", raw:"PET resin, additives, colorants", process:"Injection molding → Blow molding → Filling → Packaging", time:"Minutes to hours", waste:"Takes hundreds of years to decompose; contributes to pollution", sustain:"low"},
{id:4, name:"Leather Shoe", img:"catalogue/catalogue4.png", raw:"Animal hide, glue, rubber, leather dye, threads", process:"Tanning → Cutting → Stitching → Sole Attachment → Finishing & Packaging", time:"2–5 years", waste:"Non-biodegradable components; can be recycled as industrial material", sustain:"moderate"},
{id:5, name:"Cotton T-Shirt", img:"catalogue/catalogue5a.png", raw:"Cotton fibers, dyes, water, softeners", process:"Spinning → Knitting/Weaving → Dyeing → Cutting & Sewing → Packaging", time:"1–3 years", waste:"Biodegradable but large water use and chemical pollution from dyeing", sustain:"moderate"},
{id:6, name:"Alkaline Battery", img:"catalogue/catalogue6.png", raw:"Zinc, manganese dioxide, potassium hydroxide, steel", process:"Mixing → Assembly → Sealing → Testing → Packaging", time:"6–12 months", waste:"Hazardous; contains heavy metals that contaminate soil and water", sustain:"low"},
{id:7, name:"Aluminum Can", img:"catalogue/catalogue7.png", raw:"Bauxite, recycled aluminum, solvents", process:"Refining → Smelting → Rolling → Shaping → Filling & Packaging", time:"Minutes to hours", waste:"Highly recyclable; energy-intensive production if not recycled", sustain:"high"},
{id:8, name:"Plastic Bag", img:"catalogue/catalogue8.png", raw:"Polyethylene, additives, colorants", process:"Extrusion → Cutting → Sealing → Packaging", time:"Minutes", waste:"Non-biodegradable; major contributor to pollution", sustain:"low"},
{id:9, name:"Notebook", img:"catalogue/catalogue9.png", raw:"Wood pulp, recycled paper, glue, ink", process:"Pulping → Pressing → Drying → Cutting → Binding → Packaging", time:"Months", waste:"Biodegradable, but large-scale production uses energy and water", sustain:"moderate"},
{id:10, name:"Mirror", img:"catalogue/catalogue10.png", raw:"Glass, silver nitrate, copper, protective coatings", process:"Glass cutting → Polishing → Silvering → Coating → Framing", time:"Years", waste:"Non-biodegradable, can be recycled; broken pieces hazardous", sustain:"moderate"},
{id:11, name:"Ballpoint Pen", img:"catalogue/catalogue11a.png", raw:"Plastic, ink, metal tip, rubber grip", process:"Plastic molding → Ink filling → Assembly → Packaging", time:"3–6 months", waste:"Plastic and ink components are non-biodegradable; recycling limited", sustain:"low"},
{id:12, name:"Pencil", img:"catalogue/catalogue12.png", raw:"Wood, graphite, clay, paint, eraser", process:"Wood shaping → Graphite filling → Coating → Eraser attachment → Packaging", time:"1–2 years", waste:"Biodegradable, except for paint coatings", sustain:"moderate"},
{id:13, name:"Eraser", img:"catalogue/catalogue13a.png", raw:"Rubber, synthetic polymers, coloring agents", process:"Mixing → Molding → Curing → Cutting → Packaging", time:"Months", waste:"Non-biodegradable if synthetic; natural rubber better", sustain:"moderate"},
{id:14, name:"Stainless Steel Bottle", img:"catalogue/catalogue14a.png", raw:"Stainless steel, rubber seals, paint", process:"Cutting → Shaping → Welding → Polishing → Assembly → Packaging", time:"Years", waste:"Durable; recyclable but energy-intensive production", sustain:"high"},
{id:15, name:"Paper Coffee Cup", img:"catalogue/catalogue15.png", raw:"Paper, wax/PE lining, ink", process:"Pulping → Pressing → Coating → Shaping → Packaging", time:"Minutes", waste:"Hard to recycle due to lining; biodegradable slowly", sustain:"moderate"},
{id:16, name:"Drinking Glass", img:"catalogue/catalogue16.png", raw:"Sand, soda ash, limestone", process:"Melting → Molding → Annealing → Cooling → Packaging", time:"Years", waste:"Recyclable; energy-intensive production", sustain:"high"},
{id:17, name:"Ceramic Plate", img:"catalogue/catalogue17.png", raw:"Clay, feldspar, glaze", process:"Shaping → Drying → Firing → Glazing → Packaging", time:"Years", waste:"Non-biodegradable; recyclable in construction", sustain:"moderate"},
{id:18, name:"Metal Spoon", img:"catalogue/catalogue18.png", raw:"Stainless steel, nickel, chromium", process:"Cutting → Shaping → Polishing → Packaging", time:"Years", waste:"Durable; recyclable", sustain:"high"},
{id:19, name:"Metal Fork", img:"catalogue/catalogue19a.png", raw:"Stainless steel, nickel, chromium", process:"Cutting → Shaping → Polishing → Packaging", time:"Years", waste:"Durable; recyclable", sustain:"high"},
{id:20, name:"Plastic Straw", img:"catalogue/catalogue20.png", raw:"Polypropylene, colorants", process:"Extrusion → Cutting → Packaging", time:"Minutes", waste:"Non-biodegradable; major ocean pollutant", sustain:"low"},
{id:21, name:"Plastic Toy", img:"catalogue/catalogue21.png", raw:"Plastic, paint, screws", process:"Molding → Assembly → Painting → Packaging", time:"Years", waste:"Non-biodegradable; recycling limited", sustain:"low"},
{id:22, name:"Fabric Backpack", img:"catalogue/catalogue22.png", raw:"Polyester, zippers, foam, threads", process:"Cutting → Sewing → Assembly → Packaging", time:"5–10 years", waste:"Non-biodegradable; recyclable partially", sustain:"moderate"},
{id:23, name:"Umbrella", img:"catalogue/catalogue23.png", raw:"Fabric, metal rods, plastic handle", process:"Cutting → Assembly → Stitching → Packaging", time:"2–5 years", waste:"Durable; partially recyclable", sustain:"moderate"},
{id:24, name:"Mobile Phone", img:"catalogue/catalogue24.png", raw:"Glass, aluminum, lithium, silicon, plastic", process:"Assembly → Testing → Software Installation → Packaging", time:"2–4 years", waste:"Electronic waste; contains hazardous metals", sustain:"low"},
{id:25, name:"Headphones", img:"catalogue/catalogue25a.png", raw:"Plastic, copper, magnets, rubber", process:"Assembly → Testing → Packaging", time:"2–5 years", waste:"Electronic waste; recycling possible but complex", sustain:"low"},
{id:26, name:"USB Drive", img:"catalogue/catalogue26.png", raw:"Plastic, silicon, metal", process:"Assembly → Testing → Packaging", time:"5–10 years", waste:"Non-biodegradable; electronic recycling needed", sustain:"low"},
{id:27, name:"LED Light Bulb", img:"catalogue/catalogue27.png", raw:"Semiconductors, plastic, glass, metal", process:"Assembly → Testing → Packaging", time:"10–25 years", waste:"Contains small electronic parts; recyclable", sustain:"high"},
{id:28, name:"Candle", img:"catalogue/catalogue28.png", raw:"Paraffin, beeswax, cotton wick, dye", process:"Melting → Pouring → Cooling → Packaging", time:"Hours", waste:"Combustion emits CO₂; wax is biodegradable", sustain:"moderate"},
{id:29, name:"Soap Bar", img:"catalogue/catalogue29.png", raw:"Vegetable oil, animal fat, lye, fragrance", process:"Saponification → Molding → Curing → Packaging", time:"Weeks", waste:"Biodegradable; mild water pollution possible", sustain:"high"},
{id:30, name:"Plastic Toothbrush", img:"catalogue/catalogue30a.png", raw:"Plastic, nylon bristles, rubber grip", process:"Molding → Bristle insertion → Assembly → Packaging", time:"3 months", waste:"Non-biodegradable; recycling difficult", sustain:"low"},
{id:31, name:"Toothpaste Tube", img:"catalogue/catalogue31.png", raw:"Plastic, aluminum, fluoride, abrasives, glycerin", process:"Mixing → Filling → Sealing → Packaging", time:"2–3 months", waste:"Non-biodegradable; difficult to recycle", sustain:"low"},
{id:32, name:"Shampoo Bottle", img:"catalogue/catalogue32.png", raw:"Plastic, water, surfactants, fragrances, preservatives", process:"Mixing → Filling → Sealing → Packaging", time:"2–3 months", waste:"Plastic waste; chemical residues affect water systems", sustain:"low"},
{id:33, name:"Toilet Paper", img:"catalogue/catalogue33.png", raw:"Wood pulp, recycled paper, water, softener, bleaching agent", process:"Pulping → Bleaching → Pressing → Rolling → Cutting & Packaging", time:"Minutes", waste:"Biodegradable; large-scale production causes deforestation", sustain:"moderate"},
{id:34, name:"Lip Balm", img:"catalogue/catalogue34.png", raw:"Beeswax, oils, flavors, pigments, container plastic", process:"Melting → Mixing → Pouring → Cooling → Packaging", time:"Weeks", waste:"Plastic container is non-biodegradable; balm itself biodegradable", sustain:"moderate"},
{id:35, name:"Analog Watch", img:"catalogue/catalogue35.png", raw:"Metal, glass, leather/plastic strap, quartz, battery", process:"Assembly → Testing → Packaging", time:"5–10 years", waste:"Durable; contains small electronic and metal parts for recycling", sustain:"moderate"},
{id:36, name:"Smart Watch", img:"catalogue/catalogue36.png", raw:"Glass, metal, lithium battery, plastic, electronics", process:"Assembly → Software installation → Testing → Packaging", time:"3–5 years", waste:"Electronic waste; recycling required for metals and battery", sustain:"low"},
{id:37, name:"Ceramic Coffee Mug", img:"catalogue/catalogue37.png", raw:"Clay, water, glaze", process:"Shaping → Drying → Firing → Glazing → Packaging", time:"Years", waste:"Non-biodegradable; can be reused or recycled in construction", sustain:"moderate"},
{id:38, name:"Plastic Food Container", img:"catalogue/catalogue38.png", raw:"Polypropylene, polyethylene, additives", process:"Injection molding → Cooling → Packaging", time:"Hours to days", waste:"Non-biodegradable; recyclable in some facilities", sustain:"low"},
{id:39, name:"Can Opener", img:"catalogue/catalogue39.png", raw:"Metal, plastic handle", process:"Cutting → Shaping → Assembly → Packaging", time:"Years", waste:"Durable; metal recyclable", sustain:"high"},
{id:40, name:"Scissors", img:"catalogue/catalogue40.png", raw:"Steel, plastic handle", process:"Cutting → Shaping → Assembly → Sharpening → Packaging", time:"Years", waste:"Durable; metal recyclable", sustain:"high"},
{id:41, name:"Wall Clock", img:"catalogue/catalogue41.png", raw:"Plastic, glass, metal, electronics", process:"Assembly → Testing → Packaging", time:"5–10 years", waste:"Electronic waste; recycling possible", sustain:"moderate"},
{id:42, name:"Refrigerator", img:"catalogue/catalogue42.png", raw:"Steel, plastic, insulation foam, refrigerants, copper", process:"Assembly → Testing → Packaging → Shipping", time:"10–20 years", waste:"Electronic and chemical waste; recycling complex", sustain:"low"},
{id:43, name:"Microwave", img:"catalogue/catalogue43.png", raw:"Steel, glass, plastic, electronics, magnetron", process:"Assembly → Testing → Packaging → Shipping", time:"8–15 years", waste:"Electronic waste; recycling possible but difficult", sustain:"low"},
{id:44, name:"Lantern", img:"catalogue/catalogue44.png", raw:"Plastic, metal, glass, battery, wiring", process:"Assembly → Testing → Packaging", time:"Years", waste:"Durable; battery disposal needed", sustain:"moderate"},
{id:45, name:"Leather Backpack", img:"catalogue/catalogue45.png", raw:"Leather, metal zippers, threads, padding", process:"Cutting → Stitching → Assembly → Packaging", time:"5–10 years", waste:"Leather partially biodegradable; metal parts recyclable", sustain:"moderate"},
{id:46, name:"Plastic Ruler", img:"catalogue/catalogue46.png", raw:"Plastic, pigments", process:"Extrusion → Cutting → Packaging", time:"Years", waste:"Non-biodegradable; low recycling rate", sustain:"low"},
{id:47, name:"Remote", img:"catalogue/catalogue47.png", raw:"Plastic, metal", process:"Assembly & testing", time:"3 hours", waste:"Low", sustain:"moderate"},
{id:48, name:"Eyeglasses", img:"catalogue/catalogue48.png", raw:"Plastic, metal, glass", process:"Molding & lens cutting", time:"5 hours", waste:"Low", sustain:"moderate"},
  ];

    function createCard2(item){
        const card = document.createElement('div');
        card.className = 'catalogue-card-2';

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;

        const caption = document.createElement('div');
        caption.className = 'catalogue-card-caption-2';
        caption.innerText = item.name;

        // Menggunakan fungsi openModal2 global
        [img, caption].forEach(el => el.addEventListener('click', ()=> openModal2(item)));

        card.appendChild(img);
        card.appendChild(caption);
        return card;
    }

    function renderPage2(page){
        grid2.innerHTML = '';
        const end = (page + 1) * itemsPerPage2;
        window.catalogueData2.slice(0, end).forEach(item => {
          grid2.appendChild(createCard2(item));
        });
    }

    // Render awal
    renderPage2(0);
    currentPage2 = 1; 
    if(minimizeBtn2) minimizeBtn2.style.display = 'none';

    // Expand More
    if(expandBtn2) expandBtn2.addEventListener('click', ()=>{
        const start = currentPage2 * itemsPerPage2;
        const end = start + itemsPerPage2;
        
        window.catalogueData2.slice(start, end).forEach(item => {
          grid2.appendChild(createCard2(item));
        });

        currentPage2++;
        if(currentPage2 > 1 && minimizeBtn2) minimizeBtn2.style.display = 'inline-block';
    });

    // Minimize
    if(minimizeBtn2) minimizeBtn2.addEventListener('click', ()=>{
        for(let i=0; i<itemsPerPage2; i++){
          if(grid2.lastChild) grid2.removeChild(grid2.lastChild);
        }

        if(currentPage2 > 1) currentPage2--;
        if(currentPage2 === 1) minimizeBtn2.style.display = 'none';
    });

})();


// ===================================================================
// --- LOGIKA PENCARIAN (HARUS DI DALAM DOMContentLoaded) ---
// ===================================================================
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.search-bar-wrapper input');
    const searchIcon = document.querySelector('.search-bar-wrapper .search-icon'); 

    // Fungsi inti untuk melakukan pencarian
    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        if (keyword === "") return;

        // Cari item di window.catalogueData2 (memastikan akses global)
        const result = window.catalogueData2.find(item =>
            item.name.toLowerCase().includes(keyword)
        );

        if (result) {
            // A. Item Ditemukan: Scroll ke Catalogue Section
            document.getElementById('catalogue-section-2').scrollIntoView({ behavior: 'smooth' });
            
            // B. Buka Modal pop-up dengan data yang ditemukan.
            // Jeda 800ms untuk memastikan scroll selesai
            setTimeout(() => {
                openModal2(result); 
            }, 800); 

        } else {
            // Item Not Found: Display notification with a 2-second timer
            Swal.fire({
              icon: "error",
              title: "Search Failed", // English Title
              text: "The item you searched for has not been added to our catalogue. Please try again later.", // English Text
              timer: 3000, // Duration: 2000 milliseconds (2 seconds)
              showConfirmButton: false // Notification disappears automatically
            });
        }
        searchInput.value = '';
    }

    // 1. Event Listener untuk tombol ENTER
    if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }

    // 2. Event Listener untuk klik ICON (kaca pembesar)
    if (searchIcon) {
        searchIcon.addEventListener('click', performSearch);
    }
});







(function() {
  const track = document.getElementById('sliderTrack');
  const slides = Array.from(track.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  const total = slides.length;
  const intervalMs = 3000;
  let autoplayId = null;
  let isPaused = false;
  let resumeTimer = null;

  function goTo(index) {
    currentIndex = (index + total) % total;
    track.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  nextBtn.addEventListener('click', () => { stopAutoplayTemporarily(); next(); });
  prevBtn.addEventListener('click', () => { stopAutoplayTemporarily(); prev(); });

  function startAutoplay() {
    if (autoplayId) return;
    autoplayId = setInterval(() => {
      if (!isPaused) next();
    }, intervalMs);
  }
  function stopAutoplay() {
    if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
  }

  slides.forEach(slide => {
    const scrollArea = slide.querySelector('.slide-scroll');
    scrollArea.addEventListener('scroll', () => {
      isPaused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { isPaused = false; }, 1500);
    }, {passive:true});
    scrollArea.addEventListener('mouseenter', () => { isPaused = true; });
    scrollArea.addEventListener('mouseleave', () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { isPaused = false; }, 800);
    });
  });

  const frame = document.querySelector('.slider-frame');
  frame.addEventListener('mouseenter', () => { isPaused = true; });
  frame.addEventListener('mouseleave', () => { isPaused = false; });

  startAutoplay();
  goTo(0);

  function stopAutoplayTemporarily() {
    isPaused = true;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { isPaused = false; }, 2500);
  }
})();

// ambil tombol nav News
const newsNav = document.querySelector('.nav-links a[href="#section-3"]');

// ketika diklik
newsNav.addEventListener('click', function(e) {
    e.preventDefault(); // mencegah scroll default
    const target = document.querySelector('#section-3');

    // posisi target dikurangi offset (misal 50px lebih turun)
    const offset = 0; 
    const bodyRect = document.body.getBoundingClientRect().top;
    const targetRect = target.getBoundingClientRect().top;
    const targetPosition = targetRect - bodyRect - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});






// ... (RECYCLE GAME & TUTORIAL LOGIC DI BAWAH INI TIDAK BERUBAH)
// ...

// 1. Data Item & Variabel Global
const itemsData = [
  { name: 'Plastic Bottle', img: 'game/plastic_bottle.png', type: 'Plastic' },
  { name: 'Notebook', img: 'game/notebook.png', type: 'Paper' },
  { name: 'Aluminum Can', img: 'game/aluminium_can.png', type: 'Metal' },
  { name: 'Mobile Phone', img: 'game/mobile_phone.png', type: 'Electronics' },
  { name: 'Plastic Bag', img: 'game/plastic_bag.png', type: 'Plastic' },
  { name: 'Paper Coffee Cup', img: 'game/paper_cup.png', type: 'Paper' }
];

// 2. Definisi Audio
const bgMusic = new Audio('gamessound.mp3');
const soundCorrect = new Audio('right.mp3');
const soundWrong = new Audio('wrong.mp3');

bgMusic.loop = true;
bgMusic.volume = 0.4; // Menyetel volume agar tidak terlalu keras

const conveyor = document.getElementById('conveyor');
const bins = document.querySelectorAll('.bin');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const feedbackEl = document.getElementById('feedback');
const startBtn = document.getElementById('startBtn');

let score = 0;
let timer = 30;
let timerInterval;
let gameRunning = false;
let movingItems = [];

// 3. Fungsi Utama Game
startBtn.addEventListener('click', startGame);

function startGame() {
  conveyor.innerHTML = '';
  movingItems = [];
  score = 0;
  timer = 30;
  scoreEl.innerText = score;
  timerEl.innerText = timer;
  feedbackEl.innerText = '';
  gameRunning = true;
  startBtn.disabled = true;

  // Putar Musik Latar
  bgMusic.currentTime = 0;
  bgMusic.play().catch(error => console.log("Menunggu interaksi user untuk suara"));

  spawnItemsContinuous();

  timerInterval = setInterval(() => {
    timer--;
    timerEl.innerText = timer;
    if (timer <= 0) endGame();
  }, 1000);
}

function spawnItemsContinuous() {
  if (!gameRunning) return;

  const spacing = 180;
  const speed = 2;
  const itemEl = createItem();

  itemEl.style.left = -80 + 'px';
  conveyor.appendChild(itemEl);
  movingItems.push(itemEl);

  const spawnInterval = (spacing / speed) * 20;
  setTimeout(spawnItemsContinuous, spawnInterval);
}

// 4. Logika Pembuatan Item & Gerakan
function createItem() {
  const itemData = itemsData[Math.floor(Math.random() * itemsData.length)];
  const itemEl = document.createElement('img');
  itemEl.src = itemData.img;
  itemEl.classList.add('moving-item');
  itemEl.dataset.type = itemData.type;

  let pos = -80;
  let isDragging = false;
  let startX, startY, origX, origY;

  // Fungsi Drag Dimulai
  itemEl.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = itemEl.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    itemEl.style.position = 'fixed';
    itemEl.style.zIndex = 100;
  });

  // Logika saat Mouse Bergerak (Global)
  const onMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      itemEl.style.left = (origX + dx) + 'px';
      itemEl.style.top = (origY + dy) + 'px';
    }
  };

  // Logika saat Mouse Dilepas (Global)
  const onMouseUp = (e) => {
    if (isDragging) {
      isDragging = false;
      let dropped = false;

      bins.forEach(bin => {
        const binRect = bin.getBoundingClientRect();
        const itemRect = itemEl.getBoundingClientRect();
        
        // Cek apakah item masuk ke area bin
        if (itemRect.left + itemRect.width / 2 > binRect.left &&
            itemRect.left + itemRect.width / 2 < binRect.right &&
            itemRect.top + itemRect.height / 2 > binRect.top &&
            itemRect.top + itemRect.height / 2 < binRect.bottom) {
          
          dropped = true;
          
          if (itemEl.dataset.type === bin.dataset.type) {
            score++;
            feedbackEl.innerText = 'Correct!';
            feedbackEl.style.color = 'green';
            // Suara Benar
            soundCorrect.currentTime = 0;
            soundCorrect.play();
          } else {
            feedbackEl.innerText = `Wrong! It's ${itemEl.dataset.type}`;
            feedbackEl.style.color = 'red';
            if (score > 0) score--;
            // Suara Salah
            soundWrong.currentTime = 0;
            soundWrong.play();
          }
          
          scoreEl.innerText = score;
          itemEl.remove();
          movingItems = movingItems.filter(i => i !== itemEl);
          
          // Hapus event listener global agar tidak menumpuk
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
      });

      if (!dropped) {
        // Balikin ke conveyor kalau meleset
        itemEl.style.position = 'absolute';
        itemEl.style.top = '50%';
        itemEl.style.transform = 'translateY(-50%)';
      }
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  // Pergerakan Conveyor
  const moveInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(moveInterval);
      return;
    }
    if (!isDragging) {
      pos += 2;
      itemEl.style.left = pos + 'px';
      itemEl.style.top = '50%';
      itemEl.style.transform = 'translateY(-50%)';
    }
    if (pos > conveyor.clientWidth) {
      clearInterval(moveInterval);
      itemEl.remove();
      movingItems = movingItems.filter(i => i !== itemEl);
    }
  }, 20);

  return itemEl;
}

function endGame() {
    gameRunning = false;
    bgMusic.pause(); // Hentikan musik latar

    // Hapus semua item yang masih ada di layar
    movingItems.forEach(item => item.remove());
    movingItems = [];
    clearInterval(timerInterval);

    // MUNCILLKAN POP-UP GAME OVER DENGAN SWEETALERT2
    Swal.fire({
        title: 'GAME OVER!',
        text: `Great job! You helped us recycle and earned a score of ${score}.`,
        icon: score > 5 ? 'success' : 'info', // Kalau score > 5 kasih jempol/centang, kalau kecil kasih info
        confirmButtonText: 'Close',
        confirmButtonColor: '#4caf50',
        allowOutsideClick: false // User harus klik tombol biar ga sengaja ketutup
    }).then((result) => {
        if (result.isConfirmed) {
            // Jika user klik 'Play Again', tombol Start aktif kembali
            startBtn.disabled = false;
            conveyor.innerHTML = '';
            feedbackEl.innerText = '';
        }
    });

    startBtn.disabled = false;
    conveyor.innerHTML = '';
}

// DEFAULT 7 TUTORIAL
let tutorials = [
  {
    title: "How To Make Piglets With Recycled Plastic Bottles",
    video: "tutorial1.mp4",
    materials: ["Plastic bottle", "Markers", "Scissors", "Glue", "Pen", "Colorful paper"],
    method: `1. Clean the plastic bottle thoroughly and remove the label.
2. Cut out ears, tail, and nose from pink paper.
3. Paint the body of the bottle pink and let it dry.
4. Glue the ears, tail, and nose onto the bottle.
5. Use black marker to draw eyes and nostrils.
6. Optionally, add legs using small rolled paper or bottle caps.
7. Let everything dry completely before displaying your piglet.`,
    likes: 0,
    comments: []
  },
  {
    title: "How To Make DIY Creative Minimalist Calendar From Cardboard",
    video: "tutorial2.mp4",
    materials: ["Cardboard", "Glue", "Scissors", "Ruler", "Paper"],
    method: "1. Decide the size of the calendar, for example each month card 10×15 cm, and base 15×15 cm. \n 2. Cut 12 cardboard pieces for month cards and 1 piece for the base. Cover all cardboard pieces with bond paper for a clean surface. \n 3. Write the month name and dates on each card. \n 4. Cut 2 cardboard strips for side rails, for example 1×15 cm each. \n 5. Attach the rails to the sides of the base, leaving a gap for the cards to slide and flip. \n 6. Insert the 12 month cards into the rails, make sure they flip smoothly. \n 7. Add decorations or highlight important dates as you like.",
    likes: 0,
    comments: []
  },
  {
    title: "How To Make Jar & Thread Holder from Can",
    video: "tutorial3.mp4",
    materials: ["Empty can", "Scraps of fabric", "Hot glue gun", "Wool yarn", "Scissors", "Beads"],
    method: `1. Clean the empty can thoroughly and remove the label.
2. Cut a piece of scrap fabric large enough to wrap around the can.
3. Apply hot glue on the can and wrap the fabric tightly around it.
4. Glue the top edge neatly for a clean finish.
5. Decorate the fabric with beads or yarn as desired.
6. Roll some wool yarn into small balls and place inside the can.
7. Use the can to store needles and threads neatly.`,
    likes: 0,
    comments: []
  },
  {
    title: "Recycling Plastic Bottle Caps to Make Flower Pot Stand",
    video: "tutorial4.mp4",
    materials: ["Plastic gallon", "Scissors", "Colorful bottle caps", "Hot glue gun", "String", "Spray paint (pilox)"],
    method: `1. Clean the plastic gallon thoroughly and remove any labels.
2. Cut the gallon into desired shapes to create the base or support structure.
3. Arrange the colorful bottle caps on the cut pieces to form decorative patterns.
4. Use the hot glue gun to attach the bottle caps securely to the plastic pieces.
5. Paint the structure with spray paint (pilox) if desired for a uniform look.
6. Attach strings to stabilize or hang the structure if necessary.
7. Place your flower pots on the finished stand for a colorful garden display.`,
    likes: 0,
    comments: []
  },
  {
    title: "How To Make Beautiful Wall Hanging Craft Using Plastic Spoons",
    video: "tutorial5.mp4",
    materials: ["Cardboard", "Plastic spoons", "Hot glue gun", "Colored paper", "Beads"],
    method: `1. Cut the cardboard into the desired base shape for your wall hanging.
2. Arrange the plastic spoons in a decorative pattern on the cardboard.
3. Use the hot glue gun to attach the spoons securely to the cardboard.
4. Cut colored paper into small shapes to decorate the spoons.
5. Glue the paper decorations onto the spoons.
6. Add beads on top of the spoons or paper decorations for extra detail.
7. Hang your completed wall decoration on the wall.`,
    likes: 0,
    comments: []
  },
  {
    title: "DIY Flower Basket From Paper Cup",
    video: "tutorial6.mp4",
    materials: ["Paper cup", "Ruler", "Scissors", "Hot glue gun", "Ribbon"],
    method: `1. Take a paper cup and flatten it slightly to prepare for cutting.
2. Measure and mark the sections you want to cut using a ruler.
3. Carefully cut the sections with scissors to create basket flaps.
4. Fold the flaps upwards to form the basket walls.
5. Use a hot glue gun to secure the flaps in place.
6. Decorate the basket with ribbon or other embellishments.
7. Place artificial flowers or small items inside your finished basket.`,
    likes: 0,
    comments: []
  }
]

let currentTutorial = 0;

function loadTutorial(index) {
  const t = tutorials[index];

  document.getElementById("tutorialVideo").src = t.video;
  document.getElementById("tutorialTitle").innerText = t.title;

  let materialList = document.getElementById("tutorialMaterials");
  materialList.innerHTML = "";
  t.materials.forEach(m => {
    let li = document.createElement("li");
    li.innerText = m;
    materialList.appendChild(li);
  });

  document.getElementById("tutorialMethod").innerText = t.method;
  document.getElementById("likeCount").innerText = t.likes;

  let commentList = document.getElementById("commentList");
  commentList.innerHTML = "";
  t.comments.forEach(c => {
    let li = document.createElement("li");
    li.innerText = c;
    commentList.appendChild(li);
  });
}

loadTutorial(currentTutorial);

// Arrows
document.getElementById("nextTutorial").addEventListener("click", () => {
  currentTutorial = (currentTutorial + 1) % tutorials.length;
  loadTutorial(currentTutorial);
});

document.getElementById("prevTutorial").addEventListener("click", () => {
  currentTutorial = (currentTutorial - 1 + tutorials.length) % tutorials.length;
  loadTutorial(currentTutorial);
});

// LIKE
document.getElementById("likeBtn").addEventListener("click", () => {
  tutorials[currentTutorial].likes++;
  document.getElementById("likeCount").innerText = tutorials[currentTutorial].likes;
});

// COMMENT
document.getElementById("addCommentBtn").addEventListener("click", () => {
  let text = document.getElementById("commentInput").value;
  if (text.trim() === "") return;

  tutorials[currentTutorial].comments.push(text);
  document.getElementById("commentInput").value = "";
  loadTutorial(currentTutorial);
});

// Fungsi utama untuk menjalankan search agar tidak menulis kode dua kali
function performSearch() {
  const searchInput = document.getElementById("tutorialSearchInput");
  let keyword = searchInput.value.toLowerCase().trim();

  // Jika input kosong, jangan lakukan apa-apa
  if (keyword === "") return;

  let foundIndex = tutorials.findIndex(t =>
    t.materials.join(" ").toLowerCase().includes(keyword)
  );

  if (foundIndex !== -1) {
    currentTutorial = foundIndex;
    loadTutorial(currentTutorial);
  } else {
    alert("Tutorial not found!");
  }

  // KOSONGKAN kolom input setelah search (berhasil atau gagal)
  searchInput.value = "";
}

// 1. SEARCH pakai klik tombol
document.getElementById("tutorialSearchBtn").addEventListener("click", performSearch);

// 2. SEARCH pakai tombol ENTER
document.getElementById("tutorialSearchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});
document.getElementById("uploadTutorialBtn").addEventListener("click", () => {
  let media = document.getElementById("uploadMedia").files[0];
  let title = document.getElementById("uploadTitle").value;
  let mats = document.getElementById("uploadMaterials").value.split(",");
  let method = document.getElementById("uploadMethod").value;

  if (!media || !title || !method) {
    alert("Please fill all fields!");
    return;
  }

  let newTutorial = {
    title: title,
    video: URL.createObjectURL(media),
    materials: mats,
    method: method,
    likes: 0,
    comments: []
  };

  tutorials.push(newTutorial);

  alert("Tutorial uploaded!");

  loadTutorial(tutorials.length - 1);
  currentTutorial = tutorials.length - 1;

  // reset semua input
  document.getElementById("uploadMedia").value = "";
  document.getElementById("uploadTitle").value = "";
  document.getElementById("uploadMaterials").value = "";
  document.getElementById("uploadMethod").value = "";
});




document.addEventListener("DOMContentLoaded", function() {
    const filterSelect = document.getElementById('sustainabilityFilter');
    const resultsOverlay = document.getElementById('filterResultContainer');
    const resultsList = document.getElementById('resultsList');
    const searchInput = document.getElementById('mainSearchInput');

    function performFilter() {
        const selectedValue = filterSelect.value;
        const keyword = searchInput.value.toLowerCase();

        // Cari data
        const filteredData = window.catalogueData2.filter(item => {
            const matchesFilter = selectedValue === "all" || item.sustain === selectedValue;
            const matchesKeyword = item.name.toLowerCase().includes(keyword);
            return matchesFilter && matchesKeyword;
        });

        resultsList.innerHTML = '';

        if (filteredData.length > 0) {
            resultsOverlay.style.display = 'block';
            
            filteredData.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'result-item';
                itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <span>${item.name}</span>
                `;

                itemDiv.addEventListener('click', () => {
                    openModal2(item); // Buka modal detail
                });

                resultsList.appendChild(itemDiv);
            });
            
            // Scroll otomatis ke list hasil
            resultsOverlay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            resultsOverlay.style.display = 'none';
        }
    }

    filterSelect.addEventListener('change', performFilter);
    
    // Fungsi tutup manual
    window.closeResults = function() {
        resultsOverlay.style.display = 'none';
    };
});


// Ambil elemen pop-up
const twModalfOverlay = document.getElementById("tw-modalf-overlay");
const twModalfHeader = document.getElementById("tw-modalf-header");
const twModalfText = document.getElementById("tw-modalf-text");
const twModalfClose = document.querySelector(".tw-modalf-close-btn");
const twModalfBtnOk = document.querySelector(".tw-modalf-btn-ok");

// Isi konten otomatis
const twContentData = {
    "Privacy": {
        title: "🛡️ Privacy Policy",
        content: "At <b>Thingwise</b>, we value your privacy. We only collect data necessary to improve your recycling experience and never sell your personal information."
    },
    "Terms": {
        title: "📜 Terms of Service",
        content: "By using our platform, you agree to participate in recycling activities honestly and follow our community guidelines for a cleaner planet."
    },
    "Support": {
        title: "🤝 Support Center",
        content: "Need help? Contact our green team at <b>thingwiseco@gmail.com</b>. Or you can directly message us from <b>Contact Us</b>. We are available to assist you."
    }
};

// Hubungkan ke link footer yang sudah ada
document.querySelectorAll(".footer-bottom-links a").forEach(link => {
    link.addEventListener("click", (e) => {
        const type = e.target.innerText; // Mengambil kata "Privacy", "Terms", atau "Support"
        
        if (twContentData[type]) {
            e.preventDefault(); // Mencegah link pindah halaman
            twModalfHeader.innerText = twContentData[type].title;
            twModalfText.innerHTML = twContentData[type].content;
            twModalfOverlay.style.display = "flex"; // Munculkan pop-up
        }
    });
});

// Fungsi untuk menutup
const closeTwModal = () => {
    twModalfOverlay.style.display = "none";
};

twModalfClose.onclick = closeTwModal;
twModalfBtnOk.onclick = closeTwModal;

// Tutup jika klik area hitam (luar kotak)
window.onclick = (event) => {
    if (event.target == twModalfOverlay) closeTwModal();
};

// SEARCH TUTORIAL DENGAN SWEETALERT2 (IKON X)
function performSearch() {
    const searchInput = document.getElementById("tutorialSearchInput");
    let keyword = searchInput.value.toLowerCase().trim();

    if (keyword === "") return;

    let foundIndex = tutorials.findIndex(t =>
        t.materials.join(" ").toLowerCase().includes(keyword)
    );

    if (foundIndex !== -1) {
        currentTutorial = foundIndex;
        loadTutorial(currentTutorial);
    } else {
        // Menggunakan icon "error" untuk memunculkan tanda silang (X) merah
        Swal.fire({
            icon: "error", 
            title: "Not Found",
            text: "The tutorial or material that you search not yet in our section! You can add yours if you want! Or try again later.",
            timer: 3000, 
            showConfirmButton: false,
            timerProgressBar: true
        });
    }

    searchInput.value = "";
}

// Handler Klik Tombol
document.getElementById("tutorialSearchBtn").addEventListener("click", performSearch);

// Handler Tekan Enter
document.getElementById("tutorialSearchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        performSearch();
    }

});
