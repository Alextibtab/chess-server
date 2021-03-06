'use strict';

const express = require('express');
const { Server } = require('ws'); 

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server  = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const wss = new Server({ server })

wss.on("connection", ws => {
    console.log("New client connected!");

    let chessGame = {
        "playing": true
    };
    
    while (chessGame.playing) {
        ws.send("Chess Game Started");
        ws.on("message", function incoming(message) {
            console.log('Move: %s received',message);
        });

        ws.on("close", () => {
            console.log("Client has disconnected");
        });
    }
});