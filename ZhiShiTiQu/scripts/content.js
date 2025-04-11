
console.log('知识提取器加载成功');

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
    if (request.greeting == "getinfo") {
        console.log('收到消息');
        let iframe = document.querySelector("#q-app > div > div > div.q-page-container > main > div > div.content > div.row.boxRow > div.table > div > div.tableList > div:nth-child(2) > div > div > div > div > iframe")
        console.log(iframe);
        
        let doc1 = iframe.contentDocument
        let text2 = doc1.querySelector("#viewer > div > div.textLayer > span:nth-child(24)").innerText
        console.log('text2');
        sendMessage(text2);
        // console.log(text2);

        // let allSpan = doc1.querySelectorAll("#viewer > div > div.textLayer > span")
        // console.log(allSpan);
        // console.log(allSpan.length);
        
        // let result = ''
        // for (let i = 20; i < allSpan.length; i++) {
        //     let span = allSpan[i]
        //     let text = span.innerText
        //     console.log(text);
        //     // 检测内容是否为括号内的电话号码格式：李晓明(15901296890)
        //     if (text.match(/.*\(1[3456789]\d{9}\)$/)) {
        //         // 提取括号内的手机号
        //         result = text.match(/\((\d+)\)/)[1];
        //         break    
        //     }
        // }
        // sendMessage(result);
    }
    else
        sendMessage("FUCK OFF"); // snub them.
});

