document.addEventListener('DOMContentLoaded', function () {
  const inputNome = document.querySelector('.input-nome')
  const inputSenha = document.querySelector('.input-senha')
  const inputConfirmarSenha = document.querySelector('.input-confirmar-senha')
  const criar = document.querySelector('.btn-criar-conta')
  const ativaAnimaçao = document.querySelector('.tela-carregamento')
  const loginPage = '../../index.html'

  criar.addEventListener('click', (e) => {
    e.preventDefault()
    if (inputNome.value && inputSenha.value && inputConfirmarSenha) {
      if (inputSenha.value != inputConfirmarSenha.value) {
        alert("AS SENHAS NÃO SE COINCIDEM!")
        return
      }

      for (let i = 0; i < localStorage.length; i++) {
        const userKey = localStorage.key(i)
        const passwordKey = localStorage.getItem(userKey)

        if (userKey === inputNome.value.toUpperCase()) {
          alert('USUARIO JÁ EXISTENTE, CRIE OUTRO!');
          return
        }


      }
      let user = {
        nome: inputNome.value.toUpperCase(),
        senha: inputSenha.value.toUpperCase(),
        tarefas: [{
          nomeProjeto: '',
          descricaoProjeto: '',
        }],
        ativo: false
      }
      const userJson = JSON.stringify(user)
      localStorage.setItem(user.nome, userJson)

      ativaAnimaçao.classList.add('ativo')

      setTimeout(() => {
        window.location.href = loginPage
        return
      }, 1000)

    }
  })
});



