export const Inicio = Vue.component('inicio', {
    template: `
    <section class="row" id="inicio">
        <template>
            <div class="col-sm-12 col-xl-6 align-self-center">
                <h2 class="mb-3">Explora nuestra tienda y prepárate para una experiencia astronómica inolvidable.</h2>
                <p>Sumérgete en el emocionante mundo de la astronomía y descubre las maravillas del universo. Nuestra tienda está repleta de telescopios de última generación, accesorios para que puedas explorar el cosmos.<br />
                Ya seas un apasionado principiante o un astrónomo experimentado, encontrarás todo lo que necesitas para disfrutar de la observación astronómica. Con nuestros equipos podrás adentrarte en el cosmos y descubrir la belleza de las estrellas, planetas, galaxias y mucho más.
                </p>
            </div>
            <div class="col-sm-12 col-xl-6"">
                <img class="img-fluid" src="imagenes/inicio/inicio.jpg" alt="Nuestra tienda física en donde se ven varios modelos de telescopio" />
            </div>
        </template>
        <computarizados :products="products"></computarizados>
        <div class="col-12 mt-5">
            <h3 class="mb-3">Nos encontramos en Palermo, CABA</h3>
            <p>Además, ofrecemos envíos sin cargo dentro de CABA y GBA, para que no tengas que moverte de tu casa.<br />
            ¡No te pierdas la oportunidad de explorar el mundo astronómico con nosotros!</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3285.259218043788!2d-58.41897800000001!3d-34.572307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59e7a36a395%3A0x445f8d5b686ace85!2sAv.%20del%20Libertador%203604%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1684894929050!5m2!1ses-419!2sus" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
    `,
    filters: {
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
