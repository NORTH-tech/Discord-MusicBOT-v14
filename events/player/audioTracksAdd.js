const fs = require("fs");

module.exports = async (client, queue, tracks) => {
    try {
        await queue.metadata.channel.send("```" + String(tracks.length) + " のトラックを追加しました。\ntracksadd.```")
        const today = createDateString()[0];
        const data = JSON.parse(fs.readFileSync("./data/requestCount.json").toString());
        const todayCount = data[today];
        if (todayCount === undefined) {
            data[today] = tracks.length;
        } else {
            data[today] = todayCount + tracks.length;
        }
        fs.writeFileSync("./data/requestCount.json", JSON.stringify(data));
    } catch { }
}