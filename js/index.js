$(function(){

    var imgUrl = 'img/long_pic1.jpg';
    var imgObject = new Image();
    imgObject.src = imgUrl;

    imgObject.onload = function(){
        var pic1 = document.querySelector('#long_pic1');
        pic1.setAttribute('src', imgUrl);
        pic1.setAttribute('class', 'thumbnails complete');

        var pic2 = document.querySelector('#long_pic2');
        pic2.setAttribute('src', 'img/long_pic2.jpg');

        var pic3 = document.querySelector('#long_pic3');
        pic3.setAttribute('src', 'img/long_pic3.jpg');

        var pic4 = document.querySelector('#long_pic4');
        pic4.setAttribute('src', 'img/long_pic4.jpg');

        var pic5 = document.querySelector('#long_pic5');
        pic5.setAttribute('src', 'img/long_pic5.jpg');

    };

});
