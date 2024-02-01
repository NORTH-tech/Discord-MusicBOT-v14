module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    await interaction.deferUpdate()
    queue.delete()
    return await client.say.success(interaction, "Deleted queue.\nキューを削除しました。")
}