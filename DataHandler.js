export async function DataHandler(items, data, date) {
    const accessToken = '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';
    const owner = 'AnimeNyaruko';
    const repo = 'LuckyWheelWeb';

    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'New issue',
            body: `Sản phẩm trúng: ${items}\nDữ liệu: ${JSON.stringify(data)}\nThời gian: ${date}`
        })
    });
    const responseData = await response.json();
    console.log(responseData);
}