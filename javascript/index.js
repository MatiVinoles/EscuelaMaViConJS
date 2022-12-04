//Interactividad del botón Carrito
const openShopCart = document.querySelector(".boton-carrito");
openShopCart.addEventListener("click", () => {
  const cart = document.querySelector(".producstOnCart");
  cart.classList.toggle("hide");
  document.querySelector("body").classList.toggle("stopScrolling");
});

function closeCart() {
  const cart = document.querySelector(".producstOnCart");
  cart.classList.toggle("hide");
  document.querySelector("body").classList.toggle("stopScrolling");
}

const closeShopCart = document.querySelector("#closeButton");
const overlay = document.querySelector(".overlay");
closeShopCart.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

//Interactividad de la Tienda

//Fetch de los productos de productos.json para colocarlos en el HTML
fetch(`/javascript/productos.json`)
  .then((res) => res.json())
  .then((data) => {
    let grillaProductos = document.getElementsByClassName("shop-content")[0];
    data.forEach((product) => {
      const div = document.createElement(`div`);
      div.classList.add("card");
      div.classList.add("text-center");
      div.classList.add("rounded");
      div.classList.add("col-md-3");
      div.classList.add("mx-4");
      div.classList.add("my-4");
      div.classList.add("cardWidth");

      div.innerHTML = `
        <img src="${product.image}" class="card-img-top product-image" alt="Guitarra eléctrica">
        <div class="card-body">
          <h5 class="card-title productName">${product.name}</h5>
          <p class="card-text description">${product.description}</p>
          <h5 class="text-success price">Precio: <span class="priceValue">$${product.price}</span></h5>
          <button class="btn btn-danger btn-outline-light addToCart" data-productId="${product.id}">Agregar al carrito</button>
        </div>`;
      div
        .getElementsByClassName("addToCart")[0]
        .addEventListener(`click`, addToCart);
      grillaProductos.append(div);
    });
  });

//Retomar productos del carrito del local storage
let productsInCart = JSON.parse(localStorage.getItem(`shoppingCart`));

//Si no hay nada en el local storage, crea un array vacio de carrito
if (!productsInCart) {
  productsInCart = [];
}

//Declarando variables a usar
const parentElement = document.querySelector(`#buyItems`);
const cartSumPrice = document.querySelector(`#sum-prices`);
const cartSumPriceCart = document.querySelector(`#sum-prices-cart`);
const products = document.querySelectorAll(`.product`);

//Funcion para dar el total de los items que hay en el carrito
const countTheSumPrice = function () {
  let sum = 0;
  productsInCart.forEach((item) => {
    sum += parseInt(item.price);
  });
  return sum;
};

//Funcion que agrega los items del carrito al DOM
const updateShoppingCartHTML = function () {
  localStorage.setItem(`shoppingCart`, JSON.stringify(productsInCart));
  if (productsInCart.length > 0) {
    let result = productsInCart.map((product) => {
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
            </li>`;
    });
    parentElement.innerHTML = result.join(``);
    document.querySelector(`.checkout`).classList.remove(`hidden`);
    cartSumPrice.innerHTML = `$` + countTheSumPrice();
    cartSumPriceCart.innerHTML = `$` + countTheSumPrice();
  } else {
    document.querySelector(`.checkout`).classList.add(`hidden`);
    parentElement.innerHTML = `<h4 class="empty">Tu carrito está vacío</h4>`;
    cartSumPrice.innerHTML = ``;
    cartSumPriceCart.innerHTML = ``;
  }
};

//Funcion para ver si ya existe el producto agregado al carrito, si existe le suma +1 a la cantidad, si no existe, lo agrega al carrito
function updateProductsInCart(product) {
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id == product.id) {
      productsInCart[i].count += 1;
      productsInCart[i].price =
        productsInCart[i].basePrice * productsInCart[i].count;
      return;
    }
  }
  productsInCart.push(product);
}

//Funcion que agrega los items al carrito
function addToCart(event) {
  let item = event.target.parentElement.parentElement;
  const productID = event.target.dataset.productid;
  const productName = item.querySelector(`.productName`).innerHTML;
  const productPrice = item.querySelector(`.priceValue`).innerHTML;
  const productImage = item.querySelector(`img`).src;
  let product = {
    name: productName,
    image: productImage,
    id: productID,
    count: 1,
    price: productPrice.substring(1),
    basePrice: productPrice.substring(1),
  };
  updateProductsInCart(product);
  updateShoppingCartHTML();
}

//Funcion para los botones de agregar o quitar items del carrito
parentElement.addEventListener(`click`, (e) => {
  const isPlusButton = e.target.classList.contains(`button-plus`);
  const isMinusButton = e.target.classList.contains(`button-minus`);
  if (isPlusButton || isMinusButton) {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].id == e.target.dataset.id) {
        if (isPlusButton) {
          productsInCart[i].count += 1;
        } else if (isMinusButton) {
          productsInCart[i].count -= 1;
        }
        productsInCart[i].price =
          productsInCart[i].basePrice * productsInCart[i].count;
      }
      if (productsInCart[i].count <= 0) {
        productsInCart.splice(i, 1);
      }
    }
    updateShoppingCartHTML();
  }
});

updateShoppingCartHTML();

//Alert del botón Comprar
const btn = document.querySelector(`.checkout`);
btn.addEventListener(`click`, () => {
  clearCarrito();
  Swal.fire({
    icon: `success`,
    title: `Gracias por tu compra`,
    text: `Nos pondremos en contacto contigo`,
  });
});

//Alert (y función de remover items del carrito) del botón Limpiar)
let listaDelCarrito = document.querySelector("ul");
const clearCart = document.querySelector(`.clearCart`);
clearCart.addEventListener(`click`, (event) => {
  clearCarrito();

  Swal.fire({
    icon: `success`,
    title: `El carrito ha sido limpiado`,
  });
});

function clearCarrito() {
  let carrito = document.querySelector(`#buyItems`);
  carrito.innerHTML = '<h4 class="empty">Tu carrito está vacío</h4>';
  cartSumPrice.innerHTML = ``;
  cartSumPriceCart.innerHTML = ``;
  productsInCart = [];
  localStorage.clear();
}
