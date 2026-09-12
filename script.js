// Shifts the page background temperature to match whichever phase is in view.
const phases = document.querySelectorAll('.phase');
const body = document.body;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const temp = entry.target.dataset.temp;
    body.classList.remove('temp-hot', 'temp-cool');
    if (temp === 'hot') body.classList.add('temp-hot');
    if (temp === 'cool') body.classList.add('temp-cool');
  });
}, { threshold: 0.5 });

phases.forEach((phase) => observer.observe(phase));
