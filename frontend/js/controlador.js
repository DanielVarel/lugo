var usuarios = [];
var categorias = [];
var empresas  = [];
var usuarioSeleccionado = '';
var idUsuarioSeleccionado = null;

// obtener todos los  usuarios
function obtenerUsuarios(){
    fetch('http://localhost:3000/usuarios', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((respuesta) => respuesta.json())
  .then((res) => {
    usuarios = res;
    listaUsuarios();
    console.log(usuarios);
  }); 

}

// obtenere todas las  categorias
function obtenerCategorias(){
    fetch('http://localhost:3000/categorias', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((respuesta) => respuesta.json())
  .then((res) => {
    categorias = res;
    pintandoCategoriasLugo();
    console.log( 'estas son las categorias', categorias);
  }); 

}

// obtenere todas las empresas
function obtenerEmpresas(){
    fetch('http://localhost:3000/empresas', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((respuesta) => respuesta.json())
  .then((res) => {
    empresas = res;
  }); 

}

obtenerCategorias();

obtenerUsuarios();

obtenerEmpresas();

// Generando listas de categorias para pintarlas en pantalla ya estilizadas
function pintandoCategoriasLugo () {
    //console.log('Works');
        document.getElementById('contenedor-categorias').innerHTML = ``;
    for(let i=0;i<categorias.length;i++) {
        document.getElementById('contenedor-categorias').innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 mt-2">
            <div class="card-item card" style="background: ${categorias[i].color};" onclick="infoCategorias(${i})">
                <div class="row">
                    <div class="col mx-auto text-center m-3">
                        <i class="${categorias[i].icono} cat-icon"></i>
                    </div>
                    <div class="col">

                    </div>
                </div>
                <div class="row m-3 mt-4">
                    <section class="col">
                        <h3 class="text-white font-weight-bolder">${categorias[i].nombreCategoria}</h3>
                        <p class="text-white" style="font-size: 13px;">
                            ${categorias[i].empresas.length} Comercios
                        </p>
                    </section>
                </div>
            </div>
        </div>
        `;
    }
}

pintandoCategoriasLugo();

// Generando Usuarios 
function listaUsuarios() { 
    // document.getElementById('usuarioActual').innerHTML = '';
    for (let i=0;i<usuarios.length;i++) {
        document.getElementById('usuarioActual').innerHTML += 
        `<option value="${ i }">${ usuarios[i].nombre } ${ usuarios[i].apellido }</option>`;
    }
}

// Onchange para seleccionar un usuario
function cambiarUsuario () {
    usuarioSeleccionado = document.querySelector('#usuarioActual').value;
    document.getElementById('texto-hola').innerHTML = `¡Hola ${usuarios[usuarioSeleccionado].nombre}!`;
    idUsuarioSeleccionado = usuarios[usuarioSeleccionado]._id;
    return usuarioSeleccionado;
}

// Ver Ordenes de un usuario con el boton de ver ordenes
function verOrdenes() {
    let usuario = cambiarUsuario();
    let aux = '';
    console.log('El id del usuario seleccionado es: ', idUsuarioSeleccionado)

    fetch(`http://localhost:3000/usuarios/${idUsuarioSeleccionado}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
    })
    .then((respuesta) => respuesta.json())
    .then((usuario) => {
        aux = usuario;
        console.log(aux);
        auxVerOrdener(aux);
    }); 
    
   
}

function auxVerOrdener(aux){
    console.log('usuario a mostrar', aux.nombre);

    // Header Modal
    document.querySelector('#modalUserLabel').innerHTML = `${aux.nombre} , Estas Son Tus Ordenes.`;
    // Zona de Productos
    
    document.querySelector('#zona-productos').innerHTML = '';
    for(let i=0;i<aux.ordenes.length;i++) {
        document.querySelector('#zona-productos').innerHTML += `
            <p>
                <h3 style="color: #563D7C; font-weight: bold;">${ aux.ordenes[i].nombreProducto }</h3>
            </p>
            <p style="font-size: 18px;">
                ${aux.ordenes[i].descripcion}
            </p>
            <p class="ml-auto">
                <b style="font-size: 25px">$${aux.ordenes[i].precio}</b>
            </p>
            <hr>
        `;
    }
}

// Ver info sobre categorias
function infoCategorias(idCategoria) {
    console.log('la categorias es:', idCategoria);

    document.getElementById('zona-categorias').innerHTML = ``;

    $('#modalCategorias').modal('show');
        //console.log(categorias[idCategoria].nombreCategoria);
        document.getElementById('header-categorias').innerHTML = `${ categorias[idCategoria].nombreCategoria }`;
        
        for(let i=0;i<empresas.length;i++) {
            if(categorias[idCategoria].empresas.includes(empresas[i].idEmpresa)){
                console.log('esta empresa esta incluido', empresas[i]);

                const productosPintar = empresas[i];
                let productos = '';

                for(let j=0;j<productosPintar.productos.length;j++) {
                    let aux = productosPintar.productos[j].nombreProducto;
                    
                    productos += `
                        <div class="row p-2">
                            <div class="col-lg-7">
                                <h4 style="color:#563D7C;">${ productosPintar.productos[j].nombreProducto }</h4>
                            </div>
                            <div class="col-lg-5">
                                <input type="button" class="btn btn-secondary" onclick="pedir('${ productosPintar.productos[j].nombreProducto}', '${ productosPintar.productos[j].descripcion }', ${ productosPintar.productos[j].precio} )" value="Pedir">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8">
                                <p>${ productosPintar.productos[j].descripcion }</p>
                            </div>
                            <div class="col-lg-4 ml-auto">
                                <b>${ productosPintar.productos[j].precio }</b>
                            </div>
                        </div>`;
                }
                
                document.getElementById('zona-categorias').innerHTML += `
                    <div class="col-lg-6 col-sm-12 mt-2">
                        <div class="card" style="border-radius:12px">
                            <section>
                                <img src="img/banner.jpg" class="img-fluid" style="border-radius: 12px"/>
                                <h3 style="color: #fff; font-weight:bolder;">${ idCategoria }</h3>
                            </section>
                            <section class="p-3">
                                ${ productos }
                            </section>
                        </div>
                    </div>
                `;

            }
        }
};

// Funcion para pedir orden a los usuarios
function pedir(nombreProducto ,descripcionProducto, precioProducto){
    // console.log(nombreProducto)
    // console.log(descripcionProducto)
    // console.log(precioProducto)
    $('#modalPedidos').modal('show');

    // var nombreProduct = categorias[idCategoria].empresas[idEmpresa].productos[idProducto].nombreProducto;
    // var description = categorias[idCategoria].empresas[idEmpresa].productos[idProducto].descripcion;
    // var valor = categorias[idCategoria].empresas[idEmpresa].productos[idProducto].precio;
    document.getElementById('zona-pedidos').innerHTML =`
        <h3>${nombreProducto}</h3><br>
        <p>${descripcionProducto}</p><br>
        <div class="row">
            <div class="col-lg-4">
                Cantidad A Solicitar : 
            </div>
            <div class="col-lg-8">
                <input type="text" class="form-control" id="txt-cantidad" />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-10 mr-auto">
                
            </div>
            <div class="col-lg-2"><br>
            <b>$ ${precioProducto}</b>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" onclick="agregarPedido('${nombreProducto}', '${descripcionProducto }', ${ precioProducto})" 
            class="btn btn-secondary">
            Procesar Orden</button>
        </div>
    `;
}

// Funcion para agregar un producto nuevo a un usuario 
function agregarPedido(nombreProduct,description,valor) {
    let cantidad = document.getElementById('txt-cantidad').value;

    console.log(cantidad);
    console.log(nombreProduct);
    console.log(description);
    console.log(valor);

    let orden =
        {
            nombreProducto:nombreProduct,
            descripcion: description,
            cantidad: cantidad,
            precio: valor
        };

        let aux = usuarios[usuarioSeleccionado]._id;

        fetch(`http://localhost:3000/usuarios/${aux}`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(orden)
          })
          .then((respuesta) => respuesta.json())
          .then((res) => {
            console.log(res);
          });

    $('#modalPedidos').modal('hide');
    $('#modalCategorias').modal('hide');
    
}

// creando una nueva categoria
function crearCategoria() {
    $('#modalPedidos').modal('hide');
    $('#modalCategorias').modal('hide');
    $('#modalCreacionCategoria').modal('show');

}

function guardar() {
    let txtnombre = document.getElementById('txt-nombre').value;
    let txtdescripcion = document.getElementById('txt-descripcion').value;
    let txtcolor = document.getElementById('txt-color').value;
    let txticono = document.getElementById('txt-icono').value;

    let categoria = 
    {
        nombreCategoria:txtnombre,
        descripcion:txtdescripcion,
        color:txtcolor,
        icono:txticono,
        empresas:[1, 5, 7] // estas son empresas  por defecto
    };

    fetch('http://localhost:3000/categorias', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(categoria)
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        datos => console.log(datos)
     })
    .catch(error => console.error(error)); 
    
    
    $('#modalPedidos').modal('hide');
    $('#modalCategorias').modal('hide');
    $('#modalCreacionCategoria').modal('hide');
    obtenerCategorias();

}