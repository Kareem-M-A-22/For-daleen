// ===============================
// VARIABLES
// ===============================

const app = document.getElementById("app");

let currentPage = "password";

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


// ===============================
// GO TO PAGE
// ===============================

function goTo(pageName) {

    currentPage = pageName;

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

        buttons.appendChild(

            createButton(btn.text, () => {

                goTo(btn.next);

            })

        );

    });

    card.appendChild(buttons);

    app.appendChild(card);

}

