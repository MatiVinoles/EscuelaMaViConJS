//class Producto {
//    constructor(nombre, precio, id){
//        this.nombre = nombre;
//        this.precio = precio; 
//        this.id = id;   
//    }
//}
//
//class ItemCarrito {
//    constructor(id, cantidad){
//        this.id = id;
//        this.cantidad = cantidad;
//    }
//}
//let carrito = []
//
//let productos = [new Producto("Curso de Guitarra", 9500, 1),
//                 new Producto("Curso de Bajo", 10000, 2),
//                 new Producto("Curso de Teclado", 11500, 3),
//                 new Producto("Clase individual de Guitarra", 850, 4),
//                 new Producto("Clase individual de Bajo", 950, 5),
//                 new Producto("Clase individual de Teclado", 1100, 6)]
//



//Interactividad del botón Carrito
const openShopCart = document.querySelector('.boton-carrito');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling');
});

function closeCart() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling')
}

const closeShopCart = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);



//Interactividad de la Tienda
const Clickbutton = document.querySelectorAll(`.btn`)
let carrito = []

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

Clickbutton.forEach(btn => {
    btn.addEventListener(`click`, addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest(`.card`)
    const tituloDelItem = item.querySelector(`.card-title`).textContent;
    const PrecioDelItem = item.querySelector(`.precio`).textContent;
    
    const newItem = {
        titulo: tituloDelItem,
        precio: PrecioDelItem,
        cantidad: 1
    }

    addItemCarrito(newItem)
    saveToLocalStorage()
}

function addItemCarrito(newItem){
    carrito.push(newItem)
    console.log(carrito)
}

function saveToLocalStorage() {
localStorage.setItem(`miCarrito`, JSON.stringify(carrito))
}

function readLocalStorage() {
carrito = localStorage.getItem(`miCarrito`)
carrito = JSON.parse (carrito)
console.log(carrito)
}

function ready() {
    readLocalStorage()
}














