
// ==========================================
// CATÁLOGO DE PRODUTOS
// ==========================================

const produtos = [
  {
    id: 1,
    nome: "Garfo Aquecedor de Bolso",
    categoria: "Utensílios extraordinários",
    preco: 75
  },
  {
    id: 2,
    nome: "Rolo de Papel para Presentes Infinitos",
    categoria: "Embalagens fantásticas",
    preco: 1200
  },
  {
    id: 3,
    nome: "Abajur Monocromático",
    categoria: "Iluminação extraordinária",
    preco: 8990
  },
  {
    id: 4,
    nome: "Kit Utensílio para Formigas",
    categoria: "Microequipamentos",
    preco: 37
  },
  {
    id: 5,
    nome: "Drone de Delivery Sideral",
    categoria: "Tecnologia sideral",
    preco: 248000
  },
  {
    id: 6,
    nome: "Pano de Neblina",
    categoria: "Vexis",
    preco: 14
  }
];


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const checkoutForm = document.querySelector("#checkoutForm");

const nomeInput = document.querySelector("#nome");
const telefoneInput = document.querySelector("#telefone");
const emailInput = document.querySelector("#email");

const cepInput = document.querySelector("#cep");
const buscarCep = document.querySelector("#buscarCep");
const cepFeedback = document.querySelector("#cepFeedback");

const logradouroInput = document.querySelector("#logradouro");
const numeroInput = document.querySelector("#numero");
const complementoInput = document.querySelector("#complemento");
const bairroInput = document.querySelector("#bairro");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");

const pagamentoInput = document.querySelector("#pagamento");
const termosInput = document.querySelector("#termos");

const resumoItens = document.querySelector("#resumoItens");
const resumoQuantidade = document.querySelector("#resumoQuantidade");
const resumoTotal = document.querySelector("#resumoTotal");
const resumoFeedback = document.querySelector("#resumoFeedback");

const concluirPedido = document.querySelector("#concluirPedido");


// ==========================================
// RECUPERA O CARRINHO
// ==========================================

let carrinho = [];

try {
  carrinho = JSON.parse(
    sessionStorage.getItem("carrinho")
  ) || [];

  if (!Array.isArray(carrinho)) {
    carrinho = [];
  }

} catch (erro) {
  carrinho = [];
}


// ==========================================
// VALIDA OS ITENS DO CARRINHO
// ==========================================

carrinho = carrinho.filter((item) => {

  const produtoExiste = produtos.some(
    (produto) => produto.id === Number(item.id)
  );

  const quantidadeValida =
    Number.isInteger(Number(item.quantidade)) &&
    Number(item.quantidade) >= 1 &&
    Number(item.quantidade) <= 10;

  return produtoExiste && quantidadeValida;

});


// ==========================================
// FORMATA OS VALORES EM REAIS
// ==========================================

function formatarMoeda(valor) {

  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}


// ==========================================
// EXIBE O RESUMO DO PEDIDO
// ==========================================

function exibirResumo() {

  resumoItens.innerHTML = "";

  let total = 0;
  let quantidadeTotal = 0;

  if (carrinho.length === 0) {

    resumoFeedback.textContent =
      "Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.";

    concluirPedido.disabled = true;

    resumoQuantidade.textContent = "0";
    resumoTotal.textContent = formatarMoeda(0);

    return;
  }

  resumoFeedback.textContent = "";

  carrinho.forEach((item) => {

    const produto = produtos.find(
      (produto) => produto.id === Number(item.id)
    );

    if (!produto) return;

    const quantidade = Number(item.quantidade);
    const subtotal = produto.preco * quantidade;

    total += subtotal;
    quantidadeTotal += quantidade;

    const elemento = document.createElement("div");

    elemento.className = "summary-item";

    const informacoes = document.createElement("div");

    const nomeProduto = document.createElement("p");
    nomeProduto.className = "fw-bold";
    nomeProduto.textContent = produto.nome;

    const quantidadeProduto = document.createElement("p");
    quantidadeProduto.className = "small";
    quantidadeProduto.textContent =
      `${quantidade} unidade(s)`;

    informacoes.append(nomeProduto, quantidadeProduto);

    const valorProduto = document.createElement("strong");
    valorProduto.textContent = formatarMoeda(subtotal);

    elemento.append(informacoes, valorProduto);

    resumoItens.appendChild(elemento);

  });

  resumoQuantidade.textContent = quantidadeTotal;
  resumoTotal.textContent = formatarMoeda(total);

  concluirPedido.disabled = false;

}


// ==========================================
// FORMATA O CEP
// ==========================================

cepInput.addEventListener("input", () => {

  let cep = cepInput.value.replace(/\D/g, "");

  cep = cep.slice(0, 8);

  if (cep.length > 5) {
    cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
  }

  cepInput.value = cep;

  cepFeedback.textContent = "";

});


// ==========================================
// BUSCA O ENDEREÇO PELO CEP
// ==========================================

buscarCep.addEventListener("click", async () => {

  const cep = cepInput.value.replace(/\D/g, "");

  if (!/^\d{8}$/.test(cep)) {

    cepFeedback.textContent =
      "Informe um CEP válido com 8 números.";

    return;
  }

  buscarCep.disabled = true;

  cepFeedback.textContent = "Buscando endereço...";

  try {

    const resposta = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    if (!resposta.ok) {
      throw new Error("Erro na consulta do CEP.");
    }

    const endereco = await resposta.json();

    if (endereco.erro) {

      cepFeedback.textContent =
        "CEP não encontrado. Verifique os números.";

      return;
    }

    logradouroInput.value = endereco.logradouro || "";
    bairroInput.value = endereco.bairro || "";
    cidadeInput.value = endereco.localidade || "";
    estadoInput.value = endereco.uf || "";

    numeroInput.focus();

    cepFeedback.textContent =
      "Endereço encontrado! Confira os dados e informe o número.";

  } catch (erro) {

    cepFeedback.textContent =
      "Não foi possível consultar o CEP. Tente novamente.";

  } finally {

    buscarCep.disabled = false;

  }

});


// ==========================================
// FINALIZA O PEDIDO
// ==========================================

checkoutForm.addEventListener("submit", (event) => {

  event.preventDefault();

  // VERIFICA SE EXISTEM PRODUTOS

  if (carrinho.length === 0) {

    resumoFeedback.textContent =
      "Adicione produtos ao carrinho antes de finalizar.";

    return;
  }

  // VALIDA O CEP

  const cep = cepInput.value.replace(/\D/g, "");

  if (!/^\d{8}$/.test(cep)) {

    cepFeedback.textContent =
      "Informe um CEP válido.";

    cepInput.focus();

    return;
  }

  // VERIFICA OS TERMOS

  if (!termosInput.checked) {

    resumoFeedback.textContent =
      "Confirme os dados antes de continuar.";

    return;
  }

  // PREPARA OS PRODUTOS DO PEDIDO

  let totalPedido = 0;

  const produtosPedido = carrinho.map((item) => {

    const produto = produtos.find(
      (produto) => produto.id === Number(item.id)
    );

    const quantidade = Number(item.quantidade);
    const subtotal = produto.preco * quantidade;

    totalPedido += subtotal;

    return {
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: quantidade,
      precoUnitario: produto.preco,
      subtotal: subtotal
    };

  });

  // GERA O NÚMERO DO PEDIDO

  const numeroGerado = `PED-${Date.now()}`;

  // SALVA OS DADOS DO CLIENTE

  const dadosCliente = {
    nome: nomeInput.value.trim(),
    telefone: telefoneInput.value.trim(),
    email: emailInput.value.trim(),

    endereco: {
      cep: cepInput.value,
      logradouro: logradouroInput.value.trim(),
      numero: numeroInput.value.trim(),
      complemento: complementoInput.value.trim(),
      bairro: bairroInput.value.trim(),
      cidade: cidadeInput.value.trim(),
      estado: estadoInput.value.trim()
    },

    pagamento: pagamentoInput.value
  };

  try {

    // ARMAZENA AS INFORMAÇÕES DO PEDIDO

    sessionStorage.setItem(
      "clienteNome",
      dadosCliente.nome
    );

    sessionStorage.setItem(
      "dadosCliente",
      JSON.stringify(dadosCliente)
    );

    sessionStorage.setItem(
      "pedidoNumero",
      numeroGerado
    );

    sessionStorage.setItem(
      "pedidoProdutos",
      JSON.stringify(produtosPedido)
    );

    sessionStorage.setItem(
      "pedidoTotal",
      String(totalPedido)
    );

    // LIMPA O CARRINHO

    sessionStorage.removeItem("carrinho");

    // ENCAMINHA PARA A CONFIRMAÇÃO

    window.location.href = "sucesso.html";

  } catch (erro) {

    resumoFeedback.textContent =
      "Não foi possível registrar o pedido. Tente novamente.";

  }

});


// ==========================================
// PRIMEIRA EXIBIÇÃO
// ==========================================

exibirResumo();
