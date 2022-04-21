const productos = [
    {
        id: 1,
        nombre: "Jugo baggio sabor durazno",
        precio: 200,
        img: '/img/baggio_durazno.jpg',
        cantidad: 1
    },
    {
        id: 2,
        nombre: "Galletas sabor limón",
        precio: 120,
        img: '/img/galletas_limon.png',
        cantidad: 1
    },
    {
        id: 3,
        nombre: "Milka de Chocolate",
        precio: 250,
        img: '/img/milka_chocolate.jpg',
        cantidad: 1
    },
    {
        id: 4,
        nombre: "Yogur La Serenisima sabor frutilla",
        precio: 200,
        img: '/img/yogur_frutilla.jpg',
        cantidad: 1
    },
    {
        id: 5,
        nombre: "Galletas sabor limón",
        precio: 120,
        img: '/img/galletas_limon.png',
        cantidad: 1
    },
    {
        id: 6,
        nombre: "Galletas sabor limón",
        precio: 120,
        img: '/img/galletas_limon.png',
        cantidad: 1
    }
]
const productosMasBuscados = {
    titulo: 'Lo más buscado:',
    contenedor: 'productosMasBuscados',
    productos: [
        {
            id: 1,
            nombre: "Jugo baggio sabor durazno",
            precio: 200,
            img: '/img/baggio_durazno.jpg',
            cantidad: 1
        },
        {
            id: 2,
            nombre: "Galletas sabor limón",
            precio: 120,
            img: '/img/galletas_limon.png',
            cantidad: 1
        },
    ]
}

const productosOfertas = {
    titulo: 'Ofertas:',
    contenedor: 'productosOfertas',
    productos: [
        {
            id: 1,
            nombre: "Jugo baggio sabor durazno",
            precio: 200,
            img: '/img/baggio_durazno.jpg',
            cantidad: 1
        },
        {
            id: 2,
            nombre: "Galletas sabor limón",
            precio: 120,
            img: '/img/galletas_limon.png',
            cantidad: 1
        },
        {
            id: 3,
            nombre: "Milka de Chocolate",
            precio: 250,
            img: '/img/milka_chocolate.jpg',
            cantidad: 1
        },
    ]
}

const productosLoNuevo = {
    titulo: 'Lo nuevo:',
    contenedor: 'productosLoNuevo',
    productos: [
        {
            id: 4,
            nombre: "Yogur La Serenisima sabor frutilla",
            precio: 200,
            img: '/img/yogur_frutilla.jpg',
            cantidad: 1
        },
    ]
}

const productosUltimasCompras = {
    titulo: 'Tus últimas compras:',
    contenedor: 'productosUltimasCompras',
    productos: [
        {
            id: 2,
            nombre: "Galletas sabor limón",
            precio: 120,
            img: '/img/galletas_limon.png',
            cantidad: 1
        },
        {
            id: 3,
            nombre: "Milka de Chocolate",
            precio: 250,
            img: '/img/milka_chocolate.jpg',
            cantidad: 1
        },
    ]
}

export { productos };
export { productosMasBuscados };
export { productosOfertas };
export { productosLoNuevo };
export { productosUltimasCompras };