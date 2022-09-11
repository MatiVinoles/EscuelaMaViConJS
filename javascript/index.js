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
//let total = 0
//let productoAcomprar = parseInt(prompt("Elige que deseas adquirir de nuestra tienda: 1-Curso de guitarra, 2-Curso de bajo, 3-Curso de teclado, 4-Clase individual de guitarra, 5-Clase individual de bajo, 6-Clase individual de teclado"))
//let continuarLaCompra = true
//
//carrito.push(new ItemCarrito(productoAcomprar,1))
//
//let productoSolicitado = productos.find(prod=>prod.id===productoAcomprar)
//
//if (productoSolicitado){
//    total = total + productoSolicitado.precio
//}
//else {
//    alert("Ingresa un producto existente: 1-Curso de guitarra, 2-Curso de bajo, 3-Curso de teclado, 4-Clase individual de guitarra, 5-Clase individual de bajo, 6-Clase individual de teclado ")
//}
//
//decision =  (parseInt(prompt("Algo más que desees agregar? 1.Si - 2.No")) ===1) ? true:false;
//while (decision === true){
//    productoAcomprar = parseInt(prompt("Elige que deseas adquirir de nuestra tienda: 1-Curso de guitarra, 2-Curso de bajo, 3-Curso de teclado, 4-Clase individual de guitarra, 5-Clase individual de bajo, 6-Clase individual de teclado"))
//    productoSolicitado = productos.find(prod=>prod.id===productoAcomprar)
//    let productoCarrito = carrito.findIndex(prod=>prod.id===productoAcomprar)
//    if (productoCarrito >=0){ 
//        carrito[productoCarrito].cantidad = carrito[productoCarrito].cantidad+1
//    } else {
//        carrito.push(new ItemCarrito(productoAcomprar,1))
//    } console.log(carrito)
//    
//    total = total + productoSolicitado.precio
//    decision =  (parseInt(prompt("Algo más que desees agregar? 1.Si - 2.No")) ===1) ? true:false;
//} 
//
//alert("El valor total de tu compra (SIN IVA) es de " + total);
//
//let valorTotalConIVA = precioConIVA(total);
//alert("El valor total de tu compra con IVA es de " + valorTotalConIVA);
//
//let cuotas = parseInt(prompt("En cuantas cuotas deseas pagar? Puede ser entre 1 y 6 cuotas"))
//while(cuotas <1 || cuotas >6){
//  cuotas = parseInt(prompt("En cuantas cuotas deseas pagar? Puede ser entre 1 y 6 cuotas"))
//}
//let valorCuota = precioCuota(valorTotalConIVA, cuotas)
//alert("Son "+cuotas+" pagos de "+valorCuota)
//
//// Valor del IVA 2022 = 22%
//function precioConIVA(valor) {
//    const IVA = valor * 0.22;
//    return valor + IVA;
//}
//  
//function precioCuota(valor, cuotas) {
//    return valor/cuotas
//}

const Clickbutton = document.querySelectorAll(`.btn`)
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener(`click`, addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest(`.card`)
    const tituloDelItem = item.querySelector(`.card-title`).textContent;
    const PrecioDelItem = item.querySelector(`.precio`).textContent;
    const ImagenDelItem = item.querySelector(`.card-img-top`).src;
    
    const newItem = {
        titulo: tituloDelItem,
        precio: PrecioDelItem,
        img: ImagenDelItem,
        cantidad: 1
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem){
    carrito.push(newItem)
    console.log(carrito)
}






