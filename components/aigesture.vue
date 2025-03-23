<template>
    <div class="hand-gesture-container">
        <h1 class="title">Hand Gesture Recognition</h1>
        <div class="main-content">
            <div class="side-panel left-panel">
                <div class="gesture-info" v-if="currentGesture && showGestureInfo">
                    <h3>Detected Gesture:</h3>
                    <p>{{ currentGesture }}</p>
                    <p>Confidence: {{ confidence }}%</p>
                </div>
                <div class="finger-count-info" v-if="showFingerCount">
                    <h3>Finger Count:</h3>
                    <div class="finger-counts">
                        <div class="hand-count">
                            <span class="hand-label">Left Hand:</span>
                            <span class="count">{{ fingerCounts.left }}</span>
                        </div>
                        <div class="hand-count">
                            <span class="hand-label">Right Hand:</span>
                            <span class="count">{{ fingerCounts.right }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center-content">
                <div class="video-container">
                    <video ref="videoRef" class="video" autoplay playsinline></video>
                    <canvas ref="canvasRef" class="canvas"></canvas>
                </div>
                <div class="controls">
                    <button @click="startCamera" :disabled="isRunning">Start Camera</button>
                    <button @click="stopCamera" :disabled="!isRunning">Stop Camera</button>
                    <button 
                        @click="isFlipped = !isFlipped" 
                        :class="{ 'active': isFlipped }"
                        class="flip-button">
                        {{ isFlipped ? 'Mirror On' : 'Mirror Off' }}
                    </button>
                </div>
                <div class="feature-toggles-container">
                    <button class="feature-toggles-header" @click="isFeatureTogglesExpanded = !isFeatureTogglesExpanded">
                        <span>Feature Toggles</span>
                        <span class="toggle-icon">{{ isFeatureTogglesExpanded ? '▼' : '▶' }}</span>
                    </button>
                    <div class="feature-toggles" :class="{ 'expanded': isFeatureTogglesExpanded }">
                        <div class="toggle-group">
                            <label class="toggle-label" :class="{ 'disabled': !showLandmarks }">
                                <input type="checkbox" v-model="showLandmarks">
                                Show Landmarks
                            </label>
                            <label class="toggle-label" :class="{ 'disabled': !showConnectors }">
                                <input type="checkbox" v-model="showConnectors">
                                Show Connectors
                            </label>
                        </div>
                        <div class="toggle-group">
                            <label class="toggle-label" :class="{ 'disabled': !showCursor }">
                                <input type="checkbox" v-model="showCursor">
                                Show Cursor
                            </label>
                            <label class="toggle-label" :class="{ 'disabled': !showCoordinates }">
                                <input type="checkbox" v-model="showCoordinates">
                                Show Coordinates
                            </label>
                            <label class="toggle-label" :class="{ 'disabled': !showFingerCount }">
                                <input type="checkbox" v-model="showFingerCount">
                                Show Finger Count
                            </label>
                        </div>
                        <div class="toggle-group">
                            <label class="toggle-label" :class="{ 'disabled': !showGestureInfo }">
                                <input type="checkbox" v-model="showGestureInfo">
                                Show Gesture Info
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="side-panel right-panel">
                <div class="cursor-info" v-if="screenCursor.visible && showCoordinates">
                    <h3>Screen Cursor:</h3>
                    <p>X: {{ screenCoords.x }}</p>
                    <p>Y: {{ screenCoords.y }}</p>
                </div>
            </div>
        </div>
        <div v-if="screenCursor.visible && showCursor" 
             class="screen-cursor"
             :style="{ left: screenCursor.x + 'px', top: screenCursor.y + 'px' }">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { FilesetResolver, GestureRecognizer, DrawingUtils } from '@mediapipe/tasks-vision';

// Refs
const videoRef = ref(null);
const canvasRef = ref(null);
const isRunning = ref(false);
const currentGesture = ref('');
const confidence = ref(0);

// Add new refs for finger counting
const fingerCount = ref(0);
const fingerCounts = ref({ left: 0, right: 0 });

// Add new refs for cursor coordinates
const cursorCoords = ref({ x: 0, y: 0, visible: false });

// Add new refs for screen cursor
const screenCursor = ref({ x: 0, y: 0, visible: false });
const screenCoords = ref({ x: 0, y: 0 });

// Add new refs for feature toggles
const showLandmarks = ref(true);
const showConnectors = ref(true);
const showCursor = ref(true);
const showCoordinates = ref(true);
const showFingerCount = ref(true);
const showGestureInfo = ref(true);
const isFlipped = ref(true);
const isFeatureTogglesExpanded = ref(false);

// MediaPipe variables
let gestureRecognizer = null;
let animationFrameId = null;
let lastVideoTime = -1;

// Initialize MediaPipe
const initializeMediaPipe = async () => {
    try {
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    );

        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
            delegate: 'GPU',
        },
            runningMode: 'VIDEO',
            numHands: 2,
        });

        console.log('MediaPipe initialized successfully');
    } catch (error) {
        console.error('Error initializing MediaPipe:', error);
    }
};

// Start camera
const startCamera = async () => {
    try {
        if (!videoRef.value) return;

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });

        videoRef.value.srcObject = stream;
        
        // Wait for video to be loaded
        await new Promise((resolve) => {
            videoRef.value.onloadedmetadata = () => {
                videoRef.value.play();
                resolve();
            };
        });

        // Set canvas dimensions to match video
        if (canvasRef.value) {
            canvasRef.value.width = videoRef.value.videoWidth;
            canvasRef.value.height = videoRef.value.videoHeight;
        }

        isRunning.value = true;
        startDetection();
    } catch (error) {
        console.error('Error starting camera:', error);
    }
};

// Stop camera
const stopCamera = () => {
    if (videoRef.value?.srcObject) {
        const tracks = videoRef.value.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.value.srcObject = null;
    }
    isRunning.value = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
};

// Update the countFingers function
const countFingers = (landmarks, handedness) => {
    // Thumb
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMP = landmarks[2];
    const thumbCMC = landmarks[1];
    const thumbBase = landmarks[0];
    
    // Index finger
    const indexTip = landmarks[8];
    const indexDIP = landmarks[7];
    const indexPIP = landmarks[6];
    const indexMCP = landmarks[5];
    
    // Middle finger
    const middleTip = landmarks[12];
    const middleDIP = landmarks[11];
    const middlePIP = landmarks[10];
    const middleMCP = landmarks[9];
    
    // Ring finger
    const ringTip = landmarks[16];
    const ringDIP = landmarks[15];
    const ringPIP = landmarks[14];
    const ringMCP = landmarks[13];
    
    // Pinky
    const pinkyTip = landmarks[20];
    const pinkyDIP = landmarks[19];
    const pinkyPIP = landmarks[18];
    const pinkyMCP = landmarks[17];
    
    let count = 0;
    
    // Thumb (check if it's extended horizontally)
    const thumbExtended = handedness === 'Left' ? 
        thumbTip.x > thumbIP.x : 
        thumbTip.x < thumbIP.x;
    if (thumbExtended) count++;
    
    // Index finger
    const indexExtended = indexTip.y < indexDIP.y && indexDIP.y < indexPIP.y;
    if (indexExtended) count++;
    
    // Middle finger
    const middleExtended = middleTip.y < middleDIP.y && middleDIP.y < middlePIP.y;
    if (middleExtended) count++;
    
    // Ring finger
    const ringExtended = ringTip.y < ringDIP.y && ringDIP.y < ringPIP.y;
    if (ringExtended) count++;
    
    // Pinky
    const pinkyExtended = pinkyTip.y < pinkyDIP.y && pinkyDIP.y < pinkyPIP.y;
    if (pinkyExtended) count++;
    
    return count;
};

// Update the detection loop
const startDetection = () => {
    if (!isRunning.value || !videoRef.value || !canvasRef.value || !gestureRecognizer) return;

    const video = videoRef.value;
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');

    // Ensure video dimensions are valid
    if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error('Invalid video dimensions');
        return;
    }

    const detect = () => {
        if (!isRunning.value) return;

        const nowInMs = Date.now();

        if (video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime;

            try {
                // Clear canvas
                ctx.save();
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw video with flip if enabled
                if (isFlipped.value) {
                    ctx.scale(-1, 1);
                    ctx.translate(-canvas.width, 0);
                }
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                ctx.restore();

                // Create a temporary canvas for processing
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const tempCtx = tempCanvas.getContext('2d');

                // Draw the video to temp canvas (flipped if needed)
                if (isFlipped.value) {
                    tempCtx.scale(-1, 1);
                    tempCtx.translate(-tempCanvas.width, 0);
                }
                tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

                // Detect gestures using the temp canvas
                const results = gestureRecognizer.recognizeForVideo(tempCanvas, nowInMs);

                // Reset finger counts and cursors
                fingerCounts.value = { left: 0, right: 0 };
                cursorCoords.value.visible = false;
                screenCursor.value.visible = false;

                // Draw hand landmarks and count fingers
                if (results.landmarks) {
                    const drawingUtils = new DrawingUtils(ctx);
                    
                    for (let i = 0; i < results.landmarks.length; i++) {
                        const landmarks = results.landmarks[i];
                        const handedness = results.handednesses[i][0].displayName;
                        
                        // Count fingers for this hand
                        const count = countFingers(landmarks, handedness);
                        fingerCounts.value[handedness.toLowerCase()] = count;
                        
                        // Update cursor coordinates if index finger is extended
                        if (count > 0 && showCursor.value) {
                            const indexTip = landmarks[8];
                            // Update webcam cursor
                            cursorCoords.value = {
                                x: Math.round(indexTip.x * canvas.width),
                                y: Math.round(indexTip.y * canvas.height),
                                visible: true
                            };
                            
                            // Update screen cursor
                            const screenX = Math.round(indexTip.x * window.innerWidth);
                            const screenY = Math.round(indexTip.y * window.innerHeight);
                            screenCursor.value = {
                                x: screenX,
                                y: screenY,
                                visible: true
                            };
                            screenCoords.value = {
                                x: screenX,
                                y: screenY
                            };
                        }
                        
                        // Draw hand landmarks if enabled
                        if (showConnectors.value) {
                            drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
                                color: '#00FF00',
                                lineWidth: 5,
                            });
                        }
                        if (showLandmarks.value) {
                            drawingUtils.drawLandmarks(landmarks, {
                                color: '#FF0000',
                                lineWidth: 2,
                            });
                        }
                    }
                }

                // Draw webcam cursor if enabled
                if (cursorCoords.value.visible && showCursor.value) {
                    ctx.beginPath();
                    ctx.arc(cursorCoords.value.x, cursorCoords.value.y, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = '#00ff00';
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Update gesture info if enabled
                if (showGestureInfo.value && results.gestures && results.gestures.length > 0) {
                    const gesture = results.gestures[0][0];
                    currentGesture.value = gesture.categoryName;
                    confidence.value = (gesture.score * 100).toFixed(2);
                } else {
                    currentGesture.value = '';
                    confidence.value = 0;
                }

            } catch (error) {
                console.error('Error in detection loop:', error);
            }
        }

        animationFrameId = requestAnimationFrame(detect);
    };

    detect();
};

// Lifecycle hooks
onMounted(async () => {
    await initializeMediaPipe();
});

onBeforeUnmount(() => {
    stopCamera();
});
</script>

<style scoped>
@import url(assets/css/aigesture.css);
</style> 