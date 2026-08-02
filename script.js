/* ==========================================================
   FOR DALEEN ❤️
   SCRIPT.JS
   Part 1
==========================================================*/

"use strict";

/* ==========================================================
   Elements
==========================================================*/

const app = document.getElementById("app");


/* ==========================================================
   Global Variables
==========================================================*/

let currentPage = "";
let typing = false;
let typingSpeed = 28;


/* ==========================================================
   Helpers
==========================================================*/

function $(selector){
    return document.querySelector(selector);
}

function create(tag,className=""){

    const el=document.createElement(tag);

    if(className)
        el.className=className;

    return el;

}


/* ==========================================================
   Page Engine
==========================================================*/

function show(id){

    currentPage=id;

    const page=pages.find(p=>p.id===id);

    if(!page){
        console.error("Page not found:",id);
        return;
    }

    render(page);

}


/* ==========================================================
   Render Page
==========================================================*/

function render(page){

    app.innerHTML="";

    const card=create("div","page slideIn");

    const logo=create("div","logo");
    logo.textContent="🤍 D";

    const text=create("p");
    text.id="typing";

    const buttons=create("div","btns");

    card.appendChild(logo);
    card.appendChild(text);
    card.appendChild(buttons);

    app.appendChild(card);

    typeWriter(
        text,
        page.text,
        ()=>{

            createButtons(
                buttons,
                page.buttons
            );

        }
    );

}


/* ==========================================================
   Start
==========================================================*/

window.onload=()=>{

    show("welcome");

};
