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



(function(){
  const grid2 = document.getElementById('catalogueGrid2');
  const expandBtn2 = document.getElementById('expandBtn2');
  const modal2 = document.getElementById('catalogueModal2');
  const modalOverlay2 = document.getElementById('modalOverlay2');
  const modalClose2 = document.getElementById('modalClose2');

  const modalImg2 = document.getElementById('modalImg2');
  const modalName2 = document.getElementById('modalName2');
  const modalRaw2 = document.getElementById('modalRaw2');
  const modalProcess2 = document.getElementById('modalProcess2');
  const modalTime2 = document.getElementById('modalTime2');
  const modalWaste2 = document.getElementById('modalWaste2');
  const modalSustain2 = document.getElementById('modalSustain2');

  const itemsPerPage2 = 8;
  let currentPage2 = 0;

  const catalogueData2 = [
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

    [img, caption].forEach(el => el.addEventListener('click', ()=> openModal2(item)));

    card.appendChild(img);
    card.appendChild(caption);
    return card;
  }

  function renderPage2(page){
    // Bersihkan grid terlebih dahulu
    grid2.innerHTML = '';

    // Tampilkan sampai current page
    const end = (page + 1) * itemsPerPage2;
    catalogueData2.slice(0, end).forEach(item => {
      grid2.appendChild(createCard2(item));
    });
  }

  function openModal2(item){
    modalImg2.src = item.img;
    modalName2.innerText = item.name;
    modalRaw2.innerText = item.raw;
    modalProcess2.innerText = item.process;
    modalTime2.innerText = item.time;
    modalWaste2.innerText = item.waste;

    modalSustain2.innerText = item.sustain.charAt(0).toUpperCase() + item.sustain.slice(1);
    modalSustain2.className = 'sustain-badge ' + 
      (item.sustain==='high'?'sustain-high':item.sustain==='moderate'?'sustain-moderate':'sustain-low');

    modal2.classList.add('show');
  }

  modalClose2.addEventListener('click', ()=> modal2.classList.remove('show'));
  modalOverlay2.addEventListener('click', ()=> modal2.classList.remove('show'));

  // Render awal 8 card
  renderPage2(0);
  currentPage2 = 1; // menandai page pertama sudah tampil
  minimizeBtn2.style.display = 'none'; // tombol minimize awalnya hilang

  // Expand More (tambah 8 card per klik)
  expandBtn2.addEventListener('click', ()=>{
    const start = currentPage2 * itemsPerPage2;
    const end = start + itemsPerPage2;
    
    catalogueData2.slice(start, end).forEach(item => {
      grid2.appendChild(createCard2(item));
    });

    currentPage2++;

    // Tampilkan tombol minimize kalau page > 1
    if(currentPage2 > 1) minimizeBtn2.style.display = 'inline-block';
  });

  // Minimize (hapus 8 card terakhir per klik)
  minimizeBtn2.addEventListener('click', ()=>{
    for(let i=0; i<itemsPerPage2; i++){
      if(grid2.lastChild) grid2.removeChild(grid2.lastChild);
    }

    if(currentPage2 > 1) currentPage2--;

    // Sembunyikan tombol jika kembali ke 8 card awal
    if(currentPage2 === 1) minimizeBtn2.style.display = 'none';
  });

})();



const itemsData = [
  {name:'Plastic Bottle', img:'game/plastic_bottle.png', type:'Plastic'},
  {name:'Notebook', img:'game/notebook.png', type:'Paper'},
  {name:'Aluminum Can', img:'game/aluminium_can.png', type:'Metal'},
  {name:'Mobile Phone', img:'game/mobile_phone.png', type:'Electronics'},
  {name:'Plastic Bag', img:'game/plastic_bag.png', type:'Plastic'},
  {name:'Paper Coffee Cup', img:'game/paper_cup.png', type:'Paper'}
];

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

startBtn.addEventListener('click', startGame);

function startGame(){
  conveyor.innerHTML = '';
  movingItems = [];
  score = 0;
  timer = 30;
  scoreEl.innerText = score;
  timerEl.innerText = timer;
  feedbackEl.innerText = '';
  gameRunning = true;
  startBtn.disabled = true;

  // spawn item dengan jarak tetap
  spawnItemsContinuous();

  timerInterval = setInterval(()=>{
    timer--;
    timerEl.innerText = timer;
    if(timer <=0) endGame();
  },1000);
}

// spawn unlimited item dengan jarak sama (misal 180px)
function spawnItemsContinuous(){
  if(!gameRunning) return;

  const spacing = 180; // jarak tetap antar item
  const itemEl = createItem();

  // posisi awal: -80 px dari kiri
  itemEl.style.left = -80 + 'px';
  conveyor.appendChild(itemEl);
  movingItems.push(itemEl);

  // spawn item berikutnya setelah spacing / speed detik
  const speed = 2; // px per frame
  const spawnInterval = spacing / speed * 20; // 20ms per frame
  setTimeout(spawnItemsContinuous, spawnInterval);
}

function createItem(){
  const itemData = itemsData[Math.floor(Math.random() * itemsData.length)];
  const itemEl = document.createElement('img');
  itemEl.src = itemData.img;
  itemEl.classList.add('moving-item');
  itemEl.dataset.type = itemData.type;

  let pos = -80;

  // drag & drop
  let isDragging = false;
  let startX, startY, origX, origY;

  itemEl.addEventListener('mousedown', e=>{
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = itemEl.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    itemEl.style.position = 'fixed';
    itemEl.style.zIndex = 100;
  });

  document.addEventListener('mousemove', e=>{
    if(isDragging){
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      itemEl.style.left = (origX + dx) + 'px';
      itemEl.style.top = (origY + dy) + 'px';
    }
  });

  document.addEventListener('mouseup', e=>{
    if(isDragging){
      isDragging = false;
      let dropped = false;
      bins.forEach(bin=>{
        const binRect = bin.getBoundingClientRect();
        const itemRect = itemEl.getBoundingClientRect();
        if(itemRect.left + itemRect.width/2 > binRect.left &&
           itemRect.left + itemRect.width/2 < binRect.right &&
           itemRect.top + itemRect.height/2 > binRect.top &&
           itemRect.top + itemRect.height/2 < binRect.bottom){
          dropped = true;
          if(itemEl.dataset.type === bin.dataset.type){
            score++;
            feedbackEl.innerText = 'Correct!';
          } else {
            feedbackEl.innerText = `Wrong! It's ${itemEl.dataset.type}`;
            if(score>0) score--;
          }
          scoreEl.innerText = score;
          itemEl.remove();
          movingItems = movingItems.filter(i=>i!==itemEl);
        }
      });
      if(!dropped){
        itemEl.style.position = 'absolute';
        itemEl.style.top = '50%';
        itemEl.style.transform = 'translateY(-50%)';
      }
    }
  });

  // gerak conveyor smooth
  const moveInterval = setInterval(()=>{
    if(!gameRunning) return clearInterval(moveInterval);
    if(!isDragging){
      pos += 2;
      itemEl.style.left = pos + 'px';
      itemEl.style.top = '50%';
      itemEl.style.transform = 'translateY(-50%)';
    }
    if(pos > conveyor.clientWidth){
      clearInterval(moveInterval);
      itemEl.remove();
      movingItems = movingItems.filter(i=>i!==itemEl);
    }
  },20);

  return itemEl;
}

function endGame(){
  gameRunning = false;
  movingItems.forEach(item=>item.remove());
  movingItems = [];
  clearInterval(timerInterval);
  alert('Game Over! Your score: ' + score);
  startBtn.disabled = false;
  conveyor.innerHTML = '';
}
