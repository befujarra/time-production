document.getElementById("calcular").addEventListener("click", function () {
  const qtdBisnagas = parseFloat(document.getElementById("qtdBisnagas").value);
  const velocidadeMaq = parseFloat(
    document.getElementById("velocidadeMaq").value
  );

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

  document.getElementById(
    "resultado"
  ).innerText = `A produção irá terminar às ${horaTermino}:${
    minutosTermino < 10 ? "0" : ""
  }${minutosTermino % 60} ${ampm}`;
});
