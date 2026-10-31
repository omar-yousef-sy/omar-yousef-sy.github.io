// Omar Yousef — shared page behaviour: header/footer, language and theme, lattice animation, lists from data/*.js.
(() => {
  const root = document.body.dataset.root || '';
  const page = document.body.dataset.page || '';
  const D = window.SITE_DATA || {};
  const CONTACT = { email: 'yousef.omar@damascusuniversity.edu.sy', whatsapp: '963945250822', phone: '+963 945 250 822' };
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } } };

  // ---------------------------------------------------------------- language and theme
  const setLang = (l) => { document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; store.set('lang', l); };
  setLang(store.get('lang') || document.documentElement.lang || 'ar');
  const theme = store.get('theme');
  if (theme) document.documentElement.dataset.theme = theme;
  const t = (ar, en) => `<span class="ar">${ar}</span><span class="en">${en}</span>`;

  // ---------------------------------------------------------------- header and footer
  const ICON = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  };
  const logo = `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00a6d6"/><stop offset="1" stop-color="#ff6b4a"/></linearGradient></defs><path d="M10 3h20l10 17-10 17H10L0 20z" fill="url(#lg)"/><path d="M13 9h14l7 11-7 11H13L6 20z" fill="#0b1f3a"/><text x="20" y="24.5" text-anchor="middle" font-family="Space Grotesk,Segoe UI,sans-serif" font-size="11" font-weight="700" fill="#fff">OY</text></svg>`;
  const links = [
    ['index.html', 'home', 'الرئيسية', 'Home'],
    ['cv.html', 'cv', 'السيرة الذاتية', 'CV'],
    ['lectures.html', 'lectures', 'المحاضرات والملفات', 'Lectures & files'],
    ['articles.html', 'articles', 'مقالات علمية وثقافية', 'Articles'],
    ['nanolab.html', 'nanolab', 'NanoLab', 'NanoLab'],
  ];
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `<a class="skip" href="#main">${t('تخطَّ إلى المحتوى', 'Skip to content')}</a><div class="wrap">
    <a class="brand" href="${root}index.html">${logo}<span><b>${t('عمر يوسف', 'Omar Yousef')}</b><small>${t('فيزياء النانو', 'Nano-Physics')}</small></span></a>
    <nav class="nav" id="nav">${links.map(([h, k, ar, en]) => `<a href="${root}${h}"${k === page ? ' aria-current="page"' : ''}>${t(ar, en)}</a>`).join('')}</nav>
    <div class="tools">
      <button class="icon-btn" id="langBtn" type="button" aria-label="Language / اللغة">${t('EN', 'ع')}</button>
      <button class="icon-btn" id="themeBtn" type="button" aria-label="Theme / المظهر"></button>
      <button class="icon-btn menu-btn" id="menuBtn" type="button" aria-label="Menu / القائمة" aria-expanded="false">${ICON.menu}</button>
    </div></div>`;
  document.body.prepend(header);
  const dark = () => (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  const themeIcon = () => { document.getElementById('themeBtn').innerHTML = dark() ? ICON.sun : ICON.moon; };
  themeIcon();
  document.getElementById('themeBtn').onclick = () => { const n = dark() ? 'light' : 'dark'; document.documentElement.dataset.theme = n; store.set('theme', n); themeIcon(); };
  document.getElementById('langBtn').onclick = () => { setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar'); renderLists(); };
  document.getElementById('menuBtn').onclick = (e) => { const n = document.getElementById('nav'); n.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', n.classList.contains('open')); };

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `<div class="wrap">
    <div><h4>${t('عمر يوسف', 'Omar Yousef')}</h4><p style="margin:0">${t('محاضر فيزياء وباحث دكتوراه في تقانة النانو وفيزياء النانو — جامعة دمشق.', 'Physics lecturer and PhD researcher in nanotechnology and nano-physics — Damascus University.')}</p></div>
    <div><h4>${t('الأقسام', 'Sections')}</h4><ul>${links.map(([h, , ar, en]) => `<li><a href="${root}${h}">${t(ar, en)}</a></li>`).join('')}</ul></div>
    <div><h4>${t('تواصل', 'Contact')}</h4><ul>
      <li><a class="ltr" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
      <li><a href="https://wa.me/${CONTACT.whatsapp}" rel="noopener">${t('واتساب', 'WhatsApp')} · <span class="ltr">${CONTACT.phone}</span></a></li>
      <li>${t('دمشق، سوريا', 'Damascus, Syria')}</li></ul></div>
    <div class="copy"><span>© ${new Date().getFullYear()} ${t('عمر يوسف', 'Omar Yousef')}</span><span>${t('مختبر المواد النانوية · جامعة دمشق', 'Nanomaterials Laboratory · Damascus University')}</span></div>
  </div>`;
  document.body.append(footer);

  // ---------------------------------------------------------------- lattice animation (graphene-like hexagonal lattice + drifting nanoparticles)
  document.querySelectorAll('[data-lattice]').forEach((host) => {
    const c = document.createElement('canvas');
    c.setAttribute('aria-hidden', 'true');
    host.prepend(c);
    const ctx = c.getContext('2d');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, nodes = [], bonds = [], dots = [], mouse = { x: -1e4, y: -1e4 };
    const A = 34; // C–C spacing in px
    function build() {
      dpr = Math.min(2, devicePixelRatio || 1);
      w = host.clientWidth; h = host.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = []; bonds = [];
      const dx = A * Math.sqrt(3), dy = A * 1.5;
      const key = new Map();
      for (let r = -1; r * dy < h + 2 * A; r++) {
        for (let q = -1; q * dx < w + 2 * dx; q++) {
          const x0 = q * dx + (r % 2 ? dx / 2 : 0), y0 = r * dy;
          for (const [px, py] of [[x0, y0], [x0, y0 + A]]) {
            const k = `${Math.round(px)}|${Math.round(py)}`;
            if (!key.has(k)) { key.set(k, nodes.length); nodes.push({ x: px, y: py }); }
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (Math.abs(d - A) < 1.5) bonds.push([i, j]);
      }
      const n = Math.round(Math.min(26, (w * h) / 42000));
      dots = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 2 + Math.random() * 5, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, hue: Math.random() < .7 ? '54,196,238' : (Math.random() < .5 ? '255,107,74' : '242,177,52') }));
    }
    function frame(time) {
      ctx.clearRect(0, 0, w, h);
      const tt = (time || 0) / 1000;
      const ox = still ? 0 : Math.sin(tt * .05) * 14, oy = still ? 0 : Math.cos(tt * .04) * 10;
      ctx.lineWidth = 1;
      for (const [i, j] of bonds) {
        const a = nodes[i], b = nodes[j];
        const mx = (a.x + b.x) / 2 + ox, my = (a.y + b.y) / 2 + oy;
        const wave = .5 + .5 * Math.sin(mx * .012 + my * .008 - tt * .9);
        const near = Math.max(0, 1 - Math.hypot(mx - mouse.x, my - mouse.y) / 180);
        ctx.strokeStyle = `rgba(54,196,238,${.05 + .07 * wave + .35 * near})`;
        ctx.beginPath(); ctx.moveTo(a.x + ox, a.y + oy); ctx.lineTo(b.x + ox, b.y + oy); ctx.stroke();
      }
      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x + ox - mouse.x, n.y + oy - mouse.y) / 160);
        if (near > 0) { ctx.fillStyle = `rgba(120,220,255,${.6 * near})`; ctx.beginPath(); ctx.arc(n.x + ox, n.y + oy, 1.6 + 2 * near, 0, 7); ctx.fill(); }
      }
      for (const d of dots) {
        if (!still) { d.x += d.vx; d.y += d.vy; if (d.x < -20) d.x = w + 20; if (d.x > w + 20) d.x = -20; if (d.y < -20) d.y = h + 20; if (d.y > h + 20) d.y = -20; }
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
        g.addColorStop(0, `rgba(${d.hue},.55)`); g.addColorStop(.35, `rgba(${d.hue},.18)`); g.addColorStop(1, `rgba(${d.hue},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 4, 0, 7); ctx.fill();
        ctx.fillStyle = `rgba(${d.hue},.9)`; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * .55, 0, 7); ctx.fill();
      }
      if (!still) requestAnimationFrame(frame);
    }
    build(); frame(0);
    let rs; addEventListener('resize', () => { clearTimeout(rs); rs = setTimeout(() => { build(); if (still) frame(0); }, 150); });
    host.addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    host.addEventListener('pointerleave', () => { mouse = { x: -1e4, y: -1e4 }; });
  });

  // ---------------------------------------------------------------- lists from data files
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const L = (o, k) => (document.documentElement.lang === 'ar' ? o[`${k}_ar`] || o[`${k}_en`] : o[`${k}_en`] || o[`${k}_ar`]) || '';
  const fmtDate = (s) => { if (!s) return ''; const d = new Date(s); return isNaN(d) ? esc(s) : d.toLocaleDateString(document.documentElement.lang === 'ar' ? 'ar-SY' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }); };
  const TYPE = { lecture: ['محاضرة', 'Lecture', ''], slides: ['عرض', 'Slides', 'slides'], notes: ['ملاحظات', 'Notes', 'notes'], exam: ['أسئلة', 'Exam', ''], file: ['ملف', 'File', 'notes'] };
  const courseName = (id) => { const c = (D.courses || []).find((x) => x.id === id); return c ? L(c, 'title') : ''; };

  function fileRow(f) {
    const ty = TYPE[f.type] || TYPE.file;
    const ar = document.documentElement.lang === 'ar';
    return `<article class="file-row"><div class="badge ${ty[2]}">PDF</div><div>
      <h3>${esc(L(f, 'title'))}</h3>${L(f, 'desc') ? `<p>${esc(L(f, 'desc'))}</p>` : ''}
      <div class="meta"><span class="chip">${ar ? ty[0] : ty[1]}</span>${f.course ? `<span class="chip teal">${esc(courseName(f.course))}</span>` : ''}${f.date ? `<span class="chip gold">${fmtDate(f.date)}</span>` : ''}</div></div>
      <a class="btn outline" href="${root}${esc(f.file)}" target="_blank" rel="noopener">${ar ? 'فتح / تنزيل' : 'Open / download'}</a></article>`;
  }
  const coverSvg = (seed) => {
    let s = 0; for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    let out = '';
    for (let i = 0; i < 9; i++) { const x = rnd() * 320, y = rnd() * 150, r = 6 + rnd() * 22; out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${['#00a6d6', '#ff6b4a', '#f2b134', '#1fb58f'][i % 4]}" opacity="${(.25 + rnd() * .5).toFixed(2)}"/>`; }
    return `<svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">${out}</svg>`;
  };
  function articleCard(a) {
    const ar = document.documentElement.lang === 'ar';
    const cat = a.category === 'culture' ? (ar ? 'ثقافي' : 'Culture') : (ar ? 'علمي' : 'Science');
    return `<a class="card link article-card" href="${root}articles/${esc(a.slug)}.html"><div class="cover">${coverSvg(a.slug)}</div>
      <span class="chip ${a.category === 'culture' ? 'coral' : ''}">${cat}</span> <time datetime="${esc(a.date)}">${fmtDate(a.date)}</time>
      <h3>${esc(L(a, 'title'))}</h3><p>${esc(L(a, 'summary'))}</p></a>`;
  }
  const empty = (ar, en) => `<div class="empty">${document.documentElement.lang === 'ar' ? ar : en}</div>`;
  const byDate = (a, b) => String(b.date || '').localeCompare(String(a.date || ''));

  function renderLists() {
    const lec = document.getElementById('lectureList');
    if (lec) {
      const q = (document.getElementById('lecQ')?.value || '').trim().toLowerCase();
      const course = document.getElementById('lecCourse')?.value || '';
      const items = (D.lectures || []).filter((f) => (!course || f.course === course) && (!q || `${f.title_ar} ${f.title_en} ${f.desc_ar} ${f.desc_en}`.toLowerCase().includes(q))).sort(byDate);
      lec.innerHTML = items.length ? items.map(fileRow).join('') : empty('لا توجد ملفات مطابقة بعد — تُضاف المحاضرات تباعاً.', 'No matching files yet — lectures are being added.');
      const sel = document.getElementById('lecCourse');
      if (sel && !sel.dataset.ready) { sel.dataset.ready = 1; }
      if (sel) { const v = sel.value; sel.innerHTML = `<option value="">${document.documentElement.lang === 'ar' ? 'كل المقررات' : 'All courses'}</option>` + (D.courses || []).map((c) => `<option value="${esc(c.id)}">${esc(L(c, 'title'))}</option>`).join(''); sel.value = v; }
    }
    const docs = document.getElementById('docList');
    if (docs) docs.innerHTML = (D.documents || []).length ? D.documents.slice().sort(byDate).map(fileRow).join('') : empty('لا توجد ملفات بعد.', 'No files yet.');
    const courses = document.getElementById('courseCards');
    if (courses) courses.innerHTML = (D.courses || []).map((c) => { const n = (D.lectures || []).filter((f) => f.course === c.id).length; return `<div class="card"><span class="chip ${n ? 'teal' : ''}">${n} ${document.documentElement.lang === 'ar' ? 'ملف' : n === 1 ? 'file' : 'files'}</span><h3>${esc(L(c, 'title'))}</h3><p>${esc(L(c, 'desc'))}</p></div>`; }).join('');
    const arts = document.getElementById('articleList');
    if (arts) {
      const cat = document.getElementById('artCat')?.value || '';
      const items = (D.articles || []).filter((a) => !cat || a.category === cat).sort(byDate);
      arts.innerHTML = items.length ? items.map(articleCard).join('') : empty('لا توجد مقالات في هذا القسم بعد.', 'No articles in this section yet.');
    }
    const latest = document.getElementById('latestArticles');
    if (latest) latest.innerHTML = (D.articles || []).slice().sort(byDate).slice(0, 3).map(articleCard).join('');
    const latestFiles = document.getElementById('latestFiles');
    if (latestFiles) { const all = [...(D.lectures || []), ...(D.documents || [])].sort(byDate).slice(0, 3); latestFiles.innerHTML = all.length ? all.map(fileRow).join('') : ''; }
  }
  ['lecQ', 'lecCourse', 'artCat'].forEach((id) => document.getElementById(id)?.addEventListener('input', renderLists));
  renderLists();

  // ---------------------------------------------------------------- screenshot lightbox
  const lb = document.createElement('div');
  lb.className = 'lightbox'; lb.innerHTML = '<img alt="">';
  lb.onclick = () => lb.classList.remove('open');
  document.body.append(lb);
  document.querySelectorAll('.shots figure').forEach((f) => f.addEventListener('click', () => { const i = f.querySelector('img'); lb.firstChild.src = i.src; lb.firstChild.alt = i.alt; lb.classList.add('open'); }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
})();
