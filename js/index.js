import { router } from './router.js';
/* 
  Importo los componentes para no meterlos en el html, a pesar de que no se lean en el archivo, al importarlos hago que la app funcione
*/
import { Producto } from '../components/producto.component.js';
import { Productos } from '../components/productos.component.js';
import { Carrito } from '../components/carrito.component.js';
import { Computarizados } from '../components/computarizados.component.js';

export const app = new Vue({
  el: "#app",
  router,
  data: {
    local: null,
    showLocal: false
  },
  methods: {
    openNavList() {
      this.$refs.menuBtn.classList.toggle('active');
      this.$refs.navMenu.classList.toggle('show');
    },
    navClick() {
      this.openNavList();
      this.$children[3].productUnique = null;
    },
    toggleCart() {
      this.openNavList();
      this.showLocal = !this.showLocal;
    }
  }
})
