const { EmbedBuilder, Colors } = require("discord.js");
const { createDateString } = require("./util");
const fs = require("fs");

function track_embed(track) {
    if (!track) {
        throw Error("'track' must be passed down as param! (queueEmbed)");
    }
    const embed = new EmbedBuilder()
        .setColor(Colors.Fuchsia)
        .setAuthor({ name: "🎵Now Playing!!🎵" })
        .setTitle(track.title)
        .setDescription(track.description)
        .addFields([
            {
                name: "RequestedBy",
                value: track.requestedBy.username
            },
            {
                name: "duration",
                value: track.duration
            }
        ])
        .setImage(track.thumbnail)
        .setFooter({ iconURL: devicon, text: "develop by " + devname })
    return embed
}

function panel_help_embed() {
    const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setAuthor({ name: "panel help" })
        .setTitle("How to use the panel")
        .setDescription("Pressing a Emoji performs the following functions.")
        .addFields([
            {
                name: "▶ Resume music.",
                value: "```音楽の再生を再開します。```"
            },
            {
                name: "⏸ Pause music.",
                value: "```音楽を一時停止します。```"
            },
            {
                name: "🔉🔊 Adjust the volume.",
                value: "```音量を調節します。```"
            },
            {
                name: "↩ Playback from the beginning.",
                value: "```はじめから再生します。```"
            },
            {
                name: "🔀 Shuffle the music in the queue.",
                value: "```キューの音楽をシャッフルします。```"
            },
            {
                name: "⏭ Skips the currently playing music",
                value: ".```再生中の音楽をスキップします。```"
            },
            {
                name: "🎧 Add/play music",
                value: "```音楽を追加/再生します。```"
            },
            {
                name: "📃 Displays music added to the queue.",
                value: "```キューに追加されている音楽を表示します。```"
            },
            {
                name: "🚫 Delete all music added to the queue.",
                value: "```キューに追加されている音楽をすべて削除します。```"
            }
        ])
        .setFooter({ iconURL: devicon, text: "develop by " + devname })
    return embed
}

function command_help_embed() {
    const embed = new EmbedBuilder()
        .setAuthor({ name: "command help" })
        .setTitle("How to use slsh command")
        .setColor(Colors.DarkOrange)
        .setFooter({ iconURL: devicon, text: "develop by " + devname })
        .addFields([
            {
                name: "/jump",
                value: "`Skips the queue until the specified index.`\n`指定したインデックスまでキューをスキップします。`"
            },
            {
                name: "/remove",
                value: "`Deletes a track at the specified index in the queue.`\n`キュー内の指定したインデックスのトラックを削除します。`"
            },
            {
                name: "/repeatmode",
                value: "`Selects the playback mode for the song.`\n`楽曲の再生モードを選択します。`"
            },
            {
                name: "/play",
                value: "`Play the song. (YoutubeURL,YoutubePlaylist,SpotifyURL,Title)`\n`楽曲を再生します。(YoutubeURL,YoutubePlaylist,SpotifyURL,Title)`"
            },
        ])
    return embed
}

function queue_embed(interaction, queue, multiple, page) {
    const maxPages = Math.ceil(queue.size / multiple);
    if (page < 1 || page > maxPages) page = 1;
    const end = page * multiple;
    const start = end - multiple;
    const tracks = queue.tracks.toArray().slice(start, end)
    const embed = new EmbedBuilder()
        .setAuthor({ name: `PAGE${String(page)}` })
        .setColor(Colors.Gold)
        .setTitle(`${interaction.guild.name}'s queue.`)
        .setFooter({ iconURL: devicon, text: "develop by " + devname })
        .setDescription(
            tracks.map(
                (track, i) =>
                    `${String(10 * (page - 1) + i + 1)}: [(URL)](${track.url})\n` + "```" + track.title + "```"
            ).join("\n")
        )
    return embed
}

function botinfo_embed(client) {
    const size = client.guilds.cache.size;
    const user = client.users.cache.size;
    const dateStrings = createDateString();
    const fields = [];
    const data = JSON.parse(fs.readFileSync("./data/requestCount.json").toString());
    for (const dateString of dateStrings) {
        let count = data[dateString];
        if (count === undefined) {
            fields.push({
                name: dateString,
                value: String(0)
            })
        } else {
            fields.push({
                name: dateString,
                value: String(count)
            })
        }
    }
    const embed = new EmbedBuilder()
        .setColor(Colors.Aqua)
        .setTitle("BOTデータ照会")
        .setDescription(`導入サーバー数: ${String(size)}\nユーザー数: ${String(user)}\nリクエスト数`)
        .addFields(fields)
        .setFooter({ iconURL: devicon, text: "develop by " + devname })
    return embed
}

module.exports = {
    track_embed,
    panel_help_embed,
    command_help_embed,
    queue_embed,
    botinfo_embed
}