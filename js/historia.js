/* ==========================================
   NUESTRA HISTORIA
========================================== */


/* ==========================================
   VOLVER A HOME
========================================== */

const backButton = document.getElementById("backButton");
const backButtonBottom = document.getElementById("backButtonBottom");

function volverHome() {
    window.location.href = "home.html";
}

if (backButton) {
    backButton.addEventListener("click", volverHome);
}

if (backButtonBottom) {
    backButtonBottom.addEventListener("click", volverHome);
}


/* ==========================================
   MODAL DE RECUERDOS
========================================== */

const storyModal = document.getElementById("storyModal");
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalDate = document.getElementById("modalDate");
const modalTitle = document.getElementById("modalTitle");
const modalStory = document.getElementById("modalStory");

const memoryButtons =
    document.querySelectorAll(".read-memory");


memoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card =
            button.closest(".memory-card");

        if (!card) return;


        const image =
            card.querySelector(".memory-image img");

        const date =
            card.querySelector(".memory-date");

        const title =
            card.querySelector("h2");

        const story =
            card.querySelector(".full-story");


        if (image) {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
        }


        if (date) {
            modalDate.textContent =
                date.textContent.trim();
        }


        if (title) {
            modalTitle.textContent =
                title.textContent.trim();
        }


        if (story) {
            modalStory.innerHTML =
                story.innerHTML;
        }


        storyModal.classList.add("show");

        document.body.style.overflow = "hidden";
    });

});


/* ==========================================
   CERRAR MODAL
========================================== */

function cerrarModal() {

    storyModal.classList.remove("show");

    document.body.style.overflow = "";
}


if (closeModal) {
    closeModal.addEventListener(
        "click",
        cerrarModal
    );
}


if (modalOverlay) {
    modalOverlay.addEventListener(
        "click",
        cerrarModal
    );
}


/* ==========================================
   ESC PARA CERRAR
========================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                storyModal.classList.contains("show")
            ) {
                cerrarModal();
            }

        }

    }
);


/* ==========================================
   MEOWL
========================================== */

/*
   IMPORTANTE:

   Cuando tengas una imagen real de Meowl,
   cambia esta ruta:

   img/meowl.png

   por el nombre exacto de tu archivo.
*/

function crearMeowl(x, y) {

    const container =
        document.getElementById("meowl-container");

    if (!container) return;


    const meowl =
        document.createElement("img");

    meowl.className = "meowl";

    meowl.src = "img/meowl.png";

    meowl.alt = "";

    meowl.style.left =
        `${x}px`;

    meowl.style.top =
        `${y}px`;


    container.appendChild(meowl);


    setTimeout(() => {

        meowl.remove();

    }, 900);
}


/* ==========================================
   CLIC DESKTOP
========================================== */

document.addEventListener(
    "click",
    function (event) {

        /*
           No hacemos aparecer Meowl encima
           de botones del modal para no molestar
           la interacción.
        */

        if (
            event.target.closest(".story-modal")
        ) {
            return;
        }


        if (
            event.target.closest("button")
        ) {
            return;
        }


        crearMeowl(
            event.clientX,
            event.clientY
        );

    }
);


/* ==========================================
   TOUCH MOBILE
========================================== */

document.addEventListener(
    "touchstart",
    function (event) {

        if (!event.touches.length) {
            return;
        }


        if (
            event.target.closest(".story-modal")
        ) {
            return;
        }


        if (
            event.target.closest("button")
        ) {
            return;
        }


        const touch =
            event.touches[0];


        crearMeowl(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: true
    }
);


/* ==========================================
   MARCAR HISTORIA COMO VISTA
========================================== */

try {

    let viewedSections =
        JSON.parse(
            localStorage.getItem("viewedSections")
        ) || [];


    if (
        !viewedSections.includes("historia")
    ) {

        viewedSections.push("historia");

        localStorage.setItem(
            "viewedSections",
            JSON.stringify(viewedSections)
        );

    }

} catch (error) {

    console.log(
        "No se pudo guardar el progreso:",
        error
    );

}