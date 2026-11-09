
// ==========================================
// FORMULÁRIO E ELEMENTOS DO CHECKOUT
// ==========================================

const form = document.querySelector("#checkoutForm");
const cepInput = document.querySelector("#cep");
const buscarCepButton = document.querySelector("#buscarCep");
const cepFeedback = document.querySelector("#cepFeedback");

// CAMPOS DE ENDEREÇO
const logradouroInput = document.querySelector("#logradouro");
const bairroInput = document.querySelector("#bairro");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");

// ==========================================
// ELEMENTOS DO RESUMO
// ==========================================

const resumoItens = document.querySelector("#resumoItens");
const resumoQuantidade = document.querySelector("#resumoQuantidade");
const resumoTotal = document.querySelector("#resumoTotal");
const resumoFeedback = document.querySelector("#resumoFeedback");

// ==========================================
// CATÁLOGO DE PRODUTOS
// ==========================================

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

// ==========================================
// RECUPERA OS PRODUTOS DO CARRINHO
// ==========================================

let carrinho = [];

try {
  carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

  if (!Array.isArray(carrinho)) {
    carrinho = [];
  }
} catch (erro) {
  carrinho = [];
}

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
// IDENTIFICA OS PRODUTOS VÁLIDOS
// ==========================================

const itensCompra = carrinho
  .map((item) => {
    const produto = produtos.find(
      (p) => p.id === Number(item.id)
    );

    const quantidade = Number(item.quantidade);

    if (
      !produto ||
      !Number.isInteger(quantidade) ||
      quantidade < 1 ||
      quantidade > 10
    ) {
      return null;
    }

    return {
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: quantidade,
      subtotal: produto.preco * quantidade
    };
  })
  .filter((item) => item !== null);

// ==========================================
// CALCULA OS VALORES DA COMPRA
// ==========================================

const quantidadeTotal = itensCompra.reduce(
  (total, item) => total + item.quantidade,
  0
);

const valorTotal = itensCompra.reduce(
  (total, item) => total + item.subtotal,
  0
);

// ==========================================
// VERIFICA SE EXISTE UMA COMPRA VÁLIDA
// ==========================================

const compraValida =
  itensCompra.length > 0 &&
  itensCompra.length === carrinho.length;

// ==========================================
// EXIBE O RESUMO DA COMPRA
// ==========================================

function exibirResumo() {
  resumoItens.innerHTML = "";

  if (!compraValida) {
    resumoItens.textContent =
      "Seu carrinho está vazio ou contém itens inválidos.";

    resumoQuantidade.textContent = "0";
    resumoTotal.textContent = formatarMoeda(0);

    resumoFeedback.textContent =
      "Volte ao carrinho para adicionar produtos antes de continuar.";

    const botaoConcluir = form.querySelector(
      'button[type="submit"]'
    );

    if (botaoConcluir) {
      botaoConcluir.disabled = true;
    }

    return;
  }

  itensCompra.forEach((item) => {
    const elemento = document.createElement("article");

    elemento.className = "d-flex align-items-center gap-3 mb-3";

    const imagem = document.createElement("img");
    imagem.src = item.imagem;
    imagem.alt = item.nome;
    imagem.style.width = "80px";
    imagem.style.height = "80px";
    imagem.style.objectFit = "contain";

    const informacoes = document.createElement("div");

    informacoes.className = "flex-grow-1";

    const categoria = document.createElement("p");
    categoria.className = "small text-secondary mb-1";
    categoria.textContent = item.categoria;

    const nome = document.createElement("h3");
    nome.className = "h6 mb-1";
    nome.textContent = item.nome;

    const preco = document.createElement("p");
    preco.className = "small mb-1";
    preco.textContent =
      `${item.quantidade} × ${formatarMoeda(item.preco)}`;

    const subtotal = document.createElement("p");
    subtotal.className = "small fw-bold mb-0";
    subtotal.textContent = formatarMoeda(item.subtotal);

    informacoes.append(
      categoria,
      nome,
      preco,
      subtotal
    );

    elemento.append(imagem, informacoes);

    resumoItens.appendChild(elemento);
  });

  resumoQuantidade.textContent = quantidadeTotal;
  resumoTotal.textContent = formatarMoeda(valorTotal);

  resumoFeedback.textContent =
    "Confira os produtos e os dados antes de concluir a compra.";
}

// PRIMEIRA EXIBIÇÃO DO RESUMO
exibirResumo();

// ==========================================
// FUNÇÕES DE CEP
// ==========================================

function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function formatarCep(valor) {
  const numeros = somenteNumeros(valor).slice(0, 8);

  if (numeros.length <= 5) {
    return numeros;
  }

  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

function cepValido(cep) {
  return somenteNumeros(cep).length === 8;
}

// ==========================================
// FORMATA O CEP ENQUANTO O USUÁRIO DIGITA
// ==========================================

cepInput?.addEventListener("input", () => {
  cepInput.value = formatarCep(cepInput.value);
  cepInput.setCustomValidity("");
  cepFeedback.textContent = "";
});

// ==========================================
// BUSCA AUTOMÁTICA DE ENDEREÇO — VIACEP
// ==========================================

buscarCepButton?.addEventListener("click", async () => {
  const cep = somenteNumeros(cepInput.value);

  // VERIFICA SE O CEP POSSUI O FORMATO CORRETO
  if (!cepValido(cep)) {
    cepFeedback.textContent =
      "Digite um CEP válido com 8 números.";

    cepFeedback.className = "mt-3 text-danger";
    cepInput.focus();

    return;
  }

  // INDICA QUE A CONSULTA ESTÁ SENDO REALIZADA
  buscarCepButton.disabled = true;
  buscarCepButton.textContent = "Buscando...";
  cepFeedback.textContent = "Consultando o CEP...";
  cepFeedback.className = "mt-3 text-secondary";

  try {
    // REALIZA A CONSULTA NA API
    const resposta = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    if (!resposta.ok) {
      throw new Error("Falha na consulta.");
    }

    const dados = await resposta.json();

    // VERIFICA SE O CEP FOI ENCONTRADO
    if (dados.erro) {
      cepFeedback.textContent =
        "CEP não encontrado. Confira os números digitados.";

      cepFeedback.className = "mt-3 text-danger";
      return;
    }

    // PREENCHE OS CAMPOS DO ENDEREÇO
    logradouroInput.value = dados.logradouro || "";
    bairroInput.value = dados.bairro || "";
    cidadeInput.value = dados.localidade || "";
    estadoInput.value = dados.uf || "";

    // INFORMA QUE A BUSCA FOI CONCLUÍDA
    cepFeedback.textContent =
      "Endereço encontrado! Confira os dados preenchidos.";

    cepFeedback.className = "mt-3 text-success";

  } catch (erro) {
    cepFeedback.textContent =
      "Não foi possível consultar o CEP. Tente novamente ou preencha o endereço manualmente.";

    cepFeedback.className = "mt-3 text-danger";

  } finally {
    // RESTAURA O BOTÃO
    buscarCepButton.disabled = false;
    buscarCepButton.textContent = "Buscar CEP";
  }
});

// ==========================================
// VALIDAÇÃO E FINALIZAÇÃO DA COMPRA
// ==========================================

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!compraValida) {
    return;
  }

  cepInput.setCustomValidity(
    cepValido(cepInput.value) ? "" : "CEP inválido"
  );

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    form.querySelector(":invalid")?.focus();

    return;
  }

  const nome = document.querySelector("#nome").value.trim();

  // SALVA OS DADOS DO CLIENTE
  sessionStorage.setItem("clienteNome", nome);

  // GERA O NÚMERO DO PEDIDO
  const pedidoNumero =
    `PED-${Math.floor(100000 + Math.random() * 900000)}`;

  sessionStorage.setItem("pedidoNumero", pedidoNumero);

  // SALVA TODOS OS PRODUTOS DO PEDIDO
  sessionStorage.setItem(
    "pedidoProdutos",
    JSON.stringify(itensCompra)
  );

  sessionStorage.setItem(
    "pedidoTotal",
    String(valorTotal)
  );

  // MANTÉM DADOS COMPATÍVEIS COM O RESUMO ANTIGO
  if (itensCompra.length === 1) {
    sessionStorage.setItem(
      "produtoNome",
      itensCompra[0].nome
    );

    sessionStorage.setItem(
      "produtoQuantidade",
      String(itensCompra[0].quantidade)
    );

    sessionStorage.setItem(
      "produtoTotal",
      String(itensCompra[0].subtotal)
    );
  }

  // LIMPA O CARRINHO APÓS SALVAR O PEDIDO
  sessionStorage.removeItem("carrinho");

  // ENCAMINHA PARA A PÁGINA DE SUCESSO
  window.location.href = "sucesso.html";
});
