const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-criar')
const ul = document.querySelector('.pendentes .lista')
const sair = document.querySelector('.sair')
const loginPage = '../../index.html'
const h1 = document.querySelector('.h1-nome > span')
const pendentes = document.querySelector('.pendentes .lista')
const concluida = document.querySelector('.concluidas .lista')


// Faz um for pegando todas as tarefas do Usuário
for (let i = 0; i < localStorage.length; i++) {
  const userKey = localStorage.key(i)
  const informationsKey = localStorage.getItem(userKey)
  let informationsKeyJson = JSON.parse(informationsKey)
  const tarefas = informationsKeyJson.tarefas


  // Mapeia e retorna as tarefas
  if (informationsKeyJson.situacao === true) {



    const nomeTarefas = tarefas.map((tarefa) => tarefa.nomeProjeto);
    const tarefaConcluida = tarefas.map((tarefa) => tarefa.concluido);


    for (let i = 0; i < nomeTarefas.length; i++) {
      criaTarefa(nomeTarefas[i])

      const tarefa = document.querySelectorAll('.container > div > .lista > div')
      const checkboxes = document.querySelectorAll('.checar-tarefa');


      if (tarefas[i].concluido === true) {

        tarefa.forEach(item => {
          item.classList.add('tarefa-concluida')
          concluida.appendChild(item)

          if (item.classList.contains('tarefa-concluida')) {
            checkboxes.forEach(function (checkbox) {
              checkbox.checked = true;
            });

          }
        })
      }

    }


  }
}


btnTarefa.addEventListener('click', () => {
  if (!inputTarefa.value || inputTarefa.value.trim() === '') {
    return
  }

  salvaTarefasUsuario(inputTarefa.value)
  criaTarefa(inputTarefa.value)

})


function criaTarefa(txt) {
  const divContainer = criaContainer(txt)
  ul.appendChild(divContainer)
  limpaInput()
}


function salvaTarefasUsuario(txt) {
  for (let i = 0; i < localStorage.length; i++) {
    const tarefa = {
      nomeProjeto: txt,
      concluido: false
    }
    const userKey = localStorage.key(i)
    const informationsKey = localStorage.getItem(userKey)
    let informationsKeyJson = JSON.parse(informationsKey)
    if (informationsKeyJson.situacao === true) {
      informationsKeyJson.tarefas.push(tarefa)
      informationsKeyJson = JSON.stringify(informationsKeyJson)
      localStorage.setItem(userKey, informationsKeyJson);
    }
  }
}


// Cria Elementos

function criaDiv() {
  const div = document.createElement('div')
  return div
}

function CriaLi() {
  const li = document.createElement('li')
  return li
}

function criaContainer(txt) {
  const li = CriaLi()
  const divContainer = criaDiv()
  const divLi = criaDiv()
  const divBotoes = criaDiv()
  const btnApagar = criaBtnApagar()
  const inputChecar = criaInputChecar()
  const btnEditar = criaBtnEditar()

  divContainer.appendChild(divLi)
  divContainer.appendChild(divBotoes)
  divBotoes.appendChild(inputChecar)
  divBotoes.appendChild(btnApagar)
  divBotoes.appendChild(btnEditar)
  divLi.appendChild(li)

  li.innerText = txt

  return divContainer
}

function criaBtnApagar() {
  const btnApagar = document.createElement('button')
  btnApagar.innerHTML = '&#10006'
  btnApagar.classList.add('apagar-tarefa')
  return btnApagar
}

function criaInputChecar() {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.classList.add('checar-tarefa')
  return checkbox
}

function criaBtnEditar() {
  const btnEditar = document.createElement('button')
  btnEditar.innerHTML = '&#10000'
  btnEditar.classList.add('editar-tarefa')
  return btnEditar
}

// Cria a página de editar tarefa
// OBS: Deixar assim, senão a conflito de tarefas do usuário
function criaContainerEdit() {
  const divContainer = `
  <h2>Editar Tarefa</h2>
  <input type="text" class="input-tarefa-editada" maxlength="25" placeholder="Digite sua nova tarefa..."/>
  <button class="btn-confirmar-edit">Confirmar</button>
  <button class="fechar-janela">&#10006</button>`

  return divContainer
}

function limpaInput() {
  inputTarefa.value = ''
  inputTarefa.focus()
}



// Pega o nome do Usuário logado e retorna o nome dele
function pegaUsuario() {
  for (let i = 0; i < localStorage.length; i++) {
    const userKey = localStorage.key(i)
    const informationsKey = localStorage.getItem(userKey)
    let informationsKeyJson = JSON.parse(informationsKey)
    if (informationsKeyJson.situacao === true) {
      return userKey
    }
  }
}

// Adiciona o nome do usuário logado no título
h1.textContent = pegaUsuario()



// Pega o Usuário logado e altera ele para ativo
function pegaUsuarioAtivo() {
  for (let i = 0; i < localStorage.length; i++) {
    const userKey = localStorage.key(i)
    const informationsKey = localStorage.getItem(userKey)
    let informationsKeyJson = JSON.parse(informationsKey)
    informationsKeyJson.situacao = false
    informationsKeyJson = JSON.stringify(informationsKeyJson)
    localStorage.setItem(userKey, informationsKeyJson);
  }

}



// Evento de keypress, nesse evento a tecla "enter" está sendo usada para criar tarefas
document.addEventListener('keypress', (e) => {
  if (!inputTarefa.value || inputTarefa.value.trim() === '') {
    return
  }

  if (e.keyCode === 13) {
    salvaTarefasUsuario(inputTarefa.value)
    criaTarefa(inputTarefa.value)
    limpaInput()
  }

})

// Evento de click no document

document.addEventListener('click', (e) => {
  // Verifica em qual elemento dá página está sendo clicado
  const el = e.target

  // Evento de excluir tarefa
  if (el.classList.contains('apagar-tarefa')) {
    const promptApagar = confirm("Tem certeza que deseja apagar essa tarefa?")

    if (promptApagar) {
      const tarefa = document.querySelectorAll('.container > div > .lista > div ')

      // Percorre todos os itens do localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const userKey = localStorage.key(i)
        const informationsKey = localStorage.getItem(userKey)
        let informationsKeyJson = JSON.parse(informationsKey)

        // Verifica qual usuario está logado
        if (informationsKeyJson.situacao === true) {

          // Percorre as tarefas pegando a tarefa e o indice dela
          tarefa.forEach((item, indice) => {
            const elemento = el.parentElement.parentElement

            // verifica se o elemento clicado é o mesmo que o item que existe nas tarefas
            if (elemento == item) {
              elemento.remove()
              informationsKeyJson.tarefas.splice(indice, 1)
              localStorage.setItem(userKey, JSON.stringify(informationsKeyJson));
            }
          })
        }
      }
    }

  }

  // Evento de checar tarefa
  if (el.classList.contains('checar-tarefa')) {

    el.parentElement.parentElement.classList.toggle('tarefa-concluida')

    const concluida = document.querySelector('.concluidas .lista')

    for (let i = 0; i < localStorage.length; i++) {

      const userKey = localStorage.key(i)
      const informationsKey = localStorage.getItem(userKey)
      let informationsKeyJson = JSON.parse(informationsKey)

      // Verifica qual usuario está logado
      if (informationsKeyJson.situacao === true) {

        const tarefa = document.querySelectorAll('.container > div > .lista > div ')

        // Percorre as tarefas pegando a tarefa e o indice dela
        tarefa.forEach((item, indice) => {
          const elemento = el.parentElement.parentElement

          // verifica se o elemento clicado é o mesmo que o item que existe nas tarefas
          if (elemento == item) {
            if (elemento.classList.contains('tarefa-concluida')) {

              informationsKeyJson.tarefas[indice].concluido = true
              concluida.appendChild(elemento)
            } else {
              informationsKeyJson.tarefas[indice].concluido = false
              concluida.removeChild(elemento)
              ul.appendChild(elemento)
            }
            localStorage.setItem(userKey, JSON.stringify(informationsKeyJson));
          }
        })
      }
    }



  }

  // Evento de editar tarefa
  if (el.classList.contains('editar-tarefa')) {

    const divContainerEdit = criaContainerEdit()
    const containerEditarTarefa = document.querySelector('.div-editar-tarefa')
    containerEditarTarefa.innerHTML = divContainerEdit
    const inputEditarTarefa = containerEditarTarefa.querySelector('.input-tarefa-editada')
    const btnEditarTarefa = containerEditarTarefa.querySelector('.btn-confirmar-edit')
    const btnFecharJanela = containerEditarTarefa.querySelector('.fechar-janela')
    containerEditarTarefa.classList.add('abrir')

    inputEditarTarefa.focus()

    const tarefa = document.querySelectorAll('.container > div > .lista > div ')

    // Percorre todos os itens do localStorage
    for (let i = 0; i < localStorage.length; i++) {

      const userKey = localStorage.key(i)
      const informationsKey = localStorage.getItem(userKey)
      let informationsKeyJson = JSON.parse(informationsKey)

      // Verifica qual usuario está logado
      if (informationsKeyJson.situacao === true) {

        // Percorre as tarefas pegando a tarefa e o indice dela
        tarefa.forEach((item, indice) => {
          const elemento = el.parentElement.parentElement

          // verifica se o elemento clicado é o mesmo que o item que existe nas tarefas
          if (elemento == item) {

            const li = el.parentElement.parentElement.children[0].children[0]
            inputEditarTarefa.value = li.innerText // abre o input com o texto da tarefa

            btnEditarTarefa.addEventListener('click', () => {

              if (!inputEditarTarefa.value || inputEditarTarefa.value.trim() === '') {
                return
              }

              li.innerText = inputEditarTarefa.value
              informationsKeyJson.tarefas[indice].nomeProjeto = inputEditarTarefa.value

              localStorage.setItem(userKey, JSON.stringify(informationsKeyJson));

              containerEditarTarefa.classList.remove('abrir')
              inputEditarTarefa.value = ''

            })


          }
        })
      }
    }



    // Evento de fechar a janela de editar tarefa
    btnFecharJanela.addEventListener('click', () => {
      containerEditarTarefa.classList.remove('abrir')
      inputEditarTarefa.value = ''

    })

  }
})

// Evento de deslogar usuário
sair.addEventListener('click', () => {
  pegaUsuarioAtivo()
  window.location.href = loginPage;

})


// Evento para reloads na pagina
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   pegaUsuarioAtivo()
//   window.location.href = loginPage;
//   history.pushState(null, null, loginPage);
// });

// history.pushState(null, null, loginPage);
// window.addEventListener('popstate', function () {
//   history.pushState(null, null, loginPage);
// });


