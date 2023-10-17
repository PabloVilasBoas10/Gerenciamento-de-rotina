let usuario;
document.addEventListener('DOMContentLoaded', function () {
  const inputNome = document.querySelector('.input-nome')
  const inputSenha = document.querySelector('.input-senha')
  const logar = document.querySelector('.btn-logar')
  const loginPage = '../../area-do-usuario.html'

  logar.addEventListener('click', (e) => {
    e.preventDefault()

    // Faz um laço pegando todos os usuarios no localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const userKey = localStorage.key(i)
      const informationsKey = localStorage.getItem(userKey)
      let informationsKeyJson = JSON.parse(informationsKey)

      // Verifica se usuário e senha existem e estão corretas
      if (userKey == inputNome.value.toUpperCase() && informationsKeyJson.senha == inputSenha.value.toUpperCase()) {
        const ativaAnimaçao = document.querySelector('.tela-carregamento');
        ativaAnimaçao.classList.add('ativo');

        // Se o usuário logar, muda a situação para "true"
        informationsKeyJson.situacao = true
        informationsKeyJson = JSON.stringify(informationsKeyJson)
        localStorage.setItem(userKey, informationsKeyJson);

        setTimeout(() => {
          window.location.href = loginPage;
        }, 2000);

        return;
      }
    }

    alert('Usuário ou Senha Incorretas!')

  })

  // Evento de reload
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });


})
