import io from "socket.io-client";

export const socket = io('wss://0.tcp.eu.ngrok.io:16168', {
    'reconnection': false,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
    extraHeaders: {
        "ngrok-skip-browser-warning": "true"
    }
});
