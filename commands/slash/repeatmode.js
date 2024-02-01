const { SlashCommandBuilder } = require("discord.js");
const { QueueRepeatMode } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("repeatmode")
        .setDescription("Select repeat mode")
        .addStringOption(option =>
            option
                .setName("selectmode")
                .setRequired(true)
                .setDescription("Select the playback mode. / 再生モードを選択してください。 ")
                .addChoices(
                    {
                        name: "View current mode / 現在のモードを見る",
                        value: "show"
                    },
                    {
                        name: "Normal playback. / 通常再生",
                        value: "0"
                    },
                    {
                        name: "Repeat one song. / 1曲リピート",
                        value: "1"
                    },
                    {
                        name: "All songs repeat / 全曲リピート",
                        value: "2"
                    },
                    {
                        name: "autoplay / 自動再生",
                        value: "3"
                    },
                )
        ),
    async execute(interaction, client) {
        const [boolean, queue] = await client.checked.checkQueue(interaction)
        if (!boolean) return await interaction.reply(queue)
        const mode = interaction.options.getString("selectmode");
        if (mode === "show") {
            let status = null;
            switch (queue.repeatMode) {
                case 3:
                    status = "autoplay / 自動再生";
                    break;
                case 2:
                    status = "All songs repeat / 全曲リピート";
                    break;
                case 1:
                    status = "Repeat one song. / 1曲リピート";
                    break;
                case 0:
                    status = "Normal playback. / 通常再生";
                    break;
            }
            await interaction.reply({ ephemeral: true, content: status })
        } else {
            let status = null
            switch (Number(mode)) {
                case 3:
                    status = "autoplay / 自動再生";
                    queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                    break;
                case 2:
                    status = "All songs repeat / 全曲リピート";
                    queue.setRepeatMode(QueueRepeatMode.QUEUE);
                    break;
                case 1:
                    status = "Repeat one song. / 1曲リピート";
                    queue.setRepeatMode(QueueRepeatMode.TRACK);
                    break;
                case 0:
                    status = "Normal playback. / 通常再生";
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    break;
            }
            await interaction.deferReply();
            await interaction.deleteReply();
            await client.say.success(interaction, "Complete!! / 変更完了\n" + status)
        }
    }
}