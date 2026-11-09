<<<<<<< HEAD

// ==========================================
// ELEMENTOS DO FILTRO
// ==========================================

=======
>>>>>>> 73195d0111e1759fd1eed49ed87fcdc2fe319f41
const inputFiltro = document.querySelector("#filtroProduto");
const produtos = document.querySelectorAll(".product-item");
const mensagemFiltro = document.querySelector("#mensagemFiltro");

<<<<<<< HEAD
// ==========================================
// FILTRAGEM DE PRODUTOS
// ==========================================

=======
>>>>>>> 73195d0111e1759fd1eed49ed87fcdc2fe319f41
function filtrarProdutos() {
  const termo = inputFiltro.value.trim().toLowerCase();
  let quantidadeVisivel = 0;

  produtos.forEach((produto) => {
<<<<<<< HEAD
    const nome = (produto.dataset.name || "").toLowerCase();
    const deveAparecer = nome.includes(termo);

    produto.hidden = !deveAparecer;

    if (deveAparecer) {
      quantidadeVisivel++;
    }
  });

  // Limpa a mensagem quando o campo está vazio
=======
    const nome = produto.dataset.name.toLowerCase();
    const deveAparecer = nome.includes(termo);
    produto.hidden = !deveAparecer;
    if (deveAparecer) quantidadeVisivel += 1;
  });

>>>>>>> 73195d0111e1759fd1eed49ed87fcdc2fe319f41
  if (!termo) {
    mensagemFiltro.textContent = "";
    return;
  }

<<<<<<< HEAD
  // Informa o resultado da pesquisa
=======
>>>>>>> 73195d0111e1759fd1eed49ed87fcdc2fe319f41
  mensagemFiltro.textContent = quantidadeVisivel === 0
    ? "Nenhum produto encontrado."
    : `${quantidadeVisivel} produto(s) encontrado(s).`;
}

<<<<<<< HEAD
// ==========================================
// EVENTO DE PESQUISA
// ==========================================

=======
>>>>>>> 73195d0111e1759fd1eed49ed87fcdc2fe319f41
inputFiltro?.addEventListener("input", filtrarProdutos);
