import io from "socket.io-client";

export const socket = io('ws://localhost:5000', {
    'reconnection': false,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
});
