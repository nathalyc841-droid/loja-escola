<<<<<<< HEAD

// ==========================================
// CATÁLOGO DE PRODUTOS
// ==========================================

const produtos = [
  {
    id: 1,
    codigo: "LAZ-001",
    nome: "Garfo Aquecedor de Bolso",
    categoria: "Utensílios extraordinários",
    preco: 75,
    descricao: "Um garfo portátil que aquece alimentos e ajuda a mantê-los aquecidos.",
    descricaoDetalhada: "Desenvolvido para quem deseja desfrutar de uma refeição quentinha em qualquer lugar, o Garfo Aquecedor de Bolso concentra uma fonte de calor em sua estrutura. Pode ser utilizado para aquecer alimentos ou conservar seu calor durante a refeição.",
    regra: "Caber em um bolso",
    material: "Material desconhecido",
    dimensoes: "14 × 2,5 × 1,5 cm",
    modoUso: "Utilizar para aquecer alimentos e auxiliar durante as refeições.",
    informacoesAdicionais: "Não utilizar diretamente na boca ou sobre a pele. Manter fora do alcance de crianças. As dimensões propostas são de um garfo portátil comum e tornam plausível guardá-lo em um bolso.",
    imagem: "imagem loja escola/garfo.jpeg"
  },

  {
    id: 2,
    codigo: "LAZ-002",
    nome: "Rolo de Papel para Presentes Infinitos",
    categoria: "Embalagens fantásticas",
    preco: 1200,
    descricao: "Um rolo capaz de embrulhar qualquer presente.",
    descricaoDetalhada: "Produzido com fibras extraordinárias, o rolo pode se alongar e retrair para envolver presentes de diferentes formatos e dimensões. Sua extensão é tão surpreendente que, quando totalmente expandido, ultrapassa as dimensões de uma aeronave convencional.",
    regra: "Não caber em um avião",
    material: "Fibra de aranha",
    dimensoes: "30 cm de largura; comprimento variável, com expansão ilimitada dentro da lógica fictícia do produto.",
    modoUso: "Estender o rolo, envolver o presente e permitir que o material se ajuste ao objeto.",
    informacoesAdicionais: "Pode retrair-se após o embrulho, facilitando o armazenamento.",
    imagem: "imagem loja escola/papel.jpeg"
  },

  {
    id: 3,
    codigo: "LAZ-003",
    nome: "Abajur Monocromático",
    categoria: "Iluminação extraordinária",
    preco: 8990,
    descricao: "Um abajur que converte as cores em tons de preto e branco.",
    descricaoDetalhada: "Ideal para quem deseja revisitar uma estética antiga ou transformar a atmosfera de um ambiente, este abajur utiliza uma tecnologia de origem desconhecida para converter todas as cores que ilumina em tons monocromáticos.",
    regra: "Não caber em um avião",
    material: "Materiais alienígenas e titânio",
    dimensoes: "12 × 8 × 6 m, quando totalmente expandido.",
    modoUso: "Posicionar no ambiente, acionar a iluminação e observar a transformação das cores.",
    informacoesAdicionais: "A transformação visual permanece enquanto a luz estiver ativa. O mecanismo se expande para justificar suas dimensões.",
    imagem: "imagem loja escola/luminaria.jpeg"
  },

  {
    id: 4,
    codigo: "LAZ-004",
    nome: "Kit Utensílio para Formigas",
    categoria: "Microequipamentos",
    preco: 37,
    descricao: "Uma bolsa de ferramentas desenvolvida para formigas realizarem pequenas manutenções.",
    descricaoDetalhada: "Criado para pequenos exploradores, o Kit Utensílio permite que formigas transportem ferramentas em espaços de difícil acesso. A bolsa foi projetada para acompanhar o movimento do inseto sem atrapalhar sua locomoção.",
    regra: "Servir em uma formiga",
    material: "Bolsa de microfibra resistente e ferramentas em metal ultrafino",
    dimensoes: "Bolsa de 8 × 5 × 3 mm.",
    modoUso: "Ajustar a bolsa à formiga e organizar as ferramentas em seus compartimentos.",
    informacoesAdicionais: "Ferramentas miniaturas fictícias; bolsa deverá ser representada em escala minúscula.",
    imagem: "imagem loja escola/formiga.jpeg"
  },

  {
    id: 5,
    codigo: "LAZ-005",
    nome: "Drone de Delivery Sideral",
    categoria: "Tecnologia sideral",
    preco: 248000,
    descricao: "Um veículo autônomo de entregas para transportar encomendas pelo espaço.",
    descricaoDetalhada: "Desenvolvido para o serviço de delivery sideral, este drone transporta encomendas entre estações espaciais, bases extraterrestres e outros destinos. Seu sistema de navegação permite trajetos fora da atmosfera terrestre, tornando possível realizar entregas em locais inacessíveis aos serviços convencionais.",
    regra: "Ser utilizado no espaço",
    material: "Liga metálica, estrutura de titânio, sistemas de propulsão e suporte de oxigênio para operações espaciais",
    dimensoes: "2,2 × 1,1 × 1,4 m, aproximadamente o tamanho de uma motocicleta.",
    modoUso: "Acondicionar a encomenda no compartimento de carga, selecionar o destino e iniciar a entrega.",
    informacoesAdicionais: "Produto fictício; sistema de propulsão e navegação imaginários.",
    imagem: "imagem loja escola/drone.jpeg"
  },

  {
    id: 6,
    codigo: "LAZ-006",
    nome: "Pano de Neblina",
    categoria: "Vexis",
    preco: 14,
    descricao: "Um pano de uso único que permite cobrir ou encobrir objetos com neblina.",
    descricaoDetalhada: "Produzido a partir de neblina condensada, o pano libera uma névoa ao ser aberto, encobrindo objetos ou áreas próximas durante 23 minutos. Após a primeira utilização, suas propriedades mágicas desaparecem.",
    regra: "Ser de uso único",
    material: "Neblina condensada fictícia",
    dimensoes: "40 × 40 cm.",
    modoUso: "Abrir e posicionar o pano sobre o objeto ou local que se deseja encobrir.",
    informacoesAdicionais: "A névoa desaparece após 23 minutos. O pano não pode ser reutilizado.",
    imagem: "imagem loja escola/pano.jpeg"
  }
];


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const breadcrumbProduto = document.querySelector("#breadcrumbProduto");
const produtoCategoria = document.querySelector("#produtoCategoria");
const produtoNome = document.querySelector("#produtoNome");
const produtoPreco = document.querySelector("#produtoPreco");
const produtoDescricao = document.querySelector("#produtoDescricao");
const produtoImagem = document.querySelector("#produtoImagem");

const produtoCodigo = document.querySelector("#produtoCodigo");
const produtoDescricaoDetalhada = document.querySelector("#produtoDescricaoDetalhada");
const produtoRegra = document.querySelector("#produtoRegra");
const produtoMaterial = document.querySelector("#produtoMaterial");
const produtoDimensoes = document.querySelector("#produtoDimensoes");
const produtoModoUso = document.querySelector("#produtoModoUso");
const produtoInformacoesAdicionais = document.querySelector("#produtoInformacoesAdicionais");

const formProduto = document.querySelector("#formProduto");
const quantidadeInput = document.querySelector("#quantidade");
const produtoFeedback = document.querySelector("#produtoFeedback");


// ==========================================
// IDENTIFICA O PRODUTO PELA URL
// ==========================================

const parametros = new URLSearchParams(window.location.search);
const idProduto = Number(parametros.get("id"));

const produtoSelecionado = produtos.find(
  (produto) => produto.id === idProduto
);


// ==========================================
// FORMATA O PREÇO
// ==========================================

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


// ==========================================
// EXIBE OS DADOS DO PRODUTO
// ==========================================

if (produtoSelecionado) {

  breadcrumbProduto.textContent = produtoSelecionado.nome;

  produtoCategoria.textContent = produtoSelecionado.categoria;
  produtoNome.textContent = produtoSelecionado.nome;
  produtoPreco.textContent = formatarMoeda(produtoSelecionado.preco);
  produtoDescricao.textContent = produtoSelecionado.descricao;

  produtoImagem.src = produtoSelecionado.imagem;
  produtoImagem.alt = produtoSelecionado.nome;

  produtoCodigo.textContent = produtoSelecionado.codigo;
  produtoDescricaoDetalhada.textContent = produtoSelecionado.descricaoDetalhada;
  produtoRegra.textContent = produtoSelecionado.regra;
  produtoMaterial.textContent = produtoSelecionado.material;
  produtoDimensoes.textContent = produtoSelecionado.dimensoes;
  produtoModoUso.textContent = produtoSelecionado.modoUso;
  produtoInformacoesAdicionais.textContent =
    produtoSelecionado.informacoesAdicionais;

  document.title = `${produtoSelecionado.nome} | Lazúli`;

} else {

  produtoFeedback.textContent =
    "Não foi possível encontrar este produto. Volte ao catálogo.";

  formProduto.hidden = true;
}


// ==========================================
// ADICIONA O PRODUTO AO CARRINHO
// ==========================================

formProduto?.addEventListener("submit", (event) => {

  event.preventDefault();

  // RECUPERA A QUANTIDADE ESCOLHIDA
  const quantidadeEscolhida = Number(quantidadeInput.value);

  // VALIDA A QUANTIDADE
  if (
    !Number.isInteger(quantidadeEscolhida) ||
    quantidadeEscolhida < 1 ||
    quantidadeEscolhida > 10
  ) {
    produtoFeedback.textContent =
      "Escolha uma quantidade entre 1 e 10.";

    return;
  }

  // RECUPERA O CARRINHO EXISTENTE
  let carrinho = [];

  try {
    carrinho = JSON.parse(
      sessionStorage.getItem("carrinho")
    ) || [];
  } catch (erro) {
    carrinho = [];
  }

  // PROCURA O PRODUTO NO CARRINHO
  const itemExistente = carrinho.find(
    (item) => item.id === produtoSelecionado.id
  );

  // VERIFICA SE O PRODUTO JÁ FOI ADICIONADO
  if (itemExistente) {

    const novaQuantidade =
      itemExistente.quantidade + quantidadeEscolhida;

    if (novaQuantidade > 10) {
      produtoFeedback.textContent =
        "O limite é de 10 unidades por produto.";

      return;
    }

    itemExistente.quantidade = novaQuantidade;

  } else {

    // ADICIONA UM NOVO PRODUTO
    carrinho.push({
      id: produtoSelecionado.id,
      quantidade: quantidadeEscolhida
    });

  }

  // SALVA O CARRINHO ATUALIZADO
  sessionStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho)
  );

  // ENCAMINHA PARA A PÁGINA DO CARRINHO
  window.location.href = "carrinho.html";

});
=======
const formProduto = document.querySelector("#formProduto");
const quantidade = document.querySelector("#quantidade");
const feedback = document.querySelector("#produtoFeedback");

formProduto?.addEventListener("submit", (event) => {
  event.preventDefault();
  const quantidadeEscolhida = Number(quantidade.value);

  if (quantidadeEscolhida < 1 || quantidadeEscolhida > 10) {
    feedback.textContent = "Escolha uma quantidade entre 1 e 10.";
    quantidade.focus();
    return;
  }

  sessionStorage.setItem("quantidade", String(quantidadeEscolhida));
  window.location.href = "checkout.html";
});

/* TODO: usar URLSearchParams para carregar o produto conforme o id da URL. */
>>>>>>> 73195d0111e1759fd1eed49ed87fcdc2fe319f41
