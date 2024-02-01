const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jump")
        .setDescription("Jump to specific track on the queue without removing other tracks")
        .addNumberOption(oprion =>
            oprion
                .setName("index")
                .setDescription("Enter the number of the song you want to jump")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const [boolean, queue] = await client.checked.checkQueue(interaction)
        if (!boolean) return await interaction.reply(queue)
        if (queue.isEmpty()) return await interaction.reply({ ephemeral: true, content: "The queue has no more track.\nキューにトラックが存在しません。" });
        const index = interaction.options.getNumber("index") - 1;
        if (index > queue.size || index < 0) return await interaction.reply({ ephemeral: true, content: "The song with the entered number does not exist.\n入力した番号の曲が存在しません。" })
        await interaction.deferReply();
        await interaction.deleteReply();
        queue.node.jump(index);
        await client.say.success(interaction, "complete!!\nジャンプしました。")
    }
}