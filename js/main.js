function  toFlag() {
    window.location.href="flag.html";
}

function  toForm() {
    var msg='<form id="infos" action="" method="post">' +
        '<label>姓名：</label><input class="form-control" type="text" name="name" /><br/>' +
        '<label>电话：</label><input class="form-control" type="text" name="tel" ' +
        '                       maxlength="11" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" /><br/>' +
        '<label>身份：</label><select  class="form-control" name="identity"><option value="校友赞助商">校友赞助商</option>' +
                    '<option value="校友企业">校友企业</option>' +
                    '<option value="校友协会">校友协会</option>' +
                    '<option value="校友个人">校友个人</option>' +
                    '</select><br/>' +
        '<label>自荐理由：</label><textarea class="form-control" rows="3" cols="30" name="reason" /><br/>' +
        '</form>'

    bootbox.dialog({
        title: "",
        message: msg,
        buttons: {
            cancel: {
                label: '取消',
            },
            success: {
                label: "确认提交",
                className: "btn-flag",
                callback: function (result) {
                    if(result) {
                        var model = {};
                        var x = $("#infos").serializeArray();
                        $.each(x, function (i, field) {
                            model[field.name] = field.value;
                        });
                        $.ajax({
                            url:"http://hit100.socu2010.org/api/register",
                            type:"post",
                            dataType:"json",
                            contentType: "application/json",
                            data: JSON.stringify(model),
                            success:function(){
                                location.reload();
                            }
                        })
                    }
                }
            },
        }
    });
}

function getRank(){
    $.ajax({
        url:"http://hit100.socu2010.org/api/incrementAndGet",
        type:"get",
        dataType:"json",
        success:function(returnData){
            // $("#rank").value=returnData.Data;
            getRandom(returnData.data.count);
        }
    })
}
function getRandom(rank){
    var text_arr=[
        "学霸手贱，发射了一枚火箭把太阳弄灭了。”安息吧,人类”!!!校旗传递了0KM。",
        "高考填报了软件工程专业，大学四年没有找到女朋友，校旗传递了0KM",
        "找到了志愿者筹备组，行贿了贝勒爷。校旗传递了99999KM。",
        "参加了上海校友会户外协会的活动，把校旗插在了珠穆朗玛峰上，校旗传递8844.43米。",
        "从软件工程毕业后，进入了DJI，用无人机把校旗带上了天，校旗传递20KM。",
        "跟随吴献斌，参与了横跨台湾海峡活动，校旗传递400kM。",
        "报名参加了辽宁号的护航行动，校旗传递10000KM。"
    ];
    var text_n=Math.floor(Math.random()*7);
    var n=Math.floor(Math.random()*5);
    console.log(text_arr[n]);
    var imgNo=n+".jpg";
    let img = document.getElementById("random-img");

    var text = '童飞帆' + text_arr[text_n];

    let mc = new window.MCanvas.default({
        width: 1000,
        height: 1000,
        backgroundColor: 'black',
    });

    // background : 准备底图；提供多种模式
    mc.background("http://hit100.socu2010.org/img/" + imgNo,{
        left:0,
        top:0,
        color:'#000000',
        type:'origin',
    })
        .text(text + '成为第'+ rank +'位校旗传递者。',{
            width:'330px',
            align:'left',
            normalStyle: {

                // 文字样式，包含字体/字号等，使用方式与css font一致；
                font: '35px/5px Arial, Helvetica, sans-serif',
                color:'#2A4963',
            },
            pos:{
                x:320,
                y:50,
            },
        })
        .draw( b64 =>{
            // console.log("4");
            img.setAttribute( 'src', b64 );

            console.log(b64);
        });
    shareSet(rank, text)

}

function shareSet(rank, desc) {
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.showOptionMenu();
        wx.updateAppMessageShareData({
            title: '我是第'+rank+'位为哈工大百年校庆传旗的校友', // 分享标题
            desc: desc, // 分享描述
            link: 'http://hit100.socu2010.org/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
                // 设置成功
            }
        });
        wx.updateTimelineShareData({
            title: '我是第'+rank+'位为哈工大百年校庆传旗的校友' + desc, // 分享标题
            link: 'http://hit100.socu2010.org/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
                // 设置成功
            }
        })
    });

}

function weixinInit() {
    $.ajax({
        url: "http://hit100.socu2010.org/api/sign?url=http://hit100.socu2010.org/flag.html",
        type: "get",
        dataType: "json",
        success: function (returnData) {
            wx.config({
                debug: false,
                appId: returnData.appid, // 必填，公众号的唯一标识
                timestamp: returnData.timestamp, // 必填，生成签名的时间戳
                nonceStr: returnData.nonceStr, // 必填，生成签名的随机串
                signature: returnData.signature, // 必填，签名，见附录1
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'showOptionMenu'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    })
    getRank()

}




