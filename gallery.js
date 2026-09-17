// gallery.js (v2 — adds featured/hero support)
// Renders artworks.json: any entry with "featured": true gets a hero
// treatment above the phase grid; everything else groups by phase as before.

const PHASE_ORDER = [
  "Pollution",
  "Overpopulation",
  "Bacteria",
  "Abandonment",
  "Succession",
  "Restoration"
];

async function loadGallery() {
  const container = document.getElementById("gallery");
  if (!container) return;

  let artworks;
  try {
    const res = await fetch("artworks.json");
    artworks = await res.json();
  } catch (err) {
    container.innerHTML = "<p>Could not load gallery data.</p>";
    console.error("Failed to load artworks.json:", err);
    return;
  }

  container.innerHTML = "";

  // --- Featured piece(s) ---
  const featured = artworks.filter((a) => a.featured);
  featured.forEach((piece) => {
    const hero = document.createElement("section");
    hero.className = "featured-piece";

    const img = document.createElement("img");
    img.src = piece.file;
    img.alt = piece.title || "Featured piece";

    const caption = document.createElement("div");
    caption.className = "featured-caption";
    const title = document.createElement("h2");
    title.textContent = piece.title || "";
    const desc = document.createElement("p");
    desc.textContent = piece.caption || "";
    caption.appendChild(title);
    if (piece.caption) caption.appendChild(desc);

    hero.appendChild(img);
    hero.appendChild(caption);
    container.appendChild(hero);
  });

  // --- Phase-grouped grid (featured pieces excluded here) ---
  const rest = artworks.filter((a) => !a.featured);

  PHASE_ORDER.forEach((phase) => {
    const pieces = rest.filter((a) => a.phase === phase);
    if (pieces.length === 0) return;

    const section = document.createElement("section");
    section.className = "phase-section";
    section.id = phase.toLowerCase();

    const heading = document.createElement("h2");
    heading.textContent = phase;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "phase-grid";

    pieces.forEach((piece) => {
      const fig = document.createElement("figure");
      fig.className = "art-piece";

      const img = document.createElement("img");
      img.src = piece.file;
      img.alt = piece.title || phase;
      img.loading = "lazy";

      const caption = document.createElement("figcaption");
      caption.textContent = piece.title || "";

      fig.appendChild(img);
      fig.appendChild(caption);
      grid.appendChild(fig);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });

  if (container.children.length === 0) {
    container.innerHTML = "<p>No pieces yet — check back soon.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadGallery);
