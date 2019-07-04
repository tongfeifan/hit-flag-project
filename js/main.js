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

function downPicture(){
    console.log("picture")
}
