
    // year
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('footerYear').textContent = new Date().getFullYear();

    // Sidebar nav active link handling (smooth scroll)
    document.querySelectorAll('.nav-link').forEach(link=>{
      link.addEventListener('click', e=>{
        document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // IntersectionObserver for reveal animations
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      })
    }, { threshold: 0.12 });

    document.querySelectorAll('.project').forEach(p=>observer.observe(p));

    // Responsive sidebar toggle (mobile)
    const sidebar = document.getElementById('sidebar');
    const hamb = document.getElementById('hamb');
    const mobileTop = document.getElementById('mobileTop');

    function checkMobile(){
      if(window.innerWidth <= 820){
        sidebar.classList.remove('open');
        mobileTop.style.display = 'flex';
      } else {
        sidebar.classList.remove('open');
        mobileTop.style.display = 'none';
      }
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if(hamb){
      hamb.addEventListener('click', ()=>{
        sidebar.classList.toggle('open');
      });
    }

    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', (e)=>{
      if(window.innerWidth <= 820){
        if(!sidebar.contains(e.target) && !e.target.closest('.hamburger')){
          sidebar.classList.remove('open');
        }
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href.length > 1){
          e.preventDefault();
          const el = document.querySelector(href);
          if(el) el.scrollIntoView({ behavior:'smooth', block:'start' });
          // close sidebar on mobile
          if(window.innerWidth <= 820) sidebar.classList.remove('open');
        }
      });
    });

    // Contact form feedback (Formspree)
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    if(form){
      form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        formMsg.textContent = 'Sending...';
        const data = new FormData(form);
        try {
          const res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data
          });
          if(res.ok){
            form.reset();
            formMsg.style.color = 'var(--accent)';
            formMsg.textContent = 'Thanks — message sent!';
          } else {
            const json = await res.json();
            formMsg.style.color = '#f87171';
            formMsg.textContent = (json && json.error) ? json.error : 'Oops — something went wrong.';
          }
        } catch(err){
          formMsg.style.color = '#f87171';
          formMsg.textContent = 'Network error. Try again later.';
        }
      });
    }
    // Animate skill bars
const skillObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.bar div').forEach(bar=>{
        bar.style.width = bar.style.width; // triggers animation
      });
      skillObserver.unobserve(entry.target);
    }
  })
},{ threshold:0.2 });
document.querySelectorAll('#skills').forEach(sec=>skillObserver.observe(sec));
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();
// === CINEMATIC GALAXY + BLUE-WHITE LIGHTNING BACKGROUND ===
(function () {
  const canvas = document.getElementById("bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // 🌌 Galaxy Stars with depth, parallax & zoom
  const stars = [];
  const STAR_COUNT = 300;

  function initStars() {
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 3 + 0.5, // depth
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  // Mouse Parallax
  let mouseX = 0.5,
    mouseY = 0.5;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  let zoom = 1,
    zoomDir = 1;

  function drawStars() {
    for (const s of stars) {
      const parallaxX = (mouseX - 0.5) * s.z * 20;
      const parallaxY = (mouseY - 0.5) * s.z * 20;

      const x = (s.x + parallaxX - w / 2) * zoom + w / 2;
      const y = (s.y + parallaxY - h / 2) * zoom + h / 2;

      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    }
  }

  // Slight star drift
  function moveStars() {
    for (const s of stars) {
      s.x += (Math.random() - 0.5) * 0.5;
      s.y += (Math.random() - 0.5) * 0.5;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;
    }

    // 🌠 soft zoom in/out
    zoom += 0.001 * zoomDir;
    if (zoom > 1.03 || zoom < 0.97) zoomDir *= -1;
  }

  // ⚡ Lightning
  const bolts = [];
  let flash = 0;

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function createBolt() {
    const startX = rand(0, w);
    const parts = [];
    let x = startX,
      y = 0;
    const segCount = 6 + Math.floor(Math.random() * 6);
    for (let i = 0; i < segCount; i++) {
      x += rand(-50, 50);
      y += rand(h * 0.05, h * 0.15);
      parts.push({ x, y });
    }

    // ⚡ Randomly blue or white lightning
    const color = Math.random() < 0.5 ? "blue" : "white";

    return { parts, color, life: 0, maxLife: rand(20, 35), alpha: 1 };
  }

  function drawBolt(b) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const glowColor =
      b.color === "blue"
        ? "rgba(100,180,255,0.9)" // soft electric blue glow
        : "rgba(255,255,255,0.9)";
    const strokeColor =
      b.color === "blue"
        ? `rgba(130,200,255,${b.alpha})`
        : `rgba(255,255,255,${b.alpha})`;

    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 35;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    const start = b.parts[0];
    ctx.moveTo(start.x, start.y);
    for (const p of b.parts) ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.restore();
  }

  // 🎬 Animate everything
  function animate() {
    ctx.fillStyle = "rgba(0, 0, 20, 0.25)";
    ctx.fillRect(0, 0, w, h);

    moveStars();
    drawStars();

    // ⚡ Lightning frequency
    if (Math.random() < 0.05) {
      bolts.push(createBolt());
      flash = rand(0.4, 0.7);
    }

    for (let i = bolts.length - 1; i >= 0; i--) {
      const b = bolts[i];
      drawBolt(b);
      b.life++;
      b.alpha = Math.max(0, 1 - b.life / b.maxLife);
      if (b.life > b.maxLife) bolts.splice(i, 1);
    }

    if (flash > 0) {
      ctx.fillStyle = `rgba(200,220,255,${flash * 0.15})`;
      ctx.fillRect(0, 0, w, h);
      flash -= 0.02;
    }

    requestAnimationFrame(animate);
  }

  initStars();
  animate();
})();
