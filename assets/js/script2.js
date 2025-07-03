/* --Array con 6 objetos que serán los productos ofrecidos-- */

const productos = [
  {
    nombre: "Leche",
    precio: 1000,
    imagen: "assets/img/leche.webp",
    id: "milk"
  },
  {
    nombre: "Pan de molde",
    precio: 2000,
    imagen: "assets/img/pan.webp",
    id: "bread"
  },
  {
    nombre: "Queso",
    precio: 1200,
    imagen: "assets/img/queso.webp",
    id: "cheese"
  },
  {
    nombre: "Mermelada",
    precio: 890,
    imagen: "assets/img/mermelada.webp",
    id: "jam"
  },
  {
    nombre: "Azúcar",
    precio: 1300,
    imagen: "assets/img/azucar.webp",
    id: "sugar"
  },
  {
    nombre: "Café",
    precio: 2500,
    imagen: "assets/img/cafe.webp",
    id: "coffee"
  },
  {
    nombre: "Galletas",
    precio: 900,
    imagen: "assets/img/galletas.webp",
    id: "cookie"
  },
  {
    nombre: "Jamón",
    precio: 2500,
    imagen: "assets/img/jamon.webp",
    id: "ham"
  },
  {
    nombre: "Avena",
    precio: 1200,
    imagen: "assets/img/avena.webp",
    id: "oatmeal"
  },
  {
    nombre: "Te",
    precio: 1800,
    imagen: "assets/img/te.webp",
    id: "tea"
  }
];

let carrito = []
let galeriaProductos = document.querySelector('.productos-galeria')
galeriaProductos.innerHTML = ''

const tarjetaProducto = productos.forEach( producto => {   
   const productoHtml =
 `<div class="card">
    <img src=${producto.imagen} class="card-img-top" alt="imagen">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text-precio">$${producto.precio}</p>
      <button type="button" id="${producto.id}" class="btn-agregar"><i class="fa-solid fa-cart-shopping"></i></button>
    </div>
  </div>`

  galeriaProductos.insertAdjacentHTML("beforeend", productoHtml)
})

  galeriaProductos.addEventListener('click', (event) => {
     const botonAgregar = event.target.closest('.btn-agregar')
     if(botonAgregar){
     agregarProducto(botonAgregar)
     }
 })   

  function agregarProducto(botonAgregar){
      const productoId = botonAgregar.id
      
      const productoAlCarro = productos.find(producto => producto.id === productoId)

      const productoExistente = carrito.find(prod => prod.id === productoId)
      if(productoExistente){
        productoExistente.quantity++
      }
      else{
        carrito.push({...productoAlCarro, quantity: 1})
        console.log(`${productoAlCarro.nombre} añadido al carro`)
      }
     renderizarCarrito()
     guardarCarrito()
    }

function renderizarCarrito(){

}

function guardarCarrito(){

}


