function toFlag() {
    $.ajax({
        url: "http://hit100.socu2010.org/api/getFlagUrl",
        type: "get",
        dataType: "json",
        contentType: "application/json",
        success: function(returnData) {
            // location.reload();
            window.location.href = returnData.data;
        }
    });
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function toForm() {
    var msg =
        '<form id="infos" action="" method="post">' +
        '<label>姓名：</label><input class="form-control" type="text" name="name" /><br/>' +
        '<label>电话：</label><input class="form-control" type="text" name="tel" ' +
        '                       maxlength="11" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" /><br/>' +
        '<label>身份：</label><select  class="form-control" name="identity"><option value="校友赞助商">校友赞助商</option>' +
        '<option value="校友企业">校友企业</option>' +
        '<option value="校友协会">校友协会</option>' +
        '<option value="校友个人">校友个人</option>' +
        "</select><br/>" +
        '<label>自荐理由：</label><textarea class="form-control" rows="3" cols="30" name="reason" /><br/>' +
        "</form>";

    bootbox.dialog({
        title: "",
        message: msg,
        buttons: {
            cancel: {
                label: "取消"
            },
            success: {
                label: "确认提交",
                className: "btn-flag",
                callback: function(result) {
                    if (result) {
                        var model = {};
                        var x = $("#infos").serializeArray();
                        $.each(x, function(i, field) {
                            model[field.name] = field.value;
                        });
                        $.ajax({
                            url: "http://hit100.socu2010.org/api/register",
                            type: "post",
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify(model),
                            success: function() {
                                location.reload();
                            }
                        });
                    }
                }
            }
        }
    });
}

function getRank() {
    var code = getQueryString("code");
    $.ajax({
        url: "http://hit100.socu2010.org/api/incrementAndGet?code=" + code,
        type: "get",
        dataType: "json",
        success: function(returnData) {
            // $("#rank").value=returnData.Data;
            getRandom(
                returnData.data.count,
                returnData.data.userInfoVO.nickname,
                returnData.data.userInfoVO.headimgurl
            );
        }
    });
}
function getRandom(rank, name, head) {
    var text_arr = [
        "手贱，发射了一枚火箭把太阳弄灭了。”安息吧,人类!!!”校旗传递了0米。",
        "高考填报了软件工程专业，大学四年没有找到女朋友，校旗传递了0米。",
        "找到了志愿者筹备组，行贿了贝勒爷。校旗传递了99999公里。",
        "参加了上海校友会户外协会的活动，把校旗插在了珠穆朗玛峰上，校旗传递8844.43米。",
        "从软件工程毕业后，进入了DJI，用无人机把校旗带上了天，校旗传递20公里。",
        "跟随吴献斌，参与了横跨台湾海峡活动，校旗传递400公里。",
        "报名参加了辽宁号的护航行动，校旗传递10000公里。",
        "吃完早饭，校旗装在书包里，从十六公寓到主楼实验室，校旗传递了900米。",
        "从正兴楼的教学楼上完自习，拿着校旗去百味佳餐厅吃法，校旗传递了80米。",
        "带着女友，兜里揣着校旗，去博物馆附近看电影，校旗传递了2公里。",
        "将校旗装进书包，然后去科学园实验室，路上发现手机忘带，返回十六公寓，再去实验室，校旗累计传递了2.5公里。",
        "手握校旗，参加校园马拉松，花了两小时，气喘吁吁的奔到了终点，校旗飘过了10公里。",
        "带着风筝去郊外放风筝，将校旗画在了风筝上，风筝飞上云霄，校旗传递了。。。。咦，不见了。",
        "跨年夜和朋友一块去礼堂参加跨年晚会，晚会上，遇见一外国小哥哥，他送小哥哥一面校旗，校旗传递了两个心里，嘿嘿，你懂的。",
        "收拾好行李，将校旗装进书包里，匆匆忙忙赶到了哈尔滨西站，带上校旗回到了海南的家里，校旗传递了。。。我也数不清多少公里。",
        "买好了表白礼物，从八公寓走出，来到了十五公寓，向心爱的女生表白，两人毕业后直接留在学校任教，校旗传递了一辈子。",
        "使出了吃奶的力气，把校旗献给了曾经暗恋的3公寓女神，累计传递了520m。",
        "把校旗装在了自己研发的小卫星上，刚升空就被外星人抢走了，校旗传递到了N个光年之外。",
        "拿到校旗之后去天香食堂二类吃了3个馅饼补充能量，之后一路小跑将校旗带到了阳光大厅，传递了1公里。",
        "因为考试不及格回不了家，只能呆在专教继续复习，校旗传递0米。",
        "校旗沿着两旁都是紫丁香的小路上走了好久，然后交给了偶遇到学长，传递距离850米。",
        "兴高采烈的揣着校旗下课，刚走出正心就滑到在熟悉的大冰出溜上，校旗和人一起滑出5米。",
        "拿上校旗从土木工程学院实验室来到阳光大厅，并把校旗挂在了主楼201讲坛的展板上，累计传递800米。",
        "背着校旗从7公寓去图书馆学了一下午工数，累计传递了512米。",
        "和兄弟们一起去篮球场打了场球，居然忘记了传递校旗。"
    ];
    var text_n = Math.floor(Math.random() * text_arr.length);
    var n = Math.floor(Math.random() * 19) + 1;
    console.log(text_arr[n]);
    var imgNo = n + ".jpg";
    let img = document.getElementById("random-img");
    img.src = './img/' + imgNo;
    var rankElement = document.getElementById('rank');
    rankElement.innerHTML = rank;
    var textElement = document.getElementById('text');
    textElement.innerHTML = text_arr[text_n];
    var nameElement = document.getElementById('name');
    nameElement.innerHTML = name;
}

function shareSet(rank, desc) {
    console.log("share set");
    wx.ready(function() {
        //需在用户可能点击分享按钮前就先调用
        console.log("wx ready");
        wx.showOptionMenu();
        wx.onMenuShareAppMessage({
            title: "我是第" + rank + "位为哈工大百年校庆传旗的校友", // 分享标题
            desc: desc, // 分享描述
            link: "http://hit100.socu2010.org/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
                "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=cf3f2de4153853438ccf8027ab28d743/0e2442a7d933c8952b5646f3d41373f08202000a.jpg", // 分享图标
            success: function() {
                console.log("message sucess");
                // 设置成功
            },
            fail: function() {
                console.log("message fail");
            }
        });
        wx.onMenuShareTimeline({
            title: "我是第" + rank + "位为哈工大百年校庆传旗的校友，" + desc, // 分享标题
            link: "http://hit100.socu2010.org/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
                "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=cf3f2de4153853438ccf8027ab28d743/0e2442a7d933c8952b5646f3d41373f08202000a.jpg",
            success: function() {
                console.log("timeline succes");
                // 设置成功
            },
            fail: function() {
                console.log("timeline fail");
            }
        });
    });
}

function weixinInit() {
    var url = window.location.href;
    $.ajax({
        url: "http://hit100.socu2010.org/api/sign",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ url: url }),
        success: function(returnData) {
            console.log(returnData);
            wx.config({
                debug: false,
                appId: returnData.data.appid, // 必填，公众号的唯一标识
                timestamp: returnData.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: returnData.data.nonceStr, // 必填，生成签名的随机串
                signature: returnData.data.signature, // 必填，签名，见附录1
                jsApiList: [
                    "onMenuShareAppMessage",
                    "onMenuShareTimeline",
                    "showOptionMenu"
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            getRank();
        }
    });
}
