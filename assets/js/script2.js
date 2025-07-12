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

const carroCompras = document.querySelector('.carro-compras')
const contenedorProductosCarro = document.querySelector('.contenedor-productos-carro')
const totalCarro = document.querySelector('.total-carro')
const cuentaProductos = document.querySelector('.total-productos-carro')
const botonFinalizar = document.querySelector('.btn-finalizar')
const galeriaProductos = document.querySelector('.productos-galeria')

document.addEventListener('DOMContentLoaded', () => {
  galeriaProductos.innerHTML = ''

  productos.forEach(producto => {
    const productoHtml =
      `<div class="card">
    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
    <div class="card-body">
      <h3 class="card-title">${producto.nombre}</h3>
      <p class="card-text-precio">$${producto.precio}</p>
      <button type="button" id="${producto.id}" class="btn-agregar"><i class="fa-solid fa-cart-shopping"></i></button>
    </div>
  </div>`

    galeriaProductos.insertAdjacentHTML("beforeend", productoHtml)
  })

  cargarCarrito()
  renderizarCarrito()

})

galeriaProductos.addEventListener('click', (event) => {
  const botonAgregar = event.target.closest('.btn-agregar')
  if (botonAgregar) {
    agregarProducto(botonAgregar)
  }
})

const iconoCarro = document.querySelector('header>.fa-cart-shopping')
iconoCarro.addEventListener('click', () => {
  carroCompras.classList.add('carro-activo')
})

const cerrarCarro = document.querySelector('.fa-x')
cerrarCarro.addEventListener('click', () => {
  carroCompras.classList.remove('carro-activo')
})

//  AGREGAR PRODUCTO 

function agregarProducto(botonAgregar) {
  const productoId = botonAgregar.id

  const productoAlCarro = productos.find(producto => producto.id === productoId)

  const productoExistente = carrito.find(prod => prod.id === productoId)
  if (productoExistente) {
    productoExistente.cantidad++
  }
  else {
    carrito.push({ ...productoAlCarro, cantidad: 1 })
    console.log(`${productoAlCarro.nombre} añadido al carro`)
  }
  renderizarCarrito()
  guardarCarrito()
}

//  RENDERIZAR PRODUCTO EN CARRO


function renderizarCarrito() {
  contenedorProductosCarro.innerHTML = ''

  let totalCompra = 0
  let unidadesEnCarro = 0

  carrito.forEach(producto => {
    const productoSubTotal = producto.precio * producto.cantidad
    totalCompra += productoSubTotal
    unidadesEnCarro += producto.cantidad

    const productoCarroHtml = `
                            <div class="producto-carro" data-id = "${producto.id}">
                              <h4>${producto.nombre}</h4>
                              <img src="${producto.imagen}" alt="${producto.nombre}">
                              <p>$${producto.precio.toLocaleString('es-CL')}</p>
                              <input type="number" class="carro-cantidad" value="${producto.cantidad}" min="1" data-id="${producto.id}">
                          
                              <button class="btn-eliminar" data-id="${producto.id}"><i class="fa-regular fa-trash-can"></i></button>
                            </div>
                            `
    contenedorProductosCarro.insertAdjacentHTML('beforeend', productoCarroHtml)
  })

  totalCarro.textContent = `$${totalCompra.toLocaleString('es-CL')}`
  if (cuentaProductos) {
    if (unidadesEnCarro === 0) {
      cuentaProductos.textContent = ''
    } else {
      cuentaProductos.textContent = unidadesEnCarro
    }

  }
}
  //  LOCAL STORAGE

  function guardarCarrito() {
    localStorage.setItem('carroCompras', JSON.stringify(carrito))
    console.log('carro guardado')

  }

  //  CARGAR LOCAL STORAGE


  function cargarCarrito() {
    const carroGuardado = localStorage.getItem('carroCompras')
    if (carroGuardado) {
      carrito = JSON.parse(carroGuardado)
      console.log('carro cargado')
    }
  }

  //  CAMBIAR CANTIDAD PRODUCTO

  contenedorProductosCarro.addEventListener('input', (event) => {
    if (event.target.classList.contains('carro-cantidad')) {
      const productoId = event.target.dataset.id
      const nuevaCantidad = Number(event.target.value)

      cambiarCantidadProducto(productoId, nuevaCantidad)
    }
  })

  function cambiarCantidadProducto(productoId, nuevaCantidad) {
    const producto = carrito.find(item => item.id === productoId)
    if (producto) {
      const cantidad = Number(nuevaCantidad)
      if (isNaN(cantidad) || cantidad < 0) {
        if (cantidad <= 0) {
          eliminarProducto(productoId)
          return
        }
        producto.cantidad = 1
      }
      else {
        producto.cantidad = cantidad
      }
      renderizarCarrito()
      guardarCarrito()
    }
  }

  //   ELIMINAR PRODUCTO

  /* contenedorProductosCarro.addEventListener('click', (event) => {
    if (event.target.closest('btn-eliminar')) {
      const productoId = event.target.dataset.id
      eliminarProducto(productoId)
    }
  }) */
 contenedorProductosCarro.addEventListener('click', (event) => {
  const botonEliminar = event.target.closest('.btn-eliminar')
  if (botonEliminar) { // Verifica si se encontró un botón con la clase
        const productoId = botonEliminar.dataset.id; // Obtén el ID del botón encontrado
        eliminarProducto(productoId); // Llama a tu función para eliminar
    }
 })



  function eliminarProducto(productoId) {
    carrito = carrito.filter(item => item.id !== productoId)
    renderizarCarrito()
    guardarCarrito()
  }

  //  FINALIZAR COMPRA

  botonFinalizar.addEventListener('click', () => {
    finalizarCompra()
  })

  function finalizarCompra() {
    carrito = []
    renderizarCarrito()
    guardarCarrito()
    mostrarMensajeFinal()
    carroCompras.classList.remove('carro-activo')
  }

//   MOSTRAR MENSAJE CONFIRMACIÓN




