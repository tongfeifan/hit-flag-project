function  toFlag() {
    window.location.href="flag.html";
}

function  toForm() {
    console.log("form")
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

function downPicture(){
    console.log("picture")
}
