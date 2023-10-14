const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-criar')
const ul = document.querySelector('.lista')
const listaTarefas = []
const usuario = localStorage.getItem('usuario')

const h1 = document.querySelector('.h1-nome > span')
h1.innerText = usuario

// Agora você pode usar a variável 'usuario' neste arquivo
// console.log(usuario);
btnTarefa.addEventListener('click', () => {
  if (!inputTarefa.value || inputTarefa.value.trim() === '') {
    return
  }

  if (listaTarefas.includes(inputTarefa.value)) {
    alert('ESSA TAREFA JÁ EXISTE!')
    return
  }
  listaTarefas.push(inputTarefa.value)
  criaTarefa(listaTarefas[listaTarefas.length - 1])

})


function criaTarefa(txt) {
  const divContainer = criaContainer(txt)
  ul.appendChild(divContainer)
  limpaInput()

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
  btnEditar.innerHTML = '&#9999'
  btnEditar.classList.add('editar-tarefa')
  return btnEditar
}

function criaContainerEdit() {
  const divContainer = `
  <h2>Editar Tarefa</h2>
  <input type="text" class="input-tarefa-editada" maxlength="25" placeholder="Digite sua nova tarefa..."/>
  <button class="btn-confirmar-edit">Confirmar</button>
  <button class="fechar-janela">&#10006</button>`

  return divContainer
}



// Eventos

document.addEventListener('keypress', (e) => {
  if (!inputTarefa.value || inputTarefa.value.trim() === '') {
    return
  }

  if (e.keyCode === 13) {

    if (listaTarefas.includes(inputTarefa.value)) {
      alert('Essa Tarefa ja existe!')
      return
    }

    listaTarefas.push(inputTarefa.value)
    criaTarefa(listaTarefas[listaTarefas.length - 1])
    console.log(listaTarefas)

    limpaInput()
  }

})

document.addEventListener('click', (e) => {
  const el = e.target

  // Evento de excluir tarefa
  if (el.classList.contains('apagar-tarefa')) {
    const promptApagar = confirm("Tem certeza que deseja apagar essa tarefa?")
    if (promptApagar) {
      el.parentElement.parentElement.remove()
    }

  }

  // Evento de checar tarefa
  if (el.classList.contains('checar-tarefa')) {
    el.parentElement.parentElement.classList.toggle('tarefa-concluida')
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
    const li = el.parentElement.parentElement.children[0].children[0]
    inputEditarTarefa.value = li.innerText // abre o input com o texto da tarefa

    btnEditarTarefa.addEventListener('click', () => {
      if (!inputEditarTarefa.value || inputEditarTarefa.value.trim() === '') {
        return
      }
      li.innerText = inputEditarTarefa.value
      containerEditarTarefa.classList.remove('abrir')
      inputEditarTarefa.value = ''

    })
    btnFecharJanela.addEventListener('click', () => {
      containerEditarTarefa.classList.remove('abrir')
      inputEditarTarefa.value = ''

    })

  }
})

function limpaInput() {
  inputTarefa.value = ''
  inputTarefa.focus()
}