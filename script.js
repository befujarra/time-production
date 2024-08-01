document.getElementById("calcular").addEventListener("click", function () {
  const nomeMaq = document.getElementById("nomeMaq").value;
  const qtdBisnagas = parseFloat(document.getElementById("qtdBisnagas").value);
  const velocidadeMaq = parseFloat(document.getElementById("velocidadeMaq").value);

  const minutosTotal = qtdBisnagas / velocidadeMaq;
  const horasProducao = Math.floor(minutosTotal / 60);
  const minutosRestantes = Math.round(minutosTotal % 60);

  const now = new Date();
  const horaAtual = now.getHours();
  const minutosAtual = now.getMinutes();

  const minutosTermino = minutosAtual + minutosRestantes;
  let horaTermino = horaAtual + horasProducao + Math.floor(minutosTermino / 60);

  if (horaTermino >= 24) {
    horaTermino %= 24;
  }

  if (horaTermino === 0) {
    horaTermino = 12; // Meia-noite
  } else {
    horaTermino = horaTermino % 12 || 12;
  }

  const ampm = horaAtual < 12 ? "AM" : "PM";

  const cardData = {
    nomeMaq: nomeMaq,
    qtdBisnagas: qtdBisnagas,
    velocidadeMaq: velocidadeMaq,
    horasProducao: horasProducao,
    minutosRestantes: minutosRestantes,
    horaTermino: horaTermino,
    minutosTermino: minutosTermino % 60,
    ampm: ampm
  };

  // Salvar cardData no Local Storage
  saveCardToLocalStorage(cardData);

  // Criar e adicionar o card à página
  createCard(cardData);
  
  
});

function saveCardToLocalStorage(cardData) {
  let cards = JSON.parse(localStorage.getItem('cards')) || [];
  cards.push(cardData);
  localStorage.setItem('cards', JSON.stringify(cards));
}

function createCard(cardData) {
  const card = document.createElement("div");
  card.className = "card m-2";
  card.style.width = "20rem";
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Máquina: ${cardData.nomeMaq}</h5>
      <p class="card-text">Quantidade: ${cardData.qtdBisnagas}</p>
      <p class="card-text">Velocidade: ${cardData.velocidadeMaq}</p>
      <p class="card-text">Tempo: ${cardData.horasProducao} horas e ${cardData.minutosRestantes} minutos</p>
      <p class="card-text">Hora de Término: ${cardData.horaTermino}:${cardData.minutosTermino < 10 ? '0' : ''}${cardData.minutosTermino} ${cardData.ampm}</p>
      <button class="btn btn-danger btn-sm remover-card">Remover</button>
    </div>
  `;

  document.getElementById("cardsContainer").appendChild(card);

  card.querySelector(".remover-card").addEventListener("click", function () {
    removeCardFromLocalStorage(cardData);
    card.remove();
  });
}

function removeCardFromLocalStorage(cardData) {
  let cards = JSON.parse(localStorage.getItem('cards')) || [];
  cards = cards.filter(card => JSON.stringify(card) !== JSON.stringify(cardData));
  localStorage.setItem('cards', JSON.stringify(cards));
}

function loadCards() {
  let cards = JSON.parse(localStorage.getItem('cards')) || [];
  cards.forEach(createCard);
}

// Carregar os cards quando a página é carregada
document.addEventListener('DOMContentLoaded', loadCards);
