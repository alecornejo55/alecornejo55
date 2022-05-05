import { actualizarCarrito } from "./actualizarCarrito.js";
import { getData } from "./getData.js";

const contenedorCarrito = document.getElementById('carritoContenedor');
let carritoDeCompras = [];

export const carritoIndex = async (productoId) => {
    // Usamos fetch para traer los productos del json
    const productos = await getData();
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : carritoDeCompras;
    let producto = productos.find( producto => producto.id == productoId );
    let productoEnCarrito = carritoDeCompras.find( producto => producto.id == productoId );
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
        producto.cantidad = productoEnCarrito.cantidad;
        const actualizarCantidad = document.getElementById(`cantidad${producto.id}`);
        actualizarCantidad.innerText = `Cantidad: ${producto.cantidad}`;
    }
    else {
        carritoDeCompras.push(producto);
        producto.cantidad = 1;
        renderProductosCarrito(producto);
    }
    actualizarCarrito(carritoDeCompras);
    eliminarProductoCarrito(producto.id, producto.nombre);
    vaciarCarrito();
    console.log(carritoDeCompras);
    console.log(productos);
}

export const eliminarProductoCarrito = (productoId, productoNombre) => {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : carritoDeCompras;

    const btnEliminar = document.getElementById(`eliminar${productoId}`);
    btnEliminar.addEventListener('click', () => {
        swal.fire({
            title: `¿Está seguro de eliminar ${productoNombre}?`,
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Sí',
            showDenyButton: true,
            denyButtonText: 'No',
        }).then( (result)=>{
            if(result.isConfirmed){
                btnEliminar.parentElement.remove();
                carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);
                actualizarCarrito(carritoDeCompras);
                swal.fire(
                    'Producto eliminado',
                    '',
                    'success'
                )
            }
        });
    });
}
export const vaciarCarrito = () => {
    const btnVaciarCarrito = document.getElementById('vaciarCarrito');
    btnVaciarCarrito.addEventListener('click', () => {
        swal.fire({
            title: `¿Está seguro de vaciar el carrito?`,
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Sí',
            showDenyButton: true,
            denyButtonText: 'No',
        }).then( (result)=>{
            if(result.isConfirmed){
                contenedorCarrito.innerHTML = '';
                carritoDeCompras = [];
                actualizarCarrito(carritoDeCompras);
                swal.fire(
                    'El carrito fue vaciado',
                    '',
                    'success'
                )
            }
        });
    });
}
export const renderProductosCarrito = (producto) => {
    let div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>Precio: $${producto.precio}</p>
    <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
    <button id="eliminar${producto.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `;
    contenedorCarrito.appendChild(div);
}

export const agregarProductoCarrito = (contenedor, producto) => {
    const btnAgregar = document.getElementById(`btnAgregar${contenedor}${producto.id}`);
    btnAgregar.addEventListener('click', () => {
        carritoIndex(producto.id);
        swal.fire({
            title: 'Genial',
            text: `¡${producto.nombre} ha sido agregado al carrito!`,
            icon: 'success',
            timer: 2000,
        });
    });
}