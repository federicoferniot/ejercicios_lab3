window.addEventListener("load", cargar);
window.addEventListener("load", cargarPersonas);
var xml = new XMLHttpRequest();

function cargar(){
	document.getElementById("btnGuardar").addEventListener("click", guardar);
	document.getElementById("btnCerrar").addEventListener("click", cerrar);
	document.getElementById("btnAgregar").addEventListener("click", agregar);
}

function cargarPersonas(){
	if(localStorage.getItem("personas")==null){
		xml.onreadystatechange = callback;
		xml.open("GET", "http://localhost:3000/personas");
		xml.send();
	}else{
		cargarLista();
	}
}


function callback(){
	if(xml.readyState===4){
		if(xml.status===200){
			localStorage.setItem("personas", xml.response);
			cargarLista();
		}else{
			alert("Error del servidor"+xml.status);
		}
	}
}

function cargarLista(){
	array = JSON.parse(localStorage.getItem("personas"));
	for(var i=0; i < array.length; i++){
		agregarPersonaLista(array[i]);
	}
}

function agregarPersonaLista(persona){
	tbody = document.getElementById("tbodyPersonas");
	var tr = document.createElement("tr");
	var columns = Object.keys(persona);
	for(var j=0; j < columns.length; j++){
		var cel = document.createElement("td");
		cel.setAttribute("name", columns[j]);
		var text = document.createTextNode(persona[columns[j]]);
		cel.appendChild(text);
		tr.appendChild(cel);
	}
	var tdAccion = document.createElement("td");
	var aBorrar = document.createElement("a");
	var aModificar = document.createElement("a");
	var aAccionBorrarTexto = document.createTextNode("borrar");
	var aModificarTexto = document.createTextNode("/editar");
	aModificar.appendChild(aModificarTexto);
	aBorrar.appendChild(aAccionBorrarTexto);
	aBorrar.setAttribute("href", "#");
	aModificar.setAttribute("href", "#");
	aBorrar.addEventListener("click", borrar);
	aModificar.addEventListener("click", modificar);
	tdAccion.appendChild(aBorrar);
	tdAccion.appendChild(aModificar);
	tr.appendChild(tdAccion);
	tbody.appendChild(tr);
}

function guardar(){
	var nombre = document.getElementById("inpNombre");
	var apellido = document.getElementById("inpApellido");
	var telefono = document.getElementById("inpTelefono");
	var fecha = document.getElementById("inpFecha")

	if(nombre.value != "" && apellido.value != "" && telefono.value != "" && fecha.value != ""){
		persona = {
			"nombre": nombre.value,
			"apellido": apellido.value,
			"fecha": fecha.value.split("-").join("/"),
			"telefono": telefono.value
		};
		if(confirm("Desea guardar una persona?"))
		{
			agregarPersonaLista(persona);
			nombre.className= "sinError";
			apellido.className= "sinError";
			telefono.className= "sinError";

			agregarPersonaLocalStorage(persona);
		}
	}
	else{
		if(nombre.value==""){
			nombre.className = "conError";
		}else{
			nombre.className = "sinError";
		}
		if(apellido.value==""){
			apellido.className = "conError";
		}else{
			apellido.className = "sinError";
		}
		if(telefono.value==""){
			telefono.className = "conError";
		}else{
			telefono.className = "sinError";
		}
	}
}

function borrar(event){
	event.preventDefault();
	var elemento = event.target;
	var tr = elemento.parentNode.parentNode;
	var tds = tr.children;
	var persona = {};
	for(i=0; i< tds.length-1;i++){
		persona[tds[i].getAttribute("name")]=tds[i].innerHTML;
	}
	tr.parentNode.removeChild(tr);
	borrarPersonaLocalStorage(persona);
}

function modificar(event){
	document.getElementById("btnAgregar").hidden = true;
	document.getElementById("divAgregar").hidden = false;
	document.getElementById("btnGuardar").removeEventListener("click", guardar);
	document.getElementById("btnGuardar").addEventListener
}


function borrarPersonaLocalStorage(persona){
	listaPersonas = JSON.parse(localStorage.getItem("personas"));
	for(i=0;i<listaPersonas.length;i++){
		if(JSON.stringify(listaPersonas[i]) == JSON.stringify(persona)){
			listaPersonas.splice(i, 1);
			break;
		}
	}
	localStorage.setItem("personas", JSON.stringify(listaPersonas));
}

function agregarPersonaLocalStorage(persona){
	listaPersonas = JSON.parse(localStorage.getItem("personas"));
	listaPersonas.push(persona);
	localStorage.setItem("personas", JSON.stringify(listaPersonas));
}

function cerrar(){
	document.getElementById("btnAgregar").hidden = false;
	document.getElementById("divAgregar").hidden = true;
}

function agregar(){
	document.getElementById("btnAgregar").hidden = true;
	document.getElementById("divAgregar").hidden = false;
}
