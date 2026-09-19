/* =========================================================
   ELEMENTOS
========================================================= */

const linkStartScreen =
    document.getElementById("link-start-screen");

const saoIntro =
    document.getElementById("sao-intro");

const saoVideo =
    document.getElementById("saoVideo");

const saoContent =
    document.getElementById("sao-content");

const meowlContainer =
    document.getElementById("meowl-container");


/* =========================================================
   LINK START
========================================================= */

function iniciarSao() {

    /*
        Evitamos que LINK START
        pueda pulsarse varias veces.
    */

    linkStartScreen.classList.add("hide");


    /*
        Mostramos el video.
    */

    saoIntro.classList.add("show");


    /*
        Reproducimos el video
        con su audio original.
    */

    saoVideo.muted = false;

    saoVideo.volume = 1;

    const reproduccion =
        saoVideo.play();


    /*
        Si el navegador devuelve
        una promesa, esperamos a que
        comience correctamente.
    */

    if (reproduccion !== undefined) {

        reproduccion.catch(() => {

            /*
                Si por alguna razón el navegador
                bloquea el audio, dejamos el video
                visible para que pueda reproducirse.
            */

            saoVideo.muted = false;

            saoVideo.play();

        });

    }

}


/* =========================================================
   CLICK EN LINK START
========================================================= */

linkStartScreen.addEventListener(
    "click",
    iniciarSao
);


/* =========================================================
   TOUCH EN LINK START
========================================================= */

linkStartScreen.addEventListener(
    "touchstart",
    iniciarSao,
    {
        passive: true
    }
);


/* =========================================================
   CUANDO TERMINA EL VIDEO
========================================================= */

saoVideo.addEventListener(
    "ended",
    () => {

        /*
            Primero desaparece el video.
        */

        saoIntro.classList.remove("show");


        /*
            Después aparece Aincrad.
        */

        setTimeout(() => {

            saoContent.classList.add("show");

        }, 500);

    }
);


/* =========================================================
   MEOWL
========================================================= */

function crearMeowl(x, y) {

    const meowl =
        document.createElement("img");


    meowl.src =
        "img/meowl.png";


    meowl.className =
        "meowl-click";


    meowl.style.left =
        `${x}px`;


    meowl.style.top =
        `${y}px`;


    meowlContainer.appendChild(
        meowl
    );


    setTimeout(() => {

        meowl.remove();

    }, 900);

}


/* =========================================================
   CLICK DESKTOP
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        /*
            No crear Meowl al pulsar
            botones de navegación.
        */

        if (
            event.target.closest(
                ".back-button"
            )
        ) {

            return;

        }


        /*
            No crear Meowl durante
            LINK START o el video.
        */

        if (
            event.target.closest(
                ".link-start-screen"
            ) ||
            event.target.closest(
                ".sao-intro"
            )
        ) {

            return;

        }


        crearMeowl(
            event.clientX,
            event.clientY
        );

    }
);


/* =========================================================
   TOUCH MOBILE
========================================================= */

document.addEventListener(
    "touchstart",
    (event) => {

        const touch =
            event.touches[0];


        if (!touch) {

            return;

        }


        if (
            event.target.closest(
                ".back-button"
            )
        ) {

            return;

        }


        if (
            event.target.closest(
                ".link-start-screen"
            ) ||
            event.target.closest(
                ".sao-intro"
            )
        ) {

            return;

        }


        crearMeowl(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: true
    }
);