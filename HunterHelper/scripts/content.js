
const rules = {
    ip: '#app > main > div.page-list > div.page-list-body > div.page-list-body_table > div.main > div.table-box > div.list-table.main-table > div.q-table.drag-table.q-table--fit.q-table--scrollable-x.q-table--enable-row-transition > div.q-table__fixed > div.q-table__fixed-body-wrapper > table > tbody > tr > td.q-table_1_column_2.q-table__cell > div > div > span > span > span',
    domain: '#app > main > div.page-list > div.page-list-body > div.page-list-body_table > div.main > div.table-box > div.list-table.main-table > div.q-table.drag-table.q-table--fit.q-table--scrollable-x.q-table--enable-row-transition > div.q-table__fixed > div.q-table__fixed-body-wrapper > table > tbody > tr > td.q-table_1_column_3.q-table__cell > div > div > span > span > span',
    port: '#app > main > div.page-list > div.page-list-body > div.page-list-body_table > div.main > div.table-box > div.list-table.main-table > div.q-table.drag-table.q-table--fit.q-table--scrollable-x.q-table--enable-row-transition > div.q-table__fixed > div.q-table__fixed-body-wrapper > table > tbody > tr > td.q-table_1_column_4.q-table__cell > div > span.q-popover-wrapper.can-click > span > span',
    title: '#app > main > div.page-list > div.page-list-body > div.page-list-body_table > div.main > div.table-box > div.list-table.main-table > div.q-table.drag-table.q-table--fit.q-table--scrollable-x.q-table--enable-row-transition > div.q-table__body-wrapper.is-scrolling-left > table > tbody > tr > td.q-table_1_column_5.q-table__cell > div > div > span > span > span'
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
            const res = document.querySelectorAll(rules[element])
            infos[element] = res
        });
        // 拼接数据
        let result = ''
        const length = infos[checks[0]].length
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < checklength; j++) {
                const info = checks[j]
                const tmp = infos[info][i].innerText
                result = result + tmp + ":"
            }
            result = result.slice(0, -1)
            result = result + "\n"
        }
        sendMessage(result);
    }
    else
        sendMessage("FUCK OFF"); // snub them.
});

