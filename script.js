/*
MANDARIN FLASHCARD
JAVASCRIPT

*/

let currentLevel = "A1";

let currentIndex = 0;

let currentWords = [];

/* ================= ELEMENT ================= */

const flashcard =
document.getElementById("flashcard");

const hanzi =
document.getElementById("hanzi");

const pinyin =
document.getElementById("pinyin");

const meaning =
document.getElementById("meaning");

const backWord =
document.getElementById("backWord");

const backPinyin =
document.getElementById("backPinyin");

const currentNumber =
document.getElementById("currentNumber");

const totalNumber =
document.getElementById("totalNumber");

const progressBar =
document.getElementById("progressBar");

const titleLevel =
document.getElementById("titleLevel");

const headerLevel =
document.getElementById("headerLevel");

const wordGrid =
document.getElementById("wordGrid");

const wordCount =
document.getElementById("wordCount");

/* ================= LOAD LEVEL ================= */

function loadLevel(level) {

currentLevel = level;

currentIndex = 0;

currentWords = [...(words[level] || [])];


/* update navigation */

document
    .querySelectorAll(".level-button")
    .forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.level === level
        );

    });


titleLevel.textContent = level;

headerLevel.textContent = level;


renderWordList();

showCard();


}

/* ================= SHOW CARD ================= */

function showCard() {

if (currentWords.length === 0) {

    hanzi.textContent = "—";

    pinyin.textContent = "";

    meaning.textContent =
        "Belum ada kosakata";

    backWord.textContent = "";

    backPinyin.textContent = "";

    currentNumber.textContent = "0";

    totalNumber.textContent = "0";

    progressBar.style.width = "0%";

    return;

}


const word =
    currentWords[currentIndex];


hanzi.textContent =
    word.hanzi;

pinyin.textContent =
    word.pinyin;

meaning.textContent =
    word.meaning;

backWord.textContent =
    word.hanzi;

backPinyin.textContent =
    word.pinyin;


currentNumber.textContent =
    currentIndex + 1;

totalNumber.textContent =
    currentWords.length;


const progress =
    ((currentIndex + 1)
    / currentWords.length) * 100;


progressBar.style.width =
    progress + "%";


flashcard.classList.remove("flipped");


updateSelectedWord();


}

/* ================= NEXT ================= */

function nextCard() {

if (currentWords.length === 0) {
    return;
}


currentIndex++;


if (
    currentIndex >=
    currentWords.length
) {

    currentIndex = 0;

}


showCard();


}

/* ================= PREVIOUS ================= */

function previousCard() {

if (currentWords.length === 0) {
    return;
}


currentIndex--;


if (currentIndex < 0) {

    currentIndex =
        currentWords.length - 1;

}


showCard();


}

/* ================= FLIP ================= */

function flipCard() {

if (currentWords.length === 0) {
    return;
}


flashcard.classList.toggle(
    "flipped"
);


}

/* ================= SHUFFLE ================= */

function shuffleCards() {

if (currentWords.length <= 1) {
    return;
}


/*
Fisher-Yates shuffle
*/

for (
    let i = currentWords.length - 1;
    i > 0;
    i--
) {

    const j =
        Math.floor(
            Math.random() * (i + 1)
        );


    [
        currentWords[i],
        currentWords[j]
    ] =
    [
        currentWords[j],
        currentWords[i]
    ];

}


currentIndex = 0;

showCard();

renderWordList();


}

/* ================= WORD LIST ================= */

function renderWordList() {

wordGrid.innerHTML = "";


if (currentWords.length === 0) {

    wordGrid.innerHTML = `

        <div class="empty">

            Belum ada kosakata
            untuk level ${currentLevel}.

        </div>

    `;

    wordCount.textContent =
        "0 kata";

    return;

}


wordCount.textContent =
    `${currentWords.length} kata`;


currentWords.forEach(
    (word, index) => {

        const item =
            document.createElement("div");


        item.className =
            "word-item";


        item.dataset.index =
            index;


        item.innerHTML = `

            <div class="word-hanzi">
                ${word.hanzi}
            </div>

            <div class="word-pinyin">
                ${word.pinyin}
            </div>

            <div class="word-meaning">
                ${word.meaning}
            </div>

        `;


        item.addEventListener(
            "click",
            () => {

                currentIndex = index;

                showCard();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        wordGrid.appendChild(item);

    }
);


updateSelectedWord();


}

/* ================= SELECTED WORD ================= */

function updateSelectedWord() {

document
    .querySelectorAll(".word-item")
    .forEach(item => {

        item.classList.toggle(
            "selected",
            Number(item.dataset.index)
            === currentIndex
        );

    });


}

/* ================= LEVEL BUTTON ================= */

document
.querySelectorAll(".level-button")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            loadLevel(
                button.dataset.level
            );

        }
    );

});


/* ================= CARD CLICK ================= */

flashcard.addEventListener(
"click",
flipCard
);

/* ================= NEXT BUTTON ================= */

document
.getElementById("nextButton")
.addEventListener(
"click",
nextCard
);

/* ================= PREVIOUS BUTTON ================= */

document
.getElementById("previousButton")
.addEventListener(
"click",
previousCard
);

/* ================= FLIP BUTTON ================= */

document
.getElementById("flipButton")
.addEventListener(
"click",
flipCard
);

/* ================= SHUFFLE BUTTON ================= */

document
.getElementById("shuffleButton")
.addEventListener(
"click",
shuffleCards
);

/* ================= KEYBOARD ================= */

document.addEventListener(
"keydown",
event => {

    /*
    Jangan menjalankan shortcut
    ketika user sedang mengetik.
    */

    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }


    if (
        event.key === "ArrowRight"
    ) {

        nextCard();

    }


    if (
        event.key === "ArrowLeft"
    ) {

        previousCard();

    }


    if (
        event.code === "Space"
    ) {

        event.preventDefault();

        flipCard();

    }

}


);

/* ================= START ================= */

loadLevel("A1");
