window.addEventListener("load", cargar);
var xml = new XMLHttpRequest();

function cargar(){
    document.getElementById("btnSignIn").addEventListener("click", signIn);
    document.getElementById("btnNewPost").addEventListener("click", newPost);
}

function signIn(){
    xml.onreadystatechange = callback;
    xml.open("POST", "http://localhost:1337/login", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var inpEmail = document.getElementById("inpEmail");
    var inpPassword = document.getElementById("inpPass");
    if(inpEmail.value != "" && inpPassword.value != ""){
        var datosLogin = {
            email : inpEmail.value,
            password : inpPassword.value
        };
        xml.send(JSON.stringify(datosLogin));
    }
}


function callback(){
    if(xml.readyState===4){
        if(xml.status===200){
            var respuesta = JSON.parse(xml.response);
            if(respuesta.autenticado=="si"){
                var pcolor = respuesta.preferencias.color;
                var pfont = respuesta.preferencias.font;
                var email = document.getElementById("inpEmail").value;
                window.location.replace("index.html?color="+pcolor+"&font="+pfont+"&email="+email);
            }
        }else{
            alert("Error del servidor"+xml.status);
        }
    }
}
