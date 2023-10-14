let usuario;
document.addEventListener('DOMContentLoaded', function () {
  const inputNome = document.querySelector('.input-nome')
  const inputSenha = document.querySelector('.input-senha')
  const logar = document.querySelector('.btn-logar')
  const loginPage = '../../area-do-usuario.html'

  logar.addEventListener('click', (e) => {
    e.preventDefault()

    // Faz um laço pegando todos os usuarios
    for (let i = 0; i < localStorage.length; i++) {
      const userKey = localStorage.key(i)
      const passwordKey = localStorage.getItem(userKey)

      // Verifica se usuário e senha existem e estão corretas
      if (userKey == inputNome.value.toUpperCase() && passwordKey == inputSenha.value.toUpperCase()) {
        const ativaAnimaçao = document.querySelector('.tela-carregamento');
        ativaAnimaçao.classList.add('ativo');
        usuario = userKey;
        console.log("Usuário definido:", usuario);

        localStorage.setItem('usuario', usuario);

        setTimeout(() => {
          window.location.href = loginPage;
        }, 2000);

        return;
      }
    }

    alert('Usuário ou Senha Incorretas!')

  })

})

// export { usuario }
