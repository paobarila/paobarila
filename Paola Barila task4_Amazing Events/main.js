const { createApp } = Vue

createApp({
    data() {
        return {
            eventos: [],
            backUpEventos: [],
            urlApi: "https://amazing-events.herokuapp.com/api/events",
            categorias: [],
            eventosPasados: [],
            eventosFuturos: [],
            buscadorTexto: "",
            eventosBuscados: [],
            evento: {},
            arrayCategoriasPast: [],
            estadisticas: {
                evento1: {},
                evento2: {},
                evento3: {},
                estadisticasUp: [],
                estadisticasPast: []
            },
            mensaje: "aca anda "
        }
    },
    created() {
        this.traerDatos()
    },
    mounted() {

    },
    methods: {
        traerDatos() {
            fetch(this.urlApi).then(response => response.json())
                .then(data => {
                    if (document.title == "Amazing Events") {
                        this.eventos = data.events
                    } else if (document.title == "Upcoming Events") {
                        this.eventos = data.events.filter((evento) => evento.date > data.currentDate)
                    } else if (document.title == "Past Events") {
                        this.eventos = data.events.filter((evento) => evento.date < data.currentDate)
                    } else if (document.title == "Details") {
                        let id = new URLSearchParams(location.search).get("_id");
                        this.evento = data.events.find(evento => evento._id == id);
                    } else if (document.title == "Stats") {
                        this.estadisticas.evento3 = data.events.sort((a, b) => b.capacity - a.capacity)
                        this.eventosPasados = data.events.filter((evento) => evento.date < data.currentDate)
                       // this.eventosFuturos = data.events.filter((evento) => evento.date > data.currentDate)
                        this.estadisticas.evento1 = this.eventosPasados.sort((a, b) => {
                            return (
                                (parseInt(b.assistance) * 100) / parseInt(b.capacity) -
                                (parseInt(a.assistance) * 100) / parseInt(a.capacity)
                            )
                            })//cierra sort
                      
                    }// cierra stats
                
                    this.eventos.forEach(evento => {
                        if (!this.categorias.includes(evento.category)) {
                            this.categorias.push(evento.category)
                        }
                    });
                    this.backUpEventos = this.eventos
                });//cierra then data
            },
        },
  
        computed: {
            superFiltro() {
                let filtro1 =
                    this.backUpEventos.filter((evento) =>
                        evento.name.toLowerCase().includes(this.buscadorTexto.toLowerCase())
                    );
                let filtro2 = filtro1.filter((evento) =>
                    this.eventosBuscados.includes(evento.category)
                );
                if (this.eventosBuscados.length > 0) {
                    this.eventos = filtro2
                } else {
                    this.eventos = filtro1
                }

            },
        },
    
    }).mount('#app')
