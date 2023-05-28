export const Carrito = Vue.component('carrito', {
    template: `
    <div v-show="showLocal" class="carrito">
        <button @click="this.$parent.toggleCart" class="btn btn-close"></button>
        <h2>Carrito de compras</h2>
        <template v-if="!allowAddress && !allowCard">
            <ul v-if="hasProducts" class="my-3" v-for="(item, index) in local" :key="index">
                <li class="li-image"><img :src="item.imagenes[0]" :alt="item.titulo" /></li>
                <li class="li-title">{{item.titulo}}</li>
                <li class="li-price">{{item.precio | arsCurrency}}</li>
                <li class="li-cantidad">
                    <button @click="decreaseItem(index)" class="bg-success">-</button>
                    <input type="number" :value="item.cantidad" readonly />
                    <button @click="increaseItem(index)" :disabled="item.cantidad>=5" class="bg-success">+</button>
                </li>
                <li><i @click="deleteItem(index)" class="bi bi-trash2"></i></li>
            </ul>
            <div v-if="alertIncrease" class="alert alert-danger my-3 text-center" role="alert">
                No se puede agregar más de 5 productos
            </div>
            <p v-if="!hasProducts">No se han agregado items aún</p>
            <hr />
            <span class="price-total">Precio total {{precioTotal | arsCurrency}}</span>
            <div class="buttons-container mt-4">
                <button class="btn btn-lg btn-danger" :disabled="!hasProducts" @click="deleteAll()">Vaciar carrito</button>
                <button class="btn btn-lg btn-success" :disabled="!hasProducts" @click="show(1)">Continuar</button>
            </div>
        </template>
        <template v-if="allowAddress">
            <form v-if="!hasAddress" class="my-3" @submit.prevent="saveAddressData">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model.trim="userName" required />
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input type="email" class="form-control" id="correo" v-model="userEmail" required />
                </div>
                <div class="mb-3">
                    <label for="direccion" class="form-label">Dirección</label>
                    <input type="text" class="form-control" id="direccion" v-model.trim="userAddress" required />
                </div>
                <div class="mb-3">
                    <label for="fecha" class="form-label">Fecha de entrega</label>
                    <input type="date" class="form-control" id="fecha" :min="new Date().toISOString().split('T')[0]" max="2023-07-31" v-model="userDeliveryDate" required />
                </div>
                <input class="btn btn-md btn-primary my-3" type="submit" value="Guardar" />
            </form>
            <div v-else class="address">
                <h3>Tiene guardado los siguientes datos</h3>
                <ul>
                    <li v-for="(item, index) in addressData" :key="index">{{item}}</li>
                    <li><i @click="deleteAddressData()" class="bi bi-trash2"></i></li>
                </ul>
            </div>
            <div class="buttons-container">
                <button class="btn btn-lg btn-danger" @click="show(0)">Volver</button>
                <button class="btn btn-lg btn-success" :disabled="!hasAddress" @click="show(2)">Continuar</button>
            </div>
        </template>
        <template v-if="allowCard">
            <form v-if="!hasCard" class="my-3" @submit.prevent="saveCardData">
                <div class="mb-3">
                    <label for="numeroTarjeta" class="form-label">Número de tarjeta</label>
                    <input type="text" class="form-control" id="numeroTarjeta" maxlength="19" v-model.trim="numberCard" @input="numberCardSolve" required />
                </div>
                <div class="mb-3">
                    <label for="nombreTitular" class="form-label">Nombre del titular</label>
                    <input type="text" class="form-control" id="nombreTitular" v-model.trim="nameCard" required />
                </div>
                <div class="mb-3 double-row">
                    <div>
                        <label for="fechames" class="form-label">Mes de vencimiento</label>
                        <select class="form-select col-6" id="fechames" v-model="dateMonth" required>
                            <option v-for="i in 12" :key="i" :value="i">{{i}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="fechaano" class="form-label">Año de vencimiento</label>
                        <input type="number" min="2023" max="2050" class="form-control col-6" id="fechaano" v-model="dateYear" required />
                    </div>
                </div>
                <div class="mb-3 double-row">
                    <div>
                        <label for="codigoSeguridad" class="form-label">Código de seguridad</label>
                        <input type="number" class="form-control" id="codigoSeguridad" v-model="securityCode" required />
                    </div>
                    <div>
                        <label for="dni" class="form-label">DNI</label>
                        <input type="number" min="0" max="100000000" class="form-control" id="dni" v-model.number="dni" required />
                    </div>
                </div>
                <input class="btn btn-md btn-primary my-3" type="submit" value="Guardar" />
            </form>
            <div v-else class="card-data">
                <h3>Tiene guardado los siguientes datos</h3>
                <ul>
                    <li v-for="(item, index) in cardData" :key="index">{{item}}</li>
                    <li><i @click="deleteCardData()" class="bi bi-trash2"></i></li>
                </ul>
            </div>
            <hr />
            <span class="price-total">Precio total {{precioTotal | arsCurrency}}</span>
            <div class="buttons-container mt-3">
                <button class="btn btn-lg btn-danger" @click="show(1)">Volver</button>
                <button class="btn btn-lg btn-success" :disabled="!hasCard" @click="endPurchase()">Confirmar compra</button>
            </div>
        </template>
    </div>
    `,
    props: ['showLocal'],
    filters: {
        arsCurrency: function (value) {
            return value.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
            })
        }
    },
    computed: {
        hasProducts() {
            return this.local?.length;
        },
        hasAddress() {
            return this.addressData?.length;
        },
        hasCard() {
            return this.cardData?.length;
        },
        precioTotal() {
            const data = this.refreshLocal();
            let total = 0;
            data?.forEach(item => {
                total += item.precio * item.cantidad;
            });
            return total;
        }
    },
    data: function () {
        return {
            local: JSON.parse(localStorage.getItem("carrito")) || [],
            addressData: JSON.parse(localStorage.getItem("datos")) || null,
            cardData: JSON.parse(localStorage.getItem("tarjeta")) || null,
            alertIncrease: false,
            allowAddress: false,
            allowCard: false,
            userName: '',
            userEmail: '',
            userAddress: '',
            userDeliveryDate: '',
            numberCard: '',
            nameCard: '',
            dateMonth: '',
            dateYear: '',
            securityCode: '',
            dni: ''
        }
    },
    destroy() {
        this.alertIncrease = false;
    },
    methods: {
        decreaseItem(index) {
            const item = this.local.splice(index, 1)[0];
            if (item.cantidad > 1) {
                item.cantidad--;
                this.local.push(item);
                localStorage.setItem("carrito", JSON.stringify(this.local));
            } else {
                Swal.fire({
                    title: '¿Estas seguro que queres eliminarlo?',
                    text: "No podras deshacer esta acción",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.local.splice(index, 1);
                        localStorage.setItem("carrito", JSON.stringify(this.local));
                        Swal.fire(
                            'Eliminado',
                            'El producto se ha eliminado del carrito',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'No se ha eliminado',
                            'El producto seguirá en el carrito.',
                            'warning'
                        )
                    }
                })
            }
            this.refreshLocal();
        },
        increaseItem(index) {
            const item = this.local.splice(index, 1)[0];
            if (item.cantidad < 5) {
                item.cantidad++;
                this.local.push(item);
                localStorage.setItem("carrito", JSON.stringify(this.local));
            } else {
                this.alertIncrease = true;
            }
            this.refreshLocal();
        },
        deleteItem(index) {
            Swal.fire({
                title: '¿Estas seguro que queres eliminarlo?',
                text: "No podras deshacer esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.local.splice(index, 1);
                    localStorage.setItem("carrito", JSON.stringify(this.local));
                    Swal.fire(
                        'Eliminado',
                        'El producto se ha eliminado del carrito',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'No se ha eliminado',
                        'El producto seguirá en el carrito',
                        'warning'
                    )
                }
                this.refreshLocal();
            })
        },
        deleteAll() {
            Swal.fire({
                title: '¿Estas seguro que queres vaciarlo?',
                text: "No podras deshacer esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem("carrito", JSON.stringify([]));
                    Swal.fire(
                        'Se ha vaciado',
                        'El carrito se ha quedado sin productos',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'No se ha vaciado',
                        'El carrito seguirá con los productos que estan agregados',
                        'warning'
                    )
                }
                this.refreshLocal();
            })
        },
        saveAddressData() {
            if (!this.userName || !this.userEmail || !this.userAddress || !this.userDeliveryDate) {
                Swal.fire(
                    'No puede haber campos vacíos',
                    'Todos los campos del formulario son obligatorios',
                    'error'
                )
            } else {
                if(this.userDeliveryDate <= new Date().toISOString().split('T')[0]){
                    Swal.fire(
                        'La fecha no es correcta',
                        'La fecha debe ser al menos un día mayor a la actual',
                        'error'
                    )
                    return;
                }

                localStorage.setItem("datos", JSON.stringify([this.userName, this.userEmail, this.userAddress, this.userDeliveryDate]));
                Swal.fire(
                    'Se han guardado los datos correctamente',
                    '',
                    'success'
                )
            }
            this.addressData = JSON.parse(localStorage.getItem("datos")) || null;
        },
        deleteAddressData() {
            Swal.fire({
                title: '¿Estas seguro que queres eliminar tus datos?',
                text: "No podras deshacer esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("datos");
                    Swal.fire(
                        'Se han eliminado tus datos de dirección',
                        '',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'No se han eliminado tus datos',
                        '',
                        'warning'
                    )
                }
                this.addressData = JSON.parse(localStorage.getItem("datos")) || null;
            })
        },
        saveCardData() {
            if (!this.numberCard || !this.nameCard || !this.dateMonth || !this.dateYear || !this.securityCode || !this.dni) {
                Swal.fire(
                    'No puede haber campos vacíos',
                    'Todos los campos del formulario son obligatorios',
                    'error'
                )
            } else {
                if (this.numberCard.length !== 19) {
                    Swal.fire(
                        'El número de la tarjeta no es correcto',
                        'Debe estar constituido por 16 dígitos',
                        'error'
                    )
                    return;
                }

                if (this.securityCode.length !== 3 || isNaN(this.securityCode)) {
                    Swal.fire(
                        'El código de seguridad no es correcto',
                        'Debe tener 3 números',
                        'error'
                    )
                    return;
                }

                if(new Date(Date.now()).toISOString().split("T")[0].split("-", 2).join("-") >= `${this.dateYear}-0${this.dateMonth+1}`) {
                    Swal.fire(
                        'La fecha de vencimiento no es correcta',
                        'Debe ser igual o mayor al mes y año en el que nos encontramos',
                        'error'
                    )
                    return;
                }

                if(isNaN(this.dni)) {
                    Swal.fire(
                        'El DNI no es correcto',
                        'El DNI debe contener únicamente números',
                        'error'
                    )
                    return;
                }

                localStorage.setItem("tarjeta", JSON.stringify([this.numberCard, this.nameCard, `${this.dateMonth}/${this.dateYear}`, this.securityCode, this.dni]));
                Swal.fire(
                    'Se han guardado los datos correctamente',
                    '',
                    'success'
                )
            }
            this.cardData = JSON.parse(localStorage.getItem("tarjeta")) || null;
        },
        deleteCardData() {
            Swal.fire({
                title: '¿Estas seguro que queres eliminar los datos de tu tajerta?',
                text: "No podras deshacer esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("tarjeta");
                    Swal.fire(
                        'Se han eliminado los datos de tu tarjeta',
                        '',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'No se han eliminado los datos de tu tarjeta',
                        '',
                        'warning'
                    )
                }
                this.cardData = JSON.parse(localStorage.getItem("tarjeta")) || null;
            })
        },
        endPurchase() {
            localStorage.removeItem("carrito");
            this.refreshLocal();
            this.show(0);
            this.$parent.toggleCart();
            this.$parent.openNavList();
            let timerInterval;
            Swal.fire({
                title: 'La compra se realizó con éxito',
                html: '<p>¡Felicidades por tu compra!<br /> <em class="d-block mt-3">Esta alerta se cerrara automáticamente.</em></p>',
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            });
        },
        show(index) {
            switch (index) {
                case 0:
                    this.allowAddress = false;
                    this.allowCard = false;
                    break;
                case 1:
                    this.allowAddress = true;
                    this.allowCard = false;
                    break;
                case 2:
                    this.allowAddress = false;
                    this.allowCard = true;
                    break;
            }
        },
        refreshLocal() {
            this.local = JSON.parse(localStorage.getItem("carrito"));
            this.local?.sort((a, b) => a.id - b.id);
            return this.local;
        },
        numberCardSolve() {
            switch (this.numberCard?.length) {
                case 4:
                    this.numberCard += "-";
                    break;
                case 9:
                    this.numberCard += "-";
                    break;
                case 14:
                    this.numberCard += "-";
                    break;
            }
        }
    }
});
