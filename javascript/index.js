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


//const Clickbutton = document.querySelectorAll(`.btn`)
//let carrito = []
//
//if (document.readyState == 'loading') {
//    document.addEventListener("DOMContentLoaded", ready)
//} else {
//    ready()
//}
//
//Clickbutton.forEach(btn => {
//    btn.addEventListener(`click`, addToCarritoItem)
//})
//
//function addToCarritoItem(e){
//    const button = e.target
//    const item = button.closest(`.card`)
//    const tituloDelItem = item.querySelector(`.card-title`).textContent;
//    const PrecioDelItem = item.querySelector(`.precio`).textContent;
//    
//    const newItem = {
//        titulo: tituloDelItem,
//        precio: PrecioDelItem,
//        cantidad: 1
//    }
//
//    addItemCarrito(newItem)
//    saveToLocalStorage()
//}
//
//function addItemCarrito(newItem){
//    carrito.push(newItem)
//    console.log(carrito)
//}
//
//function saveToLocalStorage() {
//localStorage.setItem(`miCarrito`, JSON.stringify(carrito))
//}
//
//function readLocalStorage() {
//carrito = localStorage.getItem(`miCarrito`)
//carrito = JSON.parse (carrito)
//console.log(carrito)
//}
//
//function ready() {
//    readLocalStorage()
//}


//Retomar productos del carrito del local storage
let productsInCart = JSON.parse(localStorage.getItem(`shoppingCart`));


//Si no hay nada en el local storage, crea un array vacio de carrito
if(!productsInCart){
    productsInCart = [];
}


//Declarando variables a usar
const parentElement = document.querySelector(`#buyItems`);
const cartSumPrice = document.querySelector(`#sum-prices`);
const products = document.querySelectorAll(`.product`);


//Funcion para dar el total de los items que hay en el carrito
const countTheSumPrice = function () {
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}


//Funcion que agrega los items del carrito al DOM
const updateShoppingCartHTML = function () {
    localStorage.setItem(`shoppingCart`, JSON.stringify(productsInCart));
    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return `
            <li class="buyItem">
                <img src="${product.image}">
                <div>
                    <h6>${product.name}</h6>
                    <h6>$${product.price}</h6>
                    <div>
                        <button class="button-minus" data-id=${product.id}>-</button>
                        <span class="countOfProduct">${product.count}</span>
                        <button class="button-plus" data-id=${product.id}>+</button>
                    </div>
                </div>
            </li>`
        });
        parentElement.innerHTML = result.join(``);
        document.querySelector(`.checkout`).classList.remove(`hidden`);
        cartSumPrice.innerHTML = `$` + countTheSumPrice ();
    }
    else {
        document.querySelector(`checkout`).classList.add(`hidden`);
        parentElement.innerHTML = `<h4 class="empty">Tu carrito está vacío</h4>`;
        cartSumPrice.innerHTML = ``;
    }
}


//Funcion para ver si ya existe el producto agregado al carrito, si existe le suma +1 a la cantidad, si no existe, lo agrega al carrito
function updateProductsInCart(product) {
    for (let i=0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count +=1;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
}


//Funcion que agrega los items al carrito
products.forEach(item => {
    item.addEventListener(`click`, (e) => {
        if (e.target.classList.contains(`addToCart`)) {
            const productID = e.target.dataset.productID; 
            const productName = item.querySelector(`.productName`).innerHTML;
            const productPrice = item.querySelector(`.priceValue`).innerHTML;
            const productImage = item.querySelector(`img`).src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }
            updateProductsInCart(product);
            updateShoppingCartHTML();
        }
    });
});


//Funcion para los botones de agregar o quitar items del carrito
parentElement.addEventListener(`click`, (e) => {
    const isPlusButton = e.target.classList.contains(`button-plus`);
    const isMinusButton = e.target.classList.contains(`button-minus`);
    if(isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == e.target.dataset.id) {
                if (isPlusButton) {
                    productsInCart[i].count +=1
                } else if (isMinusButton) {
                    productsInCart[i].count -=1
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            }
            if (productsInCart[i].count <=0) {
                productsInCart.splice(i, 1);
            }
        }
        updateShoppingCartHTML();
    }
});

updateShoppingCartHTML();


const btn = document.querySelector(`.checkout`)
btn.addEventListener(`click`, () => {

Swal.fire ({
    icon: `success`,
    title: `Gracias por tu compra`,
    text: `Nos pondremos en contacto contigo`
})

})





