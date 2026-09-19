/* =====================================================
   NUESTRAS CANCIONES
===================================================== */


/* =====================================================
   LISTA DE CANCIONES
===================================================== */

const songs = [

    {
        title: "Say Something",
        artist: "TWICE",
        file: "canciones/say.mp3"
    },

    {
        title: "No Hablaré",
        artist: "Tatiana y las Musas",
        file: "canciones/meg.mp3"
    },

    {
        title: "Talismán",
        artist: "Rata Blanca",
        file: "canciones/talis.mp3"
    },

    {
        title: "ONLY",
        artist: "LEEHI",
        file: "canciones/only.mp3"
    },

    {
        title: "Veo en ti la luz",
        artist: "Chayanne, Danna",
        file: "canciones/rapunzel.mp3"
    },

    {
        title: "I'm in Love",
        artist: "Tomoko Aran",
        file: "canciones/tomo.mp3"
    },

    {
        title: "Say Yes to Heaven",
        artist: "Lana Del Rey",
        file: "canciones/yes.mp3"
    },

    {
        title: "Chachachá",
        artist: "Josean Log",
        file: "canciones/chachacha.mp3"
    },

    {
        title: "Ditto",
        artist: "NewJeans",
        file: "canciones/ditto.mp3"
    },

    {
        title: "Química Mayor",
        artist: "Mon Laferte",
        file: "canciones/quimica.mp3"
    }

];


/* =====================================================
   ELEMENTOS HTML
===================================================== */

const audioPlayer =
    document.getElementById("audioPlayer");

const record =
    document.getElementById("record");

const playButton =
    document.getElementById("playButton");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const playlist =
    document.getElementById("playlist");

const progressBar =
    document.getElementById("progressBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const meowlContainer =
    document.getElementById("meowlContainer");


/* =====================================================
   VARIABLES
===================================================== */

let currentSongIndex = 0;


/* =====================================================
   CARGAR CANCIÓN
===================================================== */

function loadSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    audioPlayer.src = song.file;

    audioPlayer.load();

    updatePlaylist();

    resetProgress();
}


/* =====================================================
   PLAYLIST
===================================================== */

function renderPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const songItem =
            document.createElement("div");

        songItem.className = "song-item";

        songItem.dataset.index = index;

        songItem.innerHTML = `

            <div class="song-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="song-details">

                <div class="song-name">
                    ${song.title}
                </div>

                <div class="song-artist">
                    ${song.artist}
                </div>

            </div>

            <div class="song-play-icon">
                ${index === currentSongIndex ? "♪" : "▶"}
            </div>

        `;

        songItem.addEventListener(
            "click",
            function () {

                currentSongIndex = index;

                loadSong(currentSongIndex);

                playSong();

            }
        );

        playlist.appendChild(songItem);

    });

    updatePlaylist();
}


/* =====================================================
   ACTUALIZAR PLAYLIST
===================================================== */

function updatePlaylist() {

    const items =
        document.querySelectorAll(".song-item");

    items.forEach((item, index) => {

        const icon =
            item.querySelector(".song-play-icon");

        if (index === currentSongIndex) {

            item.classList.add("active");

            icon.textContent =
                audioPlayer.paused ? "▶" : "♪";

        } else {

            item.classList.remove("active");

            icon.textContent = "▶";
        }

    });
}


/* =====================================================
   REPRODUCIR
===================================================== */

function playSong() {

    audioPlayer.play()
        .then(() => {

            record.classList.add("playing");

            playButton.textContent = "⏸";

            updatePlaylist();

        })
        .catch((error) => {

            console.log(
                "No se pudo reproducir la canción:",
                error
            );

        });
}


/* =====================================================
   PAUSAR
===================================================== */

function pauseSong() {

    audioPlayer.pause();

    record.classList.remove("playing");

    playButton.textContent = "▶";

    updatePlaylist();
}


/* =====================================================
   BOTÓN PLAY / PAUSE
===================================================== */

playButton.addEventListener(
    "click",
    function () {

        if (audioPlayer.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* =====================================================
   SIGUIENTE
===================================================== */

function nextSong() {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }

    loadSong(currentSongIndex);

    playSong();
}

nextButton.addEventListener(
    "click",
    nextSong
);


/* =====================================================
   ANTERIOR
===================================================== */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();
}

previousButton.addEventListener(
    "click",
    previousSong
);


/* =====================================================
   CUANDO TERMINA UNA CANCIÓN
===================================================== */

audioPlayer.addEventListener(
    "ended",
    function () {

        nextSong();

    }
);


/* =====================================================
   ACTUALIZAR PROGRESO
===================================================== */

audioPlayer.addEventListener(
    "timeupdate",
    function () {

        if (!audioPlayer.duration) {
            return;
        }

        const percentage =
            (audioPlayer.currentTime /
            audioPlayer.duration) * 100;

        progressBar.value = percentage;

        currentTime.textContent =
            formatTime(audioPlayer.currentTime);

    }
);


/* =====================================================
   DURACIÓN
===================================================== */

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        duration.textContent =
            formatTime(audioPlayer.duration);

    }
);


/* =====================================================
   BARRA DE PROGRESO
===================================================== */

progressBar.addEventListener(
    "input",
    function () {

        if (!audioPlayer.duration) {
            return;
        }

        const newTime =
            (progressBar.value / 100) *
            audioPlayer.duration;

        audioPlayer.currentTime =
            newTime;

    }
);


/* =====================================================
   FORMATO DEL TIEMPO
===================================================== */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}


/* =====================================================
   REINICIAR PROGRESO
===================================================== */

function resetProgress() {

    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";
}


/* =====================================================
   VOLVER AL INICIO
===================================================== */

function volverInicio() {

    window.location.href = "home.html";

}


/* =====================================================
   MEOWL
===================================================== */

function createMeowl(x, y) {

    const meowl =
        document.createElement("img");

    meowl.src = "img/meowl.png";

    meowl.alt = "";

    meowl.className =
        "meowl-click";

    meowl.style.left =
        `${x}px`;

    meowl.style.top =
        `${y}px`;

    meowlContainer.appendChild(meowl);


    setTimeout(
        function () {

            meowl.remove();

        },
        900
    );
}


/* =====================================================
   MEOWL — PC
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        /*
         * Evitamos que aparezca otro Meowl
         * cuando se hace clic en los controles
         * del reproductor.
         *
         * Así la interfaz no se llena de gatitos
         * mientras se usa la playlist.
         */

        if (
            event.target.closest(
                ".music-player, .back-button"
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


/* =====================================================
   MEOWL — CELULAR
===================================================== */

document.addEventListener(
    "touchstart",
    function (event) {

        if (
            event.target.closest(
                ".music-player, .back-button"
            )
        ) {
            return;
        }

        const touch =
            event.touches[0];

        if (!touch) {
            return;
        }

        createMeowl(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: true
    }
);


/* =====================================================
   INICIALIZAR
===================================================== */

renderPlaylist();

loadSong(0);