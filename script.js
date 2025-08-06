if (localStorage.getItem('popupClosed')) {
  document.getElementById("popUpOverlay").style.display = 'none';
}

// Tombol mulai belanja
document.getElementById("startBtn").addEventListener("click", function () {
  document.getElementById("popUpOverlay").style.display = 'none';
  localStorage.setItem('popupClosed', 'true');
});

// Ambil pilihan dari localStorage
const pilihan = JSON.parse(localStorage.getItem('pilihan')) || [];
renderPilihan();

const dataItem = [
  { id: '1', name: 'Beras', price: 12000, sehat: true },
  { id: '2', name: 'Gula', price: 11000, sehat: true },
  { id: '3', name: 'Tepung', price: 9000, sehat: true },
  { id: '4', name: 'Minyak', price: 15000, sehat: true },
  { id: '5', name: 'Mie', price: 2500, sehat: true },
  { id: '6', name: 'Mentega', price: 7000, sehat: true },
  { id: '7', name: 'Teh', price: 5000, sehat: true },
  { id: '8', name: 'Kopi', price: 6000, sehat: true },
  { id: '9', name: 'Kecap', price: 8000, sehat: true },
  { id: '10', name: 'Saus', price: 7500, sehat: true },
  { id: '11', name: 'Susu', price: 10000, sehat: true },
  { id: '12', name: 'Kaldu Ayam', price: 3500, sehat: true },
  { id: '13', name: 'Kaldu Jamur', price: 4000, sehat: true },
  { id: '14', name: 'Kaldu Sapi', price: 3500, sehat: true },
  { id: '15', name: 'Telur', price: 23000, sehat: true },
  { id: '16', name: 'Wafer', price: 3000, sehat: true },
  { id: '17', name: 'Sandwich', price: 7000, sehat: true },
  { id: '18', name: 'Onigiri', price: 8000, sehat: true },
  { id: '19', name: 'Puding', price: 5000, sehat: true },
  { id: '20', name: 'Stick Choco', price: 6000, sehat: true },
  { id: '21', name: 'Susu Strawberi', price: 9500, sehat: true },
  { id: '22', name: 'Susu Pisang', price: 9500, sehat: true },
  { id: '23', name: 'Susu Melon', price: 9500, sehat: true },
  { id: '24', name: 'Chips', price: 7000, sehat: false },
  { id: '25', name: 'Coklat', price: 8000, sehat: false },
  { id: '26', name: 'Permen Karet', price: 3000, sehat: false },
  { id: '27', name: 'Soda Peach', price: 10000, sehat: false },
  { id: '28', name: 'Soda Strawberi', price: 10000, sehat: false },
  { id: '29', name: 'Kopi Instan', price: 6000, sehat: false },
  { id: '30', name: 'Cola', price: 9500, sehat: false },
];

const rack = document.getElementById('rack');

// Search using includes
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const cards = rack.querySelectorAll("button");

  cards.forEach(card => {
    const img = card.querySelector("img");
    const namaProduk = img?.alt?.toLowerCase() || '';
    if (namaProduk.includes(keyword)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});

// Tampilkan semua item
dataItem.forEach(item => {
  const btn = document.createElement('button');
  btn.className = 'border-style3 relative flex flex-col items-center justify-between p-4 rounded-xl shadow-sm bg-white transition hover:shadow-md hover:scale-105';
  btn.innerHTML = `
  <img class="size-40 object-contain" src="assets/${item.id}.png" alt="${item.name}">
  <p class="price text-sm mt-2 flex items-center justify-between gap-2 w-full">
    <button class="minus hidden border px-2 py-0.5 rounded text-md bg-slate-100 text-slate-800 font-semibold">-</button>
    <span class="text-center grow">Rp ${item.price.toLocaleString('id-ID')}</span>
    <button class="plus hidden border px-2 py-0.5 rounded text-md bg-slate-100 text-slate-800 font-semibold">+</button>
  </p>
  <span class="qty-badge hidden absolute -top-4 -right-4 bg-slate-800 text-white text-lg flex justify-center items-center rounded-full size-10">0</span>
  `;

  let qty = pilihan.find(p => p.id === item.id)?.qty || 0;

  const plusBtn = btn.querySelector('.plus');
  const minusBtn = btn.querySelector('.minus');
  const qtyBadge = btn.querySelector('.qty-badge');

  // Saat diklik pertama kali
  btn.addEventListener('click', () => {
    if (qty === 0) {
      qty = 1;
      qtyBadge.textContent = qty;
      qtyBadge.classList.remove('hidden');
      plusBtn.classList.remove('hidden');
      minusBtn.classList.remove('hidden');
      pilihan.push({ ...item, qty });
      localStorage.setItem('pilihan', JSON.stringify(pilihan));
    }
  });

  plusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    qty++;
    qtyBadge.textContent = qty;
    const idx = pilihan.findIndex(p => p.id === item.id);
    if (idx > -1) pilihan[idx].qty = qty;
    else pilihan.push({ ...item, qty });
    localStorage.setItem('pilihan', JSON.stringify(pilihan));
  });

  minusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (qty > 1) {
      qty--;
      qtyBadge.textContent = qty;
      const idx = pilihan.findIndex(p => p.id === item.id);
      if (idx > -1) pilihan[idx].qty = qty;
      localStorage.setItem('pilihan', JSON.stringify(pilihan));
    } else if (qty === 1) {
      qty = 0;
      qtyBadge.classList.add('hidden');
      plusBtn.classList.add('hidden');
      minusBtn.classList.add('hidden');
      qtyBadge.textContent = '0';
      const index = pilihan.findIndex(p => p.id === item.id);
      if (index > -1) pilihan.splice(index, 1);
      localStorage.setItem('pilihan', JSON.stringify(pilihan));
    }
  });

  // Jika qty > 0 dari localStorage, tampilkan badge dan tombol
  if (qty > 0) {
    qtyBadge.textContent = qty;
    qtyBadge.classList.remove('hidden');
    plusBtn.classList.remove('hidden');
    minusBtn.classList.remove('hidden');
  }

  rack.appendChild(btn);
});

// Fungsi untuk menampilkan halaman sesuai nama
function showPage(pageId) {
  const pages = ["page1", "page2", "page3"];
  pages.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const active = document.getElementById(pageId);
  if (active) active.classList.remove('hidden');
}

// Saat halaman dimuat, tampilkan halaman terakhir yang dibuka
document.addEventListener("DOMContentLoaded", function () {
  const lastPage = localStorage.getItem('activePage') || "page1";
  showPage(lastPage);
  renderPilihan();
});

// PAGE 1
const page1Btn = document.getElementById("page1button");
if (page1Btn) {
  page1Btn.onclick = () => {
    showPage("page2");
    localStorage.setItem('activePage', 'page2');
    renderPilihan(); 
  };
}

// PAGE 2
const previousBtn = document.getElementsByClassName("previousBtn");
if (previousBtn.length > 0) {
  previousBtn[0].onclick = () => {
    showPage("page1");
    localStorage.setItem('activePage', 'page1');
    renderPilihan(); 
  };
}

const nextbtn = document.getElementsByClassName("nextBtn");
if (nextbtn.length > 0) {
  nextbtn[0].onclick = () => {
    showPage("page3");
    localStorage.setItem('activePage', 'page3');
    renderPilihan();
  };
}

// PAGE 3
const previousBtn1 = document.getElementsByClassName("previousBtn1");
if (previousBtn1.length > 0) {
  previousBtn1[0].onclick = () => {
    showPage("page2");
    localStorage.setItem('activePage', 'page2');
    renderPilihan(); 
  };
}

const nextbtn1 = document.getElementsByClassName("nextBtn1");
if (nextbtn1.length > 0) {
  nextbtn1[0].onclick = () => {
    showPage("page3");
    localStorage.setItem('activePage', 'page3');
    renderPilihan();
  };
}

function renderPilihan() {
  const pilihanRack = document.getElementById('pilihanRack');
  pilihanRack.innerHTML = ''; // Kosongkan isi

  const pilihan = JSON.parse(localStorage.getItem('pilihan')) || [];

  pilihan.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'border-style3 relative flex flex-col items-center justify-between p-4 rounded-xl shadow-sm bg-white transition hover:shadow-md hover:scale-105';
    btn.innerHTML = `
    <img class="size-40 object-contain" src="assets/${item.id}.png" alt="${item.name}">
    <p class="price text-sm mt-2 flex items-center justify-between gap-2 w-full">
      <button class="minus border px-2 py-0.5 rounded text-md bg-slate-100 text-slate-800 font-semibold">-</button>
      <span class="text-center grow">Rp ${item.price.toLocaleString('id-ID')}</span>
      <button class="plus border px-2 py-0.5 rounded text-md bg-slate-100 text-slate-800 font-semibold">+</button>
    </p>
    <span class="qty-badge absolute -top-4 -right-4 bg-slate-800 text-white text-lg flex justify-center items-center rounded-full size-10">${item.qty}</span>
    `;

    const plusBtn = btn.querySelector('.plus');
    const minusBtn = btn.querySelector('.minus');
    const qtyBadge = btn.querySelector('.qty-badge');
    let qty = item.qty;

    plusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      qty++;
      qtyBadge.textContent = qty;
      const idx = pilihan.findIndex(p => p.id === item.id);
      if (idx > -1) pilihan[idx].qty = qty;
      localStorage.setItem('pilihan', JSON.stringify(pilihan));
      renderPilihan();
    });

    minusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (qty > 1) {
        qty--;
        qtyBadge.textContent = qty;
        const idx = pilihan.findIndex(p => p.id === item.id);
        if (idx > -1) pilihan[idx].qty = qty;
        localStorage.setItem('pilihan', JSON.stringify(pilihan));
      } else if (qty === 1) {
        const index = pilihan.findIndex(p => p.id === item.id);
        if (index > -1) pilihan.splice(index, 1);
        localStorage.setItem('pilihan', JSON.stringify(pilihan));
      }
      renderPilihan(); // render ulang
    });

    pilihanRack.appendChild(btn);
  });
}

const forEach = document.getElementById('forEach');
if (forEach) {
  forEach.onclick = () => {
    document.getElementById("pilihanRack").classList.remove('hidden');
    renderPilihan()
  }
}

const includesBtn = document.getElementById("includes");
if (includesBtn) {
  includesBtn.addEventListener("click", () => {
    const listBelanja = [
      { name: "Mie", qty: 5 },
      { name: "Mentega", qty: 1 },
      { name: "Telur", qty: 5 },
      { name: "Saus", qty: 2 },
      { name: "Susu", qty: 2 },
      { name: "Kaldu Jamur", qty: 1 }
    ];

    const pilihan = JSON.parse(localStorage.getItem("pilihan")) || [];
    const ulResult = document.querySelector("#hasilIncludes"); // tempat outputnya
    ulResult.innerHTML = "";

    listBelanja.forEach(item => {
      const found = pilihan.find(p => p.name.toLowerCase() === item.name.toLowerCase());
      let status = "";
      if (found) {
        if (found.qty >= item.qty) {
          status = `<button class="highlight bg-green-200 px-2 rounded">ada</button>`;
        } else {
          status = `<button class="highlight bg-yellow-200 px-2 rounded">kurang (${found.qty}/${item.qty})</button>`;
        }
      } else {
        status = `<button class="highlight bg-red-200 px-2 rounded">tidak ada</button>`;
      }

      // hanya tampilkan kalau ketemu di pilihan
      if (found) {
        const li = document.createElement("li");
        li.className = "flex gap-2 items-center justify-between py-1";
        li.innerHTML = `<p>${item.qty} ${item.name}</p> ${status}`;
        ulResult.appendChild(li);
      }
    });
  });
}

// RESET BUTTON
const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
  resetBtn.onclick = () => {
    localStorage.clear();
    location.reload();
  };
}


