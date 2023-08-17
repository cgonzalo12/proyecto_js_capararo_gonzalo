class GestionarProductos{
    
    iniciar() {
        productos=[
            {
                                "id": 1,
                                "nombre": "Set Cafe Burbujas (negro)",
                                "descripcion": "6 tazas cafe busbuja con azucarera",
                                "precio": 8000,
                                "stock": 50,
                                "img": "setburbuja.png",
                                "destacado": 1
                            },
                            {
                                "id": 2,
                                "nombre": "Taza Oficce (blanco/negro)",
                                "descripcion": "Taza desing estilo marmol",
                                "precio": 1800,
                                "stock": 50,
                                "img": "tazascatego.png",
                                "destacado": 1
                            },
                
                            {
                                "id": 3,
                                "nombre": "Plato Cuadrado x2",
                                "descripcion": "Plato cuadrado moderno 25cm",
                                "precio": 6000,
                                "stock": 50,
                                "img": "platocuadradocat.png",
                                "destacado": 1
                            },
                            {
                                "id": 4,
                                "nombre": "Bacha Desing",
                                "descripcion": "Bacha moderna negra circular",
                                "precio": 12000,
                                "stock": 50,
                                "img": "bachacat.png",
                                "destacado": 1
                            },
                            {
                                "id": 5,
                                "nombre": "Box",
                                "descripcion": "Box para el mejor regalo",
                                "precio": 5000,
                                "stock": 32,
                                "img": "boxs.png",
                                "destacado": 0
                            },
                            {
                                "id": 7,
                                "nombre": "Set Mate",
                                "descripcion": "Set de mate,azucarera y yerbera",
                                "precio": 4500,
                                "stock": 20,
                                "img": "sets.png",
                                "destacado": 0
                            },
                            {
                                "id": 8,
                                "nombre": "Maceta Captus",
                                "descripcion": "Maceta forma de cactus",
                                "precio": 1200,
                                "stock": 100,
                                "img": "macetascat.png",
                                "destacado": 0
                            }
        ]

    
        let productosDestacados=productos.filter(prod => prod.destacado==1);
        
        this.cargarProductos(productosDestacados);
        this.actualizarCarrito();
    }

    cargarProductos(productos){
        const divProductos=document.querySelector("#productos");

        divProductos.innerHTML = "";

        if (productos.length==0) {
            this.mostrarHEader("no se han encontrado productos destacados");
            return false;   
        }else{
            productos.forEach(producto => {
                const {id,nombre,img,stock,descripcion,precio}=producto
                let prod=document.createElement("div");
                prod.classList.add('col-md-6','container-fluid');
                prod.id="row_"+id;
                prod.innerHTML=`
                <div class="col-md-12 p-3">
                <div class="card shadow p-3  bg-body-tertiary rounded h-100 " >
                    <img src="../assets/img/${img}" class="card-img-top" height="350vh" alt="Mates" id="card-1">
                    <div class="card-body"> 
                        <h3 class="card-title" id="precio">${nombre}</h3>
                        <p class="precio">$${precio}</p>
                        <p>${descripcion}</p>
                        <p class="card-text">3 cutoas sin intedes</p>
                        <a href="javascript:addCarrito(${id})" class="btn btn-primary">Agregar al carrito</a>
                    </div>
                </div>
                </div>

                `;

                divProductos.appendChild(prod);
            });
        }
    }






    mostrarHEader(msg){
        const headerProductos=document.querySelector("#headerProductos");
        headerProductos.innerHTML=msg;
    }


    buscar(valor){
        let resultado=productos.filter(prod=> prod.nombre.toLowerCase().includes(valor.toLowerCase()) || prod.descripcion.toLowerCase().includes(valor.toLowerCase()) );
        this.cargarProductos(resultado);
    }




    addCart(nuevoProducto){
        const existe= carrito.some(producto=>producto.id==nuevoProducto.id);
        if (existe) {
            console.log("ya existe")
            const articulo=carrito.map(producto=>{
                if(producto.id==nuevoProducto.id){

                    producto.cantidad++;
                    return producto;
                }else{
                    return producto;
                }
            })
            Toastify({

                text : "Se actualizo la cantidad del producto",
                duration: 2000 ,
                gravity: "bottom"
            }).showToast();



        }else{
            carrito.push(nuevoProducto);

            Toastify({

                text : "Producto agregado al carrito!",
                duration: 2000 ,
                gravity: "bottom"
            }).showToast();



        }
        this.actualizarCarrito();



    }

    
    
    

    mostrarCarrito(){
        let detalleCarrito=document.querySelector("#idCarrito");
        detalleCarrito.innerHTML="";
        let total=0;

        carrito.forEach((producto)=>{
            const {id,nombre,precio,cantidad,img}=producto;
            const row =document.createElement("div");
            row.classList.add("row");
            total +=parseInt(precio)* cantidad;
            row.innerHTML=`
                <div class="col-3 d-flex align-items-center p-2 border-bottom">
                    <img src="${img}" width="80"/>
                </div>

                <div class="col-3 d-flex align-items-center p-2 border-bottom">
                    ${nombre}
                </div>

                <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
                    $ ${precio}
                </div> 

                <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                    ${cantidad}
                </div>

                <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                    <a href="javascript:eliminar(${id})">
                        <i class="fa-solid fa-square-minus fa-2x"></i>
                    </a>
                </div>
                `;
                detalleCarrito.append(row); //agrega al principio
        })
        
        const row =document.createElement("div");
        row.classList.add("row");
        row.innerHTML= `
            <div class="col-4 d-flex align-items-center justify-content-center p-2 border-bottom">
                Total a pagar:
            </div>

            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                <b>$ ${total}</b>
            </div>
        `;
        detalleCarrito.appendChild(row); //agrego al final


    }
    borrarCarrito(){
        let detalleCarrito=document.querySelector("#idCarrito");
        Swal.fire({

            title : "Esta seguro que quieres terminar la compra?  " ,
            showCancelButton : true ,
            cancelButtonColor : '#d33' ,
            confirmButtonText : "Si, terminar",
            cancelButtonText : "Cancelar, seguir comprando",

        }).then ((result) =>{


            if (result.isConfirmed){

                detalleCarrito.innerHTML="";
                carrito=[];
                this.actualizarCarrito();
                //notifico de la eliminacion
                Toastify({

                    text : "Compra realizada con exito",
                    duration: 2000 ,
                    gravity: "bottom"
    
                }).showToast();

            }


        })
        
    }

    contarProductos(){
        let contadorProductos=0;
        carrito.forEach((producto)=>{
            contadorProductos = contadorProductos + parseInt(producto.cantidad);
        })
        return contadorProductos;
    }
    actuaizarContador(){
        let totalCarrito=this.contarProductos();
        let countCarrito=document.querySelector("#badgeCarrito");
        countCarrito.innerHTML=totalCarrito;

    }

    guardarCarrito(){
        localStorage.setItem(key_carrito,JSON.stringify(carrito));
    }

    actualizarCarrito(){

        this.actuaizarContador();

        this.mostrarCarrito();
        
        this.guardarCarrito();

        
    }


    eliminarProducto(id){


        //si confima proceso a eliminar
        Swal.fire({

            title : "Esta seguro de eliminar el producto ?" ,
            showCancelButton : true ,
            cancelButtonColor : '#d33' ,
            confirmButtonText : "Si, eliminarlo",
            cancelButtonText : "Cancelar, toque sin querer!",

        }).then ((result) =>{


            if (result.isConfirmed){

                carrito=carrito.filter(articulo => articulo.id != id);
                this.actualizarCarrito();

                //notidico de la eliminacion
                Toastify({

                    text : "Producto eliminado con exito",
                    duration: 2000 ,
                    gravity: "bottom"
    
                }).showToast();

            }


        })

        


    }


    mostrarCompra(msg){
        const headerProductos=document.querySelector("#headerProductos");
        headerProductos.innerHTML=msg;
    }




    terminanCompra(){
        const divCompra=document.querySelector("#compra");
        divCompra.innerHTML=""
        if (carrito.length==0) {
            this.mostrarHEader("no se han encontrado productos");
            return false;   
        }else{
            carrito.forEach(producto => {
                const {id,nombre,img,stock,descripcion,precio}=producto
                let prod=document.createElement("div");
                prod.classList.add('container');
                prod.id="card_"+id;
                prod.innerHTML=`
                <div class="card" style="width: auto;">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Precio unitario: $ ${precio}</h6>
                        <p class="card-text">${descripcion}</p>
                    </div>
                </div>

                `;

                divProductos.appendChild(prod);
            });
        }
    }






}






