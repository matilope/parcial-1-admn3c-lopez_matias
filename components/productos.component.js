export const Productos = Vue.component('productos', {
    template: `
    <section class="row" id="productos">
        <h2 class="mb-5">Catálogo de productos</h2>
        <article class="col-sm-12 col-md-6 col-lg-4 products" v-for="product in products" :key="product.id">
            <router-link :to="'/producto/'+product.id+'#product'">
                <div class="products-images">
                    <img class="img-fluid" :src="product.imagenes[0]" :alt="product.titulo" />
                </div>
                <div class="products-body">
                    <h3>{{product.titulo}}</h3>
                    <span>{{product.marca}}</span>
                    <p class="description">{{product.descripcion}}</p>
                </div>  
            </router-link>
                <div class="price-container">
                    <button class="btn btn-lg btn-outline-success">Comprar</button>
                <span class="price text-success">{{product.precio | arsCurrency }}</span>
            </div>
        </article>
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
    computed: {
    },
    mounted() {
    },
    updated() {
    },
    data: function () {
        return {
            products: this.$parent.products,
        }
    },
    methods: {
    }
});
