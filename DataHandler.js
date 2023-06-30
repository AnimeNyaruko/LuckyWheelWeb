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
            title: 'Khách hàng mới',
            body: `Sản phẩm trúng: ${items}\nDữ liệu: ${JSON.stringify(data)}\nThời gian: ${date}`
        })
    });
    const responseData = await response.json();
    console.log(responseData);
}
