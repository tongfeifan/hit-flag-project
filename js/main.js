function  toFlag() {
    window.location.href="flag.html";
}

function  toForm() {
    console.log("form")
    var msg='<div><form><label>姓名：</label><input type="text" class=""></form></div>';

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
                callback: function () {


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


