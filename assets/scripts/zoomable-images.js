const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("imgModalContent");
document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

modal.addEventListener("click", () => {
  // remove this if you truly never want it to close
  modal.classList.add("hidden");
  document.body.style.overflow = "";
});