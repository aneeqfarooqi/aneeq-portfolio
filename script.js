
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

 