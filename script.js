const emojis = ['🐶', '🐱', '🦊', '🐸', '🦁', '🐵'];
// Duplica os emojis para formar os pares
let cartas = [...emojis, ...emojis];

const tabuleiro = document.getElementById('tabuleiro');
const btnReiniciar = document.getElementById('btn-reiniciar');

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

// Embaralha as cartas
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Cria o tabuleiro no HTML
function criarTabuleiro() {
  tabuleiro.innerHTML = '';
  const cartasEmbaralhadas = embaralhar([...cartas]);

  cartasEmbaralhadas.forEach(emoji => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.emoji = emoji;

    carta.innerHTML = `
      <div class="face frente"></div>
      <div class="face verso">${emoji}</div>
    `;

    carta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(carta);
  });
}

// Lógica de virar a carta
function virarCarta() {
  if (bloqueado || this === primeiraCarta || this.classList.contains('virada')) return;

  this.classList.add('virada');

  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  verificarPar();
}

// Verifica se as duas cartas viradas são iguais
function verificarPar() {
  const ehPar = primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji;

  if (ehPar) {
    resetarJogada();
  } else {
    bloqueado = true;
    setTimeout(() => {
      primeiraCarta.classList.remove('virada');
      segundaCarta.classList.remove('virada');
      resetarJogada();
    }, 1000);
  }
}

// Reseta o estado para a próxima jogada
function resetarJogada() {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
}

// Evento do botão de reiniciar
btnReiniciar.addEventListener('click', () => {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
  criarTabuleiro();
});

// Inicializa o jogo ao carregar
criarTabuleiro();