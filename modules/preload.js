// 图片的预加载

Hamster.Preload = {}
// 加载图片数组
Hamster.Preload.imageList = [];

Hamster.Preload.init = function () {
    var _visit_list = [];
    var _width = Hamster.width / 2 - 70;
    var _height = Hamster.height / 2 - 5;

    for (var i = 0; i < Res["images"].length; i++) {
        (function (index) {
            var obj = {};
            obj.texture = new Image();
            obj.name = Res["images"][index]["name"];
            obj.texture.src = Res["images"][index]["href"];
            obj.texture.onload = function () {
                _visit_list.push(obj);
                Hamster.Preload.imageList.push(obj);
            }
        })(i);
    }

    var myText = new Hamster.UI.Text({
        "name": "myText",
        "fontSize": 18,
        "text": "lalallala",
        "x": _width,
        "y": _height,
        "color": "#fff"
    });

    Hamster.add(myText);

    // 监听资源加载情况
    var time = setInterval(function () {
        var _text = "资源加载情况" + Math.floor(_visit_list.length / Res["images"].length * 100) + "%";
        Hamster.ctx.clearRect(0, 0, Hamster.width, Hamster.height);
        myText.setText(_text);
        myText.draw();

        if (_visit_list.length == Res["images"].length) {
            Hamster.start();
            Hamster.rendingStage();
            clearInterval(time);
            console.info("加载完成");
            Hamster.remove(myText);
        }
    }, 1);
};
