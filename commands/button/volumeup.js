module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    await interaction.deferUpdate();
    const volume = queue.node.volume;
    if (volume > 198) return
    await queue.node.setVolume(volume + 2)
    await client.say.success(interaction, `Volume has been increased. Current volume: ${String(volume+2)}\n音量をアップしました。現在の音量: ${String(volume+2)}`)
}