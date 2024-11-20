let keyPresses = [];
let startTime;
let recording = false;

document.getElementById('startButton').addEventListener('click', () => {
    const audio = document.getElementById('audio');
    audio.play();
    startTime = Date.now();
    recording = true;

    const keyDownHandler = (event) => {
        if (recording) {
            const timeElapsed = Date.now() - startTime;
            keyPresses.push(timeElapsed);
        }
    };

    document.addEventListener('keydown', keyDownHandler);

    audio.onended = () => {
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
    };
});