let keyPresses = [];
let startTime;
let recording = false;

// Cargar el API de IFrame de YouTube
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'E9GuZK_KFV0', // Reemplaza VIDEO_ID con el ID de tu video de YouTube
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    const startButton = document.getElementById('startButton');
    const recordButton = document.getElementById('recordButton');

    startButton.addEventListener('click', () => {
        player.playVideo();
        startTime = Date.now();
        recording = true;
        recordButton.disabled = false; // Habilitamos el botón para registrar pulsaciones
    });

    recordButton.addEventListener('click', () => {
        if (recording) {
            const timeElapsed = Date.now() - startTime;
            keyPresses.push(timeElapsed);
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        recording = false;
        document.getElementById('recordButton').disabled = true; // Deshabilitamos el botón al terminar el video

        // Generamos y descargamos el archivo JSON
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(keyPresses));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "resultados.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        alert("¡Gracias! Tus datos han sido registrados.");
    }
}