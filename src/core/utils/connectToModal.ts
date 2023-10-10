import io from "socket.io-client";

export const socket = io('ws://6.tcp.eu.ngrok.io:11616', {
    'reconnection': false,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10,
});