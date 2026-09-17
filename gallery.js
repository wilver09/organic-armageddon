// gallery.js (v3 — adds formatted phase labels and clean rendering)

const PHASE_CONFIG = [
  { name: "Pollution", label: "Phase One: Pollution" },
  { name: "Overpopulation", label: "Phase Two: Overpopulation" },
  { name: "Bacteria", label: "Phase Three: Bacteria" },
  { name: "Abandonment", label: "Phase Four: Abandonment" },
  { name: "Succession", label: "Phase Five: Succession" },
  { name: "Restoration", label: "Phase Six: Restoration" }
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
    img.loading = "eager";

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

  // --- Phase-grouped grid (featured pieces excluded) ---
  const rest = artworks.filter((a) => !a.featured);

  PHASE_CONFIG.forEach(({ name, label }) => {
    const pieces = rest.filter((a) => a.phase === name);
    if (pieces.length === 0) return;

    const section = document.createElement("section");
    section.className = "phase-section";
    section.id = name.toLowerCase();

    const heading = document.createElement("h2");
    heading.textContent = label;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "phase-grid";

    pieces.forEach((piece) => {
      const fig = document.createElement("figure");
      fig.className = "art-piece";

      const img = document.createElement("img");
      img.src = piece.file;
      img.alt = piece.title || name;
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
