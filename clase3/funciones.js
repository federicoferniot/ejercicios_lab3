window.onload = cargar;

function cargar(){
	document.getElementById("btnGuardar").addEventListener("click", guardar);
	document.getElementById("btnCerrar").addEventListener("click", cerrar);
	document.getElementById("btnAgregar").addEventListener("click", agregar);
}

function guardar(){
	var nombre = document.getElementById("inpNombre");
	var apellido = document.getElementById("inpApellido");

	if(nombre.value != "" && apellido.value != ""){
		if(confirm("Desea guardar una persona?"))
		{
			tbody = document.getElementById("tbodyPersonas");
			tbody.innerHTML += 
			"<tr><td>"+nombre.value+"</td>"+
			"<td>"+apellido.value+"</td>"+
			"<td><a href=''>borrar</a></td><tr>";
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

function cerrar(){
	document.getElementById("btnAgregar").hidden = false;
	document.getElementById("divAgregar").hidden = true;
}

function agregar(){
	document.getElementById("btnAgregar").hidden = true;
	document.getElementById("divAgregar").hidden = false;
}