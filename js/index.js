import { productosMasBuscados } from "./stock.js";
import { productosOfertas } from "./stock.js";
import { productosLoNuevo } from "./stock.js";
import { productosUltimasCompras } from "./stock.js";
import { mostrarProductos } from "./app.js";
import { mostrarProductosAside } from "./app.js";
import { eliminarProductoCarrito } from "./carrito.js";
import { renderProductosCarrito } from "./carrito.js";
import { moduloSistema } from "./app.js";
import { actualizarCarrito } from "./actualizarCarrito.js";

const contenedorCarrito = document.getElementById('carritoContenedor');
let carritoStorage = [];

document.addEventListener("DOMContentLoaded", () => {
    // Obtengo en qué sección estoy de la web
    const modulo = moduloSistema();

    //Según el muestro distintas partes del sistema
    switch(modulo){
        case 'index':
        case '':
            mostrarProductos(productosMasBuscados);
            mostrarProductos(productosOfertas);
            mostrarProductos(productosLoNuevo);
            mostrarProductosAside(productosUltimasCompras);
            break;
        case 'ofertas':
            mostrarProductos(productosOfertas);
            mostrarProductosAside(productosUltimasCompras);
            break;
    }
    //Funciones que arman el carrito en el caso de que este en localstorage
    if (localStorage.getItem("carrito")) {
        carritoStorage = JSON.parse(localStorage.getItem("carrito"))
        carritoStorage.map((producto) => {
            renderProductosCarrito(producto);
            actualizarCarrito(carritoStorage);
            eliminarProductoCarrito(producto.id, producto.nombre);
        });
    }
});