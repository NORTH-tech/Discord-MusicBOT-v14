const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    const modal = new ModalBuilder()
        .setCustomId('play')
        .setTitle('Play Music');
    const source = new TextInputBuilder()
        .setCustomId('input_source')
        .setLabel("楽曲のタイトルまたはURLを入力してください。")
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(300)
    modal.addComponents(new ActionRowBuilder().addComponents(source));
    await interaction.showModal(modal);
}