document.addEventListener('DOMContentLoaded', function () {
  const inputNome = document.querySelector('.input-nome')
  const inputSenha = document.querySelector('.input-senha')
  const inputConfirmarSenha = document.querySelector('.input-confirmar-senha')
  const criar = document.querySelector('.btn-criar-conta')
  const ativaAnimaçao = document.querySelector('.tela-carregamento')
  const loginPage = '../../index.html'

  criar.addEventListener('click', (e) => {
    e.preventDefault()

    // Checa se todos os campos existem e se estão completos
    if (inputNome.value && inputSenha.value && inputConfirmarSenha) {
      if (inputSenha.value != inputConfirmarSenha.value) {
        alert("AS SENHAS NÃO SE COINCIDEM!")
        return
      }

      // Faz um laço checando se o usuário já existe, se existir não deixar criar uma conta
      for (let i = 0; i < localStorage.length; i++) {
        const userKey = localStorage.key(i)
        const passwordKey = localStorage.getItem(userKey)

        if (userKey === inputNome.value.toUpperCase()) {
          alert('USUARIO JÁ EXISTENTE, CRIE OUTRO!');
          return
        }


      }

      // Objeto com as informações do usuário
      let user = {
        nome: inputNome.value.toUpperCase(),
        senha: inputSenha.value.toUpperCase(),
        tarefas: [],
        situacao: false
      }

      // Transforma o usuário em JSON e envia para o localStorage
      const userJson = JSON.stringify(user)
      localStorage.setItem(user.nome, userJson)

      ativaAnimaçao.classList.add('ativo')

      // Encaminha para a página de Login após 2 segundos
      // OBS: Deixar os 2 segundos para melhor experiência do Usuário.
      setTimeout(() => {
        window.location.href = loginPage
        return
      }, 1000)

    }
  })
});



