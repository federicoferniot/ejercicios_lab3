window.onload = cargar;
var xml = new XMLHttpRequest();

function cargar(){
	document.getElementById("btnEnviar").addEventListener("click", enviar);
}

function enviar(){
	var user = document.getElementById("inpUser");
	var pass = document.getElementById("inpPassword");
	//xml.open("GET", "http://localhost:3000/loginUsuario"+"?usr="+user.value+"&pass="+pass.value, true);
	xml.open("POST", "http://localhost:3000/loginUsuario", true);
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xml.onreadystatechange = callback;
	xml.send("usr="+user.value+"&pass="+pass.value);
}


function callback(){
	console.log("Llego respuesta del servido", xml.readyState, xml.status, xml.responseText);
	if(xml.readyState===4){
		if(xml.status===200){
			console.log("Llego respuesta del servido", xml.readyState, xml.status, xml.responseText);
		}else{
			alert("Error del servidor"+xml.status);
		}
	}
}