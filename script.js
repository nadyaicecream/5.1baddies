/* Class 5.1 Website Script */
(function () {
  'use strict';

  // ===== Data =====
  let data = null;

  // ===== Elements =====
  const enterOverlay = document.getElementById('enter-overlay');
  const enterBtn = document.getElementById('enter-btn');
  const audio = document.getElementById('bg-music');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const muteBtn = document.getElementById('mute-btn');
  const musicControl = document.getElementById('music-control');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const modal = document.getElementById('member-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  // ===== Init =====
  async function init() {
    try {
      const res = await fetch('data.json');
      data = await res.json();
    } catch (e) {
      console.warn('Could not load data.json, using fallback');
      data = getFallbackData();
    }

    setupParticles();
    setupClock();
    setupCountdown();
    setupQuote();
    setupAnnouncement();
    setupHeroStudents();
    setupMembers();
    setupPiket();
    setupPelajaran();
    setupBirthday();
    setupJar();
    setupGuestbook();
    setupMood();
    setupNav();
    setupMusic();
    setupEnter();
  }

  // ===== Enter Overlay =====
  function setupEnter() {
    // Check if already entered this session
    if (sessionStorage.getItem('class51_entered')) {
      enterOverlay.classList.add('hidden');
      return;
    }

    enterBtn.addEventListener('click', () => {
      enterOverlay.classList.add('hidden');
      sessionStorage.setItem('class51_entered', '1');
      // Try play music
      audio.play().then(() => {
        playPauseBtn.textContent = '⏸';
      }).catch(() => {
        // still blocked, user can use controls
      });
    });
  }

  // ===== Music =====
  function setupMusic() {
    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          playPauseBtn.textContent = '⏸';
          isPlaying = true;
        }).catch(() => {
          alert('Klik tombol ENTER CLASS dulu atau izinkan audio di browser.');
        });
      } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
        isPlaying = false;
      }
    });

    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    });

    // Keep playing across navigation (single page)
    audio.volume = 0.4;
  }

  // ===== Particles =====
  function setupParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = Math.random() > 0.6 ? 'particle star' : 'particle';
      if (p.classList.contains('star')) {
        p.textContent = ['✨', '⭐', '🌟'][Math.floor(Math.random() * 3)];
      }
      const size = Math.random() * 12 + 6;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.animationDuration = (Math.random() * 10 + 12) + 's';
      container.appendChild(p);
    }
  }

  // ===== Clock =====
  function setupClock() {
    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    function update() {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }
    update();
    setInterval(update, 1000);
  }

  // ===== Countdown (to end of year / special day) =====
  function setupCountdown() {
    // Target: 31 Dec 2026 00:00
    const target = new Date('2026-12-31T00:00:00').getTime();

    function update() {
      const now = Date.now();
      let diff = target - now;
      if (diff < 0) diff = 0;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('cd-days').textContent = days;
      document.getElementById('cd-hours').textContent = hours;
      document.getElementById('cd-mins').textContent = mins;
      document.getElementById('cd-secs').textContent = secs;
    }
    update();
    setInterval(update, 1000);
  }

  // ===== Quote =====
  function setupQuote() {
    const quotes = data.quotes || [];
    const el = document.getElementById('class-quote');
    if (quotes.length) {
      el.textContent = '"' + quotes[Math.floor(Math.random() * quotes.length)] + '"';
    }
  }

  // ===== Announcement =====
  function setupAnnouncement() {
    const anns = data.announcements || [];
    if (anns.length) {
      const a = anns[0];
      document.getElementById('announcement-text').textContent = a.content;
    }
  }

  // ===== Hero Students =====
  function setupHeroStudents() {
    const grid = document.getElementById('hero-students');
    const members = data.members || [];
    members.forEach((m, i) => {
      const div = document.createElement('div');
      div.className = 'student-avatar';
      div.textContent = '🧕';
      div.title = m.nickname;
      grid.appendChild(div);
    });
  }

  // ===== Members =====
  function setupMembers() {
    const grid = document.getElementById('members-grid');
    const searchInput = document.getElementById('search-member');
    const filterSelect = document.getElementById('filter-absen');
    const members = data.members || [];

    // Fill filter
    members.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.absen;
      opt.textContent = `Absen ${m.absen}`;
      filterSelect.appendChild(opt);
    });

    function render(list) {
      grid.innerHTML = '';
      list.forEach(m => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
          <div class="member-avatar">🧕</div>
          <div class="member-name">${m.fullName}</div>
          <div class="member-nick">"${m.nickname}"</div>
          <span class="member-absen">Absen ${m.absen}</span>
        `;
        card.addEventListener('click', () => openModal(m));
        grid.appendChild(card);
      });
    }

    function filter() {
      const q = searchInput.value.toLowerCase().trim();
      const abs = filterSelect.value;
      let list = members.filter(m => {
        const matchName = !q || m.fullName.toLowerCase().includes(q) || m.nickname.toLowerCase().includes(q);
        const matchAbs = !abs || String(m.absen) === abs;
        return matchName && matchAbs;
      });
      render(list);
    }

    searchInput.addEventListener('input', filter);
    filterSelect.addEventListener('change', filter);
    render(members);
  }

  function openModal(m) {
    modalBody.innerHTML = `
      <div class="modal-avatar">🧕</div>
      <div class="modal-name">${m.fullName}</div>
      <div class="modal-nick">"${m.nickname}" • Absen ${m.absen}</div>
      <div class="modal-info">
        <div class="modal-row"><span>Motto</span><span>${m.motto}</span></div>
        <div class="modal-row"><span>Hobi</span><span>${m.hobby}</span></div>
        <div class="modal-row"><span>Makanan Favorit</span><span>${m.food}</span></div>
        <div class="modal-row"><span>Minuman Favorit</span><span>${m.drink}</span></div>
        <div class="modal-row"><span>Warna Favorit</span><span>${m.color}</span></div>
        <div class="modal-row"><span>Fun Fact</span><span>${m.funFact}</span></div>
        <div class="modal-row"><span>Cita-cita</span><span>${m.citaCita}</span></div>
        <div class="modal-row"><span>Ulang Tahun</span><span>${m.birthday}</span></div>
      </div>
      <div class="modal-quote">"${m.quote}"</div>
    `;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('show'));
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => { modal.hidden = true; }, 350);
  }

  // ===== Piket =====
  function setupPiket() {
    const grid = document.getElementById('piket-grid');
    const schedule = data.cleaningSchedule || {};
    const icons = { Senin: '🧹', Selasa: '🪣', Rabu: '✨', Kamis: '🧼', Jumat: '🌟' };
    const dayClass = { Senin: 'senin', Selasa: 'selasa', Rabu: 'rabu', Kamis: 'kamis', Jumat: 'jumat' };

    Object.entries(schedule).forEach(([day, names]) => {
      const card = document.createElement('div');
      card.className = `piket-card ${dayClass[day] || ''}`;
      card.innerHTML = `
        <div class="piket-day">${icons[day] || '🧹'} ${day}</div>
        <div class="piket-names">
          ${names.map(n => `<div class="piket-name">${n}</div>`).join('')}
        </div>
        <div class="piket-icons">🧹🪣✨</div>
      `;
      grid.appendChild(card);
    });
  }

  // ===== Pelajaran =====
  function setupPelajaran() {
    const grid = document.getElementById('pelajaran-grid');
    const schedule = data.lessonSchedule || {};

    Object.entries(schedule).forEach(([day, subjects]) => {
      const card = document.createElement('div');
      card.className = 'pelajaran-card';
      card.innerHTML = `
        <div class="pelajaran-day">${day}</div>
        <div class="pelajaran-list">
          ${subjects.map(s => `<div class="pelajaran-item">${s}</div>`).join('')}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // ===== Birthday =====
  function setupBirthday() {
    const grid = document.getElementById('birthday-grid');
    const members = (data.members || []).slice().sort((a, b) => {
      // simple sort by month name roughly
      return a.birthday.localeCompare(b.birthday);
    });

    members.forEach(m => {
      const card = document.createElement('div');
      card.className = 'bday-card';
      card.innerHTML = `
        <div class="bday-avatar">🎂</div>
        <div class="bday-name">${m.nickname}</div>
        <div class="bday-date">${m.birthday}</div>
      `;
      grid.appendChild(card);
    });
  }

  // ===== Jar of Memories =====
  function setupJar() {
    const messages = [
      "Hari pertama kita saling kenal, semua masih canggung tapi sekarang sudah seperti keluarga 🩵",
      "Ingat waktu hujan deras dan kita semua stuck di kelas sambil cerita-cerita? Seru banget!",
      "Piket bareng selalu diisi tawa, meski kadang ada yang males 😂",
      "Desain grafis project yang bikin kita begadang tapi hasilnya membanggakan!",
      "Ulang tahun teman yang dirayakan sederhana tapi penuh kehangatan.",
      "Momen di mana kita saling bantu ngerjain tugas susah. Solidarity level 100!",
      "Foto bersama di akhir semester yang jadi wallpaper HP banyak orang.",
      "Guru yang sabar dan selalu support kita. Terima kasih Bu! 💛",
      "Persahabatan yang tumbuh dari sekelas menjadi saudara.",
      "Nineteen memories, infinite stories."
    ];

    const btn = document.getElementById('open-jar');
    const msgEl = document.getElementById('jar-message');

    btn.addEventListener('click', () => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      msgEl.textContent = msg;
      msgEl.hidden = false;
    });
  }

  // ===== Guestbook =====
  function setupGuestbook() {
    const form = document.getElementById('guestbook-form');
    const list = document.getElementById('guestbook-list');
    const KEY = 'class51_guestbook';

    function load() {
      const items = JSON.parse(localStorage.getItem(KEY) || '[]');
      list.innerHTML = items.map(i => `
        <div class="gb-entry">
          <strong>${escapeHtml(i.name)}</strong>
          <p>${escapeHtml(i.message)}</p>
          <small style="opacity:0.6">${i.date}</small>
        </div>
      `).join('');
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('gb-name').value.trim();
      const message = document.getElementById('gb-message').value.trim();
      if (!name || !message) return;

      const items = JSON.parse(localStorage.getItem(KEY) || '[]');
      items.unshift({
        name,
        message,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      localStorage.setItem(KEY, JSON.stringify(items.slice(0, 50)));
      form.reset();
      load();
    });

    load();
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== Mood =====
  function setupMood() {
    const btns = document.querySelectorAll('.mood-btn');
    const result = document.getElementById('mood-result');
    const KEY = 'class51_moods';

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const mood = btn.dataset.mood;
        const moods = JSON.parse(localStorage.getItem(KEY) || '{}');
        const today = new Date().toDateString();
        if (!moods[today]) moods[today] = {};
        moods[today][mood] = (moods[today][mood] || 0) + 1;
        localStorage.setItem(KEY, JSON.stringify(moods));

        const counts = moods[today];
        const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        result.innerHTML = `
          <p style="font-size:1.4rem;margin-bottom:0.5rem">${mood}</p>
          <p>Mood kamu tercatat!</p>
          <p style="margin-top:0.8rem;font-size:0.9rem;opacity:0.8">
            Hari ini: ${entries.map(([e, c]) => `${e} ${c}`).join(' • ')}
          </p>
        `;
      });
    });
  }

  // ===== Nav =====
  function setupNav() {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Active on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    });
  }

  // ===== Memories filter =====
  document.querySelectorAll('.mem-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mem-cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.polaroid').forEach(p => {
        if (cat === 'all' || p.dataset.cat === cat) {
          p.style.display = '';
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  // Fallback data (minimal)
  function getFallbackData() {
    return {
      quotes: ['Kebersamaan adalah kekuatan kita.'],
      announcements: [{ content: 'Selamat datang di Class 5.1!' }],
      cleaningSchedule: {
        Senin: ['Putri', 'Shafiyyah', 'Bunga', 'Kartika'],
        Selasa: ['Nadin', 'Ziya', 'Widiya', 'Khansa'],
        Rabu: ['Salsa', 'Bintang', 'Hafiza', 'Nisa'],
        Kamis: ['Luna', 'Nadya', 'Samsa', 'Nindy'],
        Jumat: ['Donita', 'Rily', 'Manda', 'Haniffah']
      },
      lessonSchedule: {
        Senin: ['Desain Grafis', 'Tafsir', 'Tarbiyah', 'Fisika', 'Bahasa Indonesia'],
        Selasa: ['Kimia', 'Bahasa Inggris', 'Ushul Fiqh', 'Fiqh', 'Sosial Media Marketing'],
        Rabu: ['Desain Grafis', 'Ekonomi', 'Sosial Media Marketing', 'Shorof', 'Biologi', 'Ulumul Hadist'],
        Kamis: ['Desain Grafis', 'Nahwu', 'Bahasa Inggris', 'Grammar'],
        Jumat: ['Matematika', 'Bahasa Indonesia', 'Sosial Media Marketing', 'Tarikh', 'Hadist']
      },
      members: []
    };
  }

  // Start
  document.addEventListener('DOMContentLoaded', init);
})();
