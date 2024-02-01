const createDateString = () => {
    const today = new Date();
    const yesterday = new Date();
    const twoDaysAgo = new Date();

    const todayDateString = formatDate(today);

    // 昨日の日付を取得
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDateString = formatDate(yesterday);

    // 一昨日の日付を取得
    twoDaysAgo.setDate(today.getDate() - 2);
    const twoDaysAgoDateString = formatDate(twoDaysAgo);

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return [
        todayDateString,
        yesterdayDateString,
        twoDaysAgoDateString
    ]
}

module.exports = {
    createDateString
}