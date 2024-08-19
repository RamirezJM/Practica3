/* --Array con 6 objetos que serán los productos ofrecidos-- */

const productos = [
  {
    nombre: "Leche",
    precio: 1000,
    imagen: "assets/img/leche.png",
    id: "milk"
  },
  {
    nombre: "Pan de molde",
    precio: 2000,
    imagen: "assets/img/pan.jpg",
    id: "bread"
  },
  {
    nombre: "Queso",
    precio: 1200,
    imagen: "assets/img/queso.png",
    id: "cheese"
  },
  {
    nombre: "Mermelada",
    precio: 890,
    imagen: "assets/img/mermelada.jpg",
    id: "jam"
  },
  {
    nombre: "Azúcar",
    precio: 1300,
    imagen: "assets/img/azucar.png",
    id: "sugar"
  },
  {
    nombre: "Café",
    precio: 2500,
    imagen: "assets/img/cafe.jpg",
    id: "coffe"
  }
];

/* --array del carrito de compras que recibirá los productos seleccionados-- */

const carrito = [];

let cards = "";

for (let i = 0; i < productos.length; i++) {        /* --se crea una tarjeta de Bootstrap con cada producto-- */
  cards += `
            <div class="card">
              <img src=${productos[i].imagen} class="card-img-top" alt="imagen">
              <div class="card-body">
                <h5 class="card-title">${productos[i].nombre}</h5>
                <p class="card-text-precio">$${productos[i].precio}</p>
                <button type="button" id="${productos[i].id} "class="btn-agregar"><i class="fa-solid fa-cart-shopping"></i></button>
              </div>
            </div>          
          `
};

document.getElementById("items").innerHTML = cards;

let botonAgregar = document.getElementsByClassName("btn-agregar");
for (let i = 0; i < botonAgregar.length; i++) {                           /* --Se accede al botón "agregar" de cada producto-- */
  botonAgregar[i].addEventListener("click", agregarProducto);
}

const botonComprar = document.querySelector("#btn-finalizar").addEventListener("click", finalizarCompra);
const interiorCarrito = document.getElementById("contenedor-carrito");

/* --FUNCIÓN para agregar productos al carro-- */

function agregarProducto(event) {
  const boton = event.target;
  const botonProducto = boton.closest(".card");

  const productoTitulo = botonProducto.querySelector('.card-title').textContent;
  const productoPrecio = botonProducto.querySelector('.card-text-precio').textContent;
  const productoImagen = botonProducto.querySelector('.card-img-top').src;

  crearProducto(productoTitulo, productoPrecio, productoImagen);
}

/* --FUNCIÓN para crear el producto que se va a agregar al carro-- */

function crearProducto(productoTitulo, productoPrecio, productoImagen) {

  const productoAgregado = document.getElementsByClassName("itemTitulo");
  for (let i = 0; i < productoAgregado.length; i++) {
    if (productoAgregado[i].textContent == productoTitulo) {
      let cantidadProducto = productoAgregado[i].parentElement.parentElement.parentElement.querySelector(".shoppingCartItemQuantity");
      cantidadProducto.value++;
      actualizarTotal();
      return;
    }                             /* --se crea un contenedor con elementos de Bootstrap para el producto en el carro-- */
  }
  const productoCarrito = document.createElement("div");
  const contenidoCarrito = `<div class="row shoppingCartItem" id="elcarrito">
                              <div class="col-6">
                                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                                  <img src=${productoImagen} class="shopping-cart-image">
                                    <h6 class="itemTitulo shopping-cart-item-title  text-truncate ml-3 mb-0">${productoTitulo}</h6>
                                </div>
                              </div>
                              <div class="col-2">
                                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                                  <p class="item-price mb-0 shoppingCartItemPrice">${productoPrecio}</p>
                                </div>
                              </div>
                              <div class="col-4">
                                <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                                  <button type="button" class="btn-eliminar"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                              </div>
                            </div>
  `
  productoCarrito.innerHTML = contenidoCarrito;
  interiorCarrito.appendChild(productoCarrito);

  productoCarrito.querySelector(".fa-regular").addEventListener("click", eliminarProducto);
  productoCarrito.querySelector(".shoppingCartItemQuantity").addEventListener("change", cambiarCantidad);

  actualizarTotal();
}

/* --FUNCIÓN que actualiza productos del carro y total-- */

function actualizarTotal() {
  let total = 0;
  const totalCarrito = document.querySelector("#carrito-total");
  const carritoItems = document.querySelectorAll(".shoppingCartItem");
  carritoItems.forEach((shoppingCartItem) => {
    const carritoItemsPrecio = Number(shoppingCartItem.querySelector(".shoppingCartItemPrice").textContent.replace("$", ""));
    const productoCantidad = Number(shoppingCartItem.querySelector(".shoppingCartItemQuantity").value);

    total = total + carritoItemsPrecio * productoCantidad;
  });
  totalCarrito.innerHTML = `$${total}`;
}

/* --FUNCIÓN que elimina productos del carro-- */

function eliminarProducto(event) {
  const botonEliminar = event.target
  botonEliminar.closest(".shoppingCartItem").remove();
  actualizarTotal();
}

/* --FUNCIÓN que cambia la cantidad del producto en el carro-- */

function cambiarCantidad(event) {
  const inputCantidad = event.target;
  inputCantidad.value <= 0 ? (inputCantidad.value = 1) : null;
  actualizarTotal();
};

/* --FUNCIÓN para finalizar la compra-- */

function finalizarCompra() {
  interiorCarrito.innerHTML = `<h2>Carrito</h2>`;
  actualizarTotal()
  alert("Su compra está siendo procesada. Gracias por comprar con nosotros.");
};







