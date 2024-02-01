const {panelbuttons_1} = require("../../utils/buttons")

module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    if (queue.node.isPlaying()) {
        await interaction.deferUpdate()
        return await client.say.wrong(interaction, "Now Playing!\n再生中です。")
    }
    await queue.node.resume();
    await interaction.update({
        components: panelbuttons_1()
    });
    return await client.say.success(interaction, "Playback resumed.\n再生を再開しました。")
}