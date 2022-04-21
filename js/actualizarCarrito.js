const contadorCarrito = document.getElementById('carritoContenedor');

export const actualizarCarrito = (carritoDeCompras) => {
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}
