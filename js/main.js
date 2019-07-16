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
    var text_arr=["你好","我好","大家好","上班","太累","回家睡"];
    var n=Math.floor(Math.random()*6);
    console.log(text_arr[n]);
    var imgNo="0"+".jpg";
    let img = document.getElementById("random-img");

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
        .text('郭晓东<br><s>' + text_arr[n] + ', 成为第'+ rank +'位校旗传递者</s>',{
            width:'300px',
            align:'center',
            pos:{
                x:200,
                y:50,
            },
        })
        .draw( b64 =>{
            // console.log("4");
            img.setAttribute( 'src', b64 );

            console.log(b64);
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

            wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                wx.showOptionMenu();
                wx.updateAppMessageShareData({
                    title: '我是第xx位为哈工大百年校庆传旗的校友', // 分享标题
                    desc: '我传递了xxxkm', // 分享描述
                    link: 'http://hit100.socu2010.org/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    success: function () {
                        // 设置成功
                    }
                });
                wx.updateTimelineShareData({
                    title: '我是第xx位为哈工大百年校庆传旗的校友，我传递了xxxkm', // 分享标题
                    link: 'http://hit100.socu2010.org/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
            });


        }
    })

}




