window.addEventListener("load", cargar);
var xml = new XMLHttpRequest();

function cargar(){
    document.getElementById("btnNewPost").addEventListener("click", newPost);
    document.getElementById("btnCerrar").addEventListener("click", cerrar);
    document.getElementById("btnPost").addEventListener("click", post)
}

function newPost(){
    var inpTitle = document.getElementById("inpPostTitle").value = "";
    var inpHeader = document.getElementById("inpPostHeader").value = "";
    var inpText = document.getElementById("inpPostText").value = "";
	document.getElementById("btnNewPost").hidden = true;
	document.getElementById("divNewPost").hidden = false;
}

function cerrar(){
	document.getElementById("btnNewPost").hidden = false;
	document.getElementById("divNewPost").hidden = true;
}

function post(){
    xml.onreadystatechange = callback;
    xml.open("POST", "http://localhost:1337/postearNuevaEntrada", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var inpTitle = document.getElementById("inpPostTitle");
    var inpHeader = document.getElementById("inpPostHeader");   
    var inpText = document.getElementById("inpPostText");
    var spinner = document.getElementById("spinner");
    var fondo = document.getElementById("fondo");
    if(inpTitle.value != "" && inpHeader.value != "" && inpText.value != ""){
        var datosPost = {
            title: inpTitle.value,
            header: inpHeader.value,
            posttext: inpText.value,
            author: "autor"
        }
        xml.send(JSON.stringify(datosPost));
        spinner.hidden = false;
        fondo.hidden = false;
        cerrar();
    }
}

function callback(){
    var spinner = document.getElementById("spinner");
    var fondo = document.getElementById("fondo");
    if(xml.readyState===4){
        if(xml.status===200){
            var respuesta = JSON.parse(xml.response);
            var posts = document.getElementById("divPosts");
            posts.innerHTML +=  "<h1>"+respuesta.title+"</h1>"+
                                "<p>"+respuesta.posttext+"</p>";
            spinner.hidden = true;
            fondo.hidden = true;
        }
        else
        {
            spinner.hidden = false;
            fondo.hidden = false;
        }
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}   

