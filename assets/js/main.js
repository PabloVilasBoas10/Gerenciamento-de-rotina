document.addEventListener('DOMContentLoaded', function () {
  const inputNome = document.querySelector('.input-nome')
  const inputSenha = document.querySelector('.input-senha')
  const logar = document.querySelector('.btn-logar')

  const loginPage = '../html/area-do-usuario.html'

  logar.addEventListener('click', (e) => {
    e.preventDefault()
    for (let i = 0; i < localStorage.length; i++) {
      const userKey = localStorage.key(i)
      const passwordKey = localStorage.getItem(userKey)
      console.log(userKey, passwordKey)

      if (userKey == inputNome.value.toUpperCase() && passwordKey == inputSenha.value.toUpperCase()) {
        setTimeout(() => {
          window.location.href = loginPage
        }, 2000)
        return
      } else {
        alert('Usuário ou Senha INCORRETAS!')
        return
      }
    }

    alert('Usuário Inexistente! Crie uma conta.')

  })
})

