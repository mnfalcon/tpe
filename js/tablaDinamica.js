"use strict";

let datos = [{"name": "Juan", "age": 22, "activity": "Meme Connoisseur", "likesMemes": "Yes"}]
let tabla = document.getElementById("tableBody");
let form = document.getElementById("formularioDeTabla");

function precargarFila(){
    
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let activity = document.getElementById("activity").value;
    let likes = document.getElementById("likesMemes").value;

    let display1 = document.getElementById("cellDisplay1");
    let display2 = document.getElementById("cellDisplay2");
    let display3 = document.getElementById("cellDisplay3");
    let display4 = document.getElementById("cellDisplay4");

    display1.innerHTML = name;
    display2.innerHTML = age;
    display3.innerHTML = activity;
    display4.innerHTML = likes;
}

function insertarFila(){
    let temp = {};
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value.parseInt();
    let activity = document.getElementById("activity").value;
    let likes = document.getElementById("likesMemes").value;

    temp.name = name;
    temp.age = age;
    temp.activity = activity;
    temp.likesMemes = likes;

    datos.push(temp);
    cargarFila(name, age, activity, likes);
    console.log(datos);

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("activity").value = "";
    document.getElementById("likesMemes").value = "";
}

function cargarFila(name, age, activity, likes){
    let fila = tabla.insertRow(-1);
    let celda0 = fila.insertCell(0);
    let celda1 = fila.insertCell(1);
    let celda2 = fila.insertCell(2);
    let celda3 = fila.insertCell(3);

    celda0.innerHTML = name;
    celda1.innerHTML = age;
    celda2.innerHTML = activity;
    celda3.innerHTML = likes;

}

function cargarTabla(){

    for(let i = 0; i < datos.length; i++){
        let fila = tabla.insertRow(-1);
        let celda0 = fila.insertCell(0);
        let celda1 = fila.insertCell(1);
        let celda2 = fila.insertCell(2);
        let celda3 = fila.insertCell(3);

        celda0.innerHTML = datos[i].name;
        celda1.innerHTML = datos[i].age;
        celda2.innerHTML = datos[i].activity;
        celda3.innerHTML = datos[i].likesMemes;
    }
}

function vaciarTabla(){
    datos = [];
    while(tabla.hasChildNodes()){
        tabla.removeChild(tabla.lastChild);
    }
}

function CargarElementosDePrueba(){
    let temp1 = {"name": "Jorge", "age": 7, "activity": "Fortnite Enthusiast", "likesMemes": "He's the meme"};
    let temp2 = {"name": "Raul", "age": 12, "activity": "Annoying Cat", "likesMemes": "No"};
    let temp3 = {"name": "Wanda", "age": 28, "activity": "Scarlet Witch", "likesMemes": "Probably"};

    datos.push(temp1);
    datos.push(temp2);
    datos.push(temp3);

    cargarTabla();
}

function AplicarFiltroFilas(){
    let filtro = parseInt(document.getElementById("filtroEdad").value);
    let filas = document.getElementsByTagName("tr");

    for(let i = 0; i < filas.length; i++){
        let td = filas[i].cells[1].innerHTML;
        let asd = parseInt(td);
        if (asd > filtro) {
            filas[i].style.backgroundColor = "goldenrod";
        }

    }
}