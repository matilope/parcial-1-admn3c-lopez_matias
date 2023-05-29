export const Productos = Vue.component('productos', {
    template: `
    <section class="row" id="productos">
        <template v-if="!productUnique">
            <form class="search" @submit.prevent="search">
                <input class="form-control form-control-lg" placeholder="Buscar.." type="search" v-model="searchInput" />
            </form>
            <div class="dropdown-container my-5">
                <div class="dropdown">
                    <button class="btn btn-lg btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Precio
                    </button>
                    <ul class="dropdown-menu">
                    <li class="dropdown-item" @click="priceOrder(true)">Menor precio</li>
                    <li class="dropdown-item" @click="priceOrder(false)">Mayor precio</li>
                    </ul>
                </div>
                <div class="dropdown">
                    <button class="btn btn-lg btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Apertura
                    </button>
                    <ul class="dropdown-menu">
                    <li class="dropdown-item" @click="apertureOrder(true)">Menor apertura</li>
                    <li class="dropdown-item" @click="apertureOrder(false)">Mayor apertura</li>
                    </ul>
                </div>
            </div>
            <h2 class="mb-5">Catálogo de productos</h2>
            <div v-if="!searchProducts?.length && searchProducts != null">
                <div class="alert alert-warning" role="alert">
                    <p class="mb-0 lead">La búsqueda no ha sido exitosa, 
                        <span class="text-danger volver" @click="resetValues">haga click para volver</span>
                    </p>
                </div>
            </div>
            <article class="col-sm-12 col-md-6 col-lg-4 products" v-for="product in (!searchProducts ? products : searchProducts)" :key="product.id">
                <div class="products-images">
                    <img class="img-fluid" :src="product.imagenes[0]" :alt="product.titulo" />
                </div>
                <div class="products-body">
                    <h3>{{product.titulo}}</h3>
                    <span>{{product.marca}}</span>
                    <p class="description">{{product.descripcion}}</p>
                </div>  
                <div class="price-container">
                    <button @click="uniqueProduct(product.id)" class="btn btn-lg btn-outline-success">Ver más</button>
                    <span class="price text-success">{{product.precio | arsCurrency }}</span>
                </div>
            </article>
        </template>
        <template v-else>
            <producto :product-unique="productUnique"></producto>
        </template>
    </section>
    `,
    filters: {
        arsCurrency: function (value) {
            return value.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
            })
        }
    },
    data: function () {
        return {
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
                    descripcion: 'El telescopio NexStar el 127SLT de Celestron nos inspira a ir más grande, con un 20% más de poder de captación de luz que nuestro telescopio de 114 mm. El Celestron NexStar 127SLT es un telescopio computarizado que ofrece una base de datos de más de 40.000 estrellas, galaxias, nebulosas y más.',
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
                    titulo: 'Telescopio Celestron Nexstar 5 Pulgadas',
                    descripcion: 'El diseño de Tubo Naranja emblemático de Celestron integra las últimas tecnologías para lograr la mejor experiencia de observación estelar combinando características avanzadas y excelente óptica en un sistema de altas prestaciones fácil de usar: el NexStar 5SE.',
                    marca: 'Celestron',
                    precio: 681620,
                    distancia_focal: 1250,
                    apertura: 125,
                    computarizado: true,
                    imagenes: ['imagenes/telescopios/6/celestron_125_1250_1.png', 'imagenes/telescopios/6/celestron_125_1250_2.png', 'imagenes/telescopios/6/celestron_125_1250_3.png']
                }
            ],
            searchInput: '',
            searchProducts: null,
            productUnique: null
        }
    },
    methods: {
        uniqueProduct(id) {
            this.resetValues();
            this.productUnique = this.products.filter(item => item.id === id)[0];
        },
        priceOrder(order) {
            this.resetValues();
            const newOrder = this.products.sort((a, b) => b.precio - a.precio);
            this.products = !order ? newOrder : newOrder.reverse();
        },
        apertureOrder(order) {
            this.resetValues();
            const newOrder = this.products.sort((a, b) => b.apertura - a.apertura);
            this.products = !order ? newOrder : newOrder.reverse();
        },
        search() {
            const newSearch = this.products.filter(item => item.titulo.toLowerCase().includes(this.searchInput.toLowerCase()));
            this.searchProducts = newSearch;
            this.searchInput = '';
        },
        resetValues() {
            this.searchProducts = null;
            this.searchInput = '';
        }
    }
});
