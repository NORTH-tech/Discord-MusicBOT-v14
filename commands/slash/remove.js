const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("remove music")
        .addNumberOption(oprion =>
            oprion
                .setName("index")
                .setDescription("Enter the number of the song you want to delete")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const [boolean, queue] = await client.checked.checkQueue(interaction)
        if (!boolean) return await interaction.reply(queue)
        const index = interaction.options.getNumber("index") - 1;
        if (index > queue.size || index < 0) return await interaction.reply({ ephemeral: true, content: "The song with the entered number does not exist.\n入力した番号の曲が存在しません。" })
        await interaction.deferReply();
        await interaction.deleteReply();
        queue.node.remove(index);
        await client.say.success(interaction, "complete!!\n削除が完了しました。")
    }
}