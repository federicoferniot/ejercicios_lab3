window.addEventListener("load", cargar);
window.addEventListener("load", cargarPersonas);
var xml = new XMLHttpRequest();

function cargar(){
	document.getElementById("btnGuardar").addEventListener("click", guardar);
	document.getElementById("btnCerrar").addEventListener("click", cerrar);
	document.getElementById("btnAgregar").addEventListener("click", agregar);
}

function cargarPersonas(){
	xml.onreadystatechange = callback;
	xml.open("GET", "http://localhost:3000/personas");
	xml.send();
}


function callback(){
	if(xml.readyState===4){
		if(xml.status===200){
			var array = JSON.parse(xml.response);
			tbody = document.getElementById("tbodyPersonas");
			for(var i=0; i < array.length; i++){
				/*
				tbody.innerHTML += 
				"<tr><td>"+array[i].nombre+"</td>"+
				"<td>"+array[i].apellido+"</td>"+
				"<td><a href=''>borrar</a></td><tr>";
				*/
				var tr = document.createElement("tr");
				var columns = Object.keys(array[i]);
				for(var j=0; j < columns.length; j++){
					var cel = document.createElement("td");
					var text = document.createTextNode(array[i][columns[j]]);
					cel.appendChild(text);
					tr.appendChild(cel);

				}
				/*
				var tdNombre = document.createElement("td");
				var tdNombreTexto = document.createTextNode(array[i].nombre);
				tdNombre.appendChild(tdNombreTexto);
				var tdApellido = document.createElement("td");
				var tdApellidoTexto = document.createTextNode(array[i].apellido);
				tdApellido.appendChild(tdApellidoTexto);
				var href = document.createAttribute("href");
				var onclick = document.createAttribute("onclick");
				tr.appendChild(tdNombre);
				tr.appendChild(tdApellido);
				*/
				var tdAccion = document.createElement("td");
				var aAccion = document.createElement("a");
				var aAccionTexto = document.createTextNode("borrar");
				aAccion.appendChild(aAccionTexto);
				aAccion.setAttribute("href", "");
				aAccion.addEventListener("click", borrar);
				tdAccion.appendChild(aAccion);
				tr.appendChild(tdAccion);
				tbody.appendChild(tr);
			}
		}else{
			alert("Error del servidor"+xml.status);
		}
	}
}

function guardar(){
	var nombre = document.getElementById("inpNombre");
	var apellido = document.getElementById("inpApellido");

	if(nombre.value != "" && apellido.value != ""){
		if(confirm("Desea guardar una persona?"))
		{
			tbody = document.getElementById("tbodyPersonas");
			var tr = document.createElement("tr");
			var tdNombre = document.createElement("td");
			var tdNombreTexto = document.createTextNode(nombre.value);
			tdNombre.appendChild(tdNombreTexto);
			var tdApellido = document.createElement("td");
			var tdApellidoTexto = document.createTextNode(apellido.value);
			tdApellido.appendChild(tdApellidoTexto);
			var tdAccion = document.createElement("td");
			var tdAccionText = document.createTextNode("borrar");
			tdAccion.appendChild(tdAccionText);
			tr.appendChild(tdNombre);
			tr.appendChild(tdApellido);
			tr.appendChild(tdAccion);
			tbody.appendChild(tr);
			/*
			tbody = document.getElementById("tbodyPersonas");
			tbody.innerHTML += 
			"<tr><td>"+nombre.value+"</td>"+
			"<td>"+apellido.value+"</td>"+
			"<td><a href=''>borrar</a></td><tr>";
			*/
			nombre.className= "sinError";
			apellido.className= "sinError";

		}
	}
	else{
		if(nombre==""){
			document.getElementById("inpNombre").className = "conError";
		}else{
			document.getElementById("inpNombre").className = "sinError";
		}
		if(apellido==""){
			document.getElementById("inpApellido").className = "conError";
		}else{
			document.getElementById("inpApellido").className = "sinError";
		}
	}
}

function borrar(event){
	event.preventDefault();
	var elemento = event.target;
	var tr = elemento.parentNode.parentNode;
	tr.parentNode.removeChild(tr);
}

function cerrar(){
	document.getElementById("btnAgregar").hidden = false;
	document.getElementById("divAgregar").hidden = true;
}

function agregar(){
	document.getElementById("btnAgregar").hidden = true;
	document.getElementById("divAgregar").hidden = false;
}