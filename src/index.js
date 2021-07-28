const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server  = express()
    .use((req, res) => res.sendfile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const { server } = require('ws'); 

const wss = new Server({ server })

wss.on("connection", ws => {
    console.log("New client connected!");

    ws.on("close", () => {
        console.log("Client has disconnected");
    });
});