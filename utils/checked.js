const { useQueue } = require("discord-player")

async function checkQueue(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return [false, {
        content: "Music is not playing.\n```音楽が再生されていません。```",
        ephemeral: true,
    }];
    const memberChannelId = interaction.member?.voice?.channelId;
    const queueChannelId = queue?.channel.id;
    if (memberChannelId != queueChannelId) return [false, {
        content: "Connect to the same VC as the BOT.\n```BOTと同じVCに接続してください。```",
        ephemeral: true,
    }];
    return [true, queue]
}

module.exports = {
    checkQueue
}