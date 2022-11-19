let interval1 = null
// 判断是否开始
const checkStart = () => {
    const title = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingleft > div.whpubinfo > div > div.detail-proinfo > span.stageTxt > span")
    return title ? true : false
}

// 判断是否为修改出价时间
const checkChangePrice = () => {
    const dom = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingleft > div.whpubinfo > div > div.detail-proinfo.secdetail-proinfo > span.stageTxt > span")
    return dom?.textContent === "修改出价时段" ? true : false
}

const poll1 = () => {
    if (!interval1) {
        clearInterval(interval1)
        interval1 = null
    }
    interval1 = setInterval(() => {
        if (checkStart()) {
            console.log('拍卖会已经开始');
            clearInterval(interval1)
            poll2()
        } else {
            console.log('还没开始');
        }
    }, 1000)
}

const poll2 = () => {
    if (!interval1) {
        clearInterval(interval1)
        interval1 = null
    }
    interval1 = setInterval(() => {
        if (checkChangePrice()) {
            console.log('修改出价时段到');
            clearInterval(interval1)
            monitoringTime()
        } else {
            console.log('还没到修改出价时段');
        }
    }, 1000)
}

const checkAuthInput = () => {
    const authInput = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingright > div.whSetPriceD > div.whpdContent > div.whpdtip > span")
    return authInput ? true : false
}

// 监控时间变动
const monitoringTime = () => {
    const button = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingright > div.whbidcontent > div > div.whsecpro-content.whpricecontent > div.whsetprice-box > div.whsetpricebtn-box > div")
    // 获取自行输入的内容
    const inputOfPrice = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingright > div.whbidcontent > div > div.whsecpro-content.whpricecontent > div.whsetprice-box > div.whsetpriceinput-box > div > input")
    // 获取修改出价时段
    const end = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingleft > div.whpubinfo > div > div.proinfo.red > span:nth-child(11) > span:nth-child(2)")
    // 获取当前时间的时间戳
    // const now = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingleft > div.whpubinfo > div > div.detail-proinfo.secdetail-proinfo > span:nth-child(4) > span")
    // 获取价格区间
    // const low = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingleft > div.whpubinfo > div > div.detail-proinfo.secdetail-proinfo > span:nth-child(10) > span > span:nth-child(1)")
    const up = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingleft > div.whpubinfo > div > div.detail-proinfo.secdetail-proinfo > span:nth-child(10) > span > span:nth-child(2)")
    const today = dayjs().format("YYYY-MM-DD")
    const endTime = today + " " + end.textContent + ":00"
    const endTimeVal = dayjs(endTime).valueOf()
    console.log("endTime", endTimeVal)

    // 开始观测当前时间
    if (!interval1) {
        clearInterval(interval1)
        interval1 = null
    }
    interval1 = setInterval(() => {
        console.log('时间在跳动');
        // 比对时间差距是否在三秒内
        const nowVal = dayjs().valueOf()
        const dif = endTimeVal - nowVal
        // 当时间小于3秒的时候，计算出当前的范围
        if (dif < 4000) {
            clearInterval(interval1)
            const b = parseInt(up.textContent) + 100
            console.log(b);
            let evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', true, true);
            inputOfPrice.value = b;
            inputOfPrice.dispatchEvent(evt)
            // 出价按钮点击
            button.click();
            // 添加回车确定
            enterSubmit()
            poll3();
        }
        console.log(dif, up.textContent);
    }, 1000)
    // now.addEventListener("DOMSubtreeModified", timeChange(endTimeVal, low, up, inputOfPrice, button), false);
}

const poll3 = () => {
    if (!interval1) {
        clearInterval(interval1)
        interval1 = null
    }
    interval1 = setInterval(() => {
        if (checkAuthInput()) {
            clearInterval(interval1)
            const authCode = document.querySelector("#bidprice")
            authCode.focus()
        } else {
            console.log('弹窗还没出来');
        }
    }, 1000)
}
const enterSubmit = () => {
    document.onkeyup = (e) => {
        let event = e || window.event;
        let key = event.which || event.keyCode || event.charCode;
        if (key === 13) {
            const button = document.querySelector("#root > div > div.whomemain > div > div.whbiddingcontent > div.whbiddingitem.whbiddingright > div.whSetPriceD > div.whpdContent > div.whpdBtnbox > div.whpdConfirm.whpdBtnItem")
            button.click();
        }
    }
}

poll1()
