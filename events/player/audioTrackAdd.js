const { createDateString } = require("../../utils/util");
const fs = require("fs");

module.exports = async (client, queue, track) => {
    try {
        await queue.metadata.channel.send("```" + track.title + " をキューに追加しました。\ntrackadd.```")
        const today = createDateString()[0];
        const data = JSON.parse(fs.readFileSync("./data/requestCount.json").toString());
        const todayCount = data[today];
        if (todayCount === undefined) {
            data[today] = 1;
        } else {
            data[today] = todayCount + 1;
        }
        fs.writeFileSync("./data/requestCount.json", JSON.stringify(data));
    } catch { }
}