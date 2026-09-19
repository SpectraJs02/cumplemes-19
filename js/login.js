const CORRECT_USERNAME = "Alessa";
const CORRECT_PASSWORD = "19";


/* =========================================================
   ELEMENTOS - USUARIO
========================================================= */

const usernameInput =
    document.getElementById("username");

const userError =
    document.getElementById("userError");

const nextButton =
    document.getElementById("nextButton");


/* =========================================================
   ELEMENTOS - CONTRASEÑA
========================================================= */

const passwordInput =
    document.getElementById("password");

const passwordError =
    document.getElementById("passwordError");

const passwordButton =
    document.getElementById("passwordButton");


/* =========================================================
   PANTALLAS
========================================================= */

const usernameStep =
    document.getElementById("usernameStep");

const passwordStep =
    document.getElementById("passwordStep");


/* =========================================================
   ALERTA
========================================================= */

const successAlert =
    document.getElementById("successAlert");

const alertContinueButton =
    document.getElementById(
        "alertContinueButton"
    );


/* =========================================================
   BOTÓN VOLVER
========================================================= */

const backButton =
    document.getElementById("backButton");


/* =========================================================
   VERIFICAR USUARIO
========================================================= */

function verificarUsuario() {

    const username =
        usernameInput.value.trim();


    userError.textContent = "";

    userError.classList.remove(
        "success-message"
    );

    usernameInput.classList.remove(
        "input-error"
    );


    /* Usuario vacío */

    if (username === "") {

        userError.textContent =
            "Primero escribe el usuario de mi linda novia ♡";

        usernameInput.classList.add(
            "input-error"
        );

        usernameInput.focus();

        return;
    }


    /* Usuario incorrecto */

    if (
        username.toLowerCase() !==
        CORRECT_USERNAME.toLowerCase()
    ) {

        userError.textContent =
            "Usuario incorrecto, el usuario es el nombre de mi linda novia no el de cualquier chirusa UWU";

        usernameInput.classList.add(
            "input-error"
        );

        usernameInput.focus();

        return;
    }


    /* Usuario correcto */

    successAlert.classList.add(
        "show"
    );
}


/* =========================================================
   CONTINUAR DESDE LA ALERTA
========================================================= */

alertContinueButton.addEventListener(
    "click",
    function () {

        successAlert.classList.remove(
            "show"
        );


        setTimeout(
            function () {

                usernameStep.classList.remove(
                    "active"
                );

                passwordStep.classList.add(
                    "active"
                );


                passwordInput.focus();

            },
            300
        );

    }
);


/* =========================================================
   VERIFICAR CONTRASEÑA
========================================================= */

function verificarPassword() {

    const password =
        passwordInput.value.trim();


    passwordError.textContent = "";

    passwordError.classList.remove(
        "success-message"
    );

    passwordInput.classList.remove(
        "input-error"
    );


    /* Contraseña vacía */

    if (password === "") {

        passwordError.textContent =
            "Primero escribe nuestro número ♡";

        passwordInput.classList.add(
            "input-error"
        );

        passwordInput.focus();

        return;
    }


    /* Contraseña incorrecta */

    if (
        password !==
        CORRECT_PASSWORD
    ) {

        passwordError.textContent =
            "Mmm... ese no es nuestro número ♡";

        passwordInput.classList.add(
            "input-error"
        );

        passwordInput.focus();

        return;
    }


    /* =====================================================
       CONTRASEÑA CORRECTA
    ====================================================== */

    passwordError.textContent =
        "¡Contraseña correcta! ♡";

    passwordError.classList.add(
        "success-message"
    );


    passwordButton.textContent =
        "Entrando... ♡";

    passwordButton.disabled =
        true;


    /* =====================================================
       ENTRAR A LA PÁGINA PRINCIPAL
    ====================================================== */

    setTimeout(
        function () {

            window.location.href =
                "home.html";

        },
        1000
    );

}


/* =========================================================
   BOTÓN ENTRAR
========================================================= */

passwordButton.addEventListener(
    "click",
    verificarPassword
);


/* =========================================================
   ENTER EN CONTRASEÑA
========================================================= */

passwordInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            verificarPassword();

        }

    }
);


/* =========================================================
   BOTÓN SIGUIENTE
========================================================= */

nextButton.addEventListener(
    "click",
    verificarUsuario
);


/* =========================================================
   ENTER EN USUARIO
========================================================= */

usernameInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            verificarUsuario();

        }

    }
);


/* =========================================================
   VOLVER
========================================================= */

backButton.addEventListener(
    "click",
    function () {

        passwordStep.classList.remove(
            "active"
        );

        usernameStep.classList.add(
            "active"
        );


        passwordInput.value = "";

        passwordError.textContent = "";

        passwordError.classList.remove(
            "success-message"
        );


        passwordInput.classList.remove(
            "input-error"
        );


        usernameInput.focus();

    }
);