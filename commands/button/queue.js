const { queue_embed } = require("../../utils/embeds")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    if (!queue.size) return await interaction.reply({ ephemeral: true, content: "There is no queue to display.\n表示するキューが存在しません。" })
    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("backpage").setStyle(ButtonStyle.Secondary).setEmoji("👈"),
            new ButtonBuilder().setCustomId("delete").setStyle(ButtonStyle.Danger).setLabel("非表示にする"),
            new ButtonBuilder().setCustomId("nextpage").setStyle(ButtonStyle.Secondary).setEmoji("👉"),
        )
    await interaction.reply({ embeds: [queue_embed(interaction, queue, 10, 1)], components: [button] })
}