function  toFlag() {
    window.location.href="flag.html";
}

function  toForm() {
    var msg='<form id="infos" action="" method="post">' +
        '<label>姓名：</label><input type="text" name="name" /><br/>' +
        '<label>电话：</label><input type="text" name="phone" maxlength="11" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" /><br/>' +
        '<label>身份：</label><select name="role"><option value="1">校友赞助商</option>' +
                    '<option value="2">校友企业</option>' +
                    '<option value="3">校友协会</option>' +
                    '<option value="4">校友个人</option>' +
                    '</select><br/>' +
        '<label>自荐理由：</label><textarea rows="4" cols="50" name="self-recommendation" /><br/>' +
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
                className: "btn-primary",
                callback: function (result) {
                    if(result) {
                        $('#infos').submit();
                    }
                }
            },
        }
    });
}

function getRandom(){
    var text_arr=["你好","我好","大家好","上班","太累","回家睡"];
    var n=Math.floor(Math.random()*6);
    console.log(text_arr[n]);
    var img=n+".jpg";
    var str="<img src='img/"+img+"' class='img-flag' width='97%' height='100%' >";
    $(".main-content").append(str);
}

function downPicture(){
    console.log("picture")
    var url='http://47.101.11.38/img/0.jpg'
    // var download=plus.downloader.createDownload(url, {}, function(d,status){
    //     // 下载完成
    //     if(status == 200){
    //         alert("Download success: " + d.filename);
    //     } else {
    //         alert("Download failed: " + status);
    //     }
    // });
    // download.start();

    // var str="<a href="+url+" download='HITflag'></a>"
    // $("#down").append(str)

}


