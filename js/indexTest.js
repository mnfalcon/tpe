function loadContent(){
    try {
        // let file = new XMLHttpRequest();
        // file.onload = function (){
        // document.getElementById('content').innerHTML = this.responseText}
        // file.open('GET', 'indexTest.txt', true);
        // file.send();
        fetch('js/indexTest.txt').then(response =>{
            response.text().then(text => {
                document.getElementById('content').innerHTML = text;
            })
        })
    } 
    catch (error) {
        console.log(error);}
}

// let content = ` <article class="box-story">
// <section class="author-info">
//     <ul>
//         <li class = "author-name">Author: Cinderblock</li>
//         <li>Years of service: 23</li>
//         <li>Memes shared: lots</li>
        
//     </ul>
// </section>

// <section class="memes">
//     <div class = "meme-post">
//         <img src="img/equafass.jpg" alt="demon summoning ritual">
//     </div>

// </section>

// <section class="comments">
//     <div class = "comment-box-container">
//         <form action="" class="comment-box-container">
//             <input class="comment-box" type="text" placeholder = "Under Development..." onchange="commentPreview()">
//             <button class="comment-button" type="button">Send</button>
//         </form>
        
//     </div>
// </section>

// </article>

// <article class="box-story">
//     <section class="author-info">
//         <ul>
//             <li class = "author-name">Author: Joe</li>
//             <li>Years of service: 69</li>
//             <li>Memes shared: what's a meme?</li>
//             <li>This is a list item</li>
//             <li>This is another list item</li>                            <li>How many list items do I have to place?</li>
//         </ul>
       
//     </section>

//     <section class="memes">
//         <div class = "meme-post">
//             <img src="img/Hoodie_lizard.jpg" alt="lizard in a hoodie">
//         </div>

//     </section>

//     <section class="comments">
//         <div class="comment-box-container">
//             <form action="" class = "comment-box-container">
//                 <input class = "comment-box" type = "text" placeholder = "Under Development...">
//                 <button class = "comment-button" type = "button">Send </button>
//             </form>
            
//         </div>
//     </section>

// </article>

// <article class="box-story">
//     <section class="author-info">
//         <ul>
//             <li class = "author-name">Author: Joe</li>
//             <li>Years of service: 99</li>
//         </ul>
       
//     </section>

//     <section class="memes">
//         <div class = "meme-post">
//             <img src="img/seescucha.jpg" alt="it's a joke, profe">
//         </div>

//     </section>

//     <section class="comments">
//         <div class = "comment-box-container">
//             <form action="" class = "comment-box-container">
//                 <input class = "comment-box" type = "text" placeholder = "Under Development...">
//                 <button class = "comment-button" type = "button">Send </button>
//             </form>
            
//         </div>
//     </section>

// </article>

// </div>`;

// function loadContent(){
//     let elem = document.getElementById('content').innerHTML = content;
// }