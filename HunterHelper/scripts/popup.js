const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};


const exportItem = async () => {
    const tab = await getCurrentTab();
    // 计算check了哪些
    const checkIds = ['ip', 'domain', 'port', 'title']
    const checks = []
    checkIds.forEach(id => {
        if (document.getElementById(id).checked) {
            checks.push(id)
        }
    });
    chrome.tabs.sendMessage(tab.id, { greeting: "getinfo", checks }, (response) => {
        //console.log(response);　　// 向content-script.js发送请求信息
        document.getElementById("exportText").value = response;
    });
}


let exportButton = document.getElementById("exportButton");
exportButton.onclick = exportItem;