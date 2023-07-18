const buildUrl = "Build";
const loaderUrl = buildUrl + "/mirra-idle-dracula.loader.js";
const config = {
    dataUrl: buildUrl + "/mirra-idle-dracula.data.unityweb",
    frameworkUrl: buildUrl + "/mirra-idle-dracula.framework.js.unityweb",
    codeUrl: buildUrl + "/mirra-idle-dracula.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Idle Dracula",
    productVersion: "1",
};

const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    container.className = "unity-mobile";
}

function focusOnGame() {
    container.focus();
    window.focus();
    canvas.focus();
}

const script = document.createElement("script");
var unityI = null;
script.src = loaderUrl;
script.onload = async () => {
    await _gpAwaiter.ready;
    createUnityInstance(canvas, config, (progress) => {
        updateProgress(100 * progress);
    }).then((unityInstance) => {
        _unityAwaiter.done(unityInstance);
        unityI = unityInstance;
        focusOnGame();
    }).catch((message) => {
        _unityAwaiter.abort(message);
        alert(message);
    });
};
document.body.appendChild(script);

document.addEventListener("pointerdown", focusOnGame);
