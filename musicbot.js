//module-loading
const { Client, GatewayIntentBits, Collection, REST,Events, Routes } = require("discord.js")
const { Player } = require("discord-player")
const { readdirSync } = require('fs');
const glob = require("glob");
require('dotenv').config();

//create-client
const client = new Client({
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.Guilds
    ]
});
client.developper = process.env.developper;
client.panels = new Map();
client.checked = require("./utils/checked");
client.say = require("./utils/say");

//set-slashCommands
const rest = new REST({ version: "10" }).setToken(process.env.token);
const commandsFiles = readdirSync("./commands/slash").filter(f => f.endsWith(".js"));
const commands = [];
for (const file of commandsFiles) {
    const command = require(`./commands/slash/${file}`);
    commands.push(command.data.toJSON());
}
(async () => {
    await rest.put(Routes.applicationCommands(process.env.clientid), { body: commands });
    console.log("success commands register");
})();



//player-setting
const player = Player.singleton(client);
player.extractors.loadDefault();


//client&player/event-loading
const eventFiles = glob.sync("./events/**/*.js");
for (const fileload of eventFiles) {
    const event = require(`./${fileload}`);
    //windows&linux対応
    const file = fileload.split("\\").join("/");
    const [folder, type, eventname] = file.split("/")
    if (type === "bot") {
        client.on(eventname.split('.')[0], event.bind(null, client));
    } else if (type == "player") {
        player.events.on(eventname.split('.')[0], event.bind(null, client));
    }
};

//login-discordbot
client.login(process.env.token);