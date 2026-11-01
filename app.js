document.addEventListener("DOMContentLoaded", () => {
  const app = document.createElement("main");
  app.style = "padding:20px;font-family:Arial";

  const dados = JSON.parse(
    localStorage.getItem("financas") || "[]"
  );

  function salvar() {
    localStorage.setItem("financas", JSON.stringify(dados));
    mostrar();
  }

  function mostrar() {
    const receitas = dados
      .filter(x => x.tipo === "Receita")
      .reduce((s, x) => s + x.valor, 0);

    const despesas = dados
      .filter(x => x.tipo === "Despesa")
      .reduce((s, x) => s + x.valor, 0);

    app.innerHTML = `
      <h2>💰 Painel Financeiro</h2>
      <p>🟢 Receitas: R$ ${receitas.toFixed(2)}</p>
      <p>🔴 Despesas: R$ ${despesas.toFixed(2)}</p>
      <h3>Saldo: R$ ${(receitas-despesas).toFixed(2)}</h3>
      <hr>
      <h3>Nova movimentação</h3>
      <select id="tipo">
        <option>Receita</option>
        <option>Despesa</option>
      </select>
      <input id="descricao" placeholder="Descrição">
      <input id="valor" type="number" placeholder="Valor">
      <button id="adicionar">Adicionar</button>
      <h3>Histórico</h3>
      <div id="historico"></div>
    `;

    document.body.appendChild(app);

    document.getElementById("adicionar").onclick = () => {
      const tipo = document.getElementById("tipo").value;
      const descricao =
        document.getElementById("descricao").value.trim();
      const valor = Number(
        document.getElementById("valor").value
      );

      if (!descricao || !Number.isFinite(valor) || valor <= 0) {
        alert("Preencha a descrição e um valor válido.");
        return;
      }

      dados.push({tipo, descricao, valor});
      salvar();
    };

    document.getElementById("historico").innerHTML =
      dados.map(x =>
        `<p>${x.tipo}: ${x.descricao} - R$ ${x.valor.toFixed(2)}</p>`
      ).join("");
  }

  mostrar();
});
