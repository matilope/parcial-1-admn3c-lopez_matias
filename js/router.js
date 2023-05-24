import { Inicio } from '../components/inicio.component.js';
import { Productos } from '../components/productos.component.js';
import { Producto } from '../components/producto.component.js';

export const router = new VueRouter({
    routes: [
        {
            path: '/', component: Inicio
        },
        {
            path: '/productos', component: Productos
        },
        {
            path: '/producto/:id', component: Producto
        }
    ]
});