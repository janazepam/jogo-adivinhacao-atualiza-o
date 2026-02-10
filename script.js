  let numeroSecreto;
  let tentativas = 0;
  let dificuldade = 'medio';
  let palpites = [];
  let gameOver = false;
  let limites = {
    facil: { max: 50, tentativas: 20 },
    medio: { max: 100, tentativas: 15 },
    dificil: { max: 500, tentativas: 10 }
  };

  // Inicializar jogo
  iniciar();

  function iniciar() {
    dificuldade = 'medio';
    gerarNumeroSecreto();
    atualizarUI();
  }

  function gerarNumeroSecreto() {
    const max = limites[dificuldade].max;
    numeroSecreto = Math.floor(Math.random() * max) + 1;
    tentativas = 0;
    palpites = [];
    gameOver = false;
    document.getElementById('palpite').disabled = false;
    document.getElementById('btnTentar').disabled = false;
  }

  function selecionarDificuldade(nivel, event) {
  if (tentativas === 0) {
    dificuldade = nivel;
    document.querySelectorAll('.dificuldade button').forEach(btn => {
      btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');
    gerarNumeroSecreto();
    atualizarUI();
    limparMensagens();
  }
}

  function verificarEnter(event) {
    if (event.key === 'Enter') {
      verificar();
    }
  }

  function verificar() {
    const inputEl = document.getElementById('palpite');
    const palpite = Number(inputEl.value);
    const max = limites[dificuldade].max;

    if (!palpite || palpite < 1 || palpite > max) {
      mostrarMensagem(`❌ Digite um número entre 1 e ${max}.`, 'erro');
      return;
    }

    if (palpites.includes(palpite)) {
      mostrarMensagem(`⚠️ Você já tentou ${palpite}!`, 'erro');
      return;
    }

    tentativas++;
    palpites.push(palpite);
    inputEl.value = '';

    if (palpite === numeroSecreto) {
      mostrarMensagem(`🎉 Parabéns! Você acertou em ${tentativas} tentativa(s)!`, 'acerto');
      gameOver = true;
      document.getElementById('palpite').disabled = true;
      document.getElementById('btnTentar').disabled = true;
    } else if (tentativas >= limites[dificuldade].tentativas) {
      mostrarMensagem(`😒😔 Game Over! O número era ${numeroSecreto}`, 'erro');
      gameOver = true;
      document.getElementById('palpite').disabled = true;
      document.getElementById('btnTentar').disabled = true;
    } else {
      const dica = palpite < numeroSecreto ? '📈 Maior' : '📉 Menor';
      const tentativasRestantes = limites[dificuldade].tentativas - tentativas;
      mostrarMensagem(`${dica} | ${tentativasRestantes} tentativa(s) restante(s)`, 'dica');
    }

    atualizarUI();
  }

  function mostrarMensagem(texto, tipo) {
    const msgEl = document.getElementById('mensagem');
    msgEl.textContent = texto;
    msgEl.className = `mensagem show ${tipo}`;
  }

  function limparMensagens() {
    document.getElementById('mensagem').className = 'mensagem';
  }

  function atualizarUI() {
    document.getElementById('tentativas').textContent = tentativas;
    document.getElementById('limite').textContent = limites[dificuldade].tentativas;
    document.getElementById('info').innerHTML = 
      `Adivinhe o número entre <strong>1 e ${limites[dificuldade].max}</strong>`;
    atualizarHistorico();
  }

  function atualizarHistorico() {
    const historico = document.getElementById('historicoLista');
    historico.innerHTML = palpites.map(p => 
      `<span class="historico-item">${p}</span>`
    ).join('');
  }

  function reiniciar() {
    gerarNumeroSecreto();
    atualizarUI();
    limparMensagens();
    document.getElementById('palpite').focus();
  }

  function toggleTema() {
    document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  }

  // Focar no input ao carregar
  document.getElementById('palpite').focus();

