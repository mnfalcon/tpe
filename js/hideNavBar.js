let btn = document.getElementsByClassName("toggleNavBar")[0];

btn.addEventListener('click', toggleNavBar);

function toggleNavBar(){
    let navBar = document.getElementsByClassName("nav-bar")[0];

    if (navBar.style.display != "none"){
        navBar.style.display = "none";
        btn.innerText = "ᐯ Show Nav Bar ᐯ"
    }
    else {
        navBar.style.display = "flex";
        btn.innerText = "ᐱ Hide Nav Bar ᐱ";
    }
}