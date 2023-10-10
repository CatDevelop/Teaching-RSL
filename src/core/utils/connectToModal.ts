import io from "socket.io-client";

export const socket = io('ws://5395-5-2-55-73.ngrok-free.app', {
    'reconnection': false,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
    extraHeaders: {
        "ngrok-skip-browser-warning": "true"
    }
});
