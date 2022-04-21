import { productosOfertas } from "./stock.js";
import { productosUltimasCompras } from "./stock.js";
import { mostrarProductos } from "./app.js";
import { mostrarProductosAside } from "./app.js";
import { eliminarProductoCarrito } from "./carrito.js";
import { actualizarCarrito } from "./actualizarCarrito.js";

const contenedorCarrito = document.getElementById('carritoContenedor');
let carritoStorage = [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productosOfertas, 'ofertas');
    mostrarProductosAside(productosUltimasCompras);
    if (localStorage.getItem("carrito")) {
        carritoStorage = JSON.parse(localStorage.getItem("carrito"))
        carritoStorage.map((producto) => {
            let div = document.createElement('div');
            div.classList.add('productoEnCarrito');
            div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
            <button id="eliminar${producto.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `;
            contenedorCarrito.appendChild(div);
            actualizarCarrito(carritoStorage);
            eliminarProductoCarrito(producto.id, producto.nombre);
        })
    }
});