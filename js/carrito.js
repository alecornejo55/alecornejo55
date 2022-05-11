import { actualizarCarrito } from "./actualizarCarrito.js";
import { getData } from "./getData.js";
import { baseURL } from "./app.js";

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
    calcularTotal();
    eliminarProductoCarrito(producto.id, producto.nombre);
    vaciarCarrito();
    irAPagar();
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
                btnEliminar.parentElement.parentElement.remove();
                carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);
                actualizarCarrito(carritoDeCompras);
                calcularTotal();
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
    <div class="col-5">${producto.nombre}</div>
    <div class="col-3">Precio: $${producto.precio}</div>
    <div class="col-4 text-end" id="cantidad${producto.id}">
        Cantidad: ${producto.cantidad}
        <button id="eliminar${producto.id}" class="boton-eliminar ms-3"><i class="fas fa-trash-alt"></i></button>
    </div>
    `;
    let totalCarrito = document.getElementById('totalCarrito');
    if(totalCarrito){
        contenedorCarrito.insertBefore(div, totalCarrito);
    }
    else {
        contenedorCarrito.appendChild(div);
    }
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
export const calcularTotal = () => {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : carritoDeCompras;
    let totalCarrito = document.getElementById('totalCarrito');
    // console.log(carritoDeCompras);
    if(carritoDeCompras.length > 0){
        if(!totalCarrito){
            totalCarrito = document.createElement('div');
            totalCarrito.setAttribute('id', 'totalCarrito');
            totalCarrito.classList.add('col-md-3','text-end','offset-md-9','border-top','p-2', 'mt-3');
            contenedorCarrito.appendChild(totalCarrito);
        }
        const reduced = carritoDeCompras.reduce((acc, value) => (value.cantidad * value.precio)+acc, 0);
        totalCarrito.innerHTML = `<b>Total a pagar: $${reduced}</b>`;
    }
    else {
        if(totalCarrito){
            totalCarrito.remove();
        }
    }
    return 0;
}
export const irAPagar = () => {
    let baseUrl = baseURL();
    const btnPagar = document.getElementById('pagarCarrito');
    btnPagar.addEventListener('click', async () => {
        const { value: email } = await Swal.fire({
            title: 'Para continuar, ingrese su email',
            input: 'email',
            inputLabel: 'Email',
            inputPlaceholder: 'Ingrese su email',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
        if(email){
            contenedorCarrito.innerHTML = '';
            carritoDeCompras = [];
            actualizarCarrito(carritoDeCompras);
            Swal.fire(
                '¡Compra exitosa!',
                'Pronto recibirá un email con los siguientes pasos a seguir',
                'success'
            );
        }
        // document.location.href = `${baseUrl}/html/payment.html`;
    });
}