import { carritoIndex } from "./carrito.js";
// Configuramos base url porque github no toma bien las url relativas
let baseUrl = window.location.origin;
if(baseUrl.includes("github") || baseUrl.includes("localhost")){
    let pathArray = window.location.pathname.split( '/' );
    baseUrl += `/${pathArray[1]}`;
}

export const mostrarProductos = (productos, from) => {
    const contenedor = document.getElementById(productos.contenedor);
    if(from != 'ofertas'){
        const par = document.createElement('p');
        par.classList.add('principal__section-title');
        par.innerHTML = `
        <p class="principal__section-title">${productos.titulo}</p>
        `;
        contenedor.appendChild(par);
    }
    console.log(baseUrl);
    productos.productos.forEach(producto => {
        const article = document.createElement('article');
        article.classList.add('principal__section-article');
        article.innerHTML = `
            <div class="article_img">
                <img src="${baseUrl}${producto.img}" alt="${producto.nombre}">
            </div>
            <span>${producto.nombre}</span>
            <div class="article_action_buy">
                <span>
                $${producto.precio}
                </span>
                <button id="btnAgregar${productos.contenedor}${producto.id}">
                    <img src="${baseUrl}/img/icons/add_cart_white.png">
                </button>
            </div>
        `;
        contenedor.appendChild(article);
        const btnAgregar = document.getElementById(`btnAgregar${productos.contenedor}${producto.id}`);
        btnAgregar.addEventListener('click', () => {
            carritoIndex(producto.id);
            swal.fire({
                title: 'Genial',
                text: `¡${producto.nombre} ha sido agregado al carrito!`,
                icon: 'success',
                timer: 2000,
            });
        });
    });
}

export const mostrarProductosAside = (productos) => {
    const contenedor = document.getElementById(productos.contenedor);
    const par = document.createElement('p');
    par.classList.add('principal__section-title');
    par.innerHTML = `
    <p class="principal__section-title">${productos.titulo}</p>
    `;
    contenedor.appendChild(par);
    productos.productos.forEach(producto => {
        const article = document.createElement('article');
        article.classList.add('principal_aside__section-article');
        article.innerHTML = `
            <div class="article_img">
                <img src="${baseUrl}${producto.img}" alt="${producto.nombre}">
            </div>
            <span>${producto.nombre}</span>
            <div class="article_action_buy">
                <span>
                $${producto.precio}
                </span>
                <button id="btnAgregar${productos.contenedor}${producto.id}">
                    <img src="${baseUrl}/img/icons/add_cart_white.png">
                </button>
            </div>
        `;
        contenedor.appendChild(article);
        const btnAgregar = document.getElementById(`btnAgregar${productos.contenedor}${producto.id}`);
        btnAgregar.addEventListener('click', () => {
            carritoIndex(producto.id);
            swal.fire({
                title: 'Genial',
                text: `¡${producto.nombre} ha sido agregado al carrito!`,
                icon: 'success',
                timer: 2000,
            });
        });
    });
}