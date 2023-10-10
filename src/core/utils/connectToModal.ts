import io from "socket.io-client";

export const socket = io('ws://5.tcp.eu.ngrok.io:10293', {
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
    extraHeaders: {
        "ngrok-skip-browser-warning": "true"
    }
});
