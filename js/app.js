import { carritoIndex } from "./carrito.js";
import { agregarProductoCarrito } from "./carrito.js";
// Configuramos base url porque github no toma bien las url relativas
export const moduloSistema = () => {
    let url = window.location.pathname;
    let modulo = url.substring(url.lastIndexOf('/')+1).replace('.html','');
    // console.log(modulo);
    return modulo;
}
export const baseURL = () => {
    let baseUrl = window.location.origin;
    if(baseUrl.includes("github") || baseUrl.includes("localhost")){
        let pathArray = window.location.pathname.split( '/' );
        baseUrl += `/${pathArray[1]}`;
    }
    return baseUrl;
}
let baseUrl = baseURL();
export const mostrarProductos = (productos) => {
    const contenedor = document.getElementById(productos.contenedor);
    const modulo = moduloSistema();
    if(modulo != 'ofertas'){
        const par = document.createElement('p');
        par.classList.add('principal__section-title');
        par.innerHTML = `
        <p class="principal__section-title">${productos.titulo}</p>
        `;
        contenedor.appendChild(par);
    }
    productos.productos.forEach(producto => {
        const article = document.createElement('article');
        article.classList.add('principal__section-article', 'artProducto');
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
        agregarProductoCarrito(productos.contenedor, producto);
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
        article.classList.add('principal_aside__section-article', 'artProducto');
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
        agregarProductoCarrito(productos.contenedor, producto);
    });
}
const buscarProductos = () => {
    const inputBuscar = document.getElementById('buscar_en_tienda');
    if(inputBuscar){
        // Evento al escribir en el buscador
        inputBuscar.addEventListener('keyup', () => {
            // Texto del campo
            let textoBuscar = inputBuscar.value;
            if(textoBuscar){
                textoBuscar = textoBuscar.toLowerCase().trim();
            }
            // las filas de la tabla
            // const listadoTabla = document.getElementsByClassName('artProducto');
            const listadoTabla = document.querySelectorAll('.artProducto');
            // console.log(listadoTabla);
            let encontrado = 0 ;
            for(const art of listadoTabla){
                let texto = art.querySelector('span').innerHTML.toLowerCase().trim();
                if(texto.indexOf(textoBuscar) > -1){
                    art.parentNode.style.display="";
                    art.style.display = "";
                    encontrado++;
                }
                else {
                    art.style.display = "none";
                }
                // Calculo si la sección tiene productos, en el caso de que no, oculto la sección
                const calcular = art.parentNode.querySelectorAll('.artProducto')
                let cantArts = 0;
                for(const artCh of calcular){
                    if(artCh.offsetParent !== null){
                        cantArts++;
                    }
                }
                if(cantArts == 0){
                    art.parentNode.style.display="none";
                }
            };
        });
        // Chrome le pone una cruz al input y eliminar el contenido sin disparar el evento keyup
        // Esto lo corrige
        inputBuscar.addEventListener('blur', ()=> {
            const event = new Event ('keyup');
            inputBuscar.dispatchEvent(event);
        });
    }
}
buscarProductos();