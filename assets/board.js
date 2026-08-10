function equalizeBoardCards() {
  const cards = document.querySelectorAll(".board-card");
  if (!cards.length) return;

  cards.forEach((card) => { card.style.height = "auto"; });
  const maxHeight = Math.max(...Array.from(cards, (card) => card.offsetHeight));
  cards.forEach((card) => { card.style.height = `${maxHeight}px`; });
}

window.addEventListener("load", equalizeBoardCards);
window.addEventListener("resize", equalizeBoardCards);
