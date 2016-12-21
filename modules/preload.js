// 图片的预加载

Hamster.Preload = {}
// 加载图片数组
Hamster.Preload.imageList = [];

Hamster.Preload.init = function () {
    console.log(Hamster.ctx);
    var _visit_list = [];
    for (var i = 0; i < Res["images"].length; i++) {
        (function (index) {
            var obj = {};
            obj.texture = new Image();
            obj.name = Res["images"][index]["name"];
            obj.texture.src = Res["images"][index]["src"];
            obj.texture.onload = function () {
                _visit_list.push(obj);
                Hamster.Preload.imageList.push(obj);
            }
        })(i);
    }
    // 监听资源加载情况
    var time = setInterval(function () {
        var _text = "资源加载情况" + Math.floor(_visit_list.length / Res["images"].length * 100) + "%";
        console.info(_text);
        Hamster.ctx.fillStyle = "#ffffff";
        Hamster.ctx.font = "30px";
        Hamster.ctx.fillText(_text, Hamster.width/2, Hamster.height/2);

        console.log(Hamster.width);
        if (_visit_list.length == Res["images"].length) {
            Hamster.start();
            Hamster.rendingStage();
            clearInterval(time);
            console.info("加载完成");
        }
    }, 1);
};
