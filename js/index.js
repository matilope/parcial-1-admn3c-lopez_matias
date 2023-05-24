import { router } from './router.js';

export const app = new Vue({
  el: "#app",
  router,
  data: {
    products: [
      {
        id: 1,
        titulo: 'Telescopio Reflector Gadnic 70x300',
        descripcion: 'Nuestro telescopio para principiantes está diseñado para niños y principiantes, dándoles la oportunidad de observar el universo de cerca con equipos profesionales para la mejor experiencia de observación de estrellas.',
        marca: 'Gadnic',
        precio: 58749,
        distancia_focal: 300,
        apertura: 70,
        computarizado: false,
        imagenes: ['imagenes/telescopios/1/gadnic_70_300_1.png', 'imagenes/telescopios/1/gadnic_70_300_2.png', 'imagenes/telescopios/1/gadnic_70_300_3.png']
      },
      {
        id: 2,
        titulo: 'Telescopio Meade Polaris 127x1000',
        descripcion: 'Si estás buscando un telescopio versátil que te permita realizar observaciones tanto terrestres como astronómicas, entonces la Serie Polaris ha sido pensada para usted. Cada modelo de la serie Polaris es capaz de dar una imagen correcta para observar la naturaleza y los cielos.',
        marca: 'Meade',
        precio: 189230,
        distancia_focal: 1000,
        apertura: 127,
        computarizado: false,
        imagenes: ['imagenes/telescopios/2/meade_127_1000_1.png', 'imagenes/telescopios/2/meade_127_1000_2.png', 'imagenes/telescopios/2/meade_127_1000_3.png']
      },
      {
        id: 3,
        titulo: 'Telescopio Celestron Astromaster 130x650',
        descripcion: 'Si estás buscando un telescopio para disfrutar tanto en observación astronómica como terrestre, y de calidad premium, entonces la línea AstroMaster es para vos. El AstroMaster 130 EQ produce imágenes claras y brillantes de la Luna y planetas, asi como también de cúmulos, nebulosas y galaxias de espacio profundo.',
        marca: 'Celestron',
        precio: 310000,
        distancia_focal: 650,
        apertura: 130,
        computarizado: false,
        imagenes: ['imagenes/telescopios/3/celestron_130_650_1.png', 'imagenes/telescopios/3/celestron_130_650_2.png', 'imagenes/telescopios/3/celestron_130_650_3.png']
      },
      {
        id: 4,
        titulo: 'Telescopio Celestron Computarizado Nexstar',
        descripcion: 'El telescopio NexStar 114SLT, el 127SLT de Celestron nos inspira a ir más grande, con un 20% más de poder de captación de luz que nuestro telescopio de 114 mm. El Celestron NexStar 127SLT es un telescopio computarizado que ofrece una base de datos de más de 40.000 estrellas, galaxias, nebulosas y más.',
        marca: 'Celestron',
        precio: 809556,
        distancia_focal: 1500,
        apertura: 127,
        computarizado: true,
        imagenes: ['imagenes/telescopios/4/celestron_127_1500_1.png', 'imagenes/telescopios/4/celestron_127_1500_2.png', 'imagenes/telescopios/4/celestron_127_1500_3.png']
      },
      {
        id: 5,
        titulo: 'Telescopio Meade Lx-90 8 Pulgadas',
        descripcion: 'El telescopio Meade LX90 puede localizar más de 30.000 objetos, incluyéndose a sí mismo. Conéctalo y el receptor GPS integrado determinará de forma inmediata la fecha, hora y ubicación con gran precisión.',
        marca: 'Meade',
        precio: 1795600,
        distancia_focal: 2000,
        apertura: 203,
        computarizado: true,
        imagenes: ['imagenes/telescopios/5/meade_203_2000_1.png', 'imagenes/telescopios/5/meade_203_2000_2.png', 'imagenes/telescopios/5/meade_203_2000_3.png']
      },
      {
        id: 6,
        titulo: 'Telescopio Celestron Nexstar 5',
        descripcion: 'El diseño de Tubo Naranja emblemático de Celestron integra las últimas tecnologías para lograr la mejor experiencia de observación estelar combinando características avanzadas y excelente óptica en un sistema de altas prestaciones fácil de usar: el NexStar 5SE.',
        marca: 'Celestron',
        precio: 681620,
        distancia_focal: 1250,
        apertura: 125,
        computarizado: true,
        imagenes: ['imagenes/telescopios/6/celestron_125_1250_1.png', 'imagenes/telescopios/6/celestron_125_1250_2.png', 'imagenes/telescopios/6/celestron_125_1250_3.png']
      }
    ]
  },
  beforeCreate() {
    console.log("Se va a crear el componente");
  },
  created() {
    console.log("Se ha creado el componente");
  },
  beforeMount() {
    console.log("Se va a montar el componente");
  },
  mounted() {
    console.log("Se ha montado el componente");
  },
  beforeUpdate() {
    console.log('Se va a actualizar el componente');
  },
  updated() {
    console.log('Se ha actualizo el componente');
  },
  destroyed() {
    console.log('Se ha destruido el componente');
  },
  beforeUnmount() {
    console.log('Se va a desmontar el componente');
  },
  unmounted() {
    console.log('Se ha desmontado el componente');
  },
  methods: {
    openNavList() {
      this.$refs.menuBtn.classList.toggle('active');
      this.$refs.navMenu.classList.toggle('show');
    },
    scrollToAnchor(e) {
      e.preventDefault();
      this.openNavList();
      const anchor = e.target.getAttribute('href').split("#/")[1].split("#")[1];
      const element = document.getElementById(anchor);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }
})
