export const Inicio = Vue.component('inicio', {
    template: `
    <section class="row" id="inicio">
        <template>
            <div class="col-sm-12 col-xl-6 align-self-center">
                <h2 class="mb-3">Explora nuestra tienda y prepárate para una experiencia astronómica inolvidable.</h2>
                <p>Sumérgete en el emocionante mundo de la astronomía y descubre las maravillas del universo. <strong>Nuestra tienda está repleta de telescopios de última generación, accesorios para que puedas explorar el cosmos.</strong><br />
                Ya seas un apasionado principiante o un astrónomo experimentado, encontrarás todo lo que necesitas para disfrutar de la observación astronómica. Con nuestros equipos podrás adentrarte en el cosmos y descubrir la belleza de las estrellas, planetas, galaxias y mucho más.
                </p>
            </div>
            <div class="col-sm-12 col-xl-6"">
                <img class="img-fluid" src="imagenes/inicio/inicio.jpg" alt="Nuestra tienda física en donde se ven varios modelos de telescopio" />
            </div>
        </template>
        <computarizados :products="productsComp"></computarizados>
        <div class="col-12 mt-5">
            <h3 class="mb-3">Nos encontramos en Palermo, CABA</h3>
            <p>Además, <strong>ofrecemos envíos sin cargo dentro de CABA y GBA, para que no tengas que moverte de tu casa.</strong><br />
            ¡No te pierdas la oportunidad de explorar el mundo astronómico con nosotros!</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3285.259218043788!2d-58.41897800000001!3d-34.572307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59e7a36a395%3A0x445f8d5b686ace85!2sAv.%20del%20Libertador%203604%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1684894929050!5m2!1ses-419!2sus" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
    `,
    data: function () {
        return {
            productsComp: [
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
            ]
        }
    },
});
