'use strict';

addEventListener('DOMContentLoaded', loadTabla());

async function loadTabla(){
    // console.log('loading...');
    try {
        await fetch('txt/tablaDinamica.txt').then(response =>{
            response.text().then(text => {
                document.getElementById('mainContent').innerHTML = text;
            })
        })
        // console.log('fetch finished...')
        // llamarJson();
        let fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', 'js/tablaDinamica.js');
        document.getElementsByTagName('head')[0].appendChild(fileref);
    }
    catch (error){
        console.log(error)
    }
}

function loadFeed(){
    try {
        fetch('txt/feed.txt').then(response =>{
            response.text().then(text => {
                document.getElementById('mainContent').innerHTML = text;
            })
        })
    }
    catch (error){
        console.log(error)
    }
}

function loadTopMemes(){
    try {
        fetch('txt/topMemes.txt').then(response =>{
            response.text().then(text => {
                document.getElementById('mainContent').innerHTML = text;
            })
        })
        let fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', 'js/slides.js');
        document.getElementsByTagName('head')[0].appendChild(fileref);
    }
    catch (error){
        console.log(error)
    }
}

function loadRegister(){
    try {
        fetch('txt/register.txt').then(response =>{
            response.text().then(text => {
                document.getElementById('mainContent').innerHTML = text;
            })
        })
        let fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', 'js/captcha.js');
        document.getElementsByTagName('head')[0].appendChild(fileref);
    }
    catch (error){
        console.log(error)
    }
}