
// CATÁLOGO DOS PRODUTOS
const produtos = [
  {
    id: 1,
    nome: "Garfo Aquecedor de Bolso",
    categoria: "Utensílios extraordinários",
    preco: 75,
    imagem: "imagem loja escola/garfo.jpeg"
  },
  {
    id: 2,
    nome: "Rolo de Papel para Presentes Infinitos",
    categoria: "Embalagens fantásticas",
    preco: 1200,
    imagem: "imagem loja escola/papel.jpeg"
  },
  {
    id: 3,
    nome: "Abajur Monocromático",
    categoria: "Iluminação extraordinária",
    preco: 8990,
    imagem: "imagem loja escola/luminaria.jpeg"
  },
  {
    id: 4,
    nome: "Kit Utensílio para Formigas",
    categoria: "Microequipamentos",
    preco: 37,
    imagem: "imagem loja escola/formiga.jpeg"
  },
  {
    id: 5,
    nome: "Drone",
    categoria: "Tecnologia sideral",
    preco: 248000,
    imagem: "imagem loja escola/drone.jpeg"
  },
  {
    id: 6,
    nome: "Pano de Neblina",
    categoria: "Vexis",
    preco: 14,
    imagem: "imagem loja escola/pano.jpeg"
  }
];

// ELEMENTOS DO HTML
const listaCarrinho = document.querySelector("#listaCarrinho");
const carrinhoVazio = document.querySelector("#carrinhoVazio");
const subtotalCarrinho = document.querySelector("#subtotalCarrinho");
const totalCarrinho = document.querySelector("#totalCarrinho");
const feedbackCarrinho = document.querySelector("#feedbackCarrinho");
const finalizarCompra = document.querySelector("#finalizarCompra");

// RECUPERA OS PRODUTOS ARMAZENADOS
let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

// FORMATA OS VALORES EM REAIS
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// EXIBE OS PRODUTOS DO CARRINHO
function exibirCarrinho() {
  listaCarrinho.innerHTML = "";

  let subtotal = 0;

  carrinhoVazio.style.display = carrinho.length === 0 ? "block" : "none";

  carrinho.forEach((item) => {
    const produto = produtos.find((p) => p.id === item.id);

    if (!produto) return;

    const totalProduto = produto.preco * item.quantidade;
    subtotal += totalProduto;

    const elemento = document.createElement("article");

    elemento.className = "card p-3 mb-3";

    elemento.innerHTML = `
      <div class="row align-items-center g-3">

        <div class="col-4 col-md-3">
          <img
            src="${produto.imagem}"
            alt="${produto.nome}"
            class="img-fluid rounded"
            style="height: 110px; width: 100%; object-fit: contain;">
        </div>

        <div class="col-8 col-md-9">

          <p class="small text-secondary mb-1">
            ${produto.categoria}
          </p>

          <h2 class="h5">${produto.nome}</h2>

          <p class="mb-2">
            ${formatarMoeda(produto.preco)}
          </p>

          <div class="d-flex align-items-center gap-2 flex-wrap">

            <label>
              Quantidade:
              <input
                type="number"
                min="1"
                max="10"
                value="${item.quantidade}"
                data-id="${produto.id}"
                class="form-control form-control-sm quantidadeProduto"
                style="width: 75px;">
            </label>

            <button
              type="button"
              class="btn btn-sm btn-outline-danger removerProduto"
              data-id="${produto.id}">
              Remover
            </button>

          </div>

          <p class="mt-2 mb-0">
            <strong>Subtotal: ${formatarMoeda(totalProduto)}</strong>
          </p>

        </div>
      </div>
    `;

    listaCarrinho.appendChild(elemento);
  });

  subtotalCarrinho.textContent = formatarMoeda(subtotal);
  totalCarrinho.textContent = formatarMoeda(subtotal);

  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// REMOVE UM PRODUTO
listaCarrinho.addEventListener("click", (event) => {
  const botao = event.target.closest(".removerProduto");

  if (!botao) return;

  const id = Number(botao.dataset.id);

  carrinho = carrinho.filter((item) => item.id !== id);

  exibirCarrinho();

  feedbackCarrinho.textContent = "Produto removido do carrinho.";
});

// ALTERA A QUANTIDADE
listaCarrinho.addEventListener("change", (event) => {
  if (!event.target.classList.contains("quantidadeProduto")) return;

  const id = Number(event.target.dataset.id);
  const quantidade = Number(event.target.value);

  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 10) {
    feedbackCarrinho.textContent = "Escolha uma quantidade entre 1 e 10.";
    exibirCarrinho();
    return;
  }

  const item = carrinho.find((produto) => produto.id === id);

  if (item) {
    item.quantidade = quantidade;
  }

  feedbackCarrinho.textContent = "";
  exibirCarrinho();
});

// BOTÃO DE FINALIZAR COMPRA
finalizarCompra?.addEventListener("click", () => {
  if (carrinho.length === 0) {
    feedbackCarrinho.textContent =
      "Adicione pelo menos um produto antes de finalizar a compra.";
    return;
  }

  window.location.href = "checkout.html";
});

// PRIMEIRA EXIBIÇÃO
exibirCarrinho();
