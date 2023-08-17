let carrito =[];
let productos=new Array();

let gestor;

const key_actualizacion="ultima_actualizacion"
const key_carrito="carrito";
//evento al cargar la paguina!
document.addEventListener("DOMContentLoaded",()=>{
    //Cargamos el carrito si no hay creamos un array vacio!
    carrito = JSON.parse(localStorage.getItem(key_carrito)) || [];
    
    gestor =new GestionarProductos();
    gestor.iniciar();
})


document.querySelector("#buscar").addEventListener("keyup",()=>{

    let q =document.getElementById("buscar").value;
    console.log(q);
    if (q.length >= 2) {
        gestor.buscar(q);
    }else{
        gestor.mostrarHEader("todos los productos en stock");
        gestor.cargarProductos(productos);
    }

})


function addCarrito(id){
    const prod=document.getElementById("row_"+id);

    let nombre=prod.querySelector("h3").textContent;
    let precio=prod.querySelector(".precio").textContent.substring(1,prod.querySelector(".precio").textContent.length);
    let img=prod.querySelector("img").src;
    
    let producto = new Producto(id,nombre,precio,img);
    gestor.addCart(producto);
}


function eliminar(id){
    gestor.eliminarProducto(id);
}
function comprar(carrito){
    gestor.terminanCompra(carrito);
}




// terminando la compra
const comprarBoton =document.querySelector("#btnCompra");
comprarBoton.addEventListener("click",()=>{
    gestor.borrarCarrito();
    

})