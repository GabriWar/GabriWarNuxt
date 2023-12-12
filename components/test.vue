<template>
    <section id="demos">
        <h1 class="title">MediaPipe Hand Gesture Recognition</h1>
        <h2 class="subtitle">⚠️highly experimental⚠️</h2>
        <video id="webcam" class="cam" autoplay playsinline></video>
        <canvas class="output_canvas" id="output_canvas" width="1280" height="720"
            style="position: absolute; left: 0px; top: 0px"></canvas>
        <p id="gesture_output" class="output"></p>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import {
    FilesetResolver,
    GestureRecognizer,
    DrawingUtils,
} from '@mediapipe/tasks-vision';

let gestureRecognizer = ref(null);
let webcamRunning = false;
const videoHeight = '360px';
const videoWidth = '480px';
const createGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    );

    gestureRecognizer.value = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
            delegate: 'GPU',
        },
    });
};
onBeforeMount(async () => {
    video.value = document.getElementById('webcam');
    canvasElement.value = document.getElementById('output_canvas');
    demosSection.value = document.getElementById('demos');
    gestureOutput.value = document.getElementById('gesture_output');
    await createGestureRecognizer();
    async function predictWebcam() {
        const webcamElement = video.value;
        let nowInMs = Date.now();
        if (video.value.currentTime !== lastVideoTime) {
            lastVideoTime = video.value.currentTime;
            results.value = gestureRecognizer.value.detectForVideo(
                video.value,
                nowInMs
            );
        }

        if (webcamElement) {
            canvasElement.value.getContext('2d').save();
            canvasElement.value
                .getContext('2d')
                .clearRect(0, 0, canvasElement.value.width, canvasElement.value.height);
            const drawingUtils = new DrawingUtils(
                canvasElement.value.getContext('2d')
            );
            canvasElement.value.style.height = videoHeight;
            webcamElement.style.height = videoHeight;
            canvasElement.value.style.width = videoWidth;
            webcamElement.style.width = videoWidth;
            if (results.value.landmarks) {
                for (const landmarks of results.value.landmarks) {
                    drawingUtils.drawConnectors(
                        landmarks,
                        GestureRecognizer.HAND_CONNECTIONS,
                        {
                            color: '#00FF00',
                            lineWidth: 5,
                        }
                    );
                    drawingUtils.drawLandmarks(landmarks, {
                        color: '#FF0000',
                        lineWidth: 2,
                    });
                }
            }
            canvasElement.value.getContext('2d').restore();
            if (results.value.gestures.length > 0) {
                gestureOutput.value.style.width = videoWidth;
                const categoryName = results.value.gestures[0][0].categoryName;
                const categoryScore = parseFloat(
                    results.value.gestures[0][0].score * 100
                ).toFixed(2);
                const handedness = results.value.handednesses[0][0].displayName;
                gestureOutput.value.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
            } else {
                gestureOutput.value.style.display = 'none';
            }
            if (webcamRunning === true) {
                window.requestAnimationFrame(predictWebcam);
            }
        }
    }
    predictWebcamRef.value = predictWebcam;
});
onMounted(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            video.value.srcObject = stream;
            video.value.addEventListener('loadeddata', predictWebcamRef.value);
        });
    } else {
        console.error('getUserMedia is not supported');
    }
    console.log('onMounted');
});

const demosSection = ref(null);
const video = ref(null);
const canvasElement = ref(null);
const gestureOutput = ref(null);
const predictWebcamRef = ref(null);
const results = ref(null);

const constraints = {
    video: true,
};

let lastVideoTime = -1;
</script>
<style scoped>
.title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.subtitle {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.cam {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
