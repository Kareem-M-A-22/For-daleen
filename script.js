"use strict";

/* ======================================================
   FOR DALEEN ❤️
   MAIN ENGINE
====================================================== */

const app = document.getElementById("app");

let currentPage = "";
let wrongPasswordCount = 0;
let typing = false;

/* ======================================================
   START
====================================================== */

window.addEventListener("DOMContentLoaded", () => {

    go("password");

});

/* ======================================================
   NAVIGATION
====================================================== */

function go(id){

    currentPage = id;

    const page = pages[id];

    if(!page){

        console.error("Page Not Found :",id);

        return;

    }

    render(page);

}

/* ======================================================
   CLEAR
====================================================== */

function clear(){

    app.innerHTML = "";

}

/* ======================================================
   CREATE
====================================================== */

function make(tag,className=""){

    const el = document.createElement(tag);

    if(className){

        el.className = className;

    }

    return el;

}

/* ======================================================
   RENDER
====================================================== */

function render(page){

    clear();

    if(page.type === "password"){

        renderPassword(page);

        return;

    }

    renderMessage(page);

}

/* ======================================================
   PASSWORD PAGE
====================================================== */

function renderPassword(page){

    const card = make("div","card");

    const title = make("h2","title");
    title.textContent = page.title;

    const input = make("input");
    input.type = "text";
    input.className = "password-input";
    input.placeholder = page.placeholder;

    const message = make("p","hint");

    const button = make("button","main-btn");
    button.textContent = page.button;

    button.onclick = ()=>{

        if(input.value === page.password){

            wrongPasswordCount = 0;

            go(page.next);

            return;

        }

        if(wrongPasswordCount < page.wrong.length){

            message.textContent = page.wrong[wrongPasswordCount];

        }else{

            message.textContent = page.wrong[page.wrong.length-1];

        }

        wrongPasswordCount++;

        input.focus();

    };

    card.appendChild(title);
    card.appendChild(input);
    card.appendChild(button);
    card.appendChild(message);

    app.appendChild(card);

}

/* ======================================================
   MESSAGE PAGE
====================================================== */

function renderMessage(page){

    const card = make("div","card");

    const text = make("p","message");

    const buttons = make("div","buttons");

    card.appendChild(text);

    card.appendChild(buttons);

    app.appendChild(card);

    typeWriter(

        text,

        page.text,

        ()=>{

            if(!page.buttons) return;

            page.buttons.forEach(btn=>{

                const button = make("button","main-btn");

                button.textContent = btn.text;

                button.onclick = ()=>{

                    go(btn.next);

                };

                buttons.appendChild(button);

            });

        }

    );

}

/* ======================================================
   TYPE WRITER
====================================================== */

function typeWriter(element,text,finish){

    element.textContent="";

    typing=true;

    let i=0;

    const timer=setInterval(()=>{

        element.textContent+=text.charAt(i);

        i++;

        if(i>=text.length){

            clearInterval(timer);

            typing=false;

            if(finish){

                finish();

            }

        }

    },28);

}

/* ======================================================
   UTILITIES
====================================================== */

function shake(element){

    element.classList.remove("shake");

    void element.offsetWidth;

    element.classList.add("shake");

}

/* ======================================================
   ENTER KEY SUPPORT
====================================================== */

document.addEventListener("keydown",(e)=>{

    if(currentPage!=="password") return;

    if(e.key!=="Enter") return;

    const btn=document.querySelector(".main-btn");

    if(btn){

        btn.click();

    }

});

/* ======================================================
   PRELOAD (Reserved For Future)
====================================================== */

function preload(){}

/* ======================================================
   END OF SCRIPT
====================================================== */
