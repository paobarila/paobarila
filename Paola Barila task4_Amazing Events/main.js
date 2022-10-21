const { createApp } = Vue

createApp({
    data() {
        return {
            eventos: [],
            backUpEventos: [],
            urlApi: "https://amazing-events.herokuapp.com/api/events",
            categorias: [],
            buscadorTexto: "",
            eventosBuscados: [],
            evento: {},
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
                    this.eventos = data.events;
                    console.log(this.eventos)
                    this.eventos.forEach(evento => {
                        if (!this.categorias.includes(evento.category)) {
                            this.categorias.push(evento.category)
                        }
                    })
                    if (document.title == "Amazing Events") {
                        this.eventos = data.events
                    }else if (document.title == "Upcoming Events") {
                        this.backUpEventos.filter((evento) => evento.date > data.currentDate)
                    }else {
                        this.backUpEventos.filter((evento) => evento.date < data.currentDate)
                    }
                    this.backUpEventos = this.eventos
                })
        }
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

        }
    }
}).mount('#app')
