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
    document.getElementById('startButton').addEventListener('click', () => {
        player.playVideo();
        startTime = Date.now();
        recording = true;

        const keyDownHandler = (event) => {
            if (recording) {
                const timeElapsed = Date.now() - startTime;
                keyPresses.push(timeElapsed);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        player.addEventListener('onStateChange', function(e) {
            if (e.data == YT.PlayerState.ENDED) {
                recording = false;
                document.removeEventListener('keydown', keyDownHandler);
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(keyPresses));
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute("download", "resultados.json");
                document.body.appendChild(downloadAnchorNode);
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
                alert("¡Gracias! Tus datos han sido registrados.");
            }
        });
    });
}

function onPlayerStateChange(event) {
    // Puedes manejar otros cambios de estado si es necesario
}