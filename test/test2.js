Hamster.init("main", 800, 600);

var obj = Hamster.Sprite({
    "name": "background",
    "imageName": "background",
    "x": 0,
    "y": 0
});

Hamster.add(obj);
Hamster.addEventListener(obj, "keyDown", function (e) {
 
    if (e.code == "KeyJ") {
        obj.x = obj.x - 200;
    }

    Hamster.removeEventListener(null,"keyDown",function(){
        console.log(1);
    });
});

console.log(obj);
obj.isTrigger = true;

Hamster.addEventListener(obj,"click",function(e){
    console.log(e);
});

console.log(Hamster.spriteList.length);