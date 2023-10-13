document.addEventListener('DOMContentLoaded', function () {
  const inputNome = document.querySelector('.input-nome')
  const inputSenha = document.querySelector('.input-senha')
  const inputConfirmarSenha = document.querySelector('.input-confirmar-senha')
  const criar = document.querySelector('.btn-criar-conta')

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
        // console.log(userKey, passwordKey)

        if (userKey === inputNome.value.toUpperCase()) {
          alert('USUARIO JÁ EXISTENTE, CRIE OUTRO!');
          return
        }


      }
      localStorage.setItem(inputNome.value.toUpperCase(), inputSenha.value.toUpperCase())
      setTimeout(() => {
        window.location.href = loginPage
      }, 1000)

    }
  })
});



