/* =========================================================
   📸 LISTE DES PHOTOS — modifie cette liste pour ajouter
   ou retirer des images de la galerie.

   - file    : nom du fichier dans le dossier /photos
   - title   : titre affiché sous la photo
   - caption : petite légende (lieu, date, ce que tu veux)
   ========================================================= */
const PHOTOS = [
  { file: "photo-01.jpg", title: "Sans titre",      caption: "Paris, 2024" },
  { file: "photo-02.jpg", title: "Lumière du soir",  caption: "Bretagne, 2024" },
  { file: "photo-03.jpg", title: "Portrait",         caption: "Studio, 2023" },
  { file: "photo-04.jpg", title: "Sans titre",       caption: "Lisbonne, 2023" },
  { file: "photo-05.jpg", title: "Sans titre",       caption: "Paris, 2024" },
  { file: "photo-06.jpg", title: "Détail",           caption: "Marseille, 2023" },
];

const galleryEl = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

let currentIndex = 0;

function pad(n){ return String(n).padStart(3, "0"); }

function renderGallery(){
  galleryEl.innerHTML = "";
  PHOTOS.forEach((photo, i) => {
    const frame = document.createElement("article");
    frame.className = "frame";
    frame.setAttribute("tabindex", "0");
    frame.setAttribute("role", "button");
    frame.setAttribute("aria-label", `Ouvrir la photo ${photo.title}`);

    frame.innerHTML = `
      <div class="frame-photo" style="background-image:url('photos/${photo.file}')"></div>
      <div class="frame-meta">
        <span class="num">Fr. ${pad(i + 1)}</span>
        <span>${photo.caption}</span>
      </div>
      <p class="frame-title">${photo.title}</p>
    `;

    frame.addEventListener("click", () => openLightbox(i));
    frame.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openLightbox(i);
    });

    galleryEl.appendChild(frame);
  });
}

function openLightbox(index){
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

function updateLightbox(){
  const photo = PHOTOS[currentIndex];
  lightboxImg.src = `photos/${photo.file}`;
  lightboxImg.alt = photo.title;
  lightboxCaption.textContent = `Fr. ${pad(currentIndex + 1)} — ${photo.title} — ${photo.caption}`;
}

function nextPhoto(){
  currentIndex = (currentIndex + 1) % PHOTOS.length;
  updateLightbox();
}

function prevPhoto(){
  currentIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
  updateLightbox();
}

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox-next").addEventListener("click", nextPhoto);
document.getElementById("lightbox-prev").addEventListener("click", prevPhoto);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextPhoto();
  if (e.key === "ArrowLeft") prevPhoto();
});

document.getElementById("year").textContent = new Date().getFullYear();

renderGallery();
