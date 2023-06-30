// export async function DataHandler(items, data, date) {
//     const accessToken = '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';
//     const owner = 'AnimeNyaruko';
//     const repo = 'LuckyWheelWeb';

//     const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Authorization': `token ${accessToken}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             title: 'Khách hàng mới',
//             body: `Sản phẩm trúng: ${items}\nDữ liệu: ${JSON.stringify(data)}\nThời gian: ${date}`
//         })
//     });
//     const responseData = await response.json();
//     console.log(responseData);
// }
export async function DataHandler(items, data, date) {
  const newData = {
    // Define the new data that you want to append to the users array
    "Sản phẩm": items,
    "Thông tin khách hàng": data,
    "Thời gian": date
  };

  // Fetch the existing data from the file, or create a new file if it does not exist
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  let existingData = {};
  if (xhr.status === 200) {
    existingData = JSON.parse(xhr.responseText);
  }

  // If the file did not exist or was empty, initialize it with an empty users array
  if (!existingData.users) {
    existingData = { users: [] };
  }

  // Append the new data to the users array
  existingData.users.push(newData);

  // Save the updated data to the file using an XHR request
  const xhr2 = new XMLHttpRequest();
  xhr2.open("PUT", "data.json");
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.send(JSON.stringify(existingData));
}