

document.querySelector("#btn-agregar").addEventListener("click", agregar);
document.querySelector("#btn-agregarx3").addEventListener("click", agregarX3);
document.querySelector("#btn-reset").addEventListener("click", reset);

let pedidos = [];
let tabla = document.querySelector("#tabla_semanal_body");


function agregar() {
  let selectorDiaValue = document.querySelector("#select_dia").value;
  let selectorEntradaValue = document.querySelector("#select_entrada").value;
  let selectorPrincipalValue = document.querySelector("#select_plato").value;
  let selectorPostreValue = document.querySelector("#select_postre").value;

  let pedido = {
    dia: selectorDiaValue,
    entrada: selectorEntradaValue,
    principal: selectorPrincipalValue,
    postre: selectorPostreValue,
  };

  pedidos.push(pedido);
  agregarPOSTPedido(pedido);
  mostrarTabla(pedidos);
}

function reset() {
  pedidos = [];
  tabla.innerHTML = "";
}

function agregarX3() {
  agregar();
  agregar();
  agregar();
}

function mostrarTabla(pedidosParam) {
  tabla.innerHTML = "";
  for (const item of pedidosParam) {
    tabla.innerHTML += `<tr> 
                                <td>  ${item.dia} </td>
                                <td>  ${item.entrada} </td>
                                <td>  ${item.principal} </td>
                                <td>  ${item.postre} </td>
                                <td><input type="button" value="X" onclick="borrarFila(this)"></td>
                                <td><input type="button" value="Editar" onclick="editarFila(this)"></td>
                            </tr>`;
  }
}

function borrarFila(input) {
  let i = input.parentNode.parentNode.rowIndex;
  let pedidoAEliminar = pedidos[i-1];
  eliminarPOSTPedido(pedidoAEliminar);
  pedidos.splice(i-1,1);
  document.getElementById("tabla_semanal").deleteRow(i);
}


async function eliminarPOSTPedido(pedido) {
  const url = 'https://60c69fdb19aa1e001769f82d.mockapi.io/api/v1/pedidos/'+pedido.id; //ya actualize url
  try {
      let response = await fetch(url, {
        'method': 'DELETE'
      })
      
      if (response.ok){
        let responseJson = await response.json();
        console.log(responseJson);
      }
  } catch (error) {
      console.log(error);
  }
}


function editarFila(input) {
  if (input.value == "Editar"){
    input.value = "Guardar";
    let filas = input.parentNode.parentNode.querySelectorAll("td");
    for (const iterator of filas) {
      iterator.setAttribute('contenteditable','true');
    }
  }
  else
  {
    let filas = input.parentNode.parentNode.querySelectorAll("td");
    let i = input.parentNode.parentNode.rowIndex;

    let pedido = {
      id: pedidos[i-1].id,
      dia: filas[0].innerText,
      entrada: filas[1].innerText,
      principal: filas[2].innerText,
      postre: filas[3].innerText,
    };

    actualizarPUTPedido(pedido)
    input.value = "Editar";

    for (const iterator of filas) {
      iterator.setAttribute('contenteditable','false');
    }
  }
}


async function actualizarPUTPedido(pedido) {
  const url = 'https://60c69fdb19aa1e001769f82d.mockapi.io/api/v1/pedidos/'+pedido.id; //ya actualize url
  try {
        let response = await fetch(url, {
          'method': 'PUT',
          'headers': {
          'Content-Type': 'application/json'},
          'body': JSON.stringify(pedido)});
          
          if (response.ok){
            let responseJson = await response.json();
            console.log(responseJson);
          }

  } catch (error) {
      console.log(error);
  }
}

async function obtenerAllPedidos() {
    const url = 'https://60c69fdb19aa1e001769f82d.mockapi.io/api/v1/pedidos'; //ya actualize url
    try {
        let response = await fetch(url);

        if (response.ok){
          let pedidosResponse = await response.json();
          console.log(pedidosResponse);
          pedidos = pedidosResponse;
          mostrarTabla(pedidos);
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function agregarPOSTPedido(pedido) {
  const url = 'https://60c69fdb19aa1e001769f82d.mockapi.io/api/v1/pedidos'; //ya actualize url
  try {

        let response = await fetch(url, {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify(pedido)});
          
          if (response.ok){
            let responseJson = await response.json();
            console.log(responseJson);
          }
  } catch (error) {
      console.log(error);
  }
}



document.querySelector("#select_filtro_dia").addEventListener("change", function(){
    if(this.value != "Todos"){
      filtrarPorDia(this.value);
    }
    else{
      mostrarTabla(pedidos);
    }
});

function filtrarPorDia(filtroDia) {
    let pedidosFiltrado = [];
    for(const pedido of pedidos){
      if (pedido.dia == filtroDia)
      pedidosFiltrado.push(pedido);
    }

    mostrarTabla(pedidosFiltrado);
}

obtenerAllPedidos();
