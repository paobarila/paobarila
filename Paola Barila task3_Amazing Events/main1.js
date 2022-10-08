console.log(data.events)
let contenedorDatos = document.getElementById("contenedor-datos")
let checksBox = document.getElementById("checks")
let buscador = document.getElementById("buscador")


let eventos = data.events

pintarCards(eventos)
let arrayCategorias = filtrarPorCategorias(eventos)



function pintarCards(eventos) {
  contenedorDatos.innerHTML = ""
  if(eventos.length>0) {eventos.forEach((evento) => {
    let card = document.createElement('div')
    card.className = "card"
    card.style.width = "15rem"
    card.innerHTML = `<img src="${evento.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.date} ${evento.description}</p>
    <a href="./details.html?id=${evento._id}" class="btn btn-primary">More Info</a>
    </div>`
    contenedorDatos.appendChild(card)
    
  })
}else{
  contenedorDatos.innerHTML =`<div> <h2> Try again whith another search</h2> </div>`
}
}


function filtrarPorCategorias(eventos) {
  let arrayCategorias = []
  eventos.forEach(evento => {
    if (!arrayCategorias.includes(evento.category)) {
      arrayCategorias.push(evento.category)
    }
  });
  return arrayCategorias
}


arrayCategorias.forEach(categoria => {
  let botonCateg = document.createElement("div")
  botonCateg.className = "form-check form-check-inline"
  botonCateg.innerHTML = ` <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${categoria}">
  <label class="form-check-label" for="inlineCheckbox1">${categoria}</label>
</div>`
  checksBox.appendChild(botonCateg)
}
)
function filtrarPorTexto(eventos) {
  let palabra = buscador.value.toLowerCase()
  let eventosFiltrados = eventos.filter(evento => evento.name.toLowerCase().includes(palabra))
  return eventosFiltrados
}

function filtrarPorChecks(eventos) {
  let checkButtons = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkButtons)
  let checkPut = arrayChecks.filter(checkButton => checkButton.checked)
  let arrayValues = checkPut.map(check => check.value)
  if (arrayValues.length == 0) {
    return eventos
  }
  let arrayEventosFiltrados = eventos.filter(evento => arrayValues.includes(evento.category))
  return arrayEventosFiltrados
}

function superFiltro() {
  let eventosFiltrados1 = filtrarPorTexto(eventos)
  let eventosFiltrados2 = filtrarPorChecks(eventosFiltrados1)
  pintarCards(eventosFiltrados2)
}




buscador.addEventListener("keyup", superFiltro)
checksBox.addEventListener('change', superFiltro)
