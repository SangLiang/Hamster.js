Hamster.init("main", 800, 600);

var obj = Hamster.Sprite({
    "name": "background",
    "imageName": "background",
    "x": 0,
    "y": 0
});

Hamster.add(obj);
// Hamster.remove(obj);
Hamster.addEventListener(obj, "keyDown", function (e) {

    if (e.code == "KeyJ") {
        console.log(3);
        obj.x = obj.x - 500;
        setTimeout(function(){
            Hamster.remove(obj);
        },1000);
    }
});

console.log(obj);
obj.isTrigger = true;

Hamster.addEventListener(obj,"click",function(e){
    console.log(e);
});

console.log(Hamster.spriteList.length);

// setTimeout(function(){
//     Hamster.remove(obj);
// },2000);

// var sa = Hamster.addTimeout("sa", 5000, function () {
//     console.log("*************");
//     console.log(obj);
//     Hamster.remove(obj);
//     console.log(Hamster.spriteList.length);
// });