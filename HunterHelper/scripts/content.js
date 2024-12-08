// const html = document.body.innerHTML;
debugger
console.log(123123231);

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
    if (request.greeting == "getinfo")
        sendMessage('sb');
    else
        sendMessage("FUCK OFF"); // snub them.
});

