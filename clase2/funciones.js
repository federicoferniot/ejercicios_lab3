window.onload = cargar;

function cargar(){
	document.getElementById("btnSumar").addEventListener("click", sumar);
	var btnSumar = document.getElementById("btnSumarYGuardar");
	btnSumar.addEventListener("click", sumar);
	btnSumar.addEventListener("click", guardar);
}

function sumar(){

	var resultado = parseInt(document.getElementById("primerNumero").value) + 
					parseInt(document.getElementById("segundoNumero").value);
	document.getElementById("inpResultado").value = resultado;
	document.getElementById("lblMensajeSumador").text = "Ya puede ver el resultado.";
}

function guardar(){
	var num1 = document.getElementById("primerNumero").value;
	var num2 = document.getElementById("segundoNumero").value;
	var resultado = document.getElementById("inpResultado").value;

	var tabla = document.getElementById("tbodyResultado");
	tabla.innerHTML += "<tr><td>"+num1+"</td>"+"<td>"+num2+"</td>"+"<td>"+resultado+"</td></tr>";
}