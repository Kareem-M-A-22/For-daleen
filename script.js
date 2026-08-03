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

function typeWriter(element, text, speed = 28) {

    element.innerHTML = "";

    let i = 0;

    function write() {

        if (i < text.length) {

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(write, speed);

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

    if(currentPage!==pageName){

        pageHistory.push(currentPage);

    }

    currentPage=pageName;

    renderPage();

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

    typeWriter(message, page.text);

    const buttons = document.createElement("div");
    buttons.className = "buttons";

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

    startMusic();

    const page = pages.ringPage;

    const card = createCard();

    const title = document.createElement("h2");
    title.className = "title";
    title.textContent = page.title;

    const box = document.createElement("div");
    box.className = "ring-box";
    box.innerHTML = "💍";

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

        buttons.appendChild(
            createButton(page.noButton, () => {

                goTo("ringNo");

            })
        );

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

renderPage();
