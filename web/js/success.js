<<<<<<< HEAD

// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const mensagemCliente = document.querySelector("#mensagemCliente");
const numeroPedido = document.querySelector("#numeroPedido");
const pedidoProdutos = document.querySelector("#pedidoProdutos");
const pedidoQuantidade = document.querySelector("#pedidoQuantidade");
const produtoTotal = document.querySelector("#produtoTotal");

// ==========================================
// RECUPERA OS DADOS SALVOS NO CHECKOUT
// ==========================================

const nome = sessionStorage.getItem("clienteNome");
const pedido = sessionStorage.getItem("pedidoNumero");
const total = sessionStorage.getItem("pedidoTotal");

let produtos = [];

try {
  produtos = JSON.parse(sessionStorage.getItem("pedidoProdutos")) || [];

  if (!Array.isArray(produtos)) {
    produtos = [];
  }
} catch (erro) {
  produtos = [];
}

// ==========================================
// VERIFICA SE EXISTE UM PEDIDO REGISTRADO
// ==========================================

if (!pedido || total === null || produtos.length === 0) {
  window.location.replace("index.html");
} else {

  // ==========================================
  // FORMATA VALORES PARA REAL
  // ==========================================

  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  // ==========================================
  // EXIBE OS DADOS DO CLIENTE
  // ==========================================

  if (nome && mensagemCliente) {
    mensagemCliente.textContent =
      `${nome}, obrigado por escolher a Lazúli! Confira os detalhes do seu pedido.`;
  }

  // ==========================================
  // EXIBE O NÚMERO DO PEDIDO
  // ==========================================

  if (numeroPedido) {
    numeroPedido.textContent = pedido;
  }

  // ==========================================
  // EXIBE OS PRODUTOS DO PEDIDO
  // ==========================================

  if (pedidoProdutos) {
    pedidoProdutos.innerHTML = "";

    produtos.forEach((produto) => {
      const item = document.createElement("article");
      item.className = "mb-3";

      const nomeProduto = document.createElement("h3");
      nomeProduto.className = "h6 mb-1";
      nomeProduto.textContent = produto.nome;

      const categoria = document.createElement("p");
      categoria.className = "small text-secondary mb-1";
      categoria.textContent = produto.categoria;

      const quantidade = document.createElement("p");
      quantidade.className = "mb-1";
      quantidade.textContent = `Quantidade: ${produto.quantidade}`;

      const subtotal = document.createElement("p");
      subtotal.className = "fw-bold mb-0";
      subtotal.textContent =
        `Subtotal: ${formatarMoeda(produto.subtotal)}`;

      item.append(
        nomeProduto,
        categoria,
        quantidade,
        subtotal
      );

      pedidoProdutos.appendChild(item);
    });
  }

  // ==========================================
  // CALCULA A QUANTIDADE TOTAL DE ITENS
  // ==========================================

  if (pedidoQuantidade) {
    const quantidadeTotal = produtos.reduce(
      (acumulador, produto) =>
        acumulador + Number(produto.quantidade || 0),
      0
    );

    pedidoQuantidade.textContent = quantidadeTotal;
  }

  // ==========================================
  // EXIBE O VALOR TOTAL DO PEDIDO
  // ==========================================

  if (produtoTotal) {
    produtoTotal.textContent = formatarMoeda(total);
  }
}
=======
const mensagemCliente = document.querySelector("#mensagemCliente");
const numeroPedido = document.querySelector("#numeroPedido");
const nome = sessionStorage.getItem("clienteNome");
const pedido = sessionStorage.getItem("pedidoNumero");

if (nome) {
  mensagemCliente.textContent = `${nome}, seus dados foram validados e o fluxo educacional chegou ao final.`;
}

if (pedido) {
  numeroPedido.textContent = pedido;
}

/* TODO: tratar melhor o acesso direto a esta página. */
>>>>>>> 73195d0111e1759fd1eed49ed87fcdc2fe319f41
