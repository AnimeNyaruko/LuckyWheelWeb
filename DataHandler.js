export async function DataHandler(items, data, date) {
    const accessToken = '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';
    const owner = 'AnimeNyaruko';
    const repo = 'LuckyWheelWeb';

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/PushData/data.json`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const responseData = await response.json();
    console.log(responseData); // Log the response data
    const fileContents = JSON.parse(atob(responseData.content));
    fileContents.users.push({
        "Sản phẩm trúng": items,
        "Dữ liệu": data,
        "Thời gian": date
    });
    const updatedContent = JSON.stringify(fileContents, null, 2);
    const encodedContent = btoa(updatedContent);
    const commitMessage = 'Add new data to the JSON file';

    const updateUrl = `https://api.github.com/repos/${owner}/${repo}/contents/PushData/data.json`;
    const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: commitMessage,
            content: encodedContent,
            sha: responseData.sha
        })
    });
    const updateData = await updateResponse.json();
    console.log(updateData);
}
