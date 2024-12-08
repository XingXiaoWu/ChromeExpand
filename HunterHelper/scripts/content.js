// const html = document.body.innerHTML;
debugger
console.log(123123231);
const rules = {
    ip: '/html/body/section/main/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/div[4]/div[2]/table/tbody/tr/td[2]/div/div/span/span/span',
    domain: '/html/body/section/main/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/div[4]/div[2]/table/tbody/tr/td[3]/div/div/span/span/span',
    port: '/html/body/section/main/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/div[4]/div[2]/table/tbody/tr/td[4]/div/span[1]/span/span',
    title: '/html/body/section/main/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/div[3]/table/tbody/tr/td[5]/div/div/span/span/span'
}


chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
    if (request.greeting == "getinfo") {
        const checks = request.checks
        const checklength = checks.length
        if (checklength == 0) {
            sendMessage('no check');
            return
        }
        const infos = {}
        checks.forEach(element => {
            // 提取
            const res = $x(rules[element])
            infos[element] = res
        });
        // 拼接数据
        let result = ''
        const length = infos[checks[0]].length
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < checklength - 1; j++) {
                result += infos[checks[j]][i].innerText + ":"
            }
            result += "\n"
        }
        sendMessage(result);
    }
    else
        sendMessage("FUCK OFF"); // snub them.
});

