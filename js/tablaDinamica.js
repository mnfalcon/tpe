"use strict";

// document.getElementById('btnTabla').addEventListener('onclick', llamarJson());
// llamarJson();
let currentPage = 1;
Anterior();

async function llamarJson(){
    // console.log('calling json...');
    try {
        vaciarTabla();
        let obj = await fetch('https://60d7a6e6307c300017a5f938.mockapi.io/memes1/memers');
        let data = await obj.json();
        console.log(data);
        cargarTabla(data);
        console.log('MockApi called. All in one page.');
    } catch (error){
        console.log(error);
    }

}

function precargarFila(){
     
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let activity = document.getElementById("activity").value;
    // let likes = document.getElementById("likesMemes").value;
    let likes = document.getElementById("likesMemesYes").checked;

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
    let age = document.getElementById("age").value;
    let activity = document.getElementById("activity").value;
    let likes = document.getElementById("likesMemesYes").checked;

    temp.name = name;
    temp.age = age;
    temp.activity = activity;
    temp.likesMemes = likes;

    postData(temp);
    //Falta recargar la pagina. Ver si usar ajax para esto.
}

async function postData(datos){
    try {
        let url = 'https://60d7a6e6307c300017a5f938.mockapi.io/memes1/memers'
        let obj = await fetch(url);
        let data = await obj.json();
        let id = parseInt(data[data.length -1].id);
        id++;
        datos.id = id.toString();
        let res = await fetch(url, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/JSON'
            },
            'body': JSON.stringify(datos)
        })
        if (res.status == 201){
            console.log('POST Method was successful.')
            // vaciarTabla();
            cargarTablaParcial();
            vaciarInputs();
        }
    } catch (error){
        console.log(error)
    }
}

function vaciarInputs(){
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("activity").value = "";
    // document.getElementById("likesMemes").value = "";

    let display1 = document.getElementById("cellDisplay1");
    let display2 = document.getElementById("cellDisplay2");
    let display3 = document.getElementById("cellDisplay3");
    let display4 = document.getElementById("cellDisplay4");
    display1.innerHTML = '';
    display2.innerHTML = '';
    display3.innerHTML = '';
    display4.innerHTML = '';
}


function cargarFila(name, age, activity, likes, id){
    let tabla = document.getElementById("tableBody");

    let fila = tabla.insertRow(-1);
    let celda0 = fila.insertCell(0);
    let celda1 = fila.insertCell(1);
    let celda2 = fila.insertCell(2);
    let celda3 = fila.insertCell(3);
    let celda4 = fila.insertCell(4);
    let celda5 = fila.insertCell(5);
    let rowID = 'row' + id.toString();
    fila.id = rowID;
    let pos = parseInt(id) -1;

    celda0.innerHTML = name;
    celda1.innerHTML = age;
    celda2.innerHTML = activity;
    celda3.innerHTML = likes;
    celda4.innerHTML = `<button class="btn-edit" onclick="eliminarDato(${pos})" id="${rowID}">Eliminar</button>`;
    celda5.innerHTML = `<button class="btn-edit" onclick="editarDato(${pos})">Editar</button>`;
}

function cargarTabla(datos){
    for(let i = 0; i < datos.length; i++){
        cargarFila(datos[i].name, datos[i].age, datos[i].activity, datos[i].likesMemes, datos[i].id);
    }
}

async function cargarTablaParcial(){
    try {
        let url = 'https://60d7a6e6307c300017a5f938.mockapi.io/memes1/memers'
        let obj = await fetch(url);
        let datos = await obj.json();
        for(let i = 0; i < datos.length; i++){
            let idTemp = 'row' + datos[i].id;
            let elem = document.getElementById(idTemp);
            if (elem == null){
                cargarFila(datos[i].name, datos[i].age, datos[i].activity, datos[i].likesMemes, datos[i].id);    
            }
        }
    } catch (error){
        console.log(error)
    }
}

function getRowId(pos){
    let tabla = document.getElementById("tableBody");
    let filas = tabla.rows;
    let idTemp = 'row' + (pos + 1).toString();
    for(let i = 0; i < filas.length; i++){
        if (filas[i].id == idTemp){
            return i;
        }
    }
}

async function eliminarDato(pos){
    let tabla = document.getElementById("tableBody").deleteRow(getRowId(pos));
    try {
        let url = 'https://60d7a6e6307c300017a5f938.mockapi.io/memes1/memers'
        let id = pos + 1;
        let res = await fetch(`${url}/${id}`, {
            'method': 'DELETE',
            'headers': {
                'Content-Type': 'application/JSON'
            }
        })
        if (res.status == 200){
            console.log('DELETE Method was successful.')
        }
    } catch (error){
        console.log(error);
    }   
}

async function editarDato(pos){
    try {
        let url = 'https://60d7a6e6307c300017a5f938.mockapi.io/memes1/memers'
        let dato = {};
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let activity = document.getElementById("activity").value;
        let likes = document.getElementById("likesMemesYes").checked;
        let id = pos+1;
        let rowId = 'row' + id.toString();
        if (name != ''){
            dato.name = name;
        }
        if (age != ''){
            dato.age = age;
        }
        if (activity != ''){
            dato.activity = activity;
        }
        if (likes != ''){
            dato.likes = likes;
        }
        let res = await fetch(`${url}/${id}`, {
            'method': 'PUT',
            'headers': {
                'Content-Type': 'application/JSON'
            },
            'body': JSON.stringify(dato)
        })
        if (res.status == 200){
            console.log('PUT Method was successful.')
            // vaciarTabla();
            // llamarJson();
            if (name != ''){
                dato.name = name;
                document.getElementById(rowId).cells[0].innerHTML = name;
            }
            if (age != ''){
                dato.age = age;
                document.getElementById(rowId).cells[1].innerHTML = age;
            }
            if (activity != ''){
                dato.activity = activity;
                document.getElementById(rowId).cells[2].innerHTML = activity;
            }
            if (likes != ''){
                dato.likes = likes;
                document.getElementById(rowId).cells[3].innerHTML = likes;
            }
            vaciarInputs();
        }
    } catch (error){
        console.log(error)
    }
}

function vaciarTabla(){
    let tabla = document.getElementById("tableBody");
    //Ver si eliminar datos del mockapi o no. Ver si se pueden generar desde acá con otra funcion
    while(tabla.hasChildNodes()){
        tabla.removeChild(tabla.lastChild);
    }
    vaciarInputs();
}

function CargarTres(){
    insertarFila();
    insertarFila();
    insertarFila();
}

function AplicarFiltroFilas(){
    let filtroEdad = parseInt(document.getElementById("filtroEdad").value);
    let filas = document.getElementsByTagName("tr");
    for(let i = 0; i < filas.length; i++){
        filas[i].style.backgroundColor = "inherit"; //Devuelve el color original a las celdas
        let td = filas[i].cells[1].innerHTML;
        let numeroEnLaCelda = parseInt(td);
        if (numeroEnLaCelda > filtroEdad) {
            filas[i].style.backgroundColor = "goldenrod";
        }
    }
}

function bFiltroNombre(fila){
    let filtroNombre = document.getElementById('filtroNombreTabla').value.toLowerCase();
    if(fila.cells[0].innerHTML.toLowerCase().includes(filtroNombre) || filtroNombre == ''){
        return true;
    }
    else {
        return false;
    }
}

function bFiltroEdad(fila){
    let filtroEdad = document.getElementById('filtroEdadTabla').value;
    let tdEdad = fila.cells[1].innerHTML;
    let numeroEnLaCelda = parseInt(tdEdad);
    if((numeroEnLaCelda >= parseInt(filtroEdad)) || (filtroEdad == '')){
        return true;
    }
    else {
        return false;
    }
}

function bFiltroActividad(fila){
    let filtroActividad = document.getElementById('filtroActividadTabla').value.toLowerCase();
    if (fila.cells[2].innerHTML.toLowerCase().includes(filtroActividad) || filtroActividad == ''){
        return true;
    }
    else {
        return false;
    }
}

function bFiltroLikesYes(fila){
    let filtroLikesYes = document.getElementById("filtroLikesTablaYes").checked;
    let tdLikes = fila.cells[3].innerHTML;
    if ((tdLikes == filtroLikesYes.toString())){
        return true;
    }
    else {
        return false;
    }
}

function bFiltroLikesNo(fila){
    let filtroLikesNo = document.getElementById('filtroLikesTablaNo').checked;
    let tdLikes = fila.cells[3].innerHTML;
    if ((tdLikes == filtroLikesNo.toString())){
        return true;
    }
    else {
        return false;
    }
}

function bFiltroLikesAll(){
    return document.getElementById('filtroLikesTablaAll').checked;
}

function filtrosSimultaneos(){
    // let filas = document.getElementsByTagName("tr");
    let tabla = document.getElementById('tableBody');
    let filas = tabla.rows;
    for(let i = 0; i < filas.length; i++){
        if((bFiltroNombre(filas[i])) && (bFiltroEdad(filas[i])) && (bFiltroActividad(filas[i])) && (filas[i].id != "trHeader") && (filas[i].id != "trInputHeader") && (filas[i].id != "tableFoot")){
            if((bFiltroLikesYes(filas[i])) && !((bFiltroLikesNo(filas[i])) && (bFiltroLikesAll()))){
                filas[i].style.display = 'table-row';
            }
            else if(bFiltroLikesAll()){
                filas[i].style.display = 'table-row';
            }
            else {
                filas[i].style.display = 'none';
            }
        }
        else {
            filas[i].style.display = 'none';
        }
    }
}

function filtrarPorLikesYes(){
    let filas = document.getElementsByTagName("tr");
    let filtroLikesYes = document.getElementById("filtroLikesTablaYes").checked;
    for(let i = 0; i < filas.length; i++){
        let tdLikes = filas[i].cells[3].innerHTML;
        filas[i].style.display = "table-row";
        if ((tdLikes != filtroLikesYes.toString()) && (filas[i].id != "trHeader") && (filas[i].id != "trInputHeader") && (filas[i].id != "tableFoot")){
            filas[i].style.display = "none";
        }
        else {
            filas[i].style.display = "table-row";
        }
    }
}
function filtrarPorLikesNo(){
    let filas = document.getElementsByTagName("tr");
    let filtroLikesNo = document.getElementById("filtroLikesTablaYes").checked;
    for(let i = 0; i < filas.length; i++){
        let tdLikes = filas[i].cells[3].innerHTML;
        filas[i].style.display = "table-row";
        if ((tdLikes != filtroLikesNo.toString()) && (filas[i].id != "trHeader") && (filas[i].id != "trInputHeader") && (filas[i].id != "tableFoot")){
            filas[i].style.display = "none";
        }
        else {
            filas[i].style.display = "table-row";
        }
    }
}

function filtrarAll(){
    let filas = document.getElementsByTagName("tr");
    for(let i = 0; i < filas.length; i++){
        filas[i].style.display = "table-row";
    }
}

function QuitarFiltroFilas(){
    let filas = document.getElementsByTagName("tr");
    for(let i = 0; i < filas.length; i++){
        filas[i].style.backgroundColor = "inherit";
        filas[i].style.display = "table-row";
    }
    vaciarFiltros();
}

function vaciarFiltros(){
    document.getElementById("filtroNombreTabla").value = "";
    document.getElementById("filtroEdadTabla").value = "";
    document.getElementById("filtroActividadTabla").value = "";
    document.getElementById("filtroLikesTablaYes").checked = false;
    document.getElementById("filtroLikesTablaNo").checked = false;
}

// document.getElementById('btnAnterior').addEventListener('onclick', Anterior());
// document.getElementById('btnSiguiente').addEventListener('onclick', Siguiente());



async function Anterior(){
    try {
        vaciarTabla();
        if(currentPage != 1){
            --currentPage;
        }
        let url = `https://60d7a6e6307c300017a5f938.mockapi.io/memes1/memers?page=${currentPage}&limit=20`;
        console.log(url);
        let obj = await fetch(url);
        let data = await obj.json();
        let half = parseInt(data.length/2);
        console.log(data/*.slice(0, half)*/);
        cargarTabla(data/*.slice(0, half)*/);
        console.log('MockApi called. Page: ' + currentPage);
    } catch (error){
        console.log(error);
    }
}

async function Siguiente(){
    try {
        vaciarTabla();
        ++currentPage;
        let url = `https://60d7a6e6307c300017a5f938.mockapi.io/memes1/memers?page=${currentPage}&limit=20`;
        console.log(url);
        let obj = await fetch(url);
        let data = await obj.json();
        let half = parseInt(data.length/2);
        console.log(data/*.slice(half)*/);
        cargarTabla(data/*.slice(half)*/);
        console.log('MockApi called. Page: ' + currentPage);
    } catch (error){
        console.log(error);
    }
}