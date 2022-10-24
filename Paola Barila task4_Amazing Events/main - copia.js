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
                        })
                        console.log(this.estadisticas)
                    }// cierra stats

                    this.eventos.forEach(evento => {
                        if (!this.categorias.includes(evento.category)) {
                            this.categorias.push(evento.category)
                        }
                    });
                    this.backUpEventos = this.eventos
                });//cierra data

            this.cargarEstadisticas(this.estadisticasPorCategorias(this.eventosFuturos), this.estadisticas.estadisticasUp);
            this.cargarEstadisticas(this.estadisticasPorCategorias(this.eventosPasados), this.estadisticas.estadisticasPast)
        },//traer datos
        cargarEstadisticas(estadistica, contenedor) {
            let arrayCategorias = estadistica.categoriasFiltradas;
            let arrayRevenues = estadistica.revenues;
            let arrayPercentajes = estadistica.percentages;
            arrayCategorias.forEach((categoria, i) => {
                contenedor.push({
                    category: categoria,
                    revenue: arrayRevenues[i],
                    percentage: arrayPercentajes[i],
                });
            });
        },//cierra cargar estad
        categoriasStatistics(eventos) {
            let categorias = [];
            eventos.forEach((evento) => {
                if (!categorias.includes(evento.category)) {
                    categorias.push(evento.category);
                }
            });
            return categorias;
        },//cierra categ Sta
        eventComparator(evento) {
            return evento.assistance
                ? (evento.assistance / evento.capacity) * 100
                : (evento.estimate / evento.capacity) * 100;
        },//cierra comparador
        estadisticasPorCategorias(eventos) {
            let categoriasFiltradas = this.categoriasStatistics(eventos);
            let revenues = [];
            let percentages = [];
            categoriasFiltradas.forEach((categoria) => {
                let filtradosCategoria = data.events.filter((evento) => evento.category == categoria);
                revenues.push(filtradosCategoria.map((evento) => evento.price * (evento.assistance ? evento.assistance : evento.estimate))
                    .reduce((accu, ele) => accu + ele)
                    .toLocaleString());
                percentages.push((filtradosCategoria.map((evento) => this.eventComparator(evento).reduce((accu, ele) => accu + ele) / filtradosCategoria.length).toFixed(2).toLocaleString())
                });
            return {
                categoriasFiltradas,
                revenues,
                percentages,
            };

        },//cierra estadisticas por categ
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
