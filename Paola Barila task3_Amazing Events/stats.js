const URI = "https://amazing-events.herokuapp.com/api/events"

const TRTABLA1 = document.getElementById("please")
const TBODY1 = document.getElementById("diosquiera")
const TBODY2 = document.getElementById("porfavor")

traerDatos(URI)

let eventos = []
let eventoMayorCap ="" 
let eventoMayor = ""
let eventoMenor = ""
let todasCategorias =[]
let arrayCategoriasPast = []
let eventsPast = []
let elementosPast = []
let elementosUp = []
let arrayCategoriasUp=[]
let eventsUp=[]


function traerDatos(URI) {
  fetch(URI)
    .then(response => response.json())
    .then(data => {
      eventos = data.events
     
     let eventsPast = eventos.filter(evento => evento.date < data.currentDate)
    
    let eventsUp = eventos.filter(evento => evento.date >= data.currentDate)
    eventoMayorCap = mayorCapacity(eventos)
    eventoMayor = mayorConcurrencia(eventsPast)
    eventoMenor = menorConcurrencia(eventsPast)
    pintarTabla()
    eventos.forEach(evento => {
      todasCategorias.push(evento)
      if(!todasCategorias.includes(evento.category)){
        todasCategorias.push(evento.category);
      }
      if(evento.date < data.currentDate){
        if(!arrayCategoriasPast.includes(evento.category)){
          arrayCategoriasPast.push(evento.category);
        }
      }
      if(evento.date >= data.currentDate){
        if(!arrayCategoriasUp.includes(evento.category)){
          arrayCategoriasUp.push(evento.category);
      }
    }
     });
    console.log(arrayCategoriasPast)
    datosTabla2()
    datosTabla3()
    mostrarDatosCategorias()
    })


  }

 function pintarTabla(){
  let partetabla1= TRTABLA1
  partetabla1.innerHTML = `<td>${eventoMayor}</td>
    <td>${eventoMenor}</td>
    <td>${eventoMayorCap}</td>`
 }

  function mayorCapacity(eventos){
    let mayorCapacidad = eventos.sort((a,b) =>b.capacity-a.capacity)
    return mayorCapacidad[0].name
  }
  function mayorConcurrencia(eventos){
     let masConcurrido = eventos.sort((a, b) => {
      return (
        (parseInt(b.assistance) * 100) / parseInt(b.capacity) -
        (parseInt(a.assistance) * 100) / parseInt(a.capacity)
      )});
    return masConcurrido[0].name

  }
  function menorConcurrencia(eventos){
    let masConcurrido = eventos.sort((a, b) => {
     return (
       (parseInt(b.assistance) * 100) / parseInt(b.capacity) -
       (parseInt(a.assistance) * 100) / parseInt(a.capacity)
     )});
   return masConcurrido[masConcurrido.length-1].name
     }
     
   


  function datosTabla2() {
  let eventsPast1 = eventos.filter(evento => evento.date < data.currentDate)
  console.log(arrayCategoriasPast)
  console.log(eventsPast1)
  arrayCategoriasPast.map(category =>{
    elementosPast.push({
    category : category,
    eventos: eventsPast.filter(evento => evento.category === category)
   
  });
console.log(elementosPast)
  });

  let revenuePast = 0
  let percentagePast = 0
  let totEvents = 0

  elementosPast.map (categoria =>{
    categoria.eventos.forEach(evento =>revenuePast = evento.price*evento.assistance)
    categoria.revenues = revenuePast
    revenuePast = 0
      
    categoria.eventos.forEach(evento =>{
      percentagePast += evento.assistance*100/evento.capacity
      totEvents++
    })
    categoria.percentage = (percentagePast/totEvents).toFixed(2)
    percentagePast = 0
    totEvents = 0
    

    })
    
    console.log(revenuePast)
  }
  function datosTabla3() {
    arrayCategoriasUp.map(category =>{
      elementosUp.push({
      category : category,
      eventos: eventsUp.filter(evento => evento.category === category)
     });
     });
  
    let revenueUp = 0
    let percentageUp = 0
    let totEvents2 = 0
    elementosUp.map (categoria =>{
      categoria.eventos.forEach(evento => revenueUp += evento.price*evento.estimate)
      categoria.revenues = revenueUp
      revenueUp = 0
        
      categoria.eventos.forEach(evento =>{
        percentageUp += evento.estimate*100/evento.capacity
        totEvents2 ++
      })
      categoria.percentage = (percentageUp/totEvents2).toFixed(2)
      percentageUp = 0
      totEvents2 = 0
      
  
      })
      console.log(revenueUp)
    }
  function mostrarDatosCategorias(){
    elementosPast.forEach(elemento =>{
    let parteTabla2 = document.createElement("tr")
    parteTabla2.innerHTML =  `<th>${elemento.category}</th>
    <th>$ ${elemento.revenues}</th>
    <th>${elemento.percentage} %</th>`
    TBODY1.appendChild(parteTabla2)
  })
  } 