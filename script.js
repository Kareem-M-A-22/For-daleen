// ===============================
// VARIABLES
// ===============================

const app = document.getElementById("app");

let currentPage = "password";
let pageHistory = [];

let wrongPasswordCount = 0;

let musicStarted = false;

let bgMusic = null;


// ===============================
// HELPERS
// ===============================

function clearScreen() {

    app.innerHTML = "";

}

function createCard() {

    const card = document.createElement("div");

    card.className = "card";

    return card;

}


// ===============================
// TYPE WRITER
// ===============================

function typeWriter(element, text, speed = 28, callback = null){

    element.innerHTML = "";

    let i = 0;

    function write(){

        if(i < text.length){

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(write, speed);

        }else{

            if(callback){

                setTimeout(callback,300);

            }

        }

    }

    write();

}


// ===============================
// BUTTON
// ===============================

function createButton(text, callback) {

    const btn = document.createElement("button");

    btn.className = "main-btn";

    btn.textContent = text;

    btn.onclick = callback;

    return btn;

}

function goBack(){

    if(pageHistory.length===0)return;

    currentPage=pageHistory.pop();

    renderPage();

}

// ===============================
// GO TO PAGE
// ===============================

function goTo(pageName){

    const card = document.querySelector(".card");

    if(card){

        card.classList.add("hide");

        setTimeout(()=>{

            if(currentPage !== pageName){

                pageHistory.push(currentPage);

            }

            currentPage = pageName;

            renderPage();

        },350);

    }else{

        if(currentPage !== pageName){

            pageHistory.push(currentPage);

        }

        currentPage = pageName;

        renderPage();

    }

}
    
// ===============================
// RENDER PAGE
// ===============================

function renderPage() {

    clearScreen();

    const page = pages[currentPage];

    if (!page) return;

    switch (page.type) {

        case "password":
            renderPassword(page);
            break;

        case "message":
            renderMessage(page);
            break;

        case "ring":
            renderRing();
            break;

        case "ending":
            renderEnding();
            break;

    }

}


// ===============================
// PASSWORD PAGE
// ===============================

function renderPassword(page) {

    const card = createCard();

    const title = document.createElement("h2");
    title.className = "title";
    title.textContent = page.title;

    const input = document.createElement("input");
    input.className = "password-input";
    input.placeholder = page.placeholder;
    input.type = "password";

    const hint = document.createElement("div");
    hint.className = "hint";

    const button = createButton(page.button, () => {

        if (input.value === page.password) {

            wrongPasswordCount = 0;

            goTo(page.next);

        } else {

            card.classList.remove("shake");

            void card.offsetWidth;

            card.classList.add("shake");

            if (wrongPasswordCount < page.wrong.length) {

                hint.textContent = page.wrong[wrongPasswordCount];

            } else {

                hint.textContent = page.wrong[page.wrong.length - 1];

            }

            wrongPasswordCount++;

        }

    });

    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            button.click();

        }

    });

    card.appendChild(title);
    card.appendChild(input);
    card.appendChild(button);
    card.appendChild(hint);

    // تشغيل الموسيقى مع أول ضغطة في أي مكان
document.body.addEventListener("click", startMusic, { once: true });

    app.appendChild(card);

}


// ===============================
// MESSAGE PAGE
// ===============================

function renderMessage(page) {

    const card = createCard();

    const message = document.createElement("div");
    message.className = "message";

    card.appendChild(message);

  
    const buttons = document.createElement("div");
    buttons.className = "buttons";

    buttons.style.opacity = "0";
buttons.style.transform = "translateY(15px)";

typeWriter(message, page.text, 28, () => {

    buttons.style.transition = ".45s";

    buttons.style.opacity = "1";

    buttons.style.transform = "translateY(0)";

});

    page.buttons.forEach(btn => {

        const button = createButton(btn.text, () => {

            goTo(btn.next);

        });

        if(btn.wrong){

            button.classList.add("wrong-btn");

        }

        buttons.appendChild(button);

    });

    card.appendChild(buttons);

    if(currentPage !== "password"){

        const back = document.createElement("button");

        back.className = "back-btn";

        back.textContent = "رجعني أبص على حاجة";

        back.onclick = goBack;

        card.appendChild(back);

    }

    app.appendChild(card);

}
// ===============================
// MUSIC
// ===============================

function startMusic() {

    if (musicStarted) return;

    musicStarted = true;

    bgMusic = new Audio("assets/music.mp3");

    bgMusic.loop = true;

    bgMusic.volume = 0.35;

    bgMusic.play().catch(() => {});

}


// ===============================
// RING PAGE
// ===============================

function renderRing() {


    const page = pages.ringPage;

    const card = createCard();

    const title = document.createElement("h2");
    title.className = "title";
    title.textContent = page.title;

  const box = document.createElement("div");
box.className = "ring-box";

box.innerHTML = `
<svg class="ring-svg" viewBox="0 0 320 260">

<g class="lid">

<rect
x="40"
y="35"
width="240"
height="85"
rx="16"
fill="#ff6ea8"/>

</g>

<g class="base">

<rect
x="40"
y="110"
width="240"
height="100"
rx="18"
fill="#ff8fbd"/>

</g>

<g class="ring-group">

<circle
cx="160"
cy="120"
r="22"
fill="none"
stroke="#d6b14a"
stroke-width="8"/>

<polygon
points="160,78 150,98 170,98"
fill="#dff8ff"
stroke="#9fd7ff"
stroke-width="2"/>

</g>

</svg>
`;
    
    const message = document.createElement("div");
    message.className = "message";

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    box.onclick = () => {

       box.classList.add("opened");
        

        typeWriter(message, page.text);

        buttons.innerHTML = "";

        buttons.appendChild(
            createButton(page.yesButton, () => {

                goTo("ending");

            })
        );

       const noBtn = createButton(page.noButton, () => {

    goTo("ringNo");

});

noBtn.classList.add("wrong-btn");

buttons.appendChild(noBtn);

    };

    card.appendChild(title);
    card.appendChild(box);
    card.appendChild(message);
    card.appendChild(buttons);

    app.appendChild(card);

}


// ===============================
// ENDING PAGE
// ===============================

function renderEnding() {

    const card = createCard();

    const message = document.createElement("div");

    message.className = "message ending-text";

    typeWriter(message,

`أتمنى الهبل ده كله يكون فرحك، ومكنش طول زيادة أو رغيت، بس عايزك تعرفي إني بحبك أوي.

وأتمنى بعد ما تشوفيه، وأول حاجة تعمليها لما تخلصيه، إنك تتصلي بيا علشان أشوف رد فعلك كامل زي ما هو.

وخلي اللينك ده عندك، علشان ممكن أزود فيه حاجة بعدين.

❤️ بحبك ❤️`

);

    card.appendChild(message);

    app.appendChild(card);

}

// ===============================
// START
// ===============================

function createFloatingHearts(){

    const container = document.getElementById("hearts");

    if(!container) return;

    const shapes = ["🤍","🩷","💕","🎀","♡","✨"];

    setInterval(()=>{

        const item = document.createElement("div");

        item.className = "float-heart";

        item.innerHTML = shapes[Math.floor(Math.random()*shapes.length)];

        item.style.left = Math.random()*100 + "vw";

        item.style.fontSize = (18 + Math.random()*18) + "px";

        item.style.animationDuration = (10 + Math.random()*8) + "s";

        container.appendChild(item);

        setTimeout(()=>{
            item.remove();
        },18000);

    },500);

}

createFloatingHearts();

renderPage();

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
