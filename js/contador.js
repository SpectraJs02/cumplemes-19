document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       FECHA DE INICIO
    ========================== */

    const fechaInicio = new Date(
        2023,
        3,
        19
    );


    /* =========================
       ELEMENTOS
    ========================== */

    const yearsElement =
        document.getElementById("years");

    const monthsElement =
        document.getElementById("months");

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");

    const totalDaysElement =
        document.getElementById("totalDays");


    /* =========================
       CALCULAR TIEMPO
    ========================== */

    function calcularTiempo() {

        const ahora = new Date();

        /*
         * Si por alguna razón la fecha actual
         * fuese anterior al inicio, mostramos
         * todo en cero.
         */

        if (ahora < fechaInicio) {

            yearsElement.textContent = "0";
            monthsElement.textContent = "0";
            daysElement.textContent = "0";

            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            totalDaysElement.textContent = "0";

            return;
        }


        /* =========================
           AÑOS
        ========================== */

        let years =
            ahora.getFullYear() -
            fechaInicio.getFullYear();


        let fechaTemporal =
            new Date(fechaInicio);

        fechaTemporal.setFullYear(
            fechaInicio.getFullYear() + years
        );


        /*
         * Si todavía no llegamos al aniversario
         * correspondiente de este año,
         * quitamos un año.
         */

        if (fechaTemporal > ahora) {

            years--;

            fechaTemporal =
                new Date(fechaInicio);

            fechaTemporal.setFullYear(
                fechaInicio.getFullYear() + years
            );
        }


        /* =========================
           MESES
        ========================== */

        let months =
            (ahora.getFullYear() -
                fechaTemporal.getFullYear()) * 12
            +
            (ahora.getMonth() -
                fechaTemporal.getMonth());


        let fechaMeses =
            new Date(fechaTemporal);

        fechaMeses.setMonth(
            fechaTemporal.getMonth() + months
        );


        if (fechaMeses > ahora) {

            months--;

            fechaMeses =
                new Date(fechaTemporal);

            fechaMeses.setMonth(
                fechaTemporal.getMonth() + months
            );
        }


        /* =========================
           DÍAS
        ========================== */

        const diferenciaDias =
            ahora.getTime() -
            fechaMeses.getTime();

        const diasCompletos =
            Math.floor(
                diferenciaDias /
                (1000 * 60 * 60 * 24)
            );


        /* =========================
           HORAS
        ========================== */

        const restoDias =
            diferenciaDias %
            (1000 * 60 * 60 * 24);

        const hours =
            Math.floor(
                restoDias /
                (1000 * 60 * 60)
            );


        /* =========================
           MINUTOS
        ========================== */

        const restoHoras =
            restoDias %
            (1000 * 60 * 60);

        const minutes =
            Math.floor(
                restoHoras /
                (1000 * 60)
            );


        /* =========================
           SEGUNDOS
        ========================== */

        const restoMinutos =
            restoHoras %
            (1000 * 60);

        const seconds =
            Math.floor(
                restoMinutos /
                1000
            );


        /* =========================
           TOTAL DE DÍAS
        ========================== */

        const diferenciaTotal =
            ahora.getTime() -
            fechaInicio.getTime();

        const totalDays =
            Math.floor(
                diferenciaTotal /
                (1000 * 60 * 60 * 24)
            );


        /* =========================
           MOSTRAR RESULTADOS
        ========================== */

        yearsElement.textContent =
            years;

        monthsElement.textContent =
            months;

        daysElement.textContent =
            diasCompletos;

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

        totalDaysElement.textContent =
            totalDays.toLocaleString("es-PE");
    }


    /* =========================
       EJECUTAR
    ========================== */

    calcularTiempo();


    /*
     * Actualizar cada segundo.
     */

    setInterval(
        calcularTiempo,
        1000
    );


    /* =========================
       MEOWL
    ========================== */

    function crearMeowl(x, y) {

        const meowl =
            document.createElement("img");

        meowl.src =
            "img/meowl.png";

        meowl.className =
            "meowl-effect";

        meowl.style.left =
            `${x}px`;

        meowl.style.top =
            `${y}px`;

        document.body.appendChild(
            meowl
        );


        setTimeout(() => {

            meowl.remove();

        }, 900);
    }


    /* =========================
       MOUSE
    ========================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                event.target.closest(
                    ".back-button"
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


    /* =========================
       TOUCH
    ========================== */

    document.addEventListener(
        "touchstart",
        (event) => {

            if (!event.touches.length) {
                return;
            }

            if (
                event.target.closest(
                    ".back-button"
                )
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

});