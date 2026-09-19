// =========================
// CONTENIDO DE LAS SECCIONES
// =========================

const sections = {
    historia: {
        title: "Nuestra historia juntos ♡",
        image: "img/historia.jpg",
        page: "historia.html"
    },

    canciones: {
        title: "Nuestras canciones ♫",
        image: "img/canciones.jpg",
        page: "canciones.html"
    },

    recuerdos: {
        title: "Nuestros recuerdos 📸",
        image: "img/recuerdos.jpg",
        page: "recuerdos.html"
    },

    diezCosas: {
        title: "Las 10 cosas que más amo de ti ♡",
        image: "img/10cosas.jpg",
        page: "cosas.html"
    },

    sorpresa: {
        title: "Sorpresa 🎁",
        image: "img/sorpresa.jpg",
        page: "sorpresa.html"
    },

    carta: {
        title: "Carta para ti 💌",
        image: "img/carta.jpg",
        page: "carta.html"
    },

    contador: {
        title: "Nuestro tiempo juntos ⏳",
        image: "img/contador.jpg",
        page: "contador.html"
    }
};


// =========================
// ELEMENTOS DEL DOM
// =========================

const contentModal = document.getElementById("contentModal");
const contentModalBody = document.getElementById("contentModalBody");
const closeContentModal = document.getElementById("closeContentModal");

const aboutModal = document.getElementById("aboutModal");
const closeAboutModal = document.getElementById("closeAboutModal");

const patitasModal = document.getElementById("patitasModal");
const closePatitasModal = document.getElementById("closePatitasModal");

const lockModal = document.getElementById("lockModal");
const closeLockModal = document.getElementById("closeLockModal");

const lockButton = document.getElementById("lockButton");
const lockTitle = document.getElementById("lockTitle");
const lockMessage = document.getElementById("lockMessage");
const puzzleContainer = document.getElementById("puzzleContainer");

const userButton = document.getElementById("userButton");
const aboutButton = document.getElementById("aboutButton");
const logoutButton = document.getElementById("logoutButton");
const patitasButton = document.getElementById("patitasButton");


// =========================
// CONFIGURACIÓN DEL PUZZLE
// =========================

const PUZZLE_COLS = 3;
const PUZZLE_ROWS = 3;
const PUZZLE_TOTAL = 9;

const puzzles = [
    {
        title: "MI FOTO FAVORITA DE TI",
        image: "img/puzzle1.jpg"
    },

    {
        title: "MI FOTO FAVORITA DE NOSOTROS",
        image: "img/puzzle2.jpg"
    },

    {
        title: "MI BEBE Y UN LINDO TOCINITO",
        image: "img/puzzle3.jpg"
    }
];

let currentPuzzleIndex = null;
let selectedPiece = null;


// =========================
// PROGRESO DE LAS SECCIONES
// =========================

const STORAGE_KEY = "viewedSections";

const allSections = Object.keys(sections);


function getViewedSections() {

    try {

        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return [];
        }

        const parsed = JSON.parse(stored);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.error("Error leyendo las secciones vistas:", error);

        return [];
    }
}


function markSectionAsViewed(section) {

    const viewed = getViewedSections();

    if (!viewed.includes(section)) {

        viewed.push(section);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(viewed)
        );
    }

    updateLockStatus();
}


function areAllSectionsViewed() {

    const viewed = getViewedSections();

    return allSections.every(
        section => viewed.includes(section)
    );
}


// =========================
// ACTUALIZAR CANDADO
// =========================

function updateLockStatus() {

    if (!lockButton) return;

    if (areAllSectionsViewed()) {

        lockButton.textContent = "🔓";

        lockButton.title =
            "Candado secreto desbloqueado";

    } else {

        lockButton.textContent = "🔒";

        lockButton.title =
            "Candado secreto";
    }
}


// =========================
// ABRIR SECCIÓN
// =========================

function openSection(section) {

    if (!sections[section]) return;

    markSectionAsViewed(section);

    const data = sections[section];

    if (contentModalBody) {

        contentModalBody.innerHTML = `
            <div class="content-modal-image">
                <img
                    src="${data.image}"
                    alt="${data.title}"
                >
            </div>

            <h2>${data.title}</h2>

            <p>
                Esta sección forma parte de nuestra historia
                y de todos esos pequeños momentos que hacen
                especial nuestro camino juntos ♡
            </p>

            <button
                type="button"
                class="modal-action-button"
                onclick="window.location.href='${data.page}'"
            >
                Abrir ♡
            </button>
        `;
    }

    if (contentModal) {
        contentModal.classList.add("show");
    }

    updateLockStatus();
}


// =========================
// BOTONES DE LAS TARJETAS
// =========================

document.querySelectorAll(".open-card-button").forEach(button => {

    button.addEventListener("click", function () {

        const section = this.dataset.section;

        if (section) {
            openSection(section);
        }
    });

});


// =========================
// BOTÓN USUARIO
// =========================

if (userButton) {

    userButton.addEventListener("click", function () {

        window.location.href = "usuario.html";

    });
}


// =========================
// MODAL ACERCA DE
// =========================

if (aboutButton) {

    aboutButton.addEventListener("click", function () {

        if (aboutModal) {
            aboutModal.classList.add("show");
        }

    });
}


if (closeAboutModal) {

    closeAboutModal.addEventListener("click", function () {

        if (aboutModal) {
            aboutModal.classList.remove("show");
        }

    });
}


// =========================
// MODAL PATITAS Y COLITAS
// =========================

if (patitasButton) {

    patitasButton.addEventListener("click", function () {

        if (patitasModal) {
            patitasModal.classList.add("show");
        }

    });
}


if (closePatitasModal) {

    closePatitasModal.addEventListener("click", function () {

        if (patitasModal) {
            patitasModal.classList.remove("show");
        }

    });
}


// =========================
// CERRAR MODAL DE CONTENIDO
// =========================

if (closeContentModal) {

    closeContentModal.addEventListener("click", function () {

        if (contentModal) {
            contentModal.classList.remove("show");
        }

    });
}


// =========================
// PUZZLES
// =========================

function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [result[i], result[randomIndex]] =
            [result[randomIndex], result[i]];
    }

    return result;
}


// =========================
// MOSTRAR LOS 3 PUZZLES
// =========================

function createPuzzleSelector() {

    if (!puzzleContainer) return;

    puzzleContainer.innerHTML = "";

    puzzleContainer.className =
        "puzzle-container puzzle-selector";


    puzzles.forEach((puzzle, index) => {

        const card = document.createElement("article");

        card.className = "puzzle-card";

        card.innerHTML = `
            <div class="puzzle-preview">

                <img
                    src="${puzzle.image}"
                    alt="${puzzle.title}"
                >

            </div>

            <h3>${puzzle.title}</h3>

            <p>Puzzle de 9 piezas ♡</p>

            <button
                type="button"
                class="puzzle-open-button"
            >
                Abrir puzzle ♡
            </button>
        `;


        const openButton =
            card.querySelector(".puzzle-open-button");


        openButton.addEventListener(
            "click",
            function () {

                openPuzzle(index);

            }
        );


        puzzleContainer.appendChild(card);

    });
}


// =========================
// ABRIR UN PUZZLE
// =========================

function openPuzzle(index) {

    if (!puzzles[index]) return;

    currentPuzzleIndex = index;

    selectedPiece = null;


    if (lockTitle) {

        lockTitle.textContent =
            puzzles[index].title;
    }


    if (lockMessage) {

        lockMessage.textContent =
            "Ordena las 9 piezas para descubrir la foto ♡";
    }


    if (!puzzleContainer) return;


    puzzleContainer.className =
        "puzzle-container";


    puzzleContainer.innerHTML = `

        <div class="puzzle-game">

            <div class="puzzle-game-header">

                <h3>
                    ${puzzles[index].title}
                </h3>

                <div
                    id="puzzleStatus"
                    class="puzzle-status"
                >
                    0 / 9 piezas correctas
                </div>

            </div>


            <div
                id="puzzleBoard"
                class="puzzle-board"
            ></div>


            <div class="puzzle-controls">

                <button
                    type="button"
                    id="backToPuzzles"
                    class="puzzle-control-button"
                >
                    ← Volver
                </button>


                <button
                    type="button"
                    id="resetPuzzle"
                    class="puzzle-control-button primary"
                >
                    Revolver piezas ↻
                </button>

            </div>


            <p class="puzzle-instruction">

                Toca o haz clic en dos piezas
                para intercambiarlas ♡

            </p>

        </div>
    `;


    const backButton =
        document.getElementById("backToPuzzles");


    const resetButton =
        document.getElementById("resetPuzzle");


    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

                showPuzzleSelector();

            }
        );
    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                buildPuzzleBoard();

            }
        );
    }


    buildPuzzleBoard();
}


// =========================
// VOLVER A LA SELECCIÓN
// =========================

function showPuzzleSelector() {

    currentPuzzleIndex = null;

    selectedPiece = null;


    if (lockTitle) {

        lockTitle.textContent =
            "🔓 Candado secreto desbloqueado";
    }


    if (lockMessage) {

        lockMessage.textContent =
            "¡Lo lograste! Ahora puedes descubrir los tres pequeños secretos que estaban escondidos aquí ♡";
    }


    createPuzzleSelector();
}


// =========================
// CREAR TABLERO 3 × 3
// =========================

function buildPuzzleBoard() {

    const board =
        document.getElementById("puzzleBoard");


    if (!board) return;


    board.innerHTML = "";

    selectedPiece = null;


    let order;


    do {

        order = shuffle(
            Array.from(
                { length: PUZZLE_TOTAL },
                (_, index) => index
            )
        );

    } while (
        order.every(
            (value, index) =>
                value === index
        )
    );


    order.forEach(pieceIndex => {

        const piece =
            document.createElement("button");


        piece.type = "button";

        piece.className =
            "puzzle-piece";


        piece.dataset.correctIndex =
            pieceIndex;


        const row =
            Math.floor(
                pieceIndex / PUZZLE_COLS
            );


        const col =
            pieceIndex % PUZZLE_COLS;


        piece.style.backgroundImage =
            `url("${puzzles[currentPuzzleIndex].image}")`;


        piece.style.backgroundSize =
            `${PUZZLE_COLS * 100}% ${PUZZLE_ROWS * 100}%`;


        piece.style.backgroundPosition =
            `${col * 100 / (PUZZLE_COLS - 1)}% ` +
            `${row * 100 / (PUZZLE_ROWS - 1)}%`;


        piece.addEventListener(
            "click",
            function () {

                handlePieceClick(piece);

            }
        );


        board.appendChild(piece);

    });


    updatePuzzleStatus();
}


// =========================
// SELECCIONAR / INTERCAMBIAR
// =========================

function handlePieceClick(piece) {

    const board =
        document.getElementById("puzzleBoard");


    if (!board) return;


    if (
        board.classList.contains("solved")
    ) {
        return;
    }


    // Primera pieza seleccionada

    if (!selectedPiece) {

        selectedPiece = piece;

        piece.classList.add("selected");

        return;
    }


    // Si toca la misma pieza

    if (selectedPiece === piece) {

        piece.classList.remove("selected");

        selectedPiece = null;

        return;
    }


    // Segunda pieza seleccionada

    swapPieces(
        selectedPiece,
        piece,
        board
    );


    selectedPiece.classList.remove(
        "selected"
    );


    selectedPiece = null;


    updatePuzzleStatus();


    if (isPuzzleSolved(board)) {

        completePuzzle();

    }
}


// =========================
// INTERCAMBIAR DOS PIEZAS
// =========================

function swapPieces(first, second, board) {

    const placeholder =
        document.createElement("div");


    const firstIndex =
        Array.from(board.children)
            .indexOf(first);


    const secondIndex =
        Array.from(board.children)
            .indexOf(second);


    if (
        firstIndex === -1 ||
        secondIndex === -1 ||
        firstIndex === secondIndex
    ) {
        return;
    }


    board.replaceChild(
        placeholder,
        first
    );


    board.replaceChild(
        first,
        second
    );


    board.replaceChild(
        second,
        placeholder
    );
}


// =========================
// CONTADOR DE PIEZAS CORRECTAS
// =========================

function updatePuzzleStatus() {

    const board =
        document.getElementById("puzzleBoard");


    const status =
        document.getElementById("puzzleStatus");


    if (!board || !status) return;


    const pieces =
        Array.from(board.children);


    let correct = 0;


    pieces.forEach(
        (piece, index) => {

            if (
                Number(
                    piece.dataset.correctIndex
                ) === index
            ) {

                correct++;

            }

        }
    );


    status.textContent =
        `${correct} / ${PUZZLE_TOTAL} piezas correctas`;
}


// =========================
// COMPROBAR PUZZLE
// =========================

function isPuzzleSolved(board) {

    const pieces =
        Array.from(board.children);


    return pieces.every(
        (piece, index) => {

            return Number(
                piece.dataset.correctIndex
            ) === index;

        }
    );
}


// =========================
// PUZZLE COMPLETADO
// =========================

function completePuzzle() {

    const board =
        document.getElementById("puzzleBoard");


    const status =
        document.getElementById("puzzleStatus");


    if (!board) return;


    board.classList.add("solved");


    board.querySelectorAll(
        ".puzzle-piece"
    ).forEach(piece => {

        piece.disabled = true;

    });


    if (status) {

        status.textContent =
            "✨ ¡Puzzle completado! 9 / 9 ♡";
    }


    if (lockMessage) {

        lockMessage.textContent =
            "¡Lo armaste completo! Sabía que podrías hacerlo ♡";
    }
}


// =========================
// CANDADO
// =========================

if (lockButton) {

    lockButton.addEventListener(
        "click",
        function () {

            if (!lockModal) return;


            lockModal.classList.add("show");


            if (areAllSectionsViewed()) {

                lockTitle.textContent =
                    "🔓 Candado secreto desbloqueado";


                lockMessage.textContent =
                    "¡Lo lograste! Ahora puedes descubrir los tres pequeños secretos que estaban escondidos aquí ♡";


                createPuzzleSelector();

            } else {

                lockTitle.textContent =
                    "🔒 Candado secreto";


                lockMessage.textContent =
                    "El candado solo se desbloquea después de haber visto todas las secciones. Todavía quedan algunos secretos por descubrir ♡";


                puzzleContainer.innerHTML = "";

            }

        }
    );
}


// =========================
// CERRAR CANDADO
// =========================

if (closeLockModal) {

    closeLockModal.addEventListener(
        "click",
        function () {

            if (lockModal) {

                lockModal.classList.remove(
                    "show"
                );

            }

        }
    );
}


// =========================
// CERRAR MODALES AL HACER
// CLICK FUERA
// =========================

window.addEventListener(
    "click",
    function (event) {

        if (
            event.target === contentModal
        ) {

            contentModal.classList.remove(
                "show"
            );
        }


        if (
            event.target === aboutModal
        ) {

            aboutModal.classList.remove(
                "show"
            );
        }


        if (
            event.target === patitasModal
        ) {

            patitasModal.classList.remove(
                "show"
            );
        }


        if (
            event.target === lockModal
        ) {

            lockModal.classList.remove(
                "show"
            );
        }

    }
);


// =========================
// TECLA ESC
// =========================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        if (contentModal) {

            contentModal.classList.remove(
                "show"
            );
        }


        if (aboutModal) {

            aboutModal.classList.remove(
                "show"
            );
        }


        if (patitasModal) {

            patitasModal.classList.remove(
                "show"
            );
        }


        if (lockModal) {

            lockModal.classList.remove(
                "show"
            );
        }

    }
);


// =========================
// LOGOUT
// =========================
// IMPORTANTE:
// Al cerrar sesión se elimina el progreso.
// Así, cada vez que vuelva a iniciar sesión,
// deberá ver nuevamente las 7 secciones.

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                STORAGE_KEY
            );

            window.location.href =
                "index.html";

        }
    );
}


// =========================
// EFECTO MEOWL
// =========================

function createMeowl(x, y) {

    const meowl =
        document.createElement("div");


    meowl.className =
        "click-meowl";


    meowl.textContent = "🐱";


    meowl.style.left =
        `${x}px`;


    meowl.style.top =
        `${y}px`;


    document.body.appendChild(meowl);


    setTimeout(
        function () {

            meowl.remove();

        },
        900
    );
}


// =========================
// MEOWL EN PC
// =========================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest(
                "button, input, a"
            )
        ) {
            return;
        }


        createMeowl(
            event.clientX,
            event.clientY
        );

    }
);


// =========================
// MEOWL EN CELULAR
// =========================

document.addEventListener(
    "touchstart",
    function (event) {

        if (!event.touches.length) {
            return;
        }


        if (
            event.target.closest(
                "button, input, a"
            )
        ) {
            return;
        }


        const touch =
            event.touches[0];


        createMeowl(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: true
    }
);


// =========================
// ESTADO INICIAL
// =========================

updateLockStatus();