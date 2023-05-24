export const Producto = Vue.component('producto', {
    template: `
    <section class="row" id="product">
        <template v-if="productUnique">
            <article class="product-unique" :key="productUnique.id">
                <div class="products-images">
                    <img class="img-fluid" :src="imageDefault" :alt="productUnique.titulo" />
                    <div class="image-min-container">
                        <img v-for="(imagen, index) in productUnique.imagenes" @click="changeImage(index)" :style="productUnique.imagenes.length === 3 ? 'width: 33.33%;' : 'width: 50%;'" :class="imageDefault === imagen ? 'image-active image-min' : 'image-min'" :src="imagen" :alt="productUnique.titulo" />
                    </div>
                </div>
                <div class="products-body">
                    <h2 class="my-3">{{productUnique.titulo}}</h2>
                    <span>{{productUnique.marca}}</span>
                    <p>{{productUnique.descripcion}}</p>
                    <span class="distancia-focal"><b>Distancia focal</b> {{productUnique.distancia_focal}}mm</span>
                    <span class="apertura"><b>Apertura</b> {{productUnique.apertura}}mm</span>
                    <span class="price text-success mt-2">{{productUnique.precio | arsCurrency }}</span>
                    <button class="btn btn-lg btn-success mt-4">Agregar al carrito</button>
                </div>
            </article>
        </template>
        <template v-else>
            <h2 class="mb-4">El id solicitado no existe</h2>
            <p>Vuelva a productos y seleccione un producto válido</p>
            <router-link to="/productos#productos">Ir a productos</router-link>
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
    mounted() {
        this.imageDefault = this.productUnique?.imagenes[0];
    },
    data: function () {
        return {
            productUnique: this.$parent.products.filter(item => item.id == this.$route.params.id)[0],
            imageDefault: null
        }
    },
    methods: {
        changeImage(index) {
            this.imageDefault = this.productUnique.imagenes[index];
        }
    }
});
