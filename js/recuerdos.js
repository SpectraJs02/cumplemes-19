document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTOS
    ========================== */

    const photos = document.querySelectorAll(".memory-photo");

    const photoViewer = document.getElementById("photoViewer");
    const viewerImage = document.getElementById("viewerImage");
    const closeViewer = document.getElementById("closeViewer");


    /* =========================
       AMPLIAR FOTOS
    ========================== */

    photos.forEach((photo) => {

        const image = photo.querySelector("img");

        photo.addEventListener("click", (event) => {

            /*
             * Evitamos abrir accidentalmente
             * el visor si el usuario está haciendo
             * alguna interacción especial.
             */

            if (!image) {
                return;
            }

            viewerImage.src = image.src;
            viewerImage.alt = image.alt;

            photoViewer.classList.add("active");

        });

    });


    /* =========================
       CERRAR VISOR
    ========================== */

    function cerrarVisor() {

        photoViewer.classList.remove("active");

        setTimeout(() => {

            viewerImage.src = "";

        }, 300);

    }


    closeViewer.addEventListener("click", (event) => {

        event.stopPropagation();

        cerrarVisor();

    });


    photoViewer.addEventListener("click", (event) => {

        if (event.target === photoViewer) {

            cerrarVisor();

        }

    });


    /* =========================
       ESC PARA CERRAR
    ========================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            cerrarVisor();

        }

    });


    /* =========================
       MEOWL
    ========================== */

    function crearMeowl(x, y) {

        const meowl = document.createElement("img");

        meowl.src = "img/meowl.png";

        meowl.className = "meowl-effect";

        meowl.style.left = `${x}px`;
        meowl.style.top = `${y}px`;

        document.body.appendChild(meowl);


        setTimeout(() => {

            meowl.remove();

        }, 900);

    }


    /* =========================
       CLICK DEL MOUSE
    ========================== */

    document.addEventListener("click", (event) => {

        /*
         * No mostramos Meowl cuando se
         * hace clic en el visor oscuro
         * para que no moleste al ampliar
         * una fotografía.
         */

        if (
            event.target.closest(".photo-viewer") ||
            event.target.closest(".back-button")
        ) {
            return;
        }

        crearMeowl(event.clientX, event.clientY);

    });


    /* =========================
       TOQUE EN CELULAR
    ========================== */

    document.addEventListener(
        "touchstart",
        (event) => {

            if (!event.touches.length) {
                return;
            }

            if (
                event.target.closest(".photo-viewer") ||
                event.target.closest(".back-button")
            ) {
                return;
            }

            const touch = event.touches[0];

            crearMeowl(
                touch.clientX,
                touch.clientY
            );

        },
        {
            passive: true
        }
    );

});