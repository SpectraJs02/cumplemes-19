const meowlContainer = document.getElementById("meowl-container");


/* =========================
   MEOWL
========================= */

function crearMeowl(x, y) {

    const meowl = document.createElement("img");

    meowl.src = "img/meowl.png";

    meowl.className = "meowl-click";

    meowl.style.left = `${x}px`;
    meowl.style.top = `${y}px`;

    meowlContainer.appendChild(meowl);


    setTimeout(() => {
        meowl.remove();
    }, 900);
}


/* =========================
   CLICK DESKTOP
========================= */

document.addEventListener("click", (event) => {

    if (event.target.closest(".back-button")) {
        return;
    }

    crearMeowl(
        event.clientX,
        event.clientY
    );
});


/* =========================
   TOUCH MOBILE
========================= */

document.addEventListener(
    "touchstart",
    (event) => {

        const touch = event.touches[0];

        if (!touch) {
            return;
        }

        if (event.target.closest(".back-button")) {
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