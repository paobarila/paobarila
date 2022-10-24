var URI = "https://amazing-events.herokuapp.com/api/events"
console.log(URI)
let cadenaParametros = location.search
let parametros = new URLSearchParams(cadenaParametros)
let id = parametros.get("id")
let eventos = []
traerDatos(URI)
let contenedorDatos = document.getElementById("contenedor-datos")

function traerDatos(URI){
  fetch(URI)
   .then(response =>response.json())
   .then(data => {
    eventos =data.events
    let eventoEncontrado = eventos.find(evento => evento._id == id)
pintarDetalle(eventoEncontrado)
  })
}

function pintarDetalle(evento) {
  let card = document.createElement('div')
  card.className = "card"
  //card.style.width = ""
  card.innerHTML = `<div class=class="card mb-3" style="max-width:45rem;">
    <div class="col-md-4">
      <img src="${evento.image}"class="img-fluid rounded-start" alt="evento" id="altoimg">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
        <p class="card-text2"> Place: ${evento.place} Capacity: ${evento.capacity}</p>
        <h5 class="card-price text-end"> Price:$ ${evento.price}</h5>
        <a href="#" class="btn btn-primary">BUY NOW</a>
      </div>
    </div>
  </div>
</div>`
  contenedorDatos.appendChild(card)
}