const contadorCarrito = document.getElementById('carritoContenedor');

export const actualizarCarrito = (carritoDeCompras) => {
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    // Oculto o muestro botones de ir a pagar o vaciar carrito si hay o no productos en el carrito
    const btnVaciarCarrito = document.getElementById('vaciarCarrito');
    const btnPagarCarrito = document.getElementById('pagarCarrito');
    if(carritoDeCompras.length > 0){
        btnVaciarCarrito.style.display = '';
        btnPagarCarrito.style.display = '';
    }
    else {
        btnVaciarCarrito.style.display = 'none';
        btnPagarCarrito.style.display = 'none';
    }
}
