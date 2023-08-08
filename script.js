document.getElementById("calcular").addEventListener("click", function () {
  const qtdBisnagas = parseFloat(document.getElementById("qtdBisnagas").value);
  const velocidadeMaq = parseFloat(
    document.getElementById("velocidadeMaq").value
  );

  const contaMin = qtdBisnagas / velocidadeMaq;
  const contaHora = contaMin / 60;
  const resultadoFinal = contaHora.toFixed(1);

  document.getElementById("resultado").innerText =
    "Falta " + resultadoFinal + " hora(s) de produção";
});
