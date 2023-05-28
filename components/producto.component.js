export const Producto = Vue.component('producto', {
    template: `
        <div>
            <div v-if="addToCard && !isTooMany" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="imagenes/favicon/favicon.png" class="rounded me-2" alt="logo de la tienda">
                    <strong class="me-auto">Cosmos</strong>
                    <small>Ahora..</small>
                </div>
                <div class="toast-body">
                    Se ha agregado un producto nuevo al carrito
                </div>
            </div>
            <template v-if="productUnique">
                <article class="product-unique">
                    <div class="products-images">
                        <img class="img-fluid" :src="imageDefault" :alt="productUnique.titulo" />
                        <div class="image-min-container">
                            <img v-for="(imagen, index) in productUnique.imagenes" @click="changeImage(index)" style="width: 33.33%;" :class="imagen==imageDefault ? 'image-active border-active' : 'image-active'" :key="index" :src="imagen" :alt="productUnique.titulo" />
                        </div>
                    </div>
                    <div class="products-body">
                        <h2 class="my-3">{{productUnique.titulo}}</h2>
                        <span>{{productUnique.marca}}</span>
                        <p>{{productUnique.descripcion}}</p>
                        <span class="distancia-focal"><b>Distancia focal</b> {{productUnique.distancia_focal}}mm</span>
                        <span class="apertura"><b>Apertura</b> {{productUnique.apertura}}mm</span>
                        <span class="price text-success mt-2">{{productUnique.precio | arsCurrency }}</span>
                        <button @click="agregarCarrito()" :disabled="isTooMany" :class="'btn btn-lg mt-4' + (isTooMany ? ' btn-danger' : ' btn-success')">Agregar al carrito</button>
                        <template v-if="isTooMany">
                            <div class="alert alert-danger my-3 text-center" role="alert">
                                No puedes agregar más de 5 veces el mismo producto
                            </div>
                        </template>
                    </div>
                </article>
            </template>
            <template v-else>
                <h2 class="mb-4">El id solicitado no existe</h2>
                <p>Vuelva a productos y seleccione un producto válido</p>
                <router-link to="/productos#productos">Ir a productos</router-link>
            </template>
        </div>
    `,
    props: ['productUnique'],
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
            imageDefault: this.productUnique?.imagenes[0],
            local: null,
            isTooMany: false,
            addToCard: false
        }
    },
    methods: {
        changeImage(index) {
            this.imageDefault = this.productUnique.imagenes[index];
        },
        agregarCarrito() {
            this.addToCard = true;
            this.local = this.refreshLocal();
            if (!this.local) {
                this.productUnique.cantidad = 1;
                localStorage.setItem("carrito", JSON.stringify([this.productUnique]));
            } else {
                if (!this.local.some(item => item.id == this.productUnique.id)) {
                    this.productUnique.cantidad = 1;
                    this.local.push(this.productUnique);
                } else {
                    const data = this.local.filter(item => item.id == this.productUnique.id)[0];
                    if (data.cantidad >= 5) {
                        this.isTooMany = true;
                        return;
                    }
                    const index = this.local.indexOf(data);
                    data.cantidad += 1;
                    this.local.splice(index, 1);
                    this.local.push(data);
                }
                localStorage.setItem("carrito", JSON.stringify(this.local));
            }
            this.local = this.refreshLocal();
            this.$parent.$parent.$children[2].local = this.local;
            setTimeout(() => {
                this.addToCard = false;
            }, 2000);
        },
        refreshLocal() {
            this.local = JSON.parse(localStorage.getItem("carrito"));
            this.local?.sort((a, b) => a.id - b.id);
            return this.local;
        }
    }
});
