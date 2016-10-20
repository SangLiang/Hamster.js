// 图片的预加载

Hamster.Preload = {
    // 加载图片数组
    "imgList":[],

    
    "init":function(){
        console.log(Res);
        for(var i = 0; i<Res["images"].length;i++){
            console.log(i);
        }
    }
    
}

Hamster.Preload.init();