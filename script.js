/* ==========================================================
   FOR DALEEN ❤️
   SCRIPT.JS
   Main Engine
==========================================================*/

"use strict";

/* ==========================================================
   Elements
==========================================================*/

const app = document.getElementById("app");


/* ==========================================================
   Global
==========================================================*/

let currentPage = null;
let typing = false;
let typingSpeed = 28;
let historyStack = [];


/* ==========================================================
   Helpers
==========================================================*/

function create(tag, className = "") {

    const el = document.createElement(tag);

    if (className)
        el.className = className;

    return el;

}

function clearApp() {

    app.innerHTML = "";

}


/* ==========================================================
   Start
==========================================================*/

window.addEventListener("load", () => {

    showPage("password");

});
