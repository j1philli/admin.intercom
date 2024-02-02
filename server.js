/* INSERT CODE HERE */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

const networks = [
    {name: 'discordgo', bridgeState: "Running", remoteState: ""},
    {name: "facebook", bridgeState: "", remoteState: ""},
    {name: "facebookgo", bridgeState: "Running", remoteState: "Connected"},
    {name: "gmessages", bridgeState: "Running", remoteState: "Connected"},
    {name: "googlechat",  bridgeState: "Running", remoteState: ""},
    {name: "hungryserv", bridgeState: "Running", remoteState: ""},
    {name: "imessagecloud", bridgeState: "", remoteState: ""},
    {name: "imessagego", bridgeState: "Running", remoteState: "Connected"},
    {name: "instagram", bridgeState: "", remoteState: ""},
    {name: "instagramgo", bridgeState: "Running", remoteState: ""},
    {name: "irc", bridgeState: "", remoteState: ""},
    {name: "linkedin", bridgeState: "Running", remoteState: ""},
    {name: "signal", bridgeState: "Running", remoteState: ""},
    {name: "slackgo", bridgeState: "", remoteState: ""},
    {name: "telegram", bridgeState: "Running", remoteState: ""},
    {name: "twitter", bridgeState: "", remoteState: ""},
    {name: "whatsapp", bridgeState: "Running", remoteState: ""},
    {name: "androidsms", bridgeState: "Running", remoteState: "Connected"},
    ];

const chatnetworks = networks.map(network => ({
    ...network,
    type: "item",
    id: network.name,
    title: network.name,
    subtitle: network.bridgeState,
    tertiary_text: network.bridgeState,
    image: "https://avatars.githubusercontent.com/u/5508982?s=200&v=4",
    image_width: 48,
    image_height: 48,
    action: {
        type: "submit",
    },
}));

/*
  This is an endpoint that Intercom will POST HTTP request when the card needs to be initialized.
  This can happen when your teammate inserts the app into the inbox, or a new conversation is viewed.
*/
app.post("/initialize", (request, response) => {
    const body = request.body;
    response.send({
        canvas: {
            content: {
                components: [
                    {
                        type: "list",
                        disabled: false,
                        items: chatnetworks
                    },
                    ],
            },
        },
    });
});

app.post("/submit", (request, response) => {
    const body = request.body;
    response.send({
        canvas: {
            content: {
                components: [
                    {
                        type: "text",
                        text: body.component_id,
                        style: "header",
                    },
                    {
                        type: "button",
                        label: "Provision",
                        style: "primary",
                        id: "url_button",
                        action: { type: "submit" },
                    },
                    ],
            },
        },
    });
});
