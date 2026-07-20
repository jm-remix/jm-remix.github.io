const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const close = document.querySelector(".close");

document.querySelectorAll(".gallery-item").forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.dataset.full;
    modal.style.display = "flex";
  });
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});