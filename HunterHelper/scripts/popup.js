const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};


const exportItem = async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { greeting: "getinfo" }, (response) => {
        //console.log(response);　　// 向content-script.js发送请求信息
        document.getElementById("exportText").value = response;
    });
}


let exportButton = document.getElementById("exportButton");
exportButton.onclick = exportItem;