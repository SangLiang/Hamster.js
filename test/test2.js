Hamster.init("main", 800, 600);

var obj = Hamster.sprite({
    "name": "background",
    "imageName": "background",
    "x": 0,
    "y": 0
});

Hamster.add(obj);

Hamster.addEventListener(obj, "keyDown", function(e) {

    if(e.code == "KeyJ"){
        console.log(3);
        obj.x = obj.x-10;
    }    
});