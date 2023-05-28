export const Computarizados = Vue.component('computarizados', {
    template: `
    <div class="row mt-5">
        <h3 class="mb-3">Telescopios computarizados</h3>
        <article class="col-sm-4 col-lg-2 products" v-for="product in products" v-if="product.computarizado" :key="product.id">
            <div class="products-images">
                <img class="img-fluid" :src="product.imagenes[0]" :alt="product.titulo" />
            </div>
            <div class="products-body">
                <h4>{{product.titulo | resizeTitle}}</h4>
                <span class="d-block">{{product.apertura}}x{{product.distancia_focal}}mm</span>
                <router-link :to="'/productos/#productos'" class="btn btn-outline-secondary mt-3">
                    Ver más
                </router-link>
            </div>  
        </article>
    </div>
    `,
    props: ['products'],
    filters: {
        resizeTitle(value) {
            let splitDone = value.split(" ");
            return `${splitDone?.[0]} ${splitDone?.[1]}`;
        }
    }
});
